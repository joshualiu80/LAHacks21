const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('../models/user.model');

router.get('/verify', function(req, res) {
  const { username, password } = req.body;
  User.findOne({ username: username }, function (err, user) {
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