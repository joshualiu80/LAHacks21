const router = require('express').Router();
const mongoose = require('mongoose');
const Tag = require('../models/tag.model');

router.get('/', (req, res) => {
  Tag.find({}, 'name', function (err, tags) {
    if (tags) {
      console.log('tags', tags);
      res.status(200).json(tags);
    } else {
      res.status(400).send('Could not fetch tags');
    }
  })
});

router.post('/', function(req, res){
  const query = {
    "_id": new mongoose.Types.ObjectId(),
    "name": req.body.name
  }
  const newTag = new Tag(query);
  newTag.save()
    .then(() => res.status(200).send("New tag created"))
    .catch(err => res.status(400).json("Error: " + err))
});

module.exports = router;