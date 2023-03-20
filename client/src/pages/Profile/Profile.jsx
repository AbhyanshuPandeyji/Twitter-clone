import React, {useState, useEffect} from 'react'


import RightSidebar from '../../components/RightSidebar/RightSidebar.jsx';
import LeftSidebar from './../../components/Leftsideabar/LeftSidebar.jsx';
import EditProfile from '../../components/EditProfile/EditProfile.jsx';


import {useParams} from 'react-router-dom';
import {useSelector , useDispatch} from 'react-redux'
import axios from 'axios';

import { following } from '../../redux/userSlice.js'


import Tweet from '../../components/Tweet/Tweet.jsx'


const Profile = () => {

    const {currentUser} = useSelector((state) => state.user);

    // take tweets and their data
    const [userTweets, setUserTweets] = useState(null);
    const [userProfile, setUserProfile] = useState(null);

    // state of the edit profile
    const [open, setOpen] = useState(false);


    const dispatch = useDispatch();

    console.log("tweets", userTweets);
    console.log("Profile Data", userProfile);
    // taking our current user id and other  user id from the url
    const {id} = useParams();

    // fetch data on profile
    useEffect(() => {
        const fetchData = async () => {
            try {
                // taking the user data globally from their id
                // const response = await axios.get(`/api/user/${id}`);

                const userTweets = await axios.get(`/tweets/user/all/${id}`);
                const userProfile = await axios.get(`/users/find/${id}`);

                setUserTweets(userTweets.data);
                setUserProfile(userProfile.data);

            } catch (error) {
                console.log('error', error)
            }
        };
        fetchData();
    }, [currentUser, id]);
    // load new when our login user or id in url changes

    // handling following and unfollowing of the user
    const handleFollow = async()=>{
        // to follow
        if(!currentUser.following.includes(id)){
            try {
                
                const follow = await axios.put(`/user/follow/${id}`,{
                    id: currentUser._id,
                });
                dispatch(following(id));

            } catch (error) {
                console.log("error" , error)
            }
        }
        // to unfollow
        else {

            try {

                const unfollow = await axios.put(`/users/unfollow/${id}`, {
                    id: currentUser._id,
                });
            // to unfollow
            dispatch(following(id));
                
            } catch (error) {
                console.log("error" , error)
                
            }
        }
    }

    return (
        <>
            <div className=' grid grid-cols-1 md:grid-cols-4'>
                <div className='px-6'>
                    <LeftSidebar/>
                </div>
                <div className='col-span-2 border-x-2 border-t-slate-800 px-6'>
                    <div className='flex justify-between items-center'>
                        {/* it will be our profile image - if user exits it shoud have a profile picture */}
                        <img src={userProfile?.profilePicture} alt="Profile Picture" className='w-20 h-20 rounded-full'/>
                        {
                        currentUser._id === id ? (
                            <button onClick={()=> setOpen(true)} className='px-4 py-2 bg-blue-500 rounded-full text-white' >Edit Profile</button>
                        ) : currentUser.following.includes(id) ? (
                            <button onClick={handleFollow} className='px-4 py-2 bg-blue-500 rounded-full text-white'>Following</button>
                        ) : (
                            <button onClick={handleFollow} className='px-4 py-2 bg-blue-500 rounded-full text-white'>Follow</button>
                        )
                    } </div>
                    {/* buttons end */}
                    {/* showing the data of the user profile */}
                    <div className='mt-6'>
                        {
                        userTweets && userTweets.map((tweet) => {
                            return (
                                <div key={
                                        tweet._id
                                    }
                                    className="p-2">
                                    {/* tweet to send all req tweets to show  set data when the tweet been made to add that new tweet */}
                                    <Tweet tweet={tweet}
                                        setData={setUserTweets}/>
                                </div>
                            );
                        })
                    } </div>

                </div>
                <div className='px-6'>
                    <RightSidebar/>
                </div>
            </div>
            {/* toggel our edit profile data */}
            {open && <EditProfile setOpen={setOpen} />}
        </>
    );
};

export default Profile;
