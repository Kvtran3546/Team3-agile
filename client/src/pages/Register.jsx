import React, { useState } from 'react';
import { Navbar } from '../components';
import { Form } from 'react-bootstrap';
import '../css/SubmitSpot.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('mongodb://localhost:27017/register', {
                username: username,
                password: password
            });
            console.log('Response:', response.data);
            // Redirect to login or another page upon successful registration
        } catch (error) {
            console.error('Error during registration:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className='bg-[#F5F5F5] w-full h-fit py-10 flex justify-center items-center flex-col'>
            <form onSubmit={handleSubmit} className="flex flex-col bg-white py-10 w-[440px] h-fit px-10 rounded-md">
                <p className='w-full mb-10'>By signing up, you agree to our Terms of Use and Privacy Policy</p>
                <div className='flex flex-col w-[90%] mb-5'>
                    <label htmlFor="email" className='text-[15px] text-gray-500 font-normal leading-tight uppercase py-2'>Email Address</label>
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
                <div className='flex flex-col w-[90%] mb-5'>
                    <label htmlFor="username" className='text-[15px] text-gray-500 font-normal leading-tight uppercase py-2'>Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className='border-[1px] border-gray-400 rounded-sm px-[10px] py-[8px]'
                        placeholder='Choose a username'
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
                        placeholder='Create a password'
                    />
                </div>
                <button type="submit" className='w-[150px] h-fit py-2 bg-gray-400 rounded-md text-white hover:bg-gray-600 transition-all duration-300'>Sign Up</button>
                <p className='text-center text-[13px] my-10'>Already have an account? <Link to={`/login`} className="text-[#3D76C5]">Sign in</Link></p>
            </form>
        </div>
    );
}

export default Register;
