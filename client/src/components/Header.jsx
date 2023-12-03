import React from 'react'
import { menu, close, Town_Treasures_Logo } from "../assets"; // Import menu, close icon, and logo
const Header = () => {
  return (
    <div className='w-[100%] flex py-6 justify-center items-center navbar h-[100px] bg-[#02874D] px-5'>
      <img src={Town_Treasures_Logo} alt="logo" className="flex object-contain w-[150px] h-[150px]"/>
    </div>
  )
}

export default Header