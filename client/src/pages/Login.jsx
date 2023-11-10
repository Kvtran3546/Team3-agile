import React from 'react'
import { useState } from 'react';
import {Navbar} from '../components'
import {Form} from 'react-bootstrap';
import '../css/SubmitSpot.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Login Submitted', { email, password });
        // Here you would typically make a request to your backend to validate the user credentials
    };
    
  return (
    <div className='bg-[#F5F5F5] w-full h-fit py-10 flex justify-center items-center flex-col'>
        <form onSubmit={handleSubmit} className="flex flex-col bg-white py-10 w-[440px] h-fit px-10 rounded-md">
            <p className='w-full mb-10'>By signing in, you agree to Terms of Use and Privacy Policy</p>
            <div className='flex flex-col w-[90%] mb-5'>
                <label htmlFor="email" className='text-[15px] text-gray-500 font-normal leading-tight uppercase py-2'>Email or Username</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className='border-[1px] border-gray-400 rounded-sm px-[10px] py-[8px]'
                    placeholder='Enter your email address here'
                />
            </div>
            <div className='flex flex-col w-[90%] mb-10'>
                <label htmlFor="password" className='text-[15px] text-gray-500 font-normal leading-tight uppercase py-2'>Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className='border-[1px] border-gray-400 rounded-sm px-[10px] py-[8px]'
                    placeholder='Enter your password here'
                />
            </div>
            <button type="submit" className='w-[150px] h-fit py-2 bg-gray-400 rounded-md text-white hover:bg-gray-600 transition-all duration-300'>Sign in</button>
            <p className='text-center text-[13px] my-10'>Forgot username or password?</p>
            <p className='text-center text-[11px]'>Control what you share with other adventurers application Authorized Developers in Settings</p>
        </form>
        <div className="flex flex-col bg-white py-5 w-[440px] h-fit px-10 rounded-md my-10 justify-center items-center">
            <p>New to Town Treasures? <Link to='/register' className="text-[#3D76C5]">Sign up</Link></p>
        </div>
    </div>
  )
}

export default Login