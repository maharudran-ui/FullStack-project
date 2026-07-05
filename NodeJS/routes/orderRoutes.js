const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  updateOrderOffer
} = require("../controllers/orderController");

router.post("/add", createOrder);
router.get("/get", getOrders);
router.get("/get/:id", getOrderById);

router.put("/status/:id", updateOrderStatus);
router.put("/offer/:id", updateOrderOffer);

module.exports = router;