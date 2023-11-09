import React from 'react'
import { SubmitButton, SearchBar } from '../components'
import { listingData } from '../constants/index.js';
import  '../css/Listings.css';
import {ListingCard} from '../components/';
import { mainimg } from '../assets';
const Explore = () => {
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
