//import {ObjectId} from 'mongodb';
const ObjectId = require("mongodb");

const isValidString = (arg, argName) => { // Universal
    if (!isValidString) {throw new Error(`Error: the ${argName} parameter does not exist.`)}
    if (typeof arg === "undefined" || !arg) {throw new Error(`Error: the ${argName} parameter is undefined.`)}
    if (typeof arg !== "string") {throw new Error(`Error: the ${argName} parameter is not a valid string.`)}
    if (arg.trim() == "") {throw new Error(`Error: the ${argName} parameter consists of only white space.`)}
    arg = arg.trim();
    arg = arg.replace(/\s+/g, ' ');
    return arg
}

const isAlphanumericString = (arg, argName) => {
    arg = isValidString(arg, argName);
    if (arg.match(/^[a-zA-Z0-9]+$/) === null) {
        throw new Error(`Error: the ${argName} parameter contains a non-alphanumeric character.`)
    } else {
        return arg;
    }
}

const isValidPassword = (arg, argName) => {
    arg = isValidString(arg, argName)
    if (/[A-Z]/.test(arg) == false) {throw new Error("Error: does not contain uppercase letters.")}
    if (/[a-z]/.test(arg) == false) {throw new Error("Error: does not contain lowercase letters.")}
    if (/\d/.test(arg) == false) {throw new Error("Error: does not contain numbers.")}
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(arg) == false) {throw new Error("Error: does not contain special characters.")};
    return arg;
}

const isValidBoolean = (arg, argName) => {
    if (typeof arg !== "boolean") {
        throw new Error(`Error: the ${argName} parameter is not a boolean.`);
    } 
}

const isValidNumber = (arg, argName) => {
    if (isNaN(arg)) {throw new Error(`Error: the ${argName} parameter is not a valid number.`)}
}


const isValidObj = (arg, argName) => {
    if (arg !== null && typeof arg !== 'object') {
        throw new Error(`Error: the ${argName} parameter is not a valid object.`)
    }
}

const isValidID = (arg, argName) => {
    arg = isValidString(arg);
    arg = arg.trim()
    if (!ObjectId.isValid(arg)) {throw new Error(`Error: the ${argName} parameter is not a valid ID.`)}
    return arg;
}

const isValidArray = (arg, argName) => { // Universal
    if (!arg) {throw new Error(`Error: the ${argName} parameter does not exist.`)}
    if (typeof arg === "undefined") {throw new Error(`Error: the ${argName} is undefined.`)}
    if (Array.isArray(arg) == false) {throw new Error(`Error: the ${argName} is not a valid array`)}
    if (arg.length == 0) {throw new Error(`Error: the ${argName} parameter is an empty array.`)}
}


const isRegistered = async (req) => {
    await teachers.emailExists(req.oidc.user.email)
    if (await teachers.emailExists(req.oidc.user.email) == false) {
        return false;
    } else {
        return true;
    }
}
const convertDate = (arg) => {
    arg = isValidString(arg);
    let date = arg.split(" - ")
    date = date[0].split("/")
    const monthArr = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    const month = monthArr[parseInt(date[1]) - 1]
    const day = parseInt(date[2], 10).toString()
    const year = date[0]
    const result = month.concat(" ", day.concat(", ", year))
    return result
}  

const isValidRating = (arg) => { // Specific
    if (isNaN(arg)) {throw new Error("Error: rating is not a number.")}
    if ((arg.toString().length == 1 || arg.toString().length == 3) == false) {throw new Error("Error: invalid rating format.")}
    if (arg < 1 || arg > 5) {throw new Error("Error: the rating is invalid.")}
    if (arg % 1 != 0) {throw new Error("Error: the rating is invalid.")}
}
const validateEmail = (email) => {
    console.log("Validating email");
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

module.exports = {
    validateEmail,
    isValidString,
    isAlphanumericString,
    isValidPassword,
    isValidBoolean,
    isValidNumber,
    isValidObj,
    isValidID,
    isValidArray,
    isRegistered,
    convertDate,
    isValidRating
}
