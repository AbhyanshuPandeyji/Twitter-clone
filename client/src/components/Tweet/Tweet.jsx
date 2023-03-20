// to display tweets by displaying the single tweets
import React, {useState, useEffect} from 'react'
import axios from "axios";
import { Link, useLocation , useParams} from "react-router-dom";
import {useSelector} from 'react-redux';

// for date formatting
import formatDistance from 'date-fns/formatDistance';

// the icons 
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; // empty heart icon
import FavoriteIcon from '@mui/icons-material/Favorite'; // liked heart icon



const Tweet = ({tweet, setData}) => { // current user login
    const {currentUser} = useSelector((state) => state.user);

    const [userData, setUserData] = useState();


    // for dispalying data in good format  - formatting mongo db date
    const dateStr = formatDistance(new Date(tweet.createdAt) , new Date());

    // for seeing effect of like imidiately- initializing useLocation
    const location = useLocation().pathname;

    // bringing id form the url 
    const {id} = useParams();

    console.log(location);
    useEffect(() => {
        const fetchData = async () => {

            try {
                // could be any users tweet it will be filter out based on the condition  - tweets related to the user
                // condition will be based on different pages
                // find individual user info
                const findUser = await axios.get(`/users/find/${tweet.userId}`);

                setUserData(findUser.data);

            } catch (error) {
                console.log('error', error)
            }

        };

        fetchData();
    }, [tweet.userId, tweet.likes]);
    // load again if like or userid changes


    // for handling the like functionality
    const handleLike = async(e)=>{
        // not load every time it like
        e.preventDefault();
        try {
            // updating like
            const like = await axios.put(`/tweets/${tweet._id}/like`, {
                // adding current user id to likes array
                id: currentUser._id,
            });

            if(location.includes("profile")){
                const newData = await axios.get(`tweets/user/all/${id}`)
                // setting data is the tweets 
                setData(newData.data);
            } else if(location.includes("explore")){
                const newData = await axios.get(`tweets/explore`)
                // setting data is the tweets - data is just the data of the stored info
                setData(newData.data);
            } else {
                const newData = await axios.get(`tweets/timeline/${currentUser._id}`)
                // setting data is the tweets - data is just the data of the stored info
                setData(newData.data);
            }

        } catch (error) {
            console.log('error', error)
        }


    }

    return (
        <div>
            {userData && <> 
            <div className='flex space-x-2'>
                {/* this will be our profile picture of our tweet */}
                {/* <img src="" alt=""/>  can be used */}
                {/* link to profile of the tweeter */}
                <Link to={`/profile/${userData._id}`}>
                    <h3 className='font-bold'>{userData.username}</h3>
                </Link>
                {/* name of the user profile */}
                <span className='font-normal'>@{userData.username}</span>
                {/* when the tweet been made */}
                <p> - {dateStr}</p>
            </div>
            {/* tweet made */}
            <p>{tweet.description}</p>
            {/* implementing like and dislike funtionality */}
            <button onClick={handleLike}>{tweet.likes.includes(currentUser._id) ? 
            (<FavoriteIcon className='mr-2 my-2 cursor-pointer red'></FavoriteIcon>):
            (<FavoriteBorderIcon  className='mr-2 my-2 cursor-pointer'></FavoriteBorderIcon>)  }
            {/* number of likes */}
            {tweet.likes.length}
            </button>
            </>}
         
        </div>

    )
};

export default Tweet;
