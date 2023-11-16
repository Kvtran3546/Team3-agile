import React from 'react'
import { useState } from 'react';
import {Navbar} from '../components'
import {Form} from 'react-bootstrap';
import '../css/SubmitSpot.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Camera from '../assets/camera.png';


const abbreviations = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY',
    'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND',
    'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

function SubmitSpot() {
    const [selectedFile, setSelectedFile] = useState();
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();
    const handleChange = (event) => {
        const { name, value, type, files } = event.target;
        if (type === "file") {
            setSelectedFile(files[0]);
        } else {
            setInputs(values => ({...values, [name]: value}));
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(inputs)
        try {
            const response = await axios.post('http://localhost:3000/listings/submitspot', {
                title: inputs.title,
                address: inputs.address,
                city: inputs.city,
                state : inputs.state,
                description: inputs.description,
                imageURL: inputs.imageURL
            });
            navigate('/home');
        } catch (error) {
            console.error('Error during submission:', error.response ? error.response.data : error.message);
        }
    }

    return (
        <>
            <div className='submitContainer'>
                <form onSubmit={handleSubmit} >
                    <input
                        className='fieldInput'
                        placeholder='Location Title'
                        type="text" 
                        name="title" 
                        value={inputs.title || ""} 
                        onChange={handleChange}
                    />
                    <input
                        className='fieldInput'
                        placeholder='Street Address'
                        type="text" 
                        name="address" 
                        value={inputs.address || ""} 
                        onChange={handleChange}
                    />
                    <div className='cityState'>
                        <input
                            className='fieldInput'
                            placeholder='City'
                            type="text" 
                            name="city"
                            value={inputs.city || ""} 
                            onChange={handleChange}
                        />
                        <label>___</label>
                        <select
                            className='fieldInput'
                            name='state'
                            onChange={handleChange}
                        >
                            {abbreviations.map((item) => <option value={item} key={item}>{item}</option>)}
                        </select>
                    </div>
                    <textarea
                        rows={7}
                        className='fieldInput'
                        placeholder='Description'
                        type="text"
                        name="description" 
                        value={inputs.description || ""} 
                        onChange={handleChange}
                    />
                    <input className='submitButton' name='image'  type='file' onChange={handleChange}/>
                    <button className='submitButton' onClick={handleSubmit}>Submit</button>
                    
                </form>
            </div>
        </>
    );
}

export default SubmitSpot;