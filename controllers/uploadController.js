const Upload = require("../models/Upload");

exports.uploadFile = async (req, res) => {
  try {
    const newFile = new Upload({
      filename: req.file.filename,
    });

    await newFile.save();

    res.json({ message: "File uploaded" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFiles = async (req, res) => {
  try {
    const files = await Upload.find();
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};