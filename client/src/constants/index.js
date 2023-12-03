import { Home } from "../pages";
import { new_home, traditional, popular } from "../assets";
export const navLinks = [
    {
        id: "",
        title : "Home",
    },
    {
        id : "explore",
        title : 'Explore',
    },
    {
        id : "contactus",
        title : 'Contact Us',
    },
    {
        id : "profile",
        title : 'Profile',
    },
]

export const listingData = [
    {
        image: 'https://www.mgmclaren.com/wp-content/uploads/2019/10/IMG_20191109_090710.jpg',
        title: 'Babbio Center',
        address: '123 Main St',
        city: 'Hoboken',
        state: 'NJ',
        description: 'The Lawrence T. Babbio Jr. Center for Technology Management is a new, six-story, 95,000 SF, academic building situated above a four-story parking garage on the campus of Stevens Institute of Technology.'
    },
    {
        image: 'https://cloudfront-us-east-1.images.arcpublishing.com/advancelocal/DZINJH4XMVGVRLQU6EQGNLW574.JPG',
        title: 'UCC Towers',
        address: '456 Elm St',
        city: 'Hoboken',
        state: 'NJ',
        description: 'A dazzling new university center and residential towers are stellar additions to Hoboken\'s waterfront skyline, providing a vital new space and campus hub for student life and engagement at Stevens.'
    },
    {
        image: 'https://www.trulia.com/pictures/thumbs_6/zillowstatic/fp/5cbeee298defb42954532fb6f774ca62-full.jpg',
        title: 'Old Apartment of Brandon',
        address: '805 Washington St',
        city: 'Hoboken',
        state: 'NJ',
        description: '805 Washington Street is a House located in the Hoboken neighborhood in New Jersey, NY.'
    },
    {
        image: 'https://lh3.googleusercontent.com/p/AF1QipOf8uBSACBTb0zbxPiPrXLe92PitJeBZ0hwDvzL=s680-w680-h510',
        title: 'Vitos Italian Deli',
        address: '806 Washington St',
        city: 'Hoboken',
        state: 'NJ',
        description: 'Classic Italian deli offering sandwiches & salads, imported groceries & housemade mozzarella.'
    }
]

export const special_buttons = [
    {
        text: "New",
        img: new_home
    },
    {
        text: "Popular",
        img: popular
    },
    {
        text: "Traditional",
        img: traditional
    }
]