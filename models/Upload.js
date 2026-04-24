const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
  filename: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Upload", uploadSchema);