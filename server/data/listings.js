// import {listings} from '../config/mongoCollections.js';
// import {ObjectId} from 'mongodb';
//import * as helpers from '../../src/helpers.js';
const mongoCollections = require("../config/mongoCollections");
const listings = mongoCollections.listings;
const {ObjectId} = require("mongodb");
const helpers = require("../helpers.js");
const fs = require("fs").promises;

async function isValidFilePath(path) {
	try {
	  await fs.access(path);
	  return true; // The file exists
	} catch {
	  return false; // The file does not exist
	}
  }

const createPost = async (title, address, city, state, description, imagePaths) => {
	console.log("got in");
	title = helpers.isValidString(title, "Title");
	address = helpers.isValidString(address, "Address");
	city = helpers.isValidString(city, "City");
	state = helpers.isValidString(state, "State");
	description = helpers.isValidString(description, "Description");
	
	// Check if imageURLs is an array and validate each URL
	if (!Array.isArray(imagePaths)) {
		throw new Error("imagePaths must be an array");
	  }
	
	  // Validate each file path
	  for (const path of imagePaths) {
		const exists = await isValidFilePath(path);
		if (!exists) {
		  throw new Error(`File does not exist at path: ${path}`);
		}
	  }
	let newListing = {
	  title: title,
	  address: address,
	  city: city,
	  state: state,
	  description: description,
	  imagePaths: imagePaths, // Store as an array
	};
	console.log(newListing);
	const listingsCollection = await listings();
	const insertInfo = await listingsCollection.insertOne(newListing);
	if (!insertInfo.acknowledged || !insertInfo.insertedId) {
	  throw new Error("Error: unable to add listing.");
	}
	const newId = insertInfo.insertedId.toString();
	const listing = await get(newId);
	return listing;
  };
  
  function isValidURL(url) {
	try {
	  new URL(url);
	  return true;
	} catch (e) {
	  return false;
	}
  }

const getAll = async () => {
	const listingsCollection = await listings();
	let listingList = await listingsCollection.find({}, {}).toArray();
	if (!listingList) {throw new Error("Error: was unable to get all listings.")}
	listingList = listingList.map((element) => {
		element._id = element._id.toString();
		return element;
	});
	return listingList;
};

const get = async (id) => {
	id = helpers.isValidString(id);
	if (!ObjectId.isValid(id)) {throw new Error("Error: invalid object ID.")}
    const listingsCollection = await listings();
    const listing = await listingsCollection.findOne({_id: new ObjectId(id)});
    if (listing === null) {throw new Error("Error: there is no listing with that id.")}
    listing._id = listing._id.toString();
    return listing;
};

const remove = async (id) => {
	id = helpers.isValidString(id);
	if (!ObjectId.isValid(id)) {throw new Error("Error: invalid object ID.")}
	const listingsCollection = await listings();
	const deletionInfo = await listingsCollection.findOneAndDelete({_id: new ObjectId(id)});
	if (deletionInfo.lastErrorObject.n === 0) {throw new Error(`Error: was unable to delete listing with id of ${id}.`)}
	return `${deletionInfo.value.name} has been successfully deleted!`;
};

const update = async (id, updatedInfo) => {
	id = helpers.isValidString(id);
	if (!ObjectId.isValid(id)) {throw new Error("Error: invalid object ID.")}
	const updatedListingInfo = {};
	const oldListingInfo = await get(id)
	let changes = 0;
	if (updatedInfo.title) {
		updatedListingInfo.title = helpers.isValidString(updatedInfo.title, "Title");
		if (updatedListingInfo.title != oldListingInfo.title) {
			changes++;
		}
	}
    if (updatedInfo.address) {
		updatedListingInfo.address = helpers.isValidString(updatedInfo.address, "Address");
		if (updatedListingInfo.address != oldListingInfo.address) {
			changes++;
		}
	}
    if (updatedInfo.city) {
		updatedListingInfo.city = helpers.isValidString(updatedInfo.city, "City");
		if (updatedListingInfo.city != oldListingInfo.city) {
			changes++;
		}
	}
    if (updatedInfo.state) {
		updatedListingInfo.state = helpers.isValidString(updatedInfo.state, "State");
		if (updatedListingInfo.title != oldListingInfo.title) {
			changes++;
		}
	}
    if (updatedInfo.description) {
		updatedListingInfo.description = helpers.isValidString(updatedInfo.description, "Description");
		if (updatedListingInfo.description != oldListingInfo.description) {
			changes++;
		}
	}
    if (updatedInfo.imageURL) {
		updatedListingInfo.imageURL = helpers.isValidString(updatedInfo.imageURL, "Image URL");
		if (updatedListingInfo.imageURL != oldListingInfo.imageURL) {
			changes++;
		}
	}
	
	if (changes == 0) {
		throw new Error("Error: the new recipe did not make any changes.")
	}
	const listingsCollection = await listings();
	const updatedListing = await listingsCollection.findOneAndUpdate(
		{_id: new ObjectId(id)},
		{$set: updatedListingInfo},
		{returnDocument: 'after'})
	if (updatedListing.lastErrorObject.n === 0) {throw new Error("Error: unable to update the listing info.")}
	updatedListing.value._id = updatedListing.value._id.toString();
		return updatedListing.value;
};

module.exports = {
	createPost,
	getAll,
	get,
	remove,
	update
}