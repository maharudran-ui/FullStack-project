import React, { useEffect, useState } from "react";
import { Card, Form, Button, Table } from "react-bootstrap";
import AdminLayout from "../layout/AdminLayout";
import adminApi from "../services/adminApi";

function Groups() {
  const [groupName, setGroupName] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const res = await adminApi.get("/categories/get");
    setCategories(res.data);
  };

  const handleCheckbox = (id) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(
        selectedCategories.filter((x) => x !== id)
      );
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("Submit clicked");
  console.log("Group Name:", groupName);
  console.log("Selected Categories:", selectedCategories);

  try {
    const res = await adminApi.post("/groups/add", {
      group_name: groupName,
      category_ids: selectedCategories,
    });

    console.log("API Success:", res.data);

    alert("Group Added Successfully");

  } catch (err) {
    console.log("API Error:", err);

    if (err.response) {
      console.log("Response Data:", err.response.data);
      console.log("Status:", err.response.status);
    }
  }
};

  return (
    <AdminLayout>
      <Card className="p-4">
        <h2>Add Group</h2>

        <Form onSubmit={handleSubmit}>
          <Form.Control
            placeholder="Group Name"
            value={groupName}
            onChange={(e) =>
              setGroupName(e.target.value)
            }
          />

          <div className="mt-3">
            {categories.map((cat) => (
              <Form.Check
                key={cat.category_id}
                label={cat.category_name}
                onChange={() =>
                  handleCheckbox(cat.category_id)
                }
              />
            ))}
          </div>

      <Button type="submit" className="mt-3">
  Create Group
</Button>
        </Form>
      </Card>
    </AdminLayout>
  );
}

export default Groups;