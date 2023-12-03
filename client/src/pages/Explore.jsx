import React, {useEffect, useState} from 'react'
import { SubmitButton, SearchBar } from '../components'
import { listingData } from '../constants/index.js';
import  '../css/Listings.css';
import {ListingCard} from '../components/';
import { mainimg } from '../assets';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
const Explore = () => {
  const [auth, setAuth] = useState(false);
  const [message, setErrorMessage] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
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
  return (
    <div className='flex flex-col w-full bg-[#E2E2E2] pb-10 items-center'>
        <div className='relative flex flex-col justify-center items-center w-full py-10'>
          <h1 className='z-10 lg:text-[70px] md:text-[50px] sm:text-[40px] text-white'>Explore</h1>
          <SearchBar/>
          <img src={mainimg} alt="natureimg" className="absolute w-full h-full overflow-hidden object-cover z-0 opacity-[90%] grayscale-[10%]"/>
        </div>
        <div className="flex flex-wrap h-full w-[90%] justify-between items-center">
                {listingData.map((data, index) => (
                <ListingCard key={index} {...data} />
                ))}
        </div>
        <SubmitButton/>
    </div>
  )
}

export default Explore
