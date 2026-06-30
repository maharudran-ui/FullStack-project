const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrders,
} = require("../controllers/orderController");

router.post("/add", createOrder);
router.get("/get", getOrders);

module.exports = router;