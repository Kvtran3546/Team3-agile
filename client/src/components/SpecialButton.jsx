import React from 'react';

const SpecialButton = ({ text, imgSrc }) => {
  return (
    <button className="relative flex items-center justify-center text-black hover:text-white transition-all duration-500 font-bold rounded-md lg:text-[50px] lg:hover:text-[60px] lg:w-[400px] lg:h-[230px] md:text-[40px] md:hover:text-[50px] md:w-[300px] mg:h-[190px] sm:text-[30px] sm:hover:text-[20px] sm:w-[250px] sm:h-[150px] hover:opacity-80 mx-5">
      {imgSrc && <img src={imgSrc} alt="Button icon" className="absolute h-full w-full object-cover -z-10 overflow-hidden rounded-md" />}
      {text}
    </button>
  );
};

export default SpecialButton;