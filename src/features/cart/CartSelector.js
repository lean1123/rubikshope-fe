import { createSelector } from "@reduxjs/toolkit";

const cartItemsSelector = (state) => {
  // const cartID = state.cart.cartID;

  const items = state.cart.items;

  // return items.filter((item) => item.cartID === cartID);
  return items;
};

export const cartItemsCounter = createSelector(cartItemsSelector, (items) =>
  items.reduce((count, item) => count + item.quantity, 0)
);

export const cartItemsTotalView = createSelector(cartItemsSelector, (items) =>
  items.reduce((total, item) => total + item.product.unitPrice, 0)
);
