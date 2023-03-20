// this is the signup page

// i will our form to signin
import React, {useState} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'

// for react to redux functionality
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {loginStart, loginSuccess, loginFailed} from '../../redux/userSlice.js';

const Signup = () => { // For the username and Password in signin
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // for signup form case
    const [email, setEmail] = useState("");

    // initializing the dispatch - is a packet dispatecher of the actions of reducer - dispatch(reducer's action(data given/ taken))
    // this dispatch go to the given action reducer and after that stores that data into the browser if success
    const dispatch = useDispatch();
    // once signed in go to homepage
    const navigate = useNavigate();

    // for signup funtionality
    const handleSignup = async (e) => {
        e.preventDefault();
        dispatch(loginStart());

        try {
            const res = await axios.post("/auth/signup", {username,email,  password, });
            dispatch(loginSuccess(res.data));
            navigate("/signin"); // could be the different pages and the link after signup could be signin page
        } catch (error) {
            dispatch(loginFailed());
        }
    }

    return (<form className='bg-gray-200 flex flex-col py-12 px-8 rounded-lg w-8/12 md:w-6/12 mx-auto gap-10 '>
        <h2 className='text-3xl font-bold text-center'>
            Sign Up To Twitter</h2>

        <input onChange={
                (e) => setUsername(e.target.value)
            }
            type="text"
            placeholder='Username'
            className='text-xl py-2 rounded-full px-4'/>

        <input onChange={
                (e) => setEmail(e.target.value)
            }
            type="email"
            placeholder='E-mail'
            className='text-xl py-2 rounded-full px-4'/>

        <input onChange={
                (e) => setPassword(e.target.value)
            }
            type="password"
            placeholder='Password'
            className='text-xl py-2 rounded-full px-4'/>

        <button onClick={handleSignup}
            type="submit"
            className='text-xl py-3 rounded-full px-4 bg-blue-500 text-white'>Signup</button>
            <p className='text-center text-xl '>
            Already have an Account? <Link to='/signin' className='font-bold '>SignIn Page</Link></p>
    </form>)
}

export default Signup;
