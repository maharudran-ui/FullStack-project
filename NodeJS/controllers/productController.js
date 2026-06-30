const db = require("../config/db");

exports.addProduct = (req, res) => {

  const { author,tittle,description, year, price,category_id,stock_data, value_id
  } = req.body;


  if (!author?.trim()) {
    return res.status(400).json({
      message: "Author is required"
    });
  }

  if (!tittle?.trim()) {
    return res.status(400).json({
      message: "Title is required"
    });
  }

  if (!category_id) {
    return res.status(400).json({
      message: "Category ID is required"
    });
  }

  if (!value_id) {
    return res.status(400).json({
      message: "Value IDs are required"
    });
  }

  if (stock_data == null || Number(stock_data) < 0) {
    return res.status(400).json({
      message: "Invalid stock quantity"
    });
  }

  const product_image = req.file
    ? req.file.filename
    : null;

  
  const categorySql =
    "SELECT * FROM categories WHERE category_id = ?";

  db.query(
    categorySql,
    [category_id],
    (err, categories) => {

      if (err) {
        console.error(err);

        return res.status(500).json({
          message: "Internal Server Error"
        });
      }

      if (categories.length === 0) {
        return res.status(404).json({
          message: `Category ID ${category_id} not found`
        });
      }

      let valueIds = value_id;

      if (typeof valueIds === "string") {
        valueIds = JSON.parse(valueIds);
      }
      const valueSql = `
        SELECT value_id
        FROM dropdown_values
        WHERE value_id IN (?)
      `;

      db.query(
        valueSql,
        [valueIds],
        (err, values) => {

          if (err) {
            console.error(err);

            return res.status(500).json({
              message: "Internal Server Error"
            });
          }

          if (values.length !== valueIds.length) {
            return res.status(400).json({
              message: "One or more value IDs are invalid"
            });
          }

          const relationSql = `
            SELECT dv.value_id
            FROM dropdown_values dv
            JOIN dropdown_groups dg
              ON dv.group_id = dg.group_id
            WHERE dv.value_id IN (?)
            AND JSON_CONTAINS(
                  dg.category_ids,
                  CAST(? AS JSON)
                )
          `;

          db.query(
            relationSql,
            [valueIds, category_id],
            (err, validValues) => {

              if (err) {
                console.error(err);

                return res.status(500).json({
                  message: "Internal Server Error"
                });
              }
if (validValues.length !== valueIds.length) {
  return res.status(400).json({
    message:
      "One or more values do not belong to the selected category"
  });
}


const duplicateSql = `
  SELECT product_id
  FROM products
  WHERE LOWER(TRIM(tittle)) = LOWER(TRIM(?))
    AND category_id = ?
`;

db.query(
  duplicateSql,
  [tittle, category_id],
  (err, duplicateProducts) => {

    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Internal Server Error"
      });
    }

    if (duplicateProducts.length > 0) {
      return res.status(400).json({
        message: "Product already exists in this category"
      });
    }

    const insertSql = `
      INSERT INTO products
      (
        author,
        tittle,
        description,
        year,
        price,
        product_image,
        category_id,
        value_id,
        stock_data
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      insertSql,
      [
        author,
        tittle,
        description,
        year,
        price,
        product_image,
        category_id,
        JSON.stringify(valueIds),
        stock_data
      ],
      (err, result) => {

        if (err) {
          console.error(err);

          return res.status(500).json({
            message: "Internal Server Error"
          });
        }

        res.status(201).json({
          message: "Product added successfully",
          productId: result.insertId
          });
      }
    );
  }
); 
}
 ); 

 }
      ); 

    }
  ); 

};


exports.getProductById = (req, res) => {

  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      message: "Invalid Product ID"
    });
  }

  const sql = ` SELECT * FROM products WHERE product_id = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
     console.error(err);

return res.status(500).json({
  message: "Internal Server Error"
});
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json(result[0]);
  });
};



exports.getProductsByValue = (req, res) => {
  const { valueId } = req.params;

 const sql = `
  SELECT
  product_id,
  tittle,
  author,
  price,
  product_image,
  stock_data,
  category_id
FROM products
  WHERE JSON_CONTAINS(
    value_id,
    CAST(? AS JSON)
  )
  AND stock_data > 0
`;

  db.query(sql, [valueId], (err, result) => {
    if (err) {
     console.error(err);

return res.status(500).json({
  message: "Internal Server Error"
});
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "No products found for this dropdown value"
      });
    }

    res.status(200).json(result);
  });
};


exports.getAllProducts = (req, res) => {

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;

const sort = req.query.sort || "newest";


  if (!Number.isInteger(page) || page < 1) {
    return res.status(400).json({
      message: "Invalid page number"
    });
  }

  if (
    !Number.isInteger(limit) ||
    limit < 1 ||
    limit > 100
  ) {
    return res.status(400).json({
      message: "Limit must be between 1 and 100"
    });
  }

  const offset = (page - 1) * limit;

  let orderBy = "product_id ASC"; 

switch (sort) {
  case "price_asc":
    orderBy = "price ASC";
    break;

  case "price_desc":
    orderBy = "price DESC";
    break;

  case "author_asc":
    orderBy = "author ASC";
    break;

  case "author_desc":
    orderBy = "author DESC";
    break;

  case "newest":
  default:
    orderBy = "product_id ASC";
}

  const countSql =
    "SELECT COUNT(*) AS total FROM products";

  db.query(countSql, (err, countResult) => {

    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Internal Server Error"
      });
    }

const total = countResult[0].total;

if (total === 0) {
  return res.status(404).json({
    message: "No products available"
  });
}

const totalPages = Math.ceil(total / limit);

if (page > totalPages) {
  return res.status(404).json({
    message: `Page ${page} does not exist. Total pages available: ${totalPages}`
  });
}

    const sql = `
      SELECT
        product_id,
        tittle,
        author,
        price,
        product_image,
        stock_data,
        category_id
    FROM products
ORDER BY ${orderBy}
LIMIT ?
OFFSET ?
    `;

    db.query(
      sql,
      [limit, offset],
      (err, result) => {

        if (err) {
          console.error(err);

          return res.status(500).json({
            message: "Internal Server Error"
          });
        }

 res.status(200).json({
  currentPage: page,
  totalPages,
  products: result
});
      }
    );
  });
};

                  // Update Product

                  exports.updateProduct = (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      message: "Invalid Product ID",
    });
  }

  const {
    author,
    tittle,
    description,
    year,
    price,
    category_id,
    stock_data,
    value_id,
  } = req.body;

  const product_image = req.file ? req.file.filename : null;

  const sql = `
    SELECT * FROM products WHERE product_id = ?
  `;

  db.query(sql, [id], (err, product) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (product.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    let valueIds = value_id;

    if (typeof valueIds === "string") {
      valueIds = JSON.parse(valueIds);
    }

    const updateSql = `
      UPDATE products
      SET
        author = ?,
        tittle = ?,
        description = ?,
        year = ?,
        price = ?,
        product_image = COALESCE(?, product_image),
        category_id = ?,
        value_id = ?,
        stock_data = ?
      WHERE product_id = ?
    `;

    db.query(
      updateSql,
      [
        author,
        tittle,
        description,
        year,
        price,
        product_image,
        category_id,
        JSON.stringify(valueIds),
        stock_data,
        id,
      ],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Internal Server Error" });
        }

        res.status(200).json({
          message: "Product updated successfully",
        });
      }
    );
  });
};

        // DELETE PRODUCT

        exports.deleteProduct = (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      message: "Invalid Product ID",
    });
  }

  const sql = `
    DELETE FROM products WHERE product_id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
    });
  });
};