const express = require("express");
const router = express.Router();
const data = require("../data");
const users = data.users;

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
      res.json(output);
    } catch (e){
      res.status(400).json({error: e});
    }
  })

router
  .route('/logout')
  .get(async (req, res) => {
    //code here for GET
    try{
      if (!req.session.user){
        res.status(401).json({error: "You are already logged out"});
        return;
      }
      req.session.destroy();
      res.json({msg:"You have been logged out"});
    } catch(e){
      res.status(400);
    }
  })

module.exports = router;
