// i will our form to signin
import React, {useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// for react to redux functionality
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {loginStart, loginSuccess, loginFailed} from '../../redux/userSlice.js';

const Signin = () => { // For the username and Password in signin
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // for signup form case

    // initializing the dispatch - is a packet dispatecher of the actions of reducer - dispatch(reducer's action(data given/ taken))
    // this dispatch go to the given action reducer and after that stores that data into the browser if success
    const dispatch = useDispatch();
    // once signed in go to homepage
    const navigate = useNavigate();

    // When signin button is clicked - we use fetch api for our data
    const handleLogin = async (e) => {
        e.preventDefault();
        // no arg req in the action
        dispatch(loginStart());
        try { // fetch our data from the db to see if user exist
            const res = await axios.post("/auth/signin", {username, password});
            // once work is complete - send the data given to the redux to store state in browser
            dispatch(loginSuccess(res.data));
            // goto homepage once the login is success
            navigate("/");
        } catch (error) {
            dispatch(loginFailed());
        }
    };

    return (<form className='bg-gray-200 flex flex-col py-12 px-8 rounded-lg w-8/12 md:w-6/12 mx-auto gap-10 '>
        <h2 className='text-3xl font-bold text-center'>
            Signing To Twitter</h2>

        <input onChange={
                (e) => setUsername(e.target.value)
            }
            type="text"
            placeholder='Username'
            className='text-xl py-2 rounded-full px-4'/>

        <input onChange={
                (e) => setPassword(e.target.value)
            }
            type="password"
            placeholder='Password'
            className='text-xl py-2 rounded-full px-4'/>

        <button onClick={handleLogin}
            type="submit"
            className='text-xl py-3 rounded-full px-4 bg-blue-500 text-white'>
            Signin
        </button>

        <p className='text-center text-xl '>
            Don't Have An Account? <Link to='/signup' className='font-bold'>SignUp Page</Link> </p>

    </form>)
}

export default Signin;
