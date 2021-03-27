const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('../models/user.model');

router.post('/', function(req, res){
  const query = {
    "_id": new mongoose.Types.ObjectId(),
    "username": req.body.username,
    "password": req.body.password,
    "fname": req.body.fname,
    "lname": req.body.lname
  }
  const newUser = new User(query);
  newUser.save()
  .then(() => res.status(200).send("new user created"))
  .catch(err => res.status(400).json("Error: " + err))
});


router.get('/getUser', function(req,res){
  
});

module.exports = router;