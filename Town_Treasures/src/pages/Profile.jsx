import React from "react";
import  '../css/Profile.css';
import { Link } from 'react-router-dom';

export default function Profile() {
    return (<div style={{flexDirection : "row", display : "flex"}}>
        <div className="profileContainer">
            <div className="profileInfoContainer">
                <img className="profileImage" src={"https://tr.rbxcdn.com/38c6edcb50633730ff4cf39ac8859840/420/420/Hat/Png"}/>
                <h1>username</h1>
                <text style={{fontSize : 10}}>Joined 10/28/2023</text>
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
            <div className="linkList">
                <h1 className="header">Friends</h1>
                <ul>
                    <li><Link to={`/profile/view_friends`}>View Friends</Link></li>
                    <li><Link to={`/profile/find_friends`}>Find Friends</Link></li>
                </ul>
            </div>
        </div>
        <div className="contentDisplayContainer">
            <div className="contentDisplay">
                <h1 className="contentHeader">Recently Viewed</h1>
                <hr/>
                <div className="contentDisplayContent">
                    <text>You have no recently viewed spots.</text>
                </div>
            </div>

            <div className="contentDisplay">
                <h1 className="contentHeader">Latest Activity</h1>
                <hr/>
                <div className="contentDisplayContent">
                    <text>You have no recent activities.</text>
                </div>
                <button className="editProfileButton">Submit a Post</button>
            </div>

        </div>
    </div>);
}
