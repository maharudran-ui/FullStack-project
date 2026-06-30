import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PhilatelicBookCard from "../features/PhilatelicBookCard";

function PhilatelicBookGrid({ products }) {

  return (
    <Row className="gx-4 gy-4">
      {products.map((product) => (

        <Col key={product.product_id} lg={3} md={4} sm={6} xs={12}>
          <PhilatelicBookCard product={product} />
        </Col>
      ))}
    </Row>
  );
}

export default PhilatelicBookGrid;