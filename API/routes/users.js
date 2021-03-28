const router = require('express').Router();
const mongoose = require('mongoose');
const { db } = require('../models/user.model');
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

//get user by id
router.get('/:id', function(req,res){
  User.findOne({_id:req.params.id})
  .then(user=>res.json(user))
  .catch(err=> res.status(400).json('Error: ' + err))
});

//add friend
router.post('/addFriend', function(req,res){
  User.findOneAndUpdate(
    {_id:req.body.currId},
    {$push:{"friends": req.body.friendId}},
    function(error, success){
      if (error){
        console.log(error);
      }else{
        console.log(success);
      }
    }
  )
  .then(res.status(200).json('Friend Added'))
  .catch(res.status(400).json('Error: ' + err))
});

router.get('/getFriends/:id', function(req,res){
  User.findOne({_id:req.params.id})
  .populate("friends").exec(
  function(error, user){
    if (error){
      res.status(400).json('Error: ' + err);
    }
    else if (user){
      res.status(200).send(user.friends);
    }
    else{
      res.status(400).json('User Not Found');
    }
  })
});


module.exports = router;