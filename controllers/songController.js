const Song = require("../models/Song");

// ➕ Add Song
exports.addSong = async (req, res) => {
  try {
    const { name, src, category } = req.body;

    const newSong = new Song({
      name,
      src,
      category,
    });

    await newSong.save();

    res.status(201).json({
      success: true,
      message: "Song added",
      song: newSong,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📥 Get All Songs
exports.getSongs = async (req, res) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });

    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ❌ Delete Song
exports.deleteSong = async (req, res) => {
  try {
    await Song.findByIdAndDelete(req.params.id);

    res.json({ message: "Song deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};