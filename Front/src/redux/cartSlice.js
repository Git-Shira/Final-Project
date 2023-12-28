import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const initialState = {
  item: [],
  totalAmount: 0,
};
const CalculateTotelAmount = (item) => {
  let totalAmount = 0;
  for (const item of item) {
    totalAmount += item.price * item.quantity;
  }
  return totalAmount;
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = state.item.find((item) => item.id === action.payload.id);

      if (item) {
        item.quantity += 1;
        state.totalAmount += item.price;
        return;
      }
      state.item.push(action.payload);
      state.totalAmount += action.payload.price;
    },

    editItem: (state, action) => {
      debugger;
      const item = state.item.find((item) => item.id === action.payload.id);
      if (item) {
        const prevTOtalPrice = item.price * item.quantity; //Calculate the previous total price of the item
        item.quantity = action.payload.quantity; //Update the quantity of the item
        const newTotalPrice = item.price * item.quantity; //Calculate the new total price of the item

        //Update the total amount by subtracting the previous total price and adding the new total price
        state.totalAmount = state.totalAmount - prevTOtalPrice + newTotalPrice;
      }
    },

    removeItem: (state, action) => {
      const itenIdtoToRemove = action.payload;
      const ItemToRemove = state.item.find(
        (item) => item.id === itenIdtoToRemove
      );

      if (ItemToRemove) {
        //Subtract the total price of the removed item
        state.totalAmount -= ItemToRemove.price * ItemToRemove.quantity;

        // Remove the item from array
        state.item = state.item.filter((item) => item.id !== itenIdtoToRemove);
        return;
      }
    },
  },
});

export const { addItem, removeItem, editItem } = cartSlice.actions;
export default cartSlice.reducer;
