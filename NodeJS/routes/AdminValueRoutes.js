const {
  createValue,
  getValuesByGroup,
  getAllValuesByGroup
} = require("../controllers/valueController");

router.get(
  "/admin/category/:categoryId/group/:groupId",
  getAllValuesByGroup
);