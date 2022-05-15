const express = require("express");
const router = express.Router();
const cart = require("../controller/cart");
const catchAsync = require("../utils/catchAsync")
const verifyToken = require("../middleware/auth");

router.post("/", verifyToken, catchAsync(cart.addToCart));
router.get("/", verifyToken, catchAsync(cart.showCart));

module.exports = router;