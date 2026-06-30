import { Form, Button, Card, Row, Col } from "react-bootstrap";
import AdminLayout from "../layout/AdminLayout";
import { useEffect, useState } from "react";
import adminApi from "../services/adminApi";

function AddProduct() {
  const [product, setProduct] = useState({
    author: "",
    tittle: "",
    description: "",
    year: "",
    price: "",
    stock_data: "",
    category_id: "",
    value_id: [],
    image: null,
  });

  const [categories, setCategories] = useState([]);
  const [groups, setGroups] = useState([]);
  const [values, setValues] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await adminApi.get("/categories/get");
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadGroups = async (categoryId) => {
    try {
      const res = await adminApi.get(
        `/groups/category/${categoryId}`
      );

      setGroups(res.data);
      setValues([]);
    } catch (err) {
      console.log(err);
    }
  };

  const loadValues = async (categoryId, groupId) => {
    try {
      const res = await adminApi.get(
        `/values/category/${categoryId}/group/${groupId}`
      );

      setValues(res.data);
    } catch (err) {
      console.log(err);
    }
   const res = await adminApi.get(
  `/values/category/${categoryId}/group/${groupId}`
);

console.log("CATEGORY ID:", categoryId);
console.log("GROUP ID:", groupId);
console.log("VALUES RESPONSE:", res.data);

setValues(res.data); 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setProduct((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("author", product.author);
      formData.append("tittle", product.tittle);
      formData.append("description", product.description);
      formData.append("year", product.year);
      formData.append("price", product.price);
      formData.append("stock_data", product.stock_data);
      formData.append("category_id", product.category_id);
      formData.append("value_id", JSON.stringify(product.value_id));
      formData.append("product_image", product.image);

      await adminApi.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product Added Successfully");
    } catch (err) {
      console.log(err);
      alert("Failed to add product");
    }
  };

  return (
    <AdminLayout>
      <Card>
        <Card.Body>
          <h2 className="mb-4">Add Product</h2>

          <Form onSubmit={handleSubmit}>
            {/* AUTHOR */}
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                name="author"
                value={product.author}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Row>
              {/* TITLE */}
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Product Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="tittle"
                    value={product.tittle}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              {/* CATEGORY + GROUP */}
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>

                  <Form.Select
                    name="category_id"
                    value={product.category_id}
                    onChange={(e) => {
                      const value = e.target.value;

                      setProduct((prev) => ({
                        ...prev,
                        category_id: value,
                      }));

                      loadGroups(value);
                    }}
                  >
                    <option value="">Select Category</option>

                    {categories.map((cat) => (
                      <option
                        key={cat.category_id}
                        value={cat.category_id}
                      >
                        {cat.category_name}
                      </option>
                    ))}
                  </Form.Select>

                  {/* GROUP SELECT */}
                 <Form.Select
  className="mt-3"
  onChange={(e) => {
    const groupId = e.target.value;
    const categoryId = product.category_id;

    loadValues(categoryId, groupId);
  }}
>
  <option value="">Select Group</option>

  {groups.map((g) => (
    <option key={g.group_id} value={g.group_id}>
      {g.group_name}
    </option>
  ))}
</Form.Select>
                </Form.Group>
              </Col>
            </Row>

            {/* DESCRIPTION */}
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

            {/* PRICE / YEAR / STOCK */}
            <Row>
              <Col md={4}>
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

              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Year</Form.Label>
                  <Form.Control
                    type="text"
                    name="year"
                    value={product.year}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
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

            {/* VALUES */}
            <Form.Group className="mb-3">
              <Form.Label>Values</Form.Label>

              {values.length === 0 ? (
                <p style={{ color: "gray" }}>No values found</p>
              ) : (
                values.map((val) => (
                  <Form.Check
                    key={val.value_id}
                    type="checkbox"
                    label={val.value_name}
                    checked={product.value_id.includes(
                      val.value_id
                    )}
                    onChange={() => {
                      setProduct((prev) => {
                        const exists = prev.value_id.includes(
                          val.value_id
                        );

                        return {
                          ...prev,
                          value_id: exists
                            ? prev.value_id.filter(
                                (id) => id !== val.value_id
                              )
                            : [...prev.value_id, val.value_id],
                        };
                      });
                    }}
                  />
                ))
              )}
            </Form.Group>

            {/* IMAGE */}
            <Form.Group className="mb-4">
              <Form.Label>Product Image</Form.Label>
              <Form.Control
                type="file"
                onChange={handleImageChange}
              />
            </Form.Group>

            <Button type="submit">Add Product</Button>
          </Form>
        </Card.Body>
      </Card>
    </AdminLayout>
  );
}

export default AddProduct;