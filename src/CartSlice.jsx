/** @format */

import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const plant = action.payload;
      const existingItem = state.items.find((item) => item.name === plant.name);
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice =
          existingItem.quantity * parseFloat(existingItem.cost.substring(1));
      } else {
        const price = parseFloat(plant.cost.substring(1));
        state.items.push({
          ...plant,
          quantity: 1,
          totalPrice: price,
        });
      }
      // Update total quantity and amount
      state.totalQuantity = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.totalPrice,
        0
      );
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find((item) => item.name === name);
      if (item) {
        item.quantity = quantity;
        item.totalPrice = quantity * parseFloat(item.cost.substring(1));
        // Update totals
        state.totalQuantity = state.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
        state.totalAmount = state.items.reduce(
          (total, item) => total + item.totalPrice,
          0
        );
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.name !== action.payload);
      // Update totals after removal
      state.totalQuantity = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.totalPrice,
        0
      );
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
    checkout: (state) => {
      // Only show the alert without clearing the cart
      alert("Functionality to be added for future reference");
      // Don't clear the cart here
    },
  },
});

// Make sure checkout is included in the exports
export const { addItem, updateQuantity, removeItem, clearCart, checkout } =
  CartSlice.actions;
export default CartSlice.reducer;
