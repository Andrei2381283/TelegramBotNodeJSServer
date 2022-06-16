const express = require("express");
const checkErrors = require("../../middleware/checkErrors");
const { body } = require("express-validator");

const sendMsg = require("../../services/session/sendMsg");

const router = express.Router();

router.all("/send_msg", [body("data.key", "key is required").exists(), body("data.text_msg", "text_msg is required").exists(), checkErrors, sendMsg]);

module.exports = router;