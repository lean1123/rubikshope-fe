import { Box } from "@mui/material";
import React from "react";
import { Route, Routes, useResolvedPath } from "react-router-dom";
import AdditionalInfo from "./components/video_menu/AdditionalInfo";
import DescriptionComponent from "./components/video_menu/DescriptionComponent";
import ReviewsComponent from "./components/video_menu/review_component/ReviewsComponent";
import ProductDetailPage from "./page/ProductDetail";
import ProductListPage from "./page/ProductListPage";

function Product() {
  return (
    <Box minHeight="400px" marginTop={4}>
      <Routes>
        <Route index element={<ProductListPage />} />
        <Route path=":id/*" element={<ProductDetailPage />}>
          <Route index element={<DescriptionComponent />} />
          <Route path="addition" element={<AdditionalInfo />} />
          <Route path="reviews" element={<ReviewsComponent />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default Product;
