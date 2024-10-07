import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route
          path={AppRoutes.home.path}
          Component={AppRoutes.home.component}
        />
        <Route
          path={AppRoutes.myAccount.path}
          Component={AppRoutes.myAccount.component}
        />
        <Route
          path={AppRoutes.listProducts.path}
          Component={AppRoutes.listProducts.component}
        />
        <Route
          path={AppRoutes.cart.path}
          Component={AppRoutes.cart.component}
        />
        <Route
          path={AppRoutes.returnOrder.path}
          Component={AppRoutes.returnOrder.component}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
