// src/components/product/StampsCoversGrid.jsx
import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import StampsCoversCard from "../features/StampsCoversCard";

function StampsCoversGrid({ items }) {
  return (
    <Row className="gx-4 gy-4 justify-content-start">
      {items.map((item) => (
        <Col key={item.id} lg={4} md={4} sm={6} xs={12} className="d-flex align-items-stretch">
          <StampsCoversCard item={item} />
        </Col>
      ))}
    </Row>
  );
}

export default StampsCoversGrid;