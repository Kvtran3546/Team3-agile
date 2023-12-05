import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ContactUs = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); // New loading state
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() =>  {
    console.log('Component mounted or updated');
    const response = axios.get('http://localhost:3000/users/',{ withCredentials: true })
      .then(res => {
        if(res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.name);
        } else {
          setAuth(false);
          setErrorMessage(res.data.error);
          navigate('/login');
        }
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
        setErrorMessage("Error fetching data");
        navigate('/login');
      });
      // Include navigate in the dependency array to ensure useEffect is aware of it
    }, [navigate]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3000/send-email', { email, topic, message });
      // Handle success - maybe clear the form or show a success message
    } catch (error) {
        setErrorMessage("Error sending email: " + error.message);
    }
    // Add logic to handle form submission, like sending data to server
  };

  return (
    <div className="bg-[#F5F5F5] flex justify-center h-[100vh]">
      <div className='w-[500px] h-fit flex justify-center items-center flex-col bg-white mt-10 rounded-lg'>
        <p className="w-[80%] mt-10 text-[15px] font-poppins text-center">
          Please fill out the form below to get in touch with us. We will respond to your message as soon as possible.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col py-10 w-[440px] h-fit px-10 rounded-md mt-5">
            <div className='flex flex-col w-[90%] mb-5'>
                <label htmlFor="email" className='text-[15px] text-gray-500 font-normal leading-tight uppercase py-2'>Email</label>
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
                <label htmlFor="topic" className='text-[15px] text-gray-500 font-normal leading-tight uppercase py-2'>Topic</label>
                <input
                    type="text"
                    id="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    required
                    className='border-[1px] border-gray-400 rounded-sm px-[10px] py-[8px]'
                    placeholder='Enter your topic here'
                />
            </div>
            <div className='flex flex-col w-[90%] mb-10'>
                <label htmlFor="message" className='text-[15px] text-gray-500 font-normal leading-tight uppercase py-2'>Message</label>
                <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className='border-[1px] border-gray-400 rounded-sm px-[10px] py-[8px]'
                    placeholder='Enter your message here'
                />
            </div>
            <button type="submit" className='w-[150px] h-fit py-2 bg-gray-400 rounded-md text-white hover:bg-gray-600 transition-all duration-300'>Submit</button>
            {errorMessage && <p className="text-red-500 text-center transition-all duration-200 mt-2">{errorMessage}</p>} {/* Display error message */}
        </form>
      </div>
        
    </div>
  );
}

export default ContactUs;
