import React, { useState, useEffect } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import AdminLayout from "../layout/AdminLayout";
import adminApi from "../services/adminApi";
import { useParams } from "react-router-dom";


function EditProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({
    
   
    author: "",
    tittle: "",
    description: "",
    year:"",
    price: "",
    stock_data: "",
    category_id: "",
    value_id: [],
    image: null,
  });
  const [categories, setCategories] = useState([]);
const [groups, setGroups] = useState([]);
const [values, setValues] = useState([]);


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
      `/values/admin/category/${categoryId}/group/${groupId}`
    );

    setValues(res.data);
  } catch (err) {
    console.log(err);
  }
};


const loadProduct = async () => {
  try {
    const res = await adminApi.get(`/products/${id}`);

    const data = res.data;
    console.log("Product:", data);
console.log("value_id:", data.value_id);
console.log("typeof:", typeof data.value_id);

    setProduct({
      author: data.author,
      tittle: data.tittle,
      description: data.description,
      year: data.year,
      price: data.price,
      stock_data: data.stock_data,
      category_id: data.category_id,
      value_id: data.value_id,
      image: null,
    });

    // Load groups for this category
    await loadGroups(data.category_id);

  } catch (err) {
    console.log(err);
  }
};
useEffect(() => {
  loadCategories();
  loadProduct();
}, []);



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
        formData.append("year", product.year);
      formData.append("price", product.price);
      formData.append("stock_data", product.stock_data);
      formData.append("category_id", product.category_id);
    
formData.append("value_id", JSON.stringify(product.value_id));

      if (product.image) {
        formData.append("product_image", product.image);
      }

await adminApi.put(`/products/${id}`, formData, {
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
            <Form.Group className="mb-3">
  <Form.Label>Author</Form.Label>
  <Form.Control
    type="text"
    name="author"
    value={product.author}
    onChange={handleChange}
  />
</Form.Group>
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
                {/* <Form.Group className="mb-3">
                  <Form.Label>Category ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="category_id"
                    value={product.category_id}
                    onChange={handleChange}
                  />
                </Form.Group> */}
                <Form.Group className="mb-3">
  <Form.Label>Category</Form.Label>

  <Form.Select
    name="category_id"
    value={product.category_id}
    onChange={(e) => {
      const categoryId = e.target.value;

      setProduct((prev) => ({
        ...prev,
        category_id: categoryId,
        value_id: [],
      }));

      loadGroups(categoryId);
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
</Form.Group>

<Form.Select
  className="mt-3"
  onChange={(e) => {
    const groupId = e.target.value;
    loadValues(product.category_id, groupId);
  }}
>
  <option value="">Select Group</option>

  {groups.map((g) => (
    <option
      key={g.group_id}
      value={g.group_id}
    >
      {g.group_name}
    </option>
  ))}
</Form.Select>
<Form.Group className="mb-3">
  <Form.Label>Values</Form.Label>

  <Form.Select
    multiple
    value={product.value_id.map(String)}
    onChange={(e) => {
      const selectedValues = Array.from(
        e.target.selectedOptions,
        (option) => Number(option.value)
      );

      setProduct((prev) => ({
        ...prev,
        value_id: selectedValues,
      }));
    }}
  >
    {values.map((val) => (
      <option
        key={val.value_id}
        value={val.value_id}
      >
        {val.value_name}
      </option>
    ))}
  </Form.Select>
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