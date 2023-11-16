const express = require("express");
const router = express.Router();
const data = require("../data");
const users = data.users;

function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
      return next();
  } else {
      res.status(401).send('Not authorized');
  }
}


router.get('/',isAuthenticated,(req, res) => {
  res.send('Welcome to the Users API');
});

router
  .route('/register')
  .post(async (req, res) => {
    //code here for POST
    try{
      let info = req.body;
      if (!info.email) throw "There needs to be an email";
      if (!info.username) throw "There needs to be a username";
      if (!info.password) throw "There needs to be a password";
      let output = await users.createUser(info.email, info.username, info.password);
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
  .route('/login')
  .post(async (req, res) => {
    //code here for POST
    try{
      let info = req.body;
      if (req.session.user){
      	res.status(401).json({error: "You are already logged in"});
      	return;
      }
      if (!info.username) throw "There needs to be an email or username";
      if (!info.password) throw "There needs to be a password";
      let output = await users.checkLogin(info.username, info.password);
      if (output==null){
      	res.status(500).json({error: "Internal Server Error"});
      }
      req.session.user = output.username;
      req.session.userId = output._id;
      delete output.password;
      res.json({ message: "Logged in successfully", user: req.session.user });
    } catch (e){
      res.status(400).json({error: e});
    }
  })

  router.post('/logout', async (req, res) => {
    try {
        if (!req.session.user) {
            res.status(401).json({error: "You are not logged in"});
            return;
        }
        req.session.destroy((err) => {
            if (err) {
                res.status(500).send("Error logging out");
                return;
            }
            res.json({message: "You have been logged out"});
        });
    } catch(e) {
        res.status(500).json({error: e.message});
    }
});

module.exports = router;
