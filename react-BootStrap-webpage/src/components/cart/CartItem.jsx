import React from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { removeFromCart }from "../../features/cart/cartSlice";

function CartItem({ item }) {

  const dispatch = useDispatch();
  return (

    <div className="cart-item">

      <img src={item.image} alt={item.title} className="cart-image" />

      <div className="cart-info">
        <div className="cart-top">
          <h4>{item.title}</h4>
          <h4>£ {item.price}</h4>
        </div>
        <p>{item.description}</p>

      </div>

      <button className="delete-btn" onClick={() =>
          dispatch(removeFromCart(item.id))}
      >
        <FaTrash />
      </button>

    </div>
  );
}

export default CartItem;