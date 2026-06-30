import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import AdminLayout from "../layout/AdminLayout";
import adminApi from "../services/adminApi";

function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const productsRes =
      await adminApi.get("/products");

    const categoryRes =
      await adminApi.get("/categories/get");

    setStats({
      products:
        productsRes.data.products.length,
      categories:
        categoryRes.data.length,
    });
  };

  return (
    <AdminLayout>
      <Row>
         <Col md={3}>
          <Card>
            <Card.Body>
              <h3>{stats.users}</h3>
              <p>Total Users</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <h3>{stats.products}</h3>
              <p>Total Products</p>
            </Card.Body>
          </Card>
        </Col>

         <Col md={3}>
          <Card>
            <Card.Body>
              <h3>{stats.Revnue}</h3>
              <p>Revnue</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card>
            <Card.Body>
              <h3>{stats.categories}</h3>
              <p>Total Categories</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </AdminLayout>
  );
}

export default Dashboard;