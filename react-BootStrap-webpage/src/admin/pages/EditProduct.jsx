import React, { useState } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import AdminLayout from "../layout/AdminLayout";
import adminApi from "../services/adminApi";

function EditProduct() {
  const [product, setProduct] = useState({
    id: 1, // IMPORTANT: replace with real product id (from params or props)
    author: "",
    tittle: "",
    description: "",
    price: "",
    stock_data: "",
    category_id: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("author", product.author);
      formData.append("tittle", product.tittle);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("stock_data", product.stock_data);
      formData.append("category_id", product.category_id);

      if (product.image) {
        formData.append("product_image", product.image);
      }

      await adminApi.put(`/products/${product.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product updated successfully");
    } catch (err) {
      console.log(err);
      alert("Failed to update product");
    }
  };

  return (
    <AdminLayout>
      <Card>
        <Card.Body>
          <h2 className="mb-4">Edit Product</h2>

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="tittle"
                    value={product.tittle}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="category_id"
                    value={product.category_id}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                value={product.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type="number"
                    name="stock_data"
                    value={product.stock_data}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Product Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) =>
                  setProduct((prev) => ({
                    ...prev,
                    image: e.target.files[0],
                  }))
                }
              />
            </Form.Group>

            <Button type="submit">Update Product</Button>
          </Form>
        </Card.Body>
      </Card>
    </AdminLayout>
  );
}

export default EditProduct;