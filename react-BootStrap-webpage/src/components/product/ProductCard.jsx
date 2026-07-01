import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import "../../styles/product.css";

function ProductCard({ product }) {
  const navigate = useNavigate();

 const handleClick = () => {
 navigate("/track-order", {
  state: {
    category: product.category_name,
  },
});
};

const categoryMap = {
  1: "Philatelic Books",
  2: "West Indies Books",
  3: "Miscellaneous books",
  4: "Maps, Prints, Photographs Ephemera",
  5: "Old Picture Postcards",
  6: "Stamps and Covers"
};

  return (
    <Card
      className="collectable-card border-0"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <div className="collectable-image-wrapper">
        <Card.Img
  variant="top"
  src={
    product.product_image
      ? `${import.meta.env.VITE_API_URL}/uploads/${product.product_image}`
      : product.image
  }
  className="collectable-image"
/>
      </div>

      <Card.Body className="text-center">
       <Card.Title className="collectable-title">
  {product.tittle || product.title}
</Card.Title>

<Card.Text className="small text-muted">
 {product.description
  ? `${product.description.substring(0, 80)}...`
  : ""}
</Card.Text>

<Card.Text className="collectable-category">
 {product.category_name || product.category}
</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;