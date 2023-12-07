import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { mainimg } from "../assets";
import { SearchBar, SubmitButton, ListingCard } from '../components';
import '../css/Listings.css';
const Explore = () => {
  const searchQuery = new URLSearchParams(useLocation().search).get('search')?.toLowerCase() || '';
  const abbreviations = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("");
  const [listings, setListings] = useState([]); // State for listings
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [errorMessage, setErrorMessage] = useState('');
  const [filterState, setFilterState] = useState(''); // State for filtering by state
  const [searchTerm, setSearchTerm] = useState('');
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
  useEffect(() => {
    // Set searchTerm to the query from the URL
    setSearchTerm(searchQuery);
  }, [searchQuery]);

  // Handle user authentication
  useEffect(() => {
    axios.get('http://localhost:3000/users/', { withCredentials: true })
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.name);
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

  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredListings = listings.filter(post => {
    return (
      (filterState === '' || post.state === filterState) &&
      (searchTerm === '' || post.title.toLowerCase().includes(searchTerm)
    ));
  });

  return (
    <div className='explore-container'>
        <div>
          <div className='relative flex flex-col justify-center items-center w-full py-10'>
            <h1 className='z-10 lg:text-[70px] md:text-[50px] sm:text-[40px] text-white'>Explore</h1>
            
            {/* Search Bar */}
            <input
              type="text"
              onChange={handleSearchChange}
              placeholder="Search listings"
              className="bg-white text-black rounded-md p-2 hover:bg-gray-200 focus:bg-white z-20 text-[20px]"
            />

            {/* Filter by State Dropdown (Example) */}
            <select onChange={(e) => setFilterState(e.target.value)} className="state-dropdown-style z-20 mt-2 rounded-md p-1">
              <option value="">Filter by State</option>
              {abbreviations.map((state) => (
                <option value={state}>{state}</option>
              ))}
            </select>

            <img src={mainimg} alt="natureimg" className="absolute w-full h-full overflow-hidden object-cover z-0 opacity-[90%] grayscale-[10%]"/>
          </div>

          <div className="flex flex-wrap w-[90%] justify-between items-center mx-auto">
              {filteredListings.length > 0 ? (
                filteredListings.map((post, index) => (
                  <ListingCard
                    key={post._id}
                    postId = {post._id}
                    images={post.imagePaths} // Assuming the first image in the array
                    reviewerName = {name}
                    title={post.title} 
                    address={post.address}
                    city = {post.city}
                    state = {post.state}
                    description={post.description}
                    review = {post.review}
                  />
                ))
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                    <h2 className="text-lg font-semibold mt-10">No spots matching your criteria!</h2>
                </div>
              )}
          </div>
        </div>

        <div className='submit-button-fixed mb-10'> {/* Fixed position */}
          <SubmitButton />
        </div>
    </div>
  );
}

export default Explore;