const Path = {
  HOME: "/",
  MY_ACCOUNT: "/myAccount",
  PRODUCTS: {
    LIST: "/products/*",
    PRODUCTDETAILS: ":id/*",
    PRODUCTDESCRIPTION: ":id/*",
    PRODUCTADDITION: "addition",
    PRODUCTREVIEWS: "reviews",
  },
  CART: "/cart",
  RETURN_ORDER: "/returnOrder",
};

export default Path;
