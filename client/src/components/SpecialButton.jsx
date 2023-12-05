import React from "react";

const SpecialButton = ({ text, imgSrc }) => {
  return (
    <button className="relative flex items-center justify-center text-white hover:text-black transition-all duration-500 font-bold lg:text-[30px] lg:hover:text-[40px] lg:w-[400px] lg:h-[230px] md:text-[20px] md:hover:text-[30px] md:w-[300px] mg:h-[190px] sm:text-[25px] sm:hover:text-[20px] sm:w-[250px] sm:h-[150px] hover:opacity-80 mx-5">
      {imgSrc && (
        <img
          src={imgSrc}
          alt="Button icon"
          className="absolute h-full w-full object-fill -z-10 rounded-lg"
        />
      )}
      {text}
    </button>
  );
};

export default SpecialButton;
