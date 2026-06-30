import React from "react";
import { Container, Card } from "react-bootstrap";

function Order() {
  return (
    <Container className="mt-4">
      <Card className="p-4">
        <h2>Order Placed Successfully 🎉</h2>

        <p>
          Thank you for your order. We will process it soon.
        </p>

        <p>
          You can track your order in your account or contact support.
        </p>
      </Card>
    </Container>
  );
}

export default Order;