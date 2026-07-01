import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addToCart } from "../../features/cart/cartSlice";
import "../../styles/philatelicBooks.css";
import CartNotification from "../cart/CartNotification";

function PhilatelicBookCard({ product }) {
  const dispatch = useDispatch();
  const [showMessage, setShowMessage] = useState(false);
const handleAddToCart = () => {
  setShowMessage(true);

  setTimeout(() => {
    setShowMessage(false);
  }, 3000);

  dispatch(
    addToCart({
      id: product.product_id,
      title: product.tittle,
      image: `${import.meta.env.VITE_API_URL}/uploads/${product.product_image}`,
      description: product.description,
      price: product.price
    })
  );
};
console.log("showMessage:", showMessage);                             

  return (
    <>
      <div className="philatelic-card h-100">
        <div className="text-center mb-4">
        <img
  src={`${import.meta.env.VITE_API_URL}/uploads/${product.product_image}`}
  alt={product.tittle}
  className="philatelic-image"
/>
        </div>

        <div className="d-flex justify-content-between align-items-start mb-3">
          <h2 className="philatelic-author">{product.author}</h2>

          <h2 className="philatelic-price">
            £ {product.price}
          </h2>
        </div>

       <h4 className="philatelic-title">
  {product.tittle}
</h4>

        <p className="philatelic-description">
          {product.description}
        </p>

        <p className="philatelic-year">
          {product.year}
        </p>

        <div className="mt-auto text-end">
          <Button
            className="philatelic-btn"
            onClick={handleAddToCart}
          >
            Add to cart
          </Button>
        </div>
      </div>

  <CartNotification show={showMessage} />
    </>
  );
}

export default PhilatelicBookCard;