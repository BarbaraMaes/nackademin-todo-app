const express = require("express");
const router = express.Router();
const mainController = require("../Controllers/main");

router.get("/", mainController.getItems);

module.exports = router;