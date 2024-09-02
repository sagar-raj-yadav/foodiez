import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  orders: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
   
    moveToOrders: (state) => {
      state.orders.push(...state.items); // Move items from cart to orders
      state.items = []; // Clear items from cart
    },
    incrementQuantity: (state, action) => {
      const { name, size } = action.payload;
      const item = state.items.find(item => item.name === name && item.size === size);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const { name, size } = action.payload;
      const item = state.items.find(item => item.name === name && item.size === size);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
});

export const { addToCart, removeFromCart, moveToOrders, incrementQuantity, decrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;
