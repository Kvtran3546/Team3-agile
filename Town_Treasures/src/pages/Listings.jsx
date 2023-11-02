import React from 'react'
import ListingCard from '../components/ListingCard.jsx';

const Listings = () => {
    const listingData = [
        {
          image: 'https://www.mgmclaren.com/wp-content/uploads/2019/10/IMG_20191109_090710.jpg',
          title: 'Babbio Center',
          address: '123 Main St',
        },
        {
          image: 'https://cloudfront-us-east-1.images.arcpublishing.com/advancelocal/DZINJH4XMVGVRLQU6EQGNLW574.JPG',
          title: 'UCC Towers',
          address: '456 Elm St',
        },
        {
            image: 'https://www.trulia.com/pictures/thumbs_6/zillowstatic/fp/5cbeee298defb42954532fb6f774ca62-full.jpg',
            title: 'Old Apartment of Brandon',
            address: '805 Washington St',
        },
        {
            image: 'https://scontent-lga3-1.xx.fbcdn.net/v/t39.30808-6/302055401_408331531387955_90279840008017033_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=nJHhUd6X2okAX8RsoVb&_nc_ht=scontent-lga3-1.xx&oh=00_AfB3hSgIw3SdnISoXaIeHdnqTgRbxYZwa7tjfS2X6_GUEg&oe=65489945',
            title: 'Vitos Italian Deli',
            address: '804 Washington St... I think',
          }
    ]
    return (
        <div>
            <h1 className='text-black'>LISTINGS</h1>
            <div className="app">
                {listingData.map((data, index) => (
                <ListingCard key={index} {...data} />
                ))}
            </div>
        </div>
    )
}

export default Listings


