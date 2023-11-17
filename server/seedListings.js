/*******************************************************************************
 * Name        : seed.js
 * Author      : Brandon Leung
 * Date        : July 17, 2023
 * Description : Database seed function implementation.
 ******************************************************************************/
const { dbConnection, closeConnection } = require('./config/mongoConnection.js');
const listings = require('./data/listings.js');
const users = require('./data/users.js');

const seedListings = async () => {
    const db = await dbConnection();
    await db.dropDatabase();
    const listing1 = await listings.createPost("Kura", "2151 Lemoine Ave", "Fort Lee", "NJ", "Revolving Sushi Bar Restaurant Originating From Japan and Now In North America. Our hand-made sushi makes its way around the restaurant on a conveyor belt.", "https://nyfoodiefamily.com/wp-content/uploads/2023/01/Kura-Revolving-Sushi.jpg");
    const listing2 = await listings.createPost("Jenkinson's Boardwalk", "300 Ocean Ave N", "Point Pleasant Beach", "NJ", "With several rides intended for small children, it’s a great place for a child’s first amusement park experience. At the southernmost end of our amusement park you will find our larger rides. Teenagers and kids at heart alike will be thrilled by rides like the Wave Swinger, Himalaya, and Tidal Wave.", "https://lh3.googleusercontent.com/p/AF1QipPoIzV84TJI5igl9GQROrU1uihdojBxxuyzgNae=s680-w680-h510");
    const listing3 = await listings.createPost("Stryker Airsoft", "2151 Lemoine Ave", "Fort Lee", "NJ", "Vast venue with a realistic layout offering airsoft games plus a pro shop with gear for sale & rent.", "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/52/9b/bb/stryker-airsoft.jpg?w=1200&h=-1&s=1");
    const listing4 = await listings.createPost("Rab's Country Lanes", "1600 Hylan Blvd", "Staten Island", "NY", "Bowling alley featuring 48 lanes, plus a snack bar with pizza & a laser maze.", "https://bowlatrabs.com/wp-content/uploads/2018/07/Rabs-Lanes-1024x494.png");
    const listing5 = await listings.createPost("Station 1 Books Vinyl and Vintage Shop", "1 Station Plaza", "Pompton Lakes", "NJ", "We’re an independent used bookstore and record shop. Located in a turn of the century train station (1 station plaza 07442), our main focus is on records and nonfiction books. Our vinyl selection is ever expanding and we stock new and used records. We primarily buy and sell books on Art, Military History, Metaphysical topics, Philosophy, Science and History. If you have books to sell, we are most interested in buying academic and scholarly books (including textbooks) and very focused collections. Email contact@njbookbuyer.com for more info.", "https://lh3.googleusercontent.com/p/AF1QipMMY7Eb7upmGo8pp77M-4LVOWc62vsrAlVf1oar=w1080-h608-p-no-v0");
    const listing6 = await listings.createPost("Shady Maple Smorgasbord", "129 Toddy Dr", "East Earl", "PA", "Shady Maple, where we make food fun, offers the largest Smorgasbord in the USA, a stellar Farm Market, and giant Gift Shop, learn more today.")
    
    
    console.log('Done seeding database');
    await closeConnection();
}

seedListings();