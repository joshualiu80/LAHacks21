const router = require('express').Router();
const mongoose = require('mongoose');
const { db } = require('../models/user.model');
const User = require('../models/user.model');
const ms = require('mediaserver');
const config = require('./../config');

// Create a new user
router.post('/', function (req, res) {
  // TODO: restrict image formats
  let profileImg = null;
  let fileName = null;

  if (req.files) {
    profileImg = req.files.file;
    const fileExtension = config.FILE_EXTENSION_PATTERN.exec(profileImg.name)[1];
    fileName = `${req.body.username}_profile.${fileExtension}`;
  }

  const query = {
    "_id": new mongoose.Types.ObjectId(),
    "username": req.body.username,
    "password": req.body.password,
    "fname": req.body.fname,
    "lname": req.body.lname,
    "profileImg": fileName
  }
  const newUser = new User(query);
  newUser.save()
    .then(() => {
      // Save profile image to server
      if (req.files) {
        profileImg.mv(
          `${config.PROFILE_FILE_LOCATION}/${fileName}`,
          (err) => {
            if (err) {
              return res.status(500).send(err);
            }

            res.status(201).json({
              file: fileName,
              _id: newUser._id
            });
          }
        );
      }
      else {
        res.status(201).json({ _id: newUser._id })
      }
    }).catch(err => res.status(400).json("Error: " + err));
});

//get user by id
router.get('/:id', function (req, res) {
  User.findOne({ _id: req.params.id })
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err))
});

//add friend
router.post('/addFriend', function (req, res) {
  User.findOneAndUpdate(
    { _id: req.body.currId },
    { $push: { "friends": req.body.friendId } },
    function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log(success);
      }
    }
  )
    .then(res.status(200).json('Friend Added'))
    .catch(res.status(400).json('Error: ' + err))
});

router.get('/getFriends/:id', function (req, res) {
  User.findOne({ _id: req.params.id })
    .populate("friends").exec(
      function (error, user) {
        if (error) {
          res.status(400).json('Error: ' + err);
        }
        else if (user) {
          res.status(200).send(user.friends);
        }
        else {
          res.status(400).json('User Not Found');
        }
      })
});

// Send a profile image
router.get('/profile/:id', (req, res, next) => {
  User.findById(req.params.id, 'profileImg', (err, user) => {
    if (err) res.status(500).send(err);
    if (!user) res.status(500).send('user is null');

    let profileLoc = `${config.PROFILE_FILE_LOCATION}/${config.DEFAULT_PROFILE}`;
    if (user.profileImg) {
      profileLoc = `${config.PROFILE_FILE_LOCATION}/${user.profileImg}`;
    }

    res.sendFile(profileLoc);
  })
});


module.exports = router;