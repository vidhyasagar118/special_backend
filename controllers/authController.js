const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/User");

exports.loginUser = async (req, res) => {
  try {
    const { name, password } = req.body;

    console.log("========== LOGIN ==========");
    console.log("Name received:", name);
    console.log("Database:", mongoose.connection.name);

    if (!name || !password) {
      return res.status(400).json({
        success: false,
        message: "Name and password are required",
      });
    }

    const cleanName = name.trim();

    const user = await User.findOne({
      name: cleanName,
    });

    console.log("User found:", !!user);

    if (!user) {
      console.log("USER NOT FOUND:", cleanName);

      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    console.log("User name in DB:", user.name);
    console.log("Password field exists:", !!user.password);

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    console.log("Password match:", passwordMatch);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Wrong password",
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing");

      return res.status(500).json({
        success: false,
        message: "Server configuration error",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id.toString(),
        name: user.name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    console.log("LOGIN SUCCESS");

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};