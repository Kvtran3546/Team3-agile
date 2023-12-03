import '../css/SubmitSpot.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import React, {useEffect, useState} from 'react'

const abbreviations = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY',
    'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND',
    'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

function SubmitSpot() {
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
    const [selectedFile, setSelectedFile] = useState();
    const [inputs, setInputs] = useState({});
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
        console.log(inputs);
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