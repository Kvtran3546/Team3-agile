const express = require("express");
const router = express.Router();
const data = require("../data");
const listings = data.listings;
const multer = require("multer");
const jwt = require("jsonwebtoken");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // specify the folder
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

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

router
  .route('/submitspot')
  .post(verifyUser, upload.array('images', 5), async (req, res) => {
    try {
      console.log('Uploading');
      let info = req.body;
      const userID = req.userId;
      if (!userID) throw "User not authenticated";
      let images = req.files; // Array of images
      if (!info.title) throw "There needs to be a title";
      if (!info.address) throw "There needs to be an address";
      if (!info.city) throw "There needs to be a city";
      if (!info.state) throw "There needs to be a state";
      if (!info.description) throw "There needs to be a description";
      if (!images) throw "There needs to be images";
      let output = await listings.createPost(
        info.title,
        info.address,
        info.city,
        info.state,
        info.description,
        images.map(file => file.path), // Assuming you're storing paths or URLs
        userID
      );
      console.log(output);
      if (output == null) {
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json(output);
    } catch (e) {
      console.error('Error in post submission:', e);
      res.status(400).json({ error: e });
    }
  })

router
  .route('/submitreview')
  .post(verifyUser, async (req, res) => {
    try {
      console.log('Adding review');
      let info = req.body;
      if (!info.userId) throw "There needs to be a title";
      if (!info.postId) throw "There needs to be an address";
      if (!info.review) throw "There needs to be a city";
      const userId = info.userId;
      const postId = info.postId;
      const review = info.review;
      let output = await listings.addReview(postId, userId, review);
      console.log(output);
      if (output == null) {
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json(output);
    } catch (e) {
      console.error('Error in post submission:', e);
      res.status(400).json({ error: e });
    }
  })

router.get("/userposts", verifyUser, async (req, res) => {
  try {
    const userId = req.userId; // Get the user ID from the verified token
    console.log(userId);
    if (!userId) {
      throw new Error("User ID is not available");
    }
    const userPosts = await listings.getPostsByUserId(userId);
    console.log(userPosts);
    res.status(200).json(userPosts);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});


router
  .route("/spot")
  .get(async (req, res) => {
    try {
      const post = await listings.getPostById(req.params.id);
      res.status(200).json(post);
      return;
    } catch (e) {
      res.status(400).json({ error: e })
      return;
    }
  });


router
  .route("/listings")
  .get(async (req, res) => {
    //code here for POST
    try {
      const all_listings = await listings.getAll();
      if (all_listings == null) {
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json(all_listings);
    } catch (e) {
      res.status(400).json({ error: e });
    }
  })


module.exports = router;
