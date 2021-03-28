const mongoose = require('mongoose');
const Snippet = require('./snippet.model');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  friends: [{ type: mongoose.Schema.Types.ObjectId }],
  snippetsSent: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Snippet', default: [] }],
  snippetsReceived: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Snippet', default: [] }]
});

const User = mongoose.model('users', userSchema);
module.exports = User;