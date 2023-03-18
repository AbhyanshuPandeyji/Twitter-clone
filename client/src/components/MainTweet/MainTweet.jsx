import React from 'react'

const MainTweet = () => {
    return (
        <div>
            <p class="font-bold pl-2 my-2 pt-5">Username</p>
            <form className='border-b-2 pb-6 '>
                <textarea typeof='text' placeholder="What's Happening"
                    maxLength={280}
                    className="bg-slate-200 rounded-lg w-full p-2"></textarea>
                <button className='bg-blue-500 text-white py-2 px-4 rounded-full ml-auto'>
                    Tweet
                </button>
            </form>
            {/* here will be all our timeline tweets - fetch all dta of tweets form the backend */}
            Main Tweets
        </div>
    )
}

export default MainTweet;
