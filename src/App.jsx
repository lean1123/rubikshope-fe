import "./App.css";
import Header from "./components/header/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Video from "./features/video/Video";
import Category from "./features/category/Category";

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/videos/*" element={<Video />} />
        <Route path="/categories" element={<Category />} />
      </Routes>
    </div>
  );
}

export default App;
