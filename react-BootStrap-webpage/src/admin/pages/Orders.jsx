import React, { useEffect, useState } from "react";
import { Table, Badge } from "react-bootstrap";
import AdminLayout from "../layout/AdminLayout";
import adminApi from "../services/adminApi";
import { Link } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);
  const badgeColor = {
  Pending: "warning",
  Accepted: "info",
  Shipped: "primary",
  Delivered: "success",
  Cancelled: "danger",
};

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
  const res = await adminApi.get("/orders/get");
    setOrders(res.data);
  };

  return (
    <AdminLayout>
      <h2>Orders</h2>

      <Table bordered hover>
       <thead>
  <tr>
    <th>Order ID</th>
    <th>Customer</th>
    <th>Email</th>
    <th>Total</th>
    <th>Status</th>
    <th>Action</th>
  </tr>
</thead>

       <tbody>
  {orders.map((order) => (
    <tr key={order.id}>

      <td>{order.id}</td>

      <td>{order.name}</td>

      <td>{order.email}</td>

      <td>£ {order.total_price}</td>

      <td>
        <Badge bg={badgeColor[order.status]}>
  {order.status}
</Badge>
      </td>

      <td>
        <Link
          to={`/admin/orders/${order.id}`}
          className="btn btn-primary btn-sm"
        >
          View
        </Link>
      </td>

    </tr>
  ))}
</tbody>
      </Table>
    </AdminLayout>
  );
}

export default Orders;