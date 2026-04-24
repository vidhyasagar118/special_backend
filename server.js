const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/uploadRoutes"));
app.use("/api", require("./routes/passRoutes"));
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});