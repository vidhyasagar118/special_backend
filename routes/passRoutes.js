const express = require("express");
const { savePass, getPass } = require("../controllers/passController");

const router = express.Router();

router.post("/pass", savePass);
router.get("/pass", getPass);

module.exports = router;