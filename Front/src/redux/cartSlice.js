import { createSlice, configureStore } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// Helper function to calculate total amount
const calculateTotalAmount = (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

// Attempt to initialize cart from cookies or set to initial state
const initialState = {
  items: Cookies.get("cart") ? JSON.parse(Cookies.get("cart")) : [],
  totalAmount: 0,
};

// Initialize totalAmount based on items
initialState.totalAmount = calculateTotalAmount(initialState.items);
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Action to add an item to the cart
    addItem: (state, action) => {
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingIndex >= 0) {
        state.items[existingIndex].quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      state.totalAmount = calculateTotalAmount(state.items);
    },

    // Action to edit an item's quantity in the cart
    editItem: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index].quantity = action.payload.quantity;
        state.totalAmount = calculateTotalAmount(state.items);
      }
    },

    // Action to remove an item from the cart
    removeItem: (state, action) => {
      // debugger;
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalAmount = calculateTotalAmount(state.items);
    },

    // Action to clear the cart
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

// Middleware for syncing cart state with cookies
export const cartPersistenceMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type.startsWith("cart/")) {
    const nextState = store.getState();
    Cookies.set("cart", JSON.stringify(nextState.cart.items));
  }
  return result;
};
// Export actions for use in components
export const { addItem, removeItem, editItem, clearCart } = cartSlice.actions;

// Export the reducer as default export
export default cartSlice.reducer;