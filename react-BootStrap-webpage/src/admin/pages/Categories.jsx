import React, { useEffect, useState } from "react";
import { Card, Form, Button, Table } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import AdminLayout from "../layout/AdminLayout";
import adminApi from "../services/adminApi";

function Categories() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const res = await adminApi.get("/categories/get");
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await adminApi.post("/categories/add", {
      category_name: name,
    });

    setName("");
    fetchCategories();
  };

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this category?"
  );

  if (!confirmDelete) return;

  try {
    await adminApi.delete(`/categories/${id}`);

    alert("Category deleted successfully");

    // Refresh categories
    fetchCategories();
  } catch (err) {
    console.log(err);

    alert(
      err.response?.data?.message ||
      "Failed to delete category"
    );
  }
};

  return (
    <AdminLayout>
      <Card className="p-4">
        <h2>Add Category</h2>

        <Form onSubmit={handleSubmit}>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category Name"
          />

          <Button className="mt-3" type="submit">
            Add Category
          </Button>
        </Form>

        <Table className="mt-4">
          <thead>
            <tr>
  <th>ID</th>
  <th>Category Name</th>
  <th className="text-center">Action</th>
</tr>
          </thead>

          <tbody>
            {categories.map((cat) => (
            <tr key={cat.category_id}>
  <td>{cat.category_id}</td>

  <td>{cat.category_name}</td>

  <td className="text-center">
    <Button
      variant="danger"
      size="sm"
      onClick={() =>
        handleDelete(cat.category_id)
      }
    >
      <FaTrash />
    </Button>
  </td>

              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </AdminLayout>
  );
}

export default Categories;