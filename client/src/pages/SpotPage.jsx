import { listingData } from '../constants/index.js';
import '../css/SpotPage.css';
import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function starString(num, maxNum=5) {
    var filled = new Array(num + 1).join("★");
    var unfilled = new Array(maxNum - num + 1).join("☆");
    return filled.concat(unfilled);
}

function SpotPage() {
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
    const data = useLocation().state;
    return (
        <div className='flex flex-col w-full bg-[#E2E2E2] items-center'>
        <div className='container'>
            <h1 className='title_header'>{data.title}</h1>
            <hr/>
            <div className='image_info'>
                <img src={data.image}/>
                <p>
                    <b>Address:</b> {data.address}, {data.city}, {data.state}<br/>
                    <b>Description:</b> {data.description}
                </p>
            </div>
            <hr/>
            <div className='review_container'>
                <h1 className='title_header'>Reviews</h1>
                <span>{starString(3)}</span>
            </div>
        </div>
        </div>
    );
}

export default SpotPage;