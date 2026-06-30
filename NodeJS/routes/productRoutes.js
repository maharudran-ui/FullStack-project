const express = require("express");
const router = express.Router();



const { verifyToken, authorizeRoles } = require("../middlewares/authMiddleware");

const upload = require("../middlewares/uploads.js");

const {addProduct, getProductById, getProductsByValue,getAllProducts,  updateProduct,
  deleteProduct,} = require("../controllers/productController");

router.post(
  "/",
  verifyToken,
  authorizeRoles("admin"),
  upload.single("product_image"),
  addProduct
);
router.get("/", getAllProducts);
router.get("/:id",  getProductById);
router.get("/value/:valueId", getProductsByValue);
router.put(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  upload.single("product_image"),
  updateProduct
);

router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  deleteProduct
);


module.exports = router;