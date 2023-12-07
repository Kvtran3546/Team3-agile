const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const data = require("../data");
const users = data.users;
const multer = require('multer');

const verifyUser = (req, res, next) => {
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
        req.userId = decoded.id;
        req.email = decoded.email;
        req.userDate = decoded.userDate;
        next();
      }
    });
  }
};

router.get("/", verifyUser, (req, res) => {
  return res.json({
    Status: "Success",
    name: req.name,
    email: req.email,
    userId: req.userId,
    userDate: req.userDate,
  });
});

router.route("/register").post(async (req, res) => {
  try {
    let info = req.body;
    if (!info.email) throw "There needs to be an email";
    if (!info.username) throw "There needs to be a username";
    if (!info.password) throw "There needs to be a password";

    let output = await users.createUser(
      info.email,
      info.username,
      info.password
    );
    if (output == null) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    const name = output.username;
    const token = jwt.sign(
      {
        name,
        id: output._id,
        email: output.email,
        userDate: output.created_at,
      },
      "Town_Treasures_Key",
      { expiresIn: "1d" }
    );
    res.cookie("token", token, {
      maxAge: 60 * 60 * 24 * 1000, // 1 day
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "none", // or 'Lax'/'Strict' based on your requirement
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
    const name = info.username;
    const token = jwt.sign(
      {
        name,
        id: output._id,
        email: output.email,
        userDate: output.created_at,
      },
      "Town_Treasures_Key",
      { expiresIn: "1d" }
    );
    res.cookie("token", token, {
      maxAge: 60 * 60 * 24 * 1000,
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "none",
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
      sameSite: "none", // or 'Lax'/'Strict' based on your requirement
    });

    res.json({ message: "You have been logged out" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.patch("/profile/edit", verifyUser, async (req, res) => {
  try {
    let info = req.body;
    if (!info.newName) throw "There needs to be a new name";
    const user = await users.editUser(req.userId, info.newName);
    const updatedToken = jwt.sign(
      {
        name: info.newName,
        id: req.userId,
        email: req.email,
        userDate: req.userDate
      },
      "Town_Treasures_Key",
      { expiresIn: "1d" }
    );

    // Set the new token in the response
    res.cookie("token", updatedToken, {
      maxAge: 60 * 60 * 24 * 1000,
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "none"
    });
    res.status(200).json({ message: "Edit Successfully" });
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

// router.post('/updateProfileImage', upload.single('profileImage'), async (req, res) => {
//   try {
//       // req.file contains information about the uploaded file
//       // Update the user's profile image in the database using req.file.path
//       res.status(200).json({ message: 'Profile image updated successfully' });
//   } catch (error) {
//       res.status(500).json({ error: error.message });
//   }
// });

module.exports = router;
