const express = require("express");
const router = express.Router();
const data = require("../data");
const listings = data.listings;

function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
      return next();
  } else {
      res.status(401).send('Not authorized');
  }
}

router.get('/',isAuthenticated,(req, res) => {
  res.send('Welcome to the Listings API');
});


router
  .route('/submitspot')
  .post(async (req, res) => {
    try{
      let info = req.body;
      if (!info.title) throw "There needs to be a title";
      if (!info.address) throw "There needs to be an address";
      if (!info.city) throw "There needs to be a city";
      if (!info.state) throw "There needs to be a state";
      if (!info.description) throw "There needs to be a description";
      if (!info.imageUrl) throw "There needs to be images";
      let output = await listings.createPost(info.title, info.address, info.city, info.state, info.description, info.imageUrl);
      if (output == null){
        res.status(500).json({error: "Internal Server Error"});
        return;
      }
      delete output.password;
      res.json(output);
    } catch (e) {
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
