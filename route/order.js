const express = require("express");
const router = express.Router();
const order = require("../controller/order");
const catchAsync = require("../utils/catchAsync")

router.post("/", catchAsync(order.saveOrder));
router.get("/", catchAsync(order.allOrders));

module.exports = router;