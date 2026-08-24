const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dns = require("dns");

const connectDB = require("./config/db");

dotenv.config();

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/uploadRoutes"));
app.use("/api", require("./routes/passRoutes"));
app.use("/api", require("./routes/songRoutes"));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running 🚀",
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    console.log("Connecting to MongoDB...");

    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

startServer();