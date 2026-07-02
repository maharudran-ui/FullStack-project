const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrders,getOrderById,updateOrderStatus
} = require("../controllers/orderController");

router.post("/add", createOrder);
router.get("/get", getOrders);
router.get("/get/:id", getOrderById);

router.put("/status/:id", updateOrderStatus);

module.exports = router;