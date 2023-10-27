import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Home, Explore, Community, ContactUs, SubmitSpot} from './pages/';
import {Navbar} from './components';
// ... import other pages as well

function App() {
  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/explore" element={<Explore/>} />
          {/* Add routes for other pages similarly */}
          <Route path="/community" element={<Community />} />
          <Route path="/contactus" element={<ContactUs />} />
          {/* Default route, typically Home */}
          <Route path="/home" element={<Home />} />
          <Route path="/submitspot" element={<SubmitSpot />} />
        </Routes>
      </Router>
    </div>
   
  );
}

export default App;
