import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Cart from "./features/cart/Cart";
import Category from "./features/category/Category";
import PaymentReturn from "./features/payment/PaymentReturn";
import Product from "./features/product/Product";
import Profile from "./features/profile/Profile";

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myAccount" element={<Profile />} />
        <Route path="/products/*" element={<Product />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/returnOrder" element={<PaymentReturn />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
