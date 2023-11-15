import React from 'react'
import {Navbar, SearchBar, SpecialButton} from '../components'
import { mainimg } from '../assets'
import { special_buttons } from '../constants'
//import 'leaflet/dist/leaflet.css';
const Home = () => {
  return (
    <div className='flex flex-col w-full justify-center items-center'>
        <div className='relative flex flex-col justify-center items-center w-full py-10'>
          <h1 className='z-10 lg:text-[60px] md:text-[40px] sm:text-[30px] text-white'>Search for your new adventure here!</h1>
          <SearchBar/>
          <img src={mainimg} alt="natureimg" className="absolute w-full h-full overflow-hidden object-cover -z-10 opacity-[90%] grayscale-[10%]"/>
        </div>
        <div className='flex flex-col justify-center items-center mt-10 w-[90%]'>
          <h2 className='lg:text-[60px] text-gray-500 mb-10 md:text-[50px] sm:text-[40px] w-[100%] text-left'>Quick Searches</h2>
          <div className='flex flex-row w-full'>
            {special_buttons.map((item) =>(
              <SpecialButton text={item.text} imgSrc={item.img}/>
            ))}
          </div>
        </div>
        <div className='flex flex-col justify-center items-center mt-10 w-[90%]'>
          <h2 className='lg:text-[60px] text-gray-500 mb-5 md:text-[50px] sm:text-[40px] w-[100%] text-left'>Search for Nearby Spots</h2>
        </div>
    </div>
  )
}

export default Home