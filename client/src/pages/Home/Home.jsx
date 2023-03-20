import React from 'react'
import RightSidebar from '../../components/RightSidebar/RightSidebar.jsx';
import LeftSidebar from './../../components/Leftsideabar/LeftSidebar.jsx';
import MainTweet from './../../components/MainTweet/MainTweet.jsx';
import Signin from '../Signin/Signin.jsx'


import { useSelector } from 'react-redux'


const Home = () => {

    // destructuring user from store intialState - taking current user login
    const {currentUser} = useSelector((state)=> state.user);


    return (
        <>{
        !currentUser ? (<Signin/>) : (// designing our grid to be as same as navbar 
        <div className='grid grid-cols-1 md:grid-cols-4'>
            <div className='px-6'>
                <LeftSidebar/>
            </div>
            <div className='col-span-2 border-x-2 border-t-slate-800 px-6'>
                <MainTweet/>
            </div>
            <div className='px-6'>
                <RightSidebar/>
            </div>
        </div>)
        }</>

        
    )
}

export default Home;
