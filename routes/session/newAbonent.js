const express = require("express");

const newAbonent = require("../../services/session/newAbonent");

const router = express.Router();

router.all("/new_abonent", [newAbonent]);

module.exports = router;