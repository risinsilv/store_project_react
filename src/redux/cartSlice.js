// redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Holds the cart items
  },
  reducers: {
    addToCart: (state, action) => {
      // Check if the item already exists in the cart and update quantity
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        existingItem.total = existingItem.price * existingItem.quantity;
      } else {
        state.items.push(action.payload); // Add new item to cart
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id); // Remove item from cart
    },
    clearCart: (state) => {
      state.items = []; // Clear all items from the cart
    },
  },
});

export const { addToCart, removeFromCart,clearCart } = cartSlice.actions;
export default cartSlice.reducer;
