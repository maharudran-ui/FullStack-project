const db = require("../config/db");


exports.createGroup = (req, res) => {
  const group_name = req.body.group_name?.trim();
const category_ids = req.body.category_ids;

if (!group_name) {
  return res.status(400).json({
    message: "Group name is required"
  });
}

if (group_name.length < 3 || group_name.length > 50) {
  return res.status(400).json({
    message: "Group name must be between 3 and 50 characters"
  });
}

if (
  !Array.isArray(category_ids) ||
  category_ids.length === 0
) {
  return res.status(400).json({
    message: "At least one category ID is required"
  });
}



const categorySql = `
  SELECT category_id
  FROM categories
  WHERE category_id IN (?)
`;

db.query(
  categorySql,
  [category_ids],
  (err, categories) => {

    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Internal Server Error"
      });
    }

    if (categories.length !== category_ids.length) {
      return res.status(400).json({
        message: "One or more category IDs are invalid"
      });
    }

  
    const duplicateSql = `
      SELECT *
      FROM dropdown_groups
      WHERE LOWER(group_name) = LOWER(?)
    `;

    db.query(
      duplicateSql,
      [group_name],
      (err, groups) => {

        if (err) {
          console.error(err);

          return res.status(500).json({
            message: "Internal Server Error"
          });
        }

        if (groups.length > 0) {
          return res.status(400).json({
            message: "Dropdown group already exists"
          });
        }

        
        const sql = `
          INSERT INTO dropdown_groups
          (group_name, category_ids)
          VALUES (?, ?)
        `;

        db.query(
          sql,
          [group_name, JSON.stringify(category_ids)],
          (err, result) => {

            if (err) {
              console.error(err);

              return res.status(500).json({
                message: "Internal Server Error"
              });
            }

            res.status(201).json({
              message: "Dropdown created successfully",
              group_id: result.insertId
            });
          }
        );
      }
    );
  }
);

  
};




exports.getDropdownsForCategory = (req, res) => {
  const { categoryId } = req.params;

  
  const checkCategorySql =
    "SELECT * FROM categories WHERE category_id = ?";

  db.query(checkCategorySql, [categoryId], (err, category) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (category.length === 0) {
      return res.status(404).json({
        message: `Category ID ${categoryId} not found`
      });
    }

    const sql = `
      SELECT group_id, group_name
      FROM dropdown_groups
      WHERE JSON_CONTAINS(category_ids, ?, '$')
    `;

    db.query(
  sql,
  [JSON.stringify(Number(categoryId))],
  (err, result) => {

    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Internal Server Error"
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: `No dropdown groups found for Category ID ${categoryId}`
      });
    }

    res.status(200).json(result);
  }
);
  });
};