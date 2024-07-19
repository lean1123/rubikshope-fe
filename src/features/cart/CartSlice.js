import { createSlice } from "@reduxjs/toolkit";

const saveToLocalStorage = (items) => {
  localStorage.setItem("cartItems", JSON.stringify(items));
};

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    showMiniCart: false,
    items: JSON.parse(localStorage.getItem("cartItems")) || [],
  },
  reducers: {
    showMiniCart: (state) => {
      state.showMiniCart = true;
    },
    hideMiniCart: (state) => {
      state.showMiniCart = false;
    },

    addToCart: (state, action) => {
      const newItem = action.payload;

      const index = state.items.findIndex((x) => x.id === newItem.id);

      if (index >= 0) {
        state.items[index].quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }

      saveToLocalStorage(state.items);
    },
    setQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      const index = state.items.findIndex((x) => x.id === id);

      if (index >= 0) {
        state.items[index].quantity = quantity;
      }
      saveToLocalStorage(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((x) => x.id !== action.payload.id);
      saveToLocalStorage(state.items);
    },
    refreshCart: (state) => {
      state.items = [];
      saveToLocalStorage(state.items);
    },
  },
  extraReducers: (builder) => {},
});

export const {
  showMiniCart,
  hideMiniCart,
  addToCart,
  setQuantity,
  removeFromCart,
  refreshCart,
} = CartSlice.actions;

export default CartSlice.reducer;
