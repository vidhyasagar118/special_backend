const mongoose = require("mongoose");

const passSchema = new mongoose.Schema({
  title: String,
  username: String,
  password: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("importantpasssave", passSchema);