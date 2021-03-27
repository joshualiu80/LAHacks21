const router = require('express').Router();
const mongoose = require('mongoose');


router.route('/').get((req,res) => {
  res.send('sup');
})

module.exports = router;