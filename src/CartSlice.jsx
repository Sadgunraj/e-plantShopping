import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize cart state with empty array
  },
  reducers: {
    addItem: (state, action) => {
      const plant = action.payload;
      const existingItem = state.items.find(item => item.name === plant.name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...plant, quantity: 1 });
      }
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find(item => item.name === name);
      if (item) {
        item.quantity = quantity;
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload); // Updated to handle string payload
    },
  },
});

export const { addItem, updateQuantity, removeItem } = CartSlice.actions;
export default CartSlice.reducer;