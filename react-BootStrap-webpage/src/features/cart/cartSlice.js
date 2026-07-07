import { createSlice } from "@reduxjs/toolkit";

const savedCart = localStorage.getItem("cartItems");

const initialState = {
  cartItems: savedCart ? JSON.parse(savedCart) : [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {

    removeFromCart: (state, action) => {
  state.cartItems = state.cartItems.filter(
    item => item.id !== action.payload
  );

  localStorage.setItem(
    "cartItems",
    JSON.stringify(state.cartItems)
  );
},
  addToCart: (state, action) => {
  const existingItem = state.cartItems.find(
    item => item.id === action.payload.id
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    state.cartItems.push({
      ...action.payload,
      quantity: 1,
    });
  }

  localStorage.setItem(
    "cartItems",
    JSON.stringify(state.cartItems)
  );
},
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;