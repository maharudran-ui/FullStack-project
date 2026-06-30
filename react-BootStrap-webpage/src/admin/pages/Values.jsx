import React, { useState, useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";
import AdminLayout from "../layout/AdminLayout";
import adminApi from "../services/adminApi";

function Values() {
  const [categories, setCategories] = useState([]);
  const [groups, setGroups] = useState([]);

  const [categoryId, setCategoryId] = useState("");
  const [groupId, setGroupId] = useState("");
  const [valueName, setValueName] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const res = await adminApi.get("/categories/get");
    setCategories(res.data);
  };

  const loadGroups = async (id) => {
    const res = await adminApi.get(
      `/groups/category/${id}`
    );

    setGroups(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await adminApi.post("/values/add", {
      value_name: valueName,
      category_id: categoryId,
      group_id: groupId,
    });

    setValueName("");
  };

  return (
    <AdminLayout>
      <Card className="p-4">
        <h2>Add Value</h2>

        <Form onSubmit={handleSubmit}>
          <Form.Select
            onChange={(e) => {
              setCategoryId(e.target.value);
              loadGroups(e.target.value);
            }}
          >
            <option>Select Category</option>

            {categories.map((cat) => (
              <option
                key={cat.category_id}
                value={cat.category_id}
              >
                {cat.category_name}
              </option>
            ))}
          </Form.Select>

          <Form.Select
            className="mt-3"
            onChange={(e) =>
              setGroupId(e.target.value)
            }
          >
            <option>Select Group</option>

            {groups.map((group) => (
              <option
                key={group.group_id}
                value={group.group_id}
              >
                {group.group_name}
              </option>
            ))}
          </Form.Select>

          <Form.Control
            className="mt-3"
            placeholder="Value"
            value={valueName}
            onChange={(e) =>
              setValueName(e.target.value)
            }
          />

         <Button type="submit" className="mt-3">
  Add Value
</Button>
        </Form>
      </Card>
    </AdminLayout>
  );
}

export default Values;