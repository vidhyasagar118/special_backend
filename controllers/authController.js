const User = require("../models/User");

exports.loginUser = async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ name, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};