import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import WestIndiesBooksCard from "../features/WestIndiesBooksCard";

function WestIndiesBooksGrid({ books }) {
  return (
    <Row className="gx-4 gy-4 justify-content-start">
      {books.map((book) => (
        <Col key={book.id} lg={3} md={4} sm={6} xs={12} className="d-flex align-items-stretch">
          <WestIndiesBooksCard book={book} />
        </Col>
      ))}
    </Row>
  );
}

export default WestIndiesBooksGrid;