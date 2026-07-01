import React from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import adminApi from "../services/adminApi";
import { FaTrash } from "react-icons/fa";

function ProductTable({ products }) {
  const handleDelete = async (id) => {
  try {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    await adminApi.delete(`/products/${id}`);

    alert("Product deleted successfully");

    // remove from UI without refresh
    setProducts((prev) =>
      prev.filter((item) => item.product_id !== id)
    );

  } catch (err) {
  console.log(err);

  console.log("Response:", err.response?.data);

  alert(
    err.response?.data?.message ||
    "Failed to delete product"
  );
}
};
  return (
    <Table bordered hover responsive
      className="align-middle"
    >
      <thead>
        <tr>
          <th>ID</th>
          <th>Image</th>
          <th>Title</th>
          <th>Category</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {products.map((product) => (
          <tr key={product.product_id}>
            <td>{product.product_id}</td>

            <td>
             <img
  src={`${import.meta.env.VITE_API_URL}/uploads/${product.product_image}`}
  alt={product.tittle}
  width="60"
  height="60"

                style={{
                  objectFit: "cover",
                }}
              />
            </td>

            <td>{product.tittle}</td>

            <td>{product.category_id}</td>

            <td>₹{product.price}</td>

            <td>{product.stock_data}</td>

           <td>
  <div className="d-flex align-items-center">
    <Link
      to={`/admin/products/edit/${product.product_id}`}
    >
      <Button
        size="sm"
        variant="warning"
        className="rounded-pill"
      >
        Edit
      </Button>
    </Link>

    <Button
      variant="danger"
      size="sm"
      className="rounded-circle ms-2"
      onClick={() => handleDelete(product.product_id)}
      title="Delete Product"
      style={{
        width: "35px",
        height: "35px",
        padding: 0,
      }}
    >
      <FaTrash />
    </Button>
  </div>
</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ProductTable;