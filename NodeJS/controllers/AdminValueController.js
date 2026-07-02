exports.getAllValuesByGroup = (req, res) => {
  const { categoryId, groupId } = req.params;

  const checkCategorySql =
    "SELECT * FROM categories WHERE category_id = ?";

  db.query(checkCategorySql, [categoryId], (err, category) => {
    if (err) return res.status(500).json(err);

    if (category.length === 0) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    const checkGroupSql =
      "SELECT * FROM dropdown_groups WHERE group_id = ?";

    db.query(checkGroupSql, [groupId], (err, group) => {
      if (err) return res.status(500).json(err);

      if (group.length === 0) {
        return res.status(404).json({
          message: "Group not found",
        });
      }

      const sql = `
        SELECT value_id, value_name
        FROM dropdown_values
        WHERE group_id = ?
        ORDER BY value_name ASC
      `;

      db.query(sql, [groupId], (err, result) => {
        if (err) return res.status(500).json(err);

        res.json(result);
      });
    });
  });
};