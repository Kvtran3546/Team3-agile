import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
const ContactUs = () => {
  const [auth, setAuth] = useState(false);
  const [message, setErrorMessage] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  useEffect(() =>  {
    console.log('Component mounted or updated');
    const response = axios.get('http://localhost:3000/users/',{ withCredentials: true })
      .then(res => {
        if(res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.name);
        } else {
          setAuth(false);
          setErrorMessage(res.data.error);
          navigate('/login');
        }
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
        setErrorMessage("Error fetching data");
        navigate('/login');
      });
      // Include navigate in the dependency array to ensure useEffect is aware of it
    }, [navigate]);
  return (
    <div>
        <h1 className='text-black'>Contact Us</h1>
    </div>
  )
}

export default ContactUs