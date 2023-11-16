import React from 'react';
import { listingData } from '../constants/index.js';
import '../css/SpotPage.css';

function starString(num, maxNum=5) {
    var filled = new Array(num + 1).join("★");
    var unfilled = new Array(maxNum - num + 1).join("☆");
    return filled.concat(unfilled);
}

function SpotPage(props) {
    const data = listingData[1];
    console.log(props);
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