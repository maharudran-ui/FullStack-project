const db = require("../config/db");
exports.createValue = (req, res) => {

  const group_id = req.body.group_id;
  const value_name = req.body.value_name?.trim();

  
  if (!value_name) {
    return res.status(400).json({
      message: "Value name is required"
    });
  }


  if (value_name.length < 2 || value_name.length > 50) {
    return res.status(400).json({
      message: "Value name must be between 2 and 50 characters"
    });
  }

  
  const groupSql =
    "SELECT * FROM dropdown_groups WHERE group_id = ?";

  db.query(groupSql, [group_id], (err, groups) => {

    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Internal Server Error"
      });
    }

    if (groups.length === 0) {
      return res.status(404).json({
        message: `Group ID ${group_id} not found`
      });
    }

    const duplicateSql = `
      SELECT *
      FROM dropdown_values
      WHERE group_id = ?
      AND LOWER(value_name) = LOWER(?)
    `;

    db.query(
      duplicateSql,
      [group_id, value_name],
      (err, values) => {

        if (err) {
          console.error(err);

          return res.status(500).json({
            message: "Internal Server Error"
          });
        }

        if (values.length > 0) {
          return res.status(400).json({
            message: "Value already exists in this group"
          });
        }

 
        const insertSql = `
          INSERT INTO dropdown_values
          (group_id, value_name)
          VALUES (?, ?)
        `;

        db.query(
          insertSql,
          [group_id, value_name],
          (err, result) => {

            if (err) {
              console.error(err);

              return res.status(500).json({
                message: "Internal Server Error"
              });
            }

            res.status(201).json({
              message: "Value added successfully",
              value_id: result.insertId
            });
          }
        );
      }
    );
  });
};




exports.getValuesByGroup = (req, res) => {
  const { categoryId, groupId } = req.params;


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

    
    const checkGroupSql =
      "SELECT * FROM dropdown_groups WHERE group_id = ?";

    db.query(checkGroupSql, [groupId], (err, group) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (group.length === 0) {
        return res.status(404).json({
          message: `Dropdown Group ID ${groupId} not found`
        });
      }

  const categoryIds = group[0].category_ids;

if (!categoryIds.includes(Number(categoryId))) {
  return res.status(400).json({
    message: `Group ID ${groupId} does not belong to Category ID ${categoryId}`
  });
}

      const sql = `
        SELECT DISTINCT
          dv.value_id,
          dv.value_name
        FROM dropdown_values dv
        JOIN products p
          ON JSON_CONTAINS(
               p.value_id,
               CAST(dv.value_id AS JSON)
             )
        WHERE
          dv.group_id = ?
          AND p.category_id = ?
          AND p.stock_data > 0
      `;
db.query(
  sql,
  [groupId, categoryId],
  (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "No group item available with stock"
      });
    }

    res.json(result);
  }
);
    });
  });
};

