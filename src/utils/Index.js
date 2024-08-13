export const ccyFormat = (num = 0) => {
  return `${num.toFixed(2)}`;
};

export const priceFormat = (price) => {
  return price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};
