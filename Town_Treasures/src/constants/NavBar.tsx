//import React, { useState } from 'react';
// import { Navbar, Nav, Button } from 'react-bootstrap';
// import { Link, useHistory } from 'react-router-dom';
// import { useAuth } from "../contexts/AuthContext";
//import "../App.css";
//import axios from "axios";

const NavbarComponent = () => {
  //const [error, setError] = useState("")
  //const { currentUser, logout } = useAuth();
  //console.log(currentUser)

  // async function handleLogout() {
  //   setError("");
  //   try {
  //     await logout();
  //     await axios.post('http://localhost:3001/logout');
  //   } catch {
  //     setError("Failed to log out");
  //   }
  
  // }

  // const showProfile = () => {
  //   if (currentUser != null) {//user is signed in
  //     return (
  //       <div>
  //         <Button className="custom" style={{marginRight: "15px"}} variant="primary" as={Link} to="/profile">
  //           My profile
  //         </Button>
  //         <Button variant="outline-secondary" onClick={handleLogout}>
  //           Log Out
  //         </Button>
  //       </div>
  //     );
  //   }
  //   else {
  //     return (
  //       <div>
  //         <Button variant="outline-primary" className="outline-custom" as={Link} to="/signup">Sign up</Button>
  //         <Button variant="primary" as={Link} to="/login" className="ml-2 custom">Log in</Button>
  //       </div>)
  //   }
  // }

  // return (
  //   <Navbar bg="light" expand="lg">
  //     <Navbar.Brand as={Link} to="/">RecipEase</Navbar.Brand>
  //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
  //     <Navbar.Collapse id="basic-navbar-nav">
  //       <Nav className="mr-auto">
  //         <Nav.Link style={{color:"#727373"}} as={Link} to="/recipes">Home</Nav.Link>
  //         {currentUser &&
  //         <Nav.Link style={{color:"#727373"}} as={Link} to="/my-recipes">Explore</Nav.Link>
  //         }
  //         {currentUser &&
  //         <Nav.Link style={{color:"#727373"}} as={Link} to="/my-likes">My Locations</Nav.Link>
  //         }
  //       </Nav>
  //       <Nav>
  //         {showProfile()}
  //       </Nav>
  //     </Navbar.Collapse>
  //   </Navbar>
  // )

  
  return (
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/login">Login</a></li>
        <li><a href="/signup">Sign Up</a></li>
        <li><a href="/logout">Logout</a></li>
      </ul>
    </nav>
  );
  
}

export default NavbarComponent;
