const express = require("express");
const router = express.Router();
const data = require("../data");
const listings = data.listings;
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // specify the folder
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });



router
  .route('/submitspot')
  .post(upload.array('images', 5), async (req, res) => {
    try{
      console.log('Uploading');
      let info = req.body;
      console.log(req.files);
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
        images.map(file => file.path) // Assuming you're storing paths or URLs
      );
      console.log(output);
      if (output == null){
        res.status(500).json({error: "Internal Server Error"});
        return;
      }
      res.json(output);
    } catch (e) {
      console.error('Error in post submission:', e);
      res.status(400).json({error: e});
    }
  })

router
  .route("/submitspot")
  .get(async (req, res) => {
    //code here for POST
    try{
        const all_listings = await listings.getAll();
      if (all_listings == null){
        res.status(500).json({error: "Internal Server Error"});
        return;
      }
      delete output.password;
      res.json(output);
    } catch (e) {
      res.status(400).json({error: e});
    }
  })
 

module.exports = router;
