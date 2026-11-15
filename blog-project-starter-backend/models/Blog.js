
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  newTitle: {
    type: String,
    required: true,
    trim: true,
  },
  newContent: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: () => new Date().toISOString(),
  },
  likes: {
    type: Number,
    default: 0,
    min: 0,
  },
});

module.exports = mongoose.model("Blog", blogSchema);
