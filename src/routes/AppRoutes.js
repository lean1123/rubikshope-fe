import Home from "../components/home/Home";
import Cart from "../features/cart/Cart";
import PaymentReturn from "../features/payment/PaymentReturn";
import AdditionalInfo from "../features/product/components/video_menu/AdditionalInfo";
import DescriptionComponent from "../features/product/components/video_menu/DescriptionComponent";
import ReviewsComponent from "../features/product/components/video_menu/review_component/ReviewsComponent";
import ProductDetailPage from "../features/product/page/ProductDetail";
import ProductListPage from "../features/product/page/ProductListPage";
import Product from "../features/product/Product";
import Profile from "../features/profile/Profile";
import Path from "./Path";

const AppRoutes = {
  home: {
    path: Path.HOME,
    component: Home,
  },
  myAccount: {
    path: Path.MY_ACCOUNT,
    component: Profile,
  },
  listProducts: {
    path: Path.PRODUCTS.LIST,
    component: Product,
  },
  listProductsIndex: {
    path: Path.PRODUCTS.LIST,
    component: ProductListPage,
  },
  productDetails: {
    path: Path.PRODUCTS.PRODUCTDETAILS,
    component: ProductDetailPage,
  },
  productDescription: {
    path: Path.PRODUCTS.PRODUCTDESCRIPTION,
    component: DescriptionComponent,
  },
  productAddition: {
    path: Path.PRODUCTS.PRODUCTADDITION,
    component: AdditionalInfo,
  },
  productReviews: {
    path: Path.PRODUCTS.PRODUCTREVIEWS,
    component: ReviewsComponent,
  },
  cart: {
    path: Path.CART,
    component: Cart,
  },
  returnOrder: {
    path: Path.RETURN_ORDER,
    component: PaymentReturn,
  },
};

export default AppRoutes;
