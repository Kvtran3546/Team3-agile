import "../css/EditProfile.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

function EditProfile() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [auth, setAuth] = useState(false);
    const navigate = useNavigate();
    useEffect(() =>  {
        axios.get('http://localhost:3000/users/',{ withCredentials: true })
        .then(res => {
            if(res.data.Status === "Success") {
            setAuth(true);
            setUsername(res.data.name);
            setPassword(res.data.password);
            } else {
            setAuth(false);
            navigate('/login');
            }
        })
        .catch(error => {
            console.error("Error fetching data: ", error);
            setErrorMessage("Error fetching data");
            navigate('/login');
        });
    }, [navigate]);

    return (
        <div>
            <input type="text" value="" />
        </div>
    );
}

export default EditProfile;