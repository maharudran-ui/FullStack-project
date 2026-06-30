const express = require("express");

const router = express.Router();

const { createValue,getValuesByGroup
} = require("../controllers/valueController");

const { verifyToken, authorizeRoles } = require("../middlewares/authMiddleware");

router.post( "/add",
  verifyToken,
  authorizeRoles("admin"),
  createValue
);
router.get("/category/:categoryId/group/:groupId/", getValuesByGroup);

module.exports = router;