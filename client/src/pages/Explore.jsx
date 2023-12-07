import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { mainimg } from "../assets";
import { SearchBar, SubmitButton, ListingCard } from '../components';
import '../css/Listings.css';

const Explore = () => {
  const [auth, setAuth] = useState(false);
  const [listings, setListings] = useState([]); // State for listings
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const BACKEND_URL = 'http://localhost:3000/';
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get('http://localhost:3000/listings/listings'); // Change to your server URL
        setListings(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching listings:', error);
        setErrorMessage('Error fetching listings');
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  // Handle user authentication
  useEffect(() => {
    axios.get('http://localhost:3000/users/', { withCredentials: true })
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(true);
        } else {
          setAuth(false);
          setErrorMessage(res.data.error);
          navigate('/login');
        }
      })
      .catch(error => {
        console.error("Error fetching user data: ", error);
        setErrorMessage("Error fetching user data");
        navigate('/login');
      });
  }, [navigate]);

  if (isLoading) return <div>Loading...</div>; // Loading indicator
  if (errorMessage) return <div>Error: {errorMessage}</div>; // Error message

  return (
    <div className='flex flex-col w-full bg-[#E2E2E2] pb-10 items-center'>
        <div className='relative flex flex-col justify-center items-center w-full py-10'>
          <h1 className='z-10 lg:text-[70px] md:text-[50px] sm:text-[40px] text-white'>Explore</h1>
          <SearchBar data={listings} dataToStrings={(data) => [data.title]} />
          <img src={mainimg} alt="natureimg" className="absolute w-full h-full overflow-hidden object-cover z-0 opacity-[90%] grayscale-[10%]"/>
        </div>
        <div className="flex flex-wrap h-full w-[90%] justify-between items-center">
            {listings.map((post, index) => (
                <ListingCard
                key={post._id} 
                image={`${BACKEND_URL}${post.imagePaths[0].replace(/\\/g, '/')}`} // Assuming the first image in the array
                title={post.title} 
                address={post.address}
                city = {post.city}
                state = {post.state}
                description={post.description}
            />
            ))}
        </div>
        <SubmitButton/>
    </div>
  );
}

export default Explore;