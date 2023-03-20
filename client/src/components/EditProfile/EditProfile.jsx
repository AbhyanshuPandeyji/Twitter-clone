import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {changeProfile, logout} from '../../redux/userSlice.js';
import { useNavigate } from 'react-router-dom';

// firebse functionality
import app from '../../firebase.js'
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";


const EditProfile = ({setOpen}) => { // current logged in user
    const {currentUser} = useSelector((state) => state.user);

    // initialize diaspatch
    const dispatch = useDispatch();

    // to navigate to home page once its been initialized
    const navigate = useNavigate();

    const [img, setImg] = useState(null);
    const [imgUploadProgress, setImgUploadProgress] = useState(0);

    // function to upload images
    const uploadImg = (file) => { // getting files uploaded on firebase
        const storage = getStorage(app);
        // getting file name - date is used for unique filename
        const fileName = new Date().getTime() + file.name;
        // refrencing the storage
        const storageRef = ref(storage, fileName);
        // firebase configuration
        const uploadTask = uploadBytesResumable(storageRef, file);


        uploadTask.on('state_changed', (snapshot) => { // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // how many we uploaded
            setImgUploadProgress(Math.round(progress));
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                default:
                    break;
            }
        }, (error) => {}, () => {
            // Upload completed successfully, now we can get the download URL
            // downloading the file and giving it to us
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                try {

                    const updateProfile = await axios.put(`/users/${
                        currentUser._id
                    }`, { // passing the url of the picture in the profilePicture string in the user data
                        profilePicture: downloadURL
                    });
                    console.log(updateProfile);

                } catch (error) {
                    console.log('error', error)
                }

                // got to redux to change profile
                console.log("downloaded" + downloadURL);
                dispatch(changeProfile(downloadURL));

            });
        });
    };

    const handleDelete = async () => {
            const deleteProfile = await axios.delete(`/users/${currentUser._id}`);
            dispatch(logout());
        navigate("/signin");
    };


    // to refresh when upload an image
    useEffect(() => {
        img && uploadImg(img);

    }, [img]);

    return (
        <div className='absolute w-full h-full top-0 left-0 bg-transparent flex items-center justify-center'>
            {/* this will our modal itself */}
            <div className='w-[600px] h-[600px] bg-slate-200 rounded-lg p-8 flex flex-col gap-4 relative '>
                <button onClick={
                        () => setOpen(false)
                    }
                    className='absolute top-3 right-3  cursor-pointer'>X</button>
                <h2 className='font-bold text-xl'>Edit Profile</h2>
                <p>Choose a new profile picture</p>
                {/* to upload the image using firebase */}
                {
                imgUploadProgress > 0 ? ("Uploading " + imgUploadProgress + '%') : (
                    <input type="file" className='bg-transparent border border-slate-500 rounded p-2' accept='image/*'
                        onChange={
                            (e) => setImg(e.target.files[0])
                        }/>
                )
            }
                <p>Delete Accout</p>
                <button className='bg-red-500 text-white py-2 rounded-full'
                    onClick={handleDelete}>Delete Account</button>
            </div>
        </div>
    );
};

export default EditProfile;
