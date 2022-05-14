const express = require("express");
const router = express.Router();
const cart = require("../controller/cart");
const catchAsync = require("../utils/catchAsync")

router.post("/", catchAsync(cart.addToCart));
router.get("/", catchAsync(cart.showCart));

module.exports = router;