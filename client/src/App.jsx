import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Home, Explore, Community, ContactUs, SubmitSpot, Profile, Login, Register} from './pages/';
import {Navbar} from './components';
import SearchBar from './components/SearchBar';
// ... import other pages as well

function App() {
  return (
    <div className='w-[100%]'>
      <Router className="w-full">
        <Navbar/>
        <Routes>
          <Route path="/explore" element={<Explore/>} />
          {/* Add routes for other pages similarly */}
          <Route path="/community" element={<Community />} />
          <Route path="/contactus" element={<ContactUs />} />
          {/* Default route, typically Home */}
          <Route path="/home" element={<Home />} />
          <Route path="/submitspot" element={<SubmitSpot />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
   
  );
}

export default App;
