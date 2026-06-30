import React, { useEffect, useState } from "react";
import { Table, Badge } from "react-bootstrap";
import AdminLayout from "../layout/AdminLayout";
import adminApi from "../services/adminApi";

function Orders() {
  const [orders, setOrders] = useState([]);

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
            <th>Email</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>

              <td>{order.email}</td>

           <td>
  {order.items &&
    order.items.map((item) => (
      <div key={item.id}>
        {item.title} x {item.quantity}
      </div>
    ))}
</td>

              <td>₹{order.total_price}</td>

              <td>
                <Badge bg="warning">{order.status}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </AdminLayout>
  );
}

export default Orders;