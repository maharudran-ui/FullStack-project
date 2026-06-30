const express = require("express");

const router = express.Router();

const { createGroup, getDropdownsForCategory,} = require("../controllers/groupController");

const { verifyToken, authorizeRoles } = require("../middlewares/authMiddleware");



router.post("/add", verifyToken, authorizeRoles("admin"), createGroup);
router.get("/category/:categoryId",  getDropdownsForCategory);

module.exports = router;