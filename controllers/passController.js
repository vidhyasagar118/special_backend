const Pass = require("../models/ImportantPass");

exports.savePass = async (req, res) => {
  try {
    const { title, username, password } = req.body;

    const newPass = new Pass({ title, username, password });
    await newPass.save();

    res.json({ message: "Saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPass = async (req, res) => {
  try {
    const data = await Pass.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};