const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const snippetSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, required: true },
  recipient: { type: mongoose.Schema.Types.ObjectId },
  fileName: { type: String, required: true },
  tag: { type: mongoose.Schema.Types.ObjectId },
  creationDate: { type: Date, required: true },
  scheduledDate: { type: Date, required: true },
  listened: { type: Boolean, default: false }
});

const Snippet = mongoose.model('snippets', snippetSchema);
module.exports = Snippet;