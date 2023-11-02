import React from 'react'
import { SubmitButton, SearchBar } from '../components'
import { listingData } from '../constants/index.js';
import  '../css/Listings.css';
import {ListingCard} from '../components/';
const Explore = () => {
  return (
    <div className='flex flex-col w-full h-full justify-center items-center bg-[#E2E2E2] pb-10'>
        <h1 className='text-black'>Explore</h1>
        <SearchBar/>
        <div className="flex flex-wrap h-full w-[90%] justify-between">
                {listingData.map((data, index) => (
                <ListingCard key={index} {...data} />
                ))}
        </div>
        <SubmitButton/>
    </div>
  )
}

export default Explore
