import React ,{ useState ,useEffect} from 'react'
import { useLocation , useParams } from 'react-router-dom';
import axios from 'axios';


const UserPlaceholder = ({ setUserData , userData}) => {

    const { id } = useParams();
    const location = useLocation().pathname; 


    // taking user data and pass in to the div
    useEffect(()=>{
        const fetchData = async()=>{
            try {

                const userProfile = await axios.get(`/users/find/${id}`);
                // once load in to different route
                setUserData(userProfile.data)


            } catch (error) {
                console.log("error" , error)
            }
        }

        fetchData();
    } , [id]);

  return (
    <div>
      { userData?.username}
    </div>
  )
}

export default UserPlaceholder;
