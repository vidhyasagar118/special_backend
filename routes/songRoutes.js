const express = require("express");
const router = express.Router();

const {
  addSong,
  getSongs,
  deleteSong,
} = require("../controllers/songController");

router.post("/songs", addSong);
router.get("/songs", getSongs);
router.delete("/songs/:id", deleteSong);

module.exports = router;