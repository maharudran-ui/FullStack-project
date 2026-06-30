const express = require("express");
const router = express.Router();

const {
  createCategory,
  getAllCategories,
  deleteCategory,
} = require("../controllers/categoryController");
const { verifyToken, authorizeRoles } = require("../middlewares/authMiddleware");




router.get("/get", getAllCategories);
router.post("/add", verifyToken, authorizeRoles("admin"), createCategory);
router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  deleteCategory
);

module.exports = router;