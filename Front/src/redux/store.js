import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
import favprutesReducer from "./favoritesSlice";
import cartPersistenceMiddleware from "./cartPersistenceMiddleware";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    favorites: favprutesReducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(cartPersistenceMiddleware),
});

export default store;