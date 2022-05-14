const express = require("express");
const router = express.Router();
const cart = require("../controller/cart");
const catchAsync = require("../utils/catchAsync")

router.post("/", catchAsync(cart.addToCart));

module.exports = router;