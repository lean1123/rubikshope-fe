import authReducer from "../features/auth/AuthSlice.js";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    users: authReducer,
  },
});

export default store;
