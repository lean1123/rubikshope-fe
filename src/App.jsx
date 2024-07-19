import "./App.css";
import Header from "./components/header/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Category from "./features/category/Category";
import Cart from "./features/cart/Cart";
import Product from "./features/product/Product";
import PaymentReturn from "./features/payment/PaymentReturn";

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/*" element={<Product />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/returnOrder" element={<PaymentReturn />} />
      </Routes>
    </div>
  );
}

export default App;
