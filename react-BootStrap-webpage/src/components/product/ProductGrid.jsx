import { Row, Col } from "react-bootstrap";
import ProductCard from "./ProductCard";

function ProductGrid({ products }) {
  return (
    <Row className="gx-4 gy-4">

      {products.map((item) => (

        <Col lg={4} md={6} sm={6} xs={12} key={item.id}>
          <ProductCard product={item} />
        </Col>

      ))}

    </Row>
  );
}

export default ProductGrid;