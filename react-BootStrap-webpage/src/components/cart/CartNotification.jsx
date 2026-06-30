import { Link } from "react-router-dom";

function CartNotification({ show }) {
  if (!show) return null;

  return (
  <div
  className="cart-notification"
  style={{
    display: "flex",
    alignItems: "center",
    gap: "10px",
    minWidth: "350px",
  }}
>
  <span>Selected item has been added to cart.</span>

  <Link
  to="/cart"
  style={{
  
    fontWeight: "bold",
    textDecoration: "underline",
  }}
>
  View Cart
</Link>
</div>
  );
}

export default CartNotification;