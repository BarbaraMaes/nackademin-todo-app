const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth");

//add a new user
router.post("/signup", controller.signup);

//login
router.post("/login", controller.login);

router.post("/clear", controller.clearUser);

module.exports = router;