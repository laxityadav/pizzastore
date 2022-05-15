const express = require("express");
const router = express.Router();
const order = require("../controller/order");
const catchAsync = require("../utils/catchAsync")
const verifyToken = require("../middleware/auth");


router.post("/", verifyToken, catchAsync(order.saveOrder));
router.get("/", verifyToken, catchAsync(order.allOrders));

module.exports = router;