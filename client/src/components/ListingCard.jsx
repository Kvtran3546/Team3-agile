import React from 'react';
import styles from '../styles';
import {Link} from 'react-router-dom';
const ListingCard = (data) => {
  const BACKEND_URL = 'http://localhost:3000/';
  const { images, title, address } = data;
  return (
    <div className='lg:w-[45%] md:w-[45%] w-[80%] flex flex-row md:mx-1 rounded-lg bg-white my-10 h-[250px]'>
        <div
            style={{
            width: '50%',
            height: '100%',
            overflow: 'hidden',
            borderTopLeftRadius: '4px',
            borderBottomLeftRadius: '4px',
            }}
        >
            <img src={`${BACKEND_URL}${images[0].replace(/\\/g, '/')}`} alt='model_img' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div className='flex flex-col justify-center items-center w-[50%] h-[100%]'>
          <Link to='../spot' state={data} 
            className={`${styles.heading2} text-[14px] font-semibold text-[#02874D] uppercase border-b-2 w-full flex justify-center items-center h-[50%]`} >{title}</Link>
          <p className={`${styles.paragraph} text-[14px] text-[#02874D] w-full h-[50%] flex justify-center items-center`}>{address}</p>
        </div>
    </div>
  );
}

export default ListingCard;