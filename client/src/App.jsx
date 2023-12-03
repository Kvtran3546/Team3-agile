import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import {
  Home,
  Explore,
  Community,
  ContactUs,
  SubmitSpot,
  Profile,
  Login,
  Register,
} from "./pages/";
import { Navbar } from "./components";
import SpotPage from "./pages/SpotPage";

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbarOn = ["/login", "/register"]; // Paths where Navbar should not be shown

  return (
    <div className="w-[100%]">
      {!hideNavbarOn.includes(location.pathname) && <Navbar />}
      {children}
    </div>
  );
};

function App() {
  return (
    <Router className="w-full">
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/explore"
          element={
            <Layout>
              <Explore />
            </Layout>
          }
        />
        <Route
          path="/community"
          element={
            <Layout>
              <Community />
            </Layout>
          }
        />
        <Route
          path="/contactus"
          element={
            <Layout>
              <ContactUs />
            </Layout>
          }
        />
        <Route
          path="/submitspot"
          element={
            <Layout>
              <SubmitSpot />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />
        <Route
          path="/spot"
          element={
            <Layout>
              <SpotPage />
            </Layout>
          }
        />
        {/* Login and Register without Navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
