import React, {useState} from 'react'

import {useLocation} from 'react-router-dom';

// search icon from material ui
import SearchIcon from '@mui/icons-material/Search';
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import UserPlaceholder from '../UserPalceholder/UserPlaceholder';

const Navbar = () => { // states to change the navbar name when page changes
    const [userData, setUserData] = useState(null);


    const location = useLocation().pathname;

    return (
        <div className='grid grid-col-1 md:grid-cols-4 my-5 justify-center'>
            <div className='mx-auto md:mx-0'>
                {/* our logo in the navbar */}
                <img src="/logo192.png" alt="Twitter logo"
                    width={"40px"}
                    className='ml-8'/>
            </div>
            {/* middle part */}
            <div className='col-span-2 md:border-x-2 md:border-slate-200 md:px-6 my-6 md:my-0'>
                {/* flex to design middle part */}
                <div className='flex justify-between items-center'>
                     {/* changing navbar the heading when the page changes */}
                    <h2 className='font-bold text-2xl'>
                        {
                        location.includes('profile') ? <UserPlaceholder setUserData={setUserData}
                            userData={userData}/> : location.includes("explore") ? ("Explore") : (" Home")
                    } </h2>
                    <StarBorderPurple500Icon/>
                </div>
            </div>

            {/* Right Side Search bar */}
            <div className='px-0 md:px-6 mx-auto'>
                <SearchIcon className="absolute my-2 mx-2"/>
                <input type="text" className='bg-blue-100 rounded-full py-2 px-8'/>
            </div>

        </div>
    )
}

export default Navbar;
