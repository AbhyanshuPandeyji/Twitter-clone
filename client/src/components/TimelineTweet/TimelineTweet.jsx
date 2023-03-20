import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux';
import axios from 'axios'


import Tweet from '../Tweet/Tweet.jsx'


const TimelineTweet = () => { // states of the timeline tweets
    const [timeLine, setTimeLine] = useState(null);

    // current user loged in
    const {currentUser} = useSelector((state) => state.user);

    // fetch our data into it - saet in to the timeline
    useEffect(() => {
        const fetchData = async () => {
            try {
                // taking the tweets of the 
                const timeLineTweets = await axios.get(`/tweets/timeline/${currentUser._id}`);

                // setting the tweets in app to the tweets of user and he follows
                setTimeLine(timeLineTweets.data);

            } catch (error) {
                console.log('error' , error);
            }

        }
        // callin function after this process is fininshed
        fetchData();  
    } , [currentUser._id]);
    // only calling if the id is there 

    console.log("Timeline " , timeLine)
    return (
        <div className='mt-6'>
            {timeLine && timeLine.map((tweet)=>{
                return (
                    <div key={tweet._id} className="p-2" >
                        {/* tweet to send all req tweets to show  set data when the tweet been made to add that new tweet */}
                        <Tweet tweet={tweet} setData={setTimeLine} />
                    </div>
                );
            })}
        </div>
    );
};

export default TimelineTweet;
