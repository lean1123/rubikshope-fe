import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthApi from "../../api/admin/auth/AuthApi";

// async action -> register
export const register = createAsyncThunk("/register", async (payload) => {
  const authApi = new AuthApi();
  const data = await authApi.register(payload);

  const newUser = data.data;

  // Save data to localstorage
  localStorage.setItem("jwt", data.jwt);
  localStorage.setItem("user", JSON.stringify(newUser));

  return newUser;
});

// async action -> register
export const login = createAsyncThunk("/login", async (payload) => {
  const authApi = new AuthApi();
  const data = await authApi.login(payload);

  const newUser = data.data.data;

  // Save data to localstorage
  localStorage.setItem("jwt", data.jwt);
  localStorage.setItem("user", JSON.stringify(newUser));

  return newUser;
});

const AuthSlice = createSlice({
  name: "users",
  initialState: {
    current: JSON.parse(localStorage.getItem("user")) || {},
    setting: {},
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("jwt");

      state.current = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.current = action.payload;
      });
  },
});

export const { logout } = AuthSlice.actions;

export default AuthSlice.reducer;
