import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../css/EditProfile.css";

function EditProfile() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState(''); // If you want to allow changing the email
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/users/', { withCredentials: true })
            .then(res => {
                if (res.data.Status === "Success") {
                    setUsername(res.data.name);
                    setEmail(res.data.email); // Assuming the email is part of the response
                } else {
                    navigate('/login');
                }
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
                navigate('/login');
            });
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send a patch request to update user information
            await axios.patch('http://localhost:3000/users/profile/edit', { newName: username}, { withCredentials: true });
            navigate('/profile');
            // Handle response or navigate to another page
        } catch (error) {
            console.error("Error updating profile: ", error);
            // Handle error
        }
    }

    return (
        <div className='submitContainer'>
            <form onSubmit={handleSubmit}>
                <input type="text" value={username} className='fieldInput' onChange={(e) => setUsername(e.target.value)} />
                <button type="submit" className='submitButton'>Save Changes</button>
            </form>
        </div>
    );
}

export default EditProfile;