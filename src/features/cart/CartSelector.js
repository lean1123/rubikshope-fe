import { createSelector } from "@reduxjs/toolkit";

const cartItemsSelector = (state) => {
  return state.cart.items;
};

export const cartItemsCounter = createSelector(cartItemsSelector, (items) =>
  items.reduce((count, item) => count + item.quantity, 0)
);

export const cartItemsTotalView = createSelector(cartItemsSelector, (items) =>
  items.reduce((total, item) => total + item.product.unitPrice, 0)
);
