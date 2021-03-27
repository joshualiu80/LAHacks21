const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = new Schema({
  _id: {type: mongoose.Schema.Types.ObjectId, required: true},
  name: {type: String, required: true},
});

const Tag = mongoose.model('tags', tagSchema);
module.exports = Tag;