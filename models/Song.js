const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    src: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Sad", "Romantic", "Party"],
      default: "Sad",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Song", songSchema);