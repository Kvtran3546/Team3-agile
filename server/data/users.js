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
  const user = await userCollection.findOne({username: username});
  if (user!=null) throw "Username already exists!";
  const user_email = await userCollection.findOne({email: email});
  if (user_email!=null) throw "Account with this email already exists!";
  console.log("New account available");
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  let newUser = {
    email : email,
    username: username,
    password: hashedPassword
  };
  const insertInfo = await userCollection.insertOne(newUser);
  if (!insertInfo.acknowledged || !insertInfo.insertedId){
    throw "Could not add user";
  }

  return {userInserted: true};
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
  return {authenticatedUser: true};
 };

const getUserByID = async (id) => {
  
}

module.exports = {
  createUser,
  checkUser,
  checkLogin,
};
