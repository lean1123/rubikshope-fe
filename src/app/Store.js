import authReducer from "../features/auth/AuthSlice.js";
import cartReducer from "../features/cart/CartSlice.js";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    users: authReducer,
    cart: cartReducer,
  },
});

export default store;
