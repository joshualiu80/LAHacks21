const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('../models/user.model');

router.post('/verify', function(req, res) {
  const { username, password } = req.body;
  User.findOne({ username: username }, function (err, user) {
    if (err) {
      console.log(err);
      res.status(400).send('Server error');
    }
    if (user) {
      if (password === user.password) {
        res.status(200).send('Authentication successful!');
      } else {
        res.status(401).send('Incorrect password');
      }
    }
    else {
      res.status(401).send('Username does not exist');
    }
  });



});

module.exports = router;