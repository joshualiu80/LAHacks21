const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const snippetSchema = new Schema({
cr_id: {type: mongoose.Schema.Types.ObjectId, required: true},
  title: {type: String, required: true},
  creator: {type: mongoose.Scheme.Types.ObjectId, required: true},
  recipient: {type: mongoose.Schema.Types.ObjectId},
  audioFile: {type: String, required: true},
  tag: {type: mongoose.Schema.Types.ObjectId},
  creationDate: {type: Date, required: true},
  scheduledDate: {type: Date},
  listened: {type: Boolean}
});

const Snippet = mongoose.model('snippets', snippetSchema);
module.exports = Snippet;