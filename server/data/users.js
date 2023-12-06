const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const helpers = require("../helpers.js");
const bcrypt = require("bcryptjs");
const saltRounds = 12;

const createUser = async (
  email, username, password
) => {
  console.log("Creating user", email, username, password);
  if (!email) throw "There needst to be an email address";
  if (!username) throw "There needs to be a username";
  if (!password) throw "There needs to be a password";
  if (typeof(username)!=="string") throw "Username needs to of type string";
  console.log("checking email");
  if(helpers.validateEmail(email) == null) throw "Invalid email address";
  console.log("email is valid")
  username = username.trim();
  if (username.length<4) throw "Username needs to have at least 4 characters";
  for (let i=0;i<username.length;i++){
    if (!((username[i]>='A' && username[i]<='Z') || (username[i]>='a' && username[i]<='z') || (username[i]>=0 && username[i]<=9))  || username[i]==" "){
      throw "Username can only have alphanumeric characters and no spaces"
    }
  }
  username = username.toLowerCase();
  if (password.length<6) throw "Password needs to have at least 6 characters";
  let uppercase = false;
  let number = false;
  let special = false;
  for (let i=0;i<password.length;i++){
    if (password[i]==" ") throw "Password cannot have spaces";
    if (password[i]>='A' && password[i]<='Z') uppercase = true;
    if (password[i]>=0 && password[i]<=9) number = true;
    if (password[i]=='!' || password[i]=='@' || password[i]=='#' || password[i]=='$' || password[i]=='%' || password[i]=='^' || password[i]=='&' || password[i]=='*' || password[i]=='(' || password[i]==')' || password[i]==',' || password[i]=='!' || password[i]=='.' || password[i]=="'" || password[i]=='"' || password[i]=='?') special = true;
  }
  if (uppercase==false) throw "Password needs to have an uppercase letter";
  if (number==false) throw "Password needs to have a number";
  if (special==false) throw "Password needs to have a special character";
  console.log("Validate parameters successfully");
  try{
  const userCollection = await users();
  let user = await userCollection.findOne({username: username});
  if (user!=null) throw "Username already exists!";
  const user_email = await userCollection.findOne({email: email});
  if (user_email!=null) throw "Account with this email already exists!";
  console.log("New account available");
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  let newUser = {
    email : email,
    username: username,
    password: hashedPassword,
    created_at: new Date()
  };
  const insertInfo = await userCollection.insertOne(newUser);
  if (!insertInfo.acknowledged || !insertInfo.insertedId){
    throw "Could not add user";
  }
  user = await userCollection.findOne({username: username});//which username is which?
  if (user===null) throw "Either the username or password is invalid";
  let comparison = await bcrypt.compare(password, user.password);
  if (comparison==false) throw "Either the username or password is invalid";
  return user;
}
catch(e){
  console.log(e);
}
 };

const checkUser = async (email, username, password) => {
  if (!email) throw "There needs to be an email address"
  if (!username) throw "There needs to be a username";
  if (!password) throw "There needs to be a password";
  if (typeof(username)!=="string") throw "Username needs to of type string";
  username = username.trim();
  if (username.length<4) throw "Username needs to have at least 4 characters";
  if(validateEmail(email)) throw "Invalid email address";
  for (let i=0;i<username.length;i++){
    if (!((username[i]>='A' && username[i]<='Z') || (username[i]>='a' && username[i]<='z') || (username[i]>=0 && username[i]<=9))  || username[i]==" "){
      throw "Username can only have alphanumeric characters and no spaces"
    }
  }
  username = username.toLowerCase();
  if (password.length<6) throw "Password needs to have at least 6 characters";
  let uppercase = false;
  let number = false;
  let special = false;
  for (let i=0;i<password.length;i++){
    if (password[i]==" ") throw "Password cannot have spaces";
    if (password[i]>='A' && password[i]<='Z') uppercase = true;
    if (password[i]>=0 && password[i]<=9) number = true;
    if (password[i]=='!' || password[i]=='@' || password[i]=='#' || password[i]=='$' || password[i]=='%' || password[i]=='^' || password[i]=='&' || password[i]=='*' || password[i]=='(' || password[i]==')' || password[i]==',' || password[i]=='!' || password[i]=='.' || password[i]=="'" || password[i]=='"' || password[i]=='?') special = true;
  }
  if (uppercase==false) throw "Password needs to have an uppercase letter";
  if (number==false) throw "Password needs to have a number";
  if (special==false) throw "Password needs to have a special character";

  const userCollection = await users();
  const user = await userCollection.findOne({username: username});//which username is which?
  if (user===null) throw "Either the username or password is invalid";
  let comparison = await bcrypt.compare(password, user.password);
  if (comparison==false) throw "Either the username or password is invalid";
  const user_email = await userCollection.findOne({email: email});
  if (user_email===null) throw "Either the username or password is invalid";
  comparison = await bcrypt.compare(password, user_email.password);
  if (comparison==false) throw "Either the username or password is invalid";
  return {authenticatedUser: true};
 };

 const checkLogin = async (username, password) => {
  if (!username) throw "There needs to be a username";
  if (!password) throw "There needs to be a password";
  if (typeof(username)!=="string") throw "Username needs to of type string";
  username = username.trim();
  if (username.length<4) throw "Username needs to have at least 4 characters";
  for (let i=0;i<username.length;i++){
    if (!((username[i]>='A' && username[i]<='Z') || (username[i]>='a' && username[i]<='z') || (username[i]>=0 && username[i]<=9))  || username[i]==" "){
      throw "Username can only have alphanumeric characters and no spaces"
    }
  }
  username = username.toLowerCase();
  if (password.length<6) throw "Password needs to have at least 6 characters";
  let uppercase = false;
  let number = false;
  let special = false;
  for (let i=0;i<password.length;i++){
    if (password[i]==" ") throw "Password cannot have spaces";
    if (password[i]>='A' && password[i]<='Z') uppercase = true;
    if (password[i]>=0 && password[i]<=9) number = true;
    if (password[i]=='!' || password[i]=='@' || password[i]=='#' || password[i]=='$' || password[i]=='%' || password[i]=='^' || password[i]=='&' || password[i]=='*' || password[i]=='(' || password[i]==')' || password[i]==',' || password[i]=='!' || password[i]=='.' || password[i]=="'" || password[i]=='"' || password[i]=='?') special = true;
  }
  if (uppercase==false) throw "Password needs to have an uppercase letter";
  if (number==false) throw "Password needs to have a number";
  if (special==false) throw "Password needs to have a special character";

  const userCollection = await users();
  const user = await userCollection.findOne({username: username});//which username is which?
  if (user===null) throw "Either the username or password is invalid";
  let comparison = await bcrypt.compare(password, user.password);
  if (comparison==false) throw "Either the username or password is invalid";
  return user;
 };

const getUserByID = async (id) => {
  if (!id) throw "ID parameter is required";

  // Converting the id from string to ObjectId if necessary
  let objectId;
  try {
    objectId = new require('mongodb').ObjectId(id);
  } catch (error) {
    throw "Invalid ID format";
  }

  const userCollection = await users();
  const user = await userCollection.findOne({ _id: objectId });
  if (!user) throw "No user found with the given ID";

  return user;
}
const editUser = async (id, newName) => {
  if (!id) throw "ID parameter is required";
  if (!newName) throw "New name parameter is required";
  if (typeof newName !== "string") throw "New name must be a string";

  // Converting the id from string to ObjectId if necessary
  let objectId;
  try {
    objectId = new require('mongodb').ObjectId(id);
  } catch (error) {
    throw "Invalid ID format";
  }

  const userCollection = await users();
  const updateResult = await userCollection.updateOne(
    { _id: objectId },
    { $set: { name: newName } }
  );

  if (updateResult.matchedCount === 0) throw "No user found with the given ID";
  if (updateResult.modifiedCount === 0) throw "User data not updated";

  return { userUpdated: true };
}

module.exports = {
  editUser,
  getUserByID,
  createUser,
  checkUser,
  checkLogin,
};
