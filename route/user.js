const express = require("express");
const router = express.Router();
const user = require("../controller/user");
const catchAsync = require("../utils/catchAsync")

router.post("/", catchAsync(user.createUser));

module.exports = router;