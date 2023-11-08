import React from 'react';

const SpecialButton = ({ text, imgSrc }) => {
  return (
    <button className="relative flex items-center justify-center text-white font-bold rounded-md lg:text-[65px] lg:w-[400px] lg:h-[230px] md:text-[50px] md:w-[300px] mg:h-[190px] sm:text-[40px] sm:w-[250px] sm:h-[150px] hover:opacity-80 mx-5">
      {imgSrc && <img src={imgSrc} alt="Button icon" className="absolute h-full w-full object-cover -z-10 overflow-hidden rounded-md" />}
      {text}
    </button>
  );
};

export default SpecialButton;