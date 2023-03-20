import React , { useState } from 'react'
import TimelineTweet from '../TimelineTweet/TimelineTweet.jsx';

import { useSelector } from 'react-redux';
import axios from 'axios';

const MainTweet = () => {
    
    const { currentUser } = useSelector((state)=> state.user);

    // text in tweet
    const [tweetText , setTweetText] = useState("");
    
    // for posting tweet into database
    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            const submitTweet = await axios.post('/tweets', {
                userId: currentUser._id , 
                description: tweetText,
            });
            // refresh after posting tweet
            window.location.reload(false);
            
        } catch (error) {
            console.log('error',error);
        } 
    }

    return (
        <div>
            {/* to show current logged in user */}
            {currentUser && (<p className="font-bold pl-2 my-2 pt-5">{currentUser.username}</p>)}
            <form className='border-b-2 pb-6 '>
                <textarea onChange={(e)=>setTweetText(e.target.value)} typeof='text' placeholder="What's Happening"
                    maxLength={280}
                    className="bg-slate-200 rounded-lg w-full p-2"></textarea>
                <button onClick={handleSubmit} className='bg-blue-500 text-white py-2 px-4 rounded-full ml-auto'>
                    Tweet
                </button>
            </form>
            {/* here will be all our timeline tweets - fetch all dta of tweets form the backend */}
            <TimelineTweet/>
        </div>
    )
}

export default MainTweet;
