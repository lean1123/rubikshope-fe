import { createSlice } from "@reduxjs/toolkit";

const deleteItemFromLocalStorage = (id, cartID) => {
  let currentItemsInLocal = JSON.parse(localStorage.getItem("cartItems")) || [];

  currentItemsInLocal = currentItemsInLocal.filter(
    (item) => !(item.id === id && item.cartID === cartID)
  );

  localStorage.setItem("cartItems", JSON.stringify(currentItemsInLocal));
};

const refreshCartItemFromLocalstorage = (items) => {
  let currentItemsInLocal = JSON.parse(localStorage.getItem("cartItems")) || [];

  const itemsToRemove = new Set(
    items.map((item) => `${item.id}-${item.cartID}`)
  );

  currentItemsInLocal = currentItemsInLocal.filter(
    (localItem) => !itemsToRemove.has(`${localItem.id}-${localItem.cartID}`)
  );

  localStorage.setItem("cartItems", JSON.stringify(currentItemsInLocal));
};

const updateItemFromLocalstorage = (items) => {
  let currentItemsInLocal = JSON.parse(localStorage.getItem("cartItems")) || [];

  items.forEach((item) => {
    const index = currentItemsInLocal.findIndex(
      (localItem) =>
        localItem.cartID === item.cartID && localItem.id === item.id
    );

    if (index >= 0) {
      currentItemsInLocal[index].quantity = item.quantity;
    } else {
      currentItemsInLocal.push(item);
    }
  });

  localStorage.setItem("cartItems", JSON.stringify(currentItemsInLocal));
};

const filterListCartItem = (cartID) => {
  const listCartItem = JSON.parse(localStorage.getItem("cartItems"));

  if (listCartItem)
    return listCartItem.filter((item) => item.cartID === cartID);

  return [];
};

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    showMiniCart: false,
    cartID: null,
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

      newItem.cartID = state.cartID;

      const index = state.items.findIndex(
        (x) => x.id === newItem.id && x.cartID === newItem.cartID
      );

      if (index >= 0) {
        state.items[index].quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }

      updateItemFromLocalstorage(state.items);
    },
    setQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      const index = state.items.findIndex((x) => x.id === id);

      if (index >= 0) {
        state.items[index].quantity = quantity;
      }
      // saveToLocalStorage(state.items);
      updateItemFromLocalstorage(state.items);
    },
    removeFromCart: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index >= 0) {
        const id = state.items[index].id;
        const cartID = state.items[index].cartID;

        console.log("Id, CartID", id + " " + cartID);

        state.items = state.items.filter((x) => x.id !== action.payload.id);
        deleteItemFromLocalStorage(id, cartID);
      }
    },
    refreshCart: (state) => {
      const items = state.items;
      state.items = [];
      refreshCartItemFromLocalstorage(items);
    },
    setCartID: (state, action) => {
      state.cartID = action.payload;
      if (state.cartID) {
        state.items = filterListCartItem(state.cartID);
      }
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
  setCartID,
} = CartSlice.actions;

export default CartSlice.reducer;
