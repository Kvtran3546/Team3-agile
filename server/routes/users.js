const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const data = require("../data");
const users = data.users;

const verifyUser = (req, res, next) => {
  console.log("Cookies received:", req.cookies);
  const token = req.cookies.token;
  if (!token) {
    res.status(400).json({ error: "You are not authenticated" });
    return;
  } else {
    jwt.verify(token, "Town_Treasures_Key", (err, decoded) => {
      if (err) {
        res.status(400).json({ error: "Not correct token" });
        return;
      } else {
        req.name = decoded.name;
        next();
      }
    });
  }
};

router.get("/", verifyUser, (req, res) => {
  return res.json({ Status: "Success", name: req.name });
});

router.route("/register").post(async (req, res) => {
  try {
    let info = req.body;
    if (!info.email) throw "There needs to be an email";
    if (!info.username) throw "There needs to be a username";
    if (!info.password) throw "There needs to be a password";

    let output = await users.createUser(info.email, info.username, info.password);
    if (output == null) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    const name = output.username;
    const token = jwt.sign({ name }, "Town_Treasures_Key", { expiresIn: "1d" });
    res.cookie("token", token, {
      maxAge: 60 * 60 * 24 * 1000, // 1 day
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: 'none' // or 'Lax'/'Strict' based on your requirement
    });

    delete output.password;
    res.status(200).json({ message: "Registered successfully", user: name });
  } catch (e) {
    res.status(400).json({ error: e });
  }
});


router.route("/login").post(async (req, res) => {
  try {
    let info = req.body;
    if (!info.username) throw "There needs to be an email or username";
    if (!info.password) throw "There needs to be a password";
    let output = await users.checkLogin(info.username, info.password);
    if (output == null) {
      res.status(500).json({ error: "Internal Server Error" });
    }
    const name = output.username;
    const token = jwt.sign({ name }, "Town_Treasures_Key", { expiresIn: "1d" });
    console.log(token);
    res.cookie("token", token, {
      maxAge: 60 * 60 * 24 * 1000,
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: 'none'
    });
    delete output.password;
    return res
      .status(200)
      .json({ message: "Logged in successfully", user: name });
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

router.post("/logout", async (req, res) => {
  try {
    // Clear the authentication token
    res.cookie("token", "", {
      maxAge: 0, // Expire immediately
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: 'none' // or 'Lax'/'Strict' based on your requirement
    });

    res.json({ message: "You have been logged out" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
