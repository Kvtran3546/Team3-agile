import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navbar, SearchBar, SpecialButton } from "../components";
import { mainimg } from "../assets";
import { special_buttons } from "../constants";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true); // New loading state
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const handleSearch = (searchTerm) => {
    navigate(`/explore?search=${encodeURIComponent(searchTerm)}`);
  };
  useEffect(() => {
    axios
      .get("http://localhost:3000/users/", { withCredentials: true })
      .then((res) => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.name);
        } else {
          setAuth(false);
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        navigate("/login");
      })
      .finally(() => {
        setIsLoading(false); // Set loading to false once the check is complete
      });
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>; // Simple Loading Screen
  }
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <div className="relative flex flex-col justify-center items-center w-full py-10">
        <h1 className="z-10 lg:text-[60px] md:text-[40px] sm:text-[30px] text-white w-full text-center">
          Search for your new adventure here!
        </h1>
        <SearchBar onSearch={handleSearch} />
        <img
          src={mainimg}
          alt="natureimg"
          className="absolute w-full h-full overflow-hidden object-cover -z-10 opacity-[90%] grayscale-[10%]"
        />
      </div>
      <div className="flex flex-col justify-center items-center mt-10 w-[90%]">
        <h2 className="lg:text-[60px] text-gray-500 mb-10 md:text-[50px] sm:text-[40px] w-[100%] text-left">
          Quick Searches
        </h2>
        <div className="flex flex-row w-full justify-between">
          {special_buttons.map((item) => (
            <SpecialButton text={item.text} imgSrc={item.img} />
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-10 w-[90%]">
        <h2 className="lg:text-[60px] text-gray-500 mb-5 md:text-[50px] sm:text-[40px] w-[100%] text-left">
          Search for Nearby Spots
        </h2>
      </div>
    </div>
  );
};

export default Home;
