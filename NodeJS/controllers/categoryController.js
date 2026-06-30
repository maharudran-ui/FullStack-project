const db = require("../config/db");


exports.createCategory = (req, res) => {
  const category_name = req.body.category_name?.trim();

if (!category_name) {
  return res.status(400).json({
    message: "Category name is required"
  });
}

if (category_name.length < 3 || category_name.length > 20) {
  return res.status(400).json({
    message: "Category name must be between 3 and 20 characters"
  });
}

 
const checkSql = `
SELECT *
FROM categories
WHERE LOWER(category_name) = LOWER(?)
`;

  db.query(checkSql, [category_name], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (result.length > 0) {
      return res.status(400).json({
        message: "Category already exists"
      });
    }

    // Insert only if not found
    const insertSql =
      "INSERT INTO categories (category_name) VALUES (?)";

    db.query(insertSql, [category_name], (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(201).json({
        message: "Category created successfully",
        category_id: result.insertId
      });
    });
  });
};


exports.getAllCategories = (req, res) => {
  const sql = "SELECT * FROM categories";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.status(200).json(result);
  });
};

    //  DELETE CATEGORY 
     exports.deleteCategory = (req, res) => {
  const categoryId = Number(req.params.id);

  if (!Number.isInteger(categoryId) || categoryId <= 0) {
    return res.status(400).json({
      message: "Invalid Category ID",
    });
  }

  // Check category exists
  const checkSql =
    "SELECT * FROM categories WHERE category_id = ?";

  db.query(checkSql, [categoryId], (err, result) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Internal Server Error",
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    // Check whether products use this category
    const productSql =
      "SELECT product_id FROM products WHERE category_id = ?";

    db.query(productSql, [categoryId], (err, products) => {
      if (err) {
        console.error(err);

        return res.status(500).json({
          message: "Internal Server Error",
        });
      }

      if (products.length > 0) {
        return res.status(400).json({
          message:
            "Cannot delete category because products exist under this category",
        });
      }

      // Delete category
      const deleteSql =
        "DELETE FROM categories WHERE category_id = ?";

      db.query(deleteSql, [categoryId], (err) => {
        if (err) {
          console.error(err);

          return res.status(500).json({
            message: "Internal Server Error",
          });
        }

        res.status(200).json({
          message: "Category deleted successfully",
        });
      });
    });
  });
};