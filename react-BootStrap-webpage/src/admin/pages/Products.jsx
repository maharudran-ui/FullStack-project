import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import ProductTable from "../components/ProductTable";
import adminApi from "../services/adminApi";

function Products() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await adminApi.get("/products");

      setProducts(res.data.products);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between mb-4">
        <h2>Products</h2>

        <Link to="/admin/products/add">
          <Button>Add Product</Button>
        </Link>
      </div>

      <ProductTable products={products} />
    </AdminLayout>
  );
}

export default Products;