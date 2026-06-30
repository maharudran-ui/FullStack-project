import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import { useState } from "react";
import CartNotification from "../cart/CartNotification";

function WestIndiesBooksCard({ book }) {
  const dispatch = useDispatch();
  const [showMessage, setShowMessage] = useState(false);
const handleAddToCart = () => {
  console.log("West Indies Add To Cart");

  setShowMessage(true);

  setTimeout(() => {
    setShowMessage(false);
  }, 3000);

  dispatch(
    addToCart({
      id: book.product_id,
      title: book.tittle,
      image: `http://localhost:5000/uploads/${book.product_image}`,
      description: book.description,
      price: book.price
    })
  );
};

  return (
    <Card className="border-0 text-center product-card h-100">
      <div className="stamp-img-frame">
        <img
  src={`http://localhost:5000/uploads/${book.product_image}`}
  alt={book.tittle}
  className="stamp-img"
/>
      </div>
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <div className="d-flex justify-content-between align-items-baseline mb-2">
            <span className="stamp-txt-year">{book.year}</span>
            <span className="stamp-txt-price">£ {book.price}</span>
          </div>
          <Card.Text className="product-title text-start mb-1 fw-bold">
            {book.author}
          </Card.Text>
         <Card.Title className="product-category text-start fs-6 text-muted">
  {book.tittle}
</Card.Title>
          {book.description && (
            <p className="small text-start text-secondary">{book.description}</p>
          )}
        </div>
        <div className="d-flex justify-content-end mt-2">
          <Button  className="stamp-add-btn" onClick={handleAddToCart}>
            Add to cart
          </Button>
        </div>
        
      </Card.Body>
      <CartNotification show={showMessage} />
    </Card>
  );
}

export default WestIndiesBooksCard;