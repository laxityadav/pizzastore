const express = require("express");
const router = express.Router();
const user = require("../controller/user");
const catchAsync = require("../utils/catchAsync")

router.post("/register", catchAsync(user.createUser));
router.post("/login", catchAsync(user.loginUser));

module.exports = router;