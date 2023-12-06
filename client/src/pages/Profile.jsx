import  '../css/Profile.css';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitButton, ListingCard } from "../components";
import axios from "axios";
import React, {useEffect, useState} from 'react'


export default function Profile() {
    const navigate = useNavigate(); // Initialize useNavigate
    const [auth, setAuth] = useState(false);
    const [message, setErrorMessage] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState('');
    const [joinedDate, setJoinedDate] = useState('');
    const [userPosts, setUserPosts] = useState([]);
    const BACKEND_URL = 'http://localhost:3000/';
    function formatDate(isoDateString) {
        const date = new Date(isoDateString);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    }
    useEffect(() =>  {
        axios.get('http://localhost:3000/users/',{ withCredentials: true })
        .then(res => {
            if(res.data.Status === "Success") {
            setAuth(true);
            setName(res.data.name);
            setEmail(res.data.email);
            setUserId(res.data.userId);
            setJoinedDate(formatDate(res.data.userDate));
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
        axios.get('http://localhost:3000/listings/userposts', { withCredentials: true })
        .then(res => {
            setUserPosts(res.data); // Update state with fetched posts
        })
        .catch(error => {
            console.error("Error fetching user posts: ", error);
            setErrorMessage("Error fetching user posts");
        });
        // Include navigate in the dependency array to ensure useEffect is aware of it
    }, [navigate]);
    const handleSubmit = async () => {
        try {
            await axios.post('http://localhost:3000/users/logout'); // Replace with your server URL
            // Redirect to home or login page after successful logout
            navigate('/login'); // Update this to the path you want to redirect to after logout
        } catch (error) {
            console.error('Logout failed:', error.response ? error.response.data : error.message);
        }
    };
    return (<div style={{flexDirection : "row", display : "flex"}}>
        <div className="profileContainer pb-10">
            <div className="profileInfoContainer">
                <img className="profileImage" src={"https://tr.rbxcdn.com/38c6edcb50633730ff4cf39ac8859840/420/420/Hat/Png"}/>
                <h1>{name || 'username'}</h1>
                <text style={{fontSize : 10}}>{"Joined Date : " + joinedDate || 'Joined Date'}</text>
                <button className="editProfileButton">Edit Profile</button>
            </div>
            <div className="linkList">
                <h1 className="header">History</h1>
                <ul>
                    <li><Link to={`/profile/recently_viewed`}>Recently Viewed</Link></li>
                    <li><Link to={`/profile/logs`}>Logs</Link></li>
                    <li><Link to={`/profile/drafts`}>Drafts</Link></li>
                </ul>
            </div>
            <div className="linkList mb-10">
                <h1 className="header">Friends</h1>
                <ul>
                    <li><Link to={`/profile/view_friends`}>View Friends</Link></li>
                    <li><Link to={`/profile/find_friends`}>Find Friends</Link></li>
                </ul>
            </div>
            <button className="editProfileButton" onClick={handleSubmit}>Log out</button>
        </div>
        <div className="contentDisplayContainer">
            <div className="contentDisplay">
                <h1 className="contentHeader">Recently Viewed</h1>
                <hr/>
                <div className="contentDisplayContent">
                    <text>You have no recently viewed spots.</text>
                </div>
            </div>

            <div className="contentDisplay flex flex-col h-fit">
                <h1 className="contentHeader">My Spots</h1>
                <hr/>
                <div className="contentDisplayContent h-fit flex flex-col justify-center items-center w-full py-5">
                    {userPosts.length > 0 ? (
                        userPosts.map(post => (
                            <ListingCard
                                key={post._id} 
                                image={`${BACKEND_URL}${post.imagePaths[0].replace(/\\/g, '/')}`} // Assuming the first image in the array
                                title={post.title} 
                                address={post.address}
                                city = {post.city}
                                state = {post.state}
                                description={post.description}
                            />
                        ))
                    ) : (
                        <text>You have no uploads.</text>
                    )}
                </div>
                <SubmitButton />
            </div>
        </div>
    </div>);
}
