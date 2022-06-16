const express = require("express");
const checkErrors = require("../../middleware/checkErrors");
const { body } = require("express-validator");

const newApp = require("../../services/api/newApp");

const router = express.Router();

router.all("/new_app", [body("data.id", "id is required").exists(), body("data.type", "type is required").exists(), checkErrors, newApp]);

module.exports = router;