import React from 'react';
import { useState } from "react";
import { navLinks } from "../constants"; // Import navigation links
import { menu, close, Town_Treasures_Logo } from "../assets"; // Import menu, close icon, and logo
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [toggle, setToggle] = useState(false); // State to manage mobile menu toggle

  return (
    <nav className='w-[100%] flex py-6 justify-between items-center navbar h-[100px] bg-[#02874D] px-5'>
      <img src={Town_Treasures_Logo} alt="logo" className="flex object-contain w-[150px] h-[150px]"/> // Town Treasures logo

      {/* Navigation links for larger screens */}
      <ul className='list-none sm:flex hidden justify-end items-center flex-1'>
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins
              font-normal cursor-pointer text-[16px] ${
                index === navLinks.length - 1 ? "mr-0" : "mr-10"
              } text-white`}
          >
            <Link to={`/${nav.id}`}>{nav.title}</Link>
          </li>
        ))}
      </ul>

      {/* Mobile menu toggle button */}
      <div className='sm:hidden flex flex-1 justify-end items-center'>
        <img
          src={toggle ? close : menu}
          alt='menu'
          className='w-[28px] h-[28px] object-contain'
          onClick={() => setToggle((prev) => !prev)} // Toggle menu on click
        />

        {/* Mobile menu with navigation links */}
        <div
          className={`${
            toggle ? "flex" : "hidden"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className='list-none flex-col flex justify-end items-center flex-1'>
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins
                  font-normal cursor-pointer text-[16px] ${
                    index === navLinks.length - 1 ? "mr-0" : "mr-10"
                  } text-white`}
              >
                <Link to={`/${nav.id}`}>{nav.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;