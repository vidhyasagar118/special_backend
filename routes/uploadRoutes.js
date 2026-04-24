const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const { uploadFile, getFiles } = require("../controllers/uploadController");

const router = express.Router();

router.post("/upload", upload.single("document"), uploadFile);
router.get("/upload", getFiles);

module.exports = router;