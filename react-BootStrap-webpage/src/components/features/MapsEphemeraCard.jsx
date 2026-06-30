
import React from "react";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import { useState } from "react";
import CartNotification from "../cart/CartNotification";

function MapsEphemeraCard({ item }) {
  const dispatch = useDispatch();
  const [showMessage, setShowMessage] = useState(false);
  const handleAddToCart = () => {
  setShowMessage(true);

  setTimeout(() => {
    setShowMessage(false);
  }, 3000);

  dispatch(addToCart(product));
};

  return (
    <Card className="border-0 text-center product-card h-100">
      <div className="product-img-frame" style={{ background: "#fff", padding: "15px" }}>
        <Card.Img variant="top"src={item.image}className="product-image"
          style={{ maxHeight: "200px", objectFit: "contain" }}
        />
      </div>
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Text className="product-title mb-1" style={{ fontWeight: "600" }}>
            {item.title}
          </Card.Text>
          <Card.Subtitle className="text-muted small mb-2">
            {item.author} ({item.year})
          </Card.Subtitle>
          <Card.Title className="product-price" style={{ color: "#803300" }}>
            Extra Price ₹{item.price}
          </Card.Title>
        </div>
        <button 
          className="btn btn-sm mt-3 w-100 text-white" style={{ backgroundColor: "#803300" }}
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </Card.Body>
      <CartNotification show={showMessage} />
    </Card>
  );
}

export default MapsEphemeraCard;