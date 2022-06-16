const express = require("express");
const checkErrors = require("../../middleware/checkErrors");
const { body } = require("express-validator");

const readAbonentList = require("../../services/session/readAbonentList");

const router = express.Router();

router.all("/read_abonent_list", [body("data.list", "list is required").exists().isArray({min: 1}).withMessage("list must not be empty"), body("data.list.*").toInt(), checkErrors, readAbonentList]);

module.exports = router;