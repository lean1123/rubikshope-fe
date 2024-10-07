import { Box } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import AppRoutes from "../../routes/AppRoutes";

function Product() {
  return (
    <Box minHeight="400px" marginTop={4}>
      <Routes>
        <Route index Component={AppRoutes.listProductsIndex.component} />
        <Route
          path={AppRoutes.productDetails.path}
          Component={AppRoutes.productDetails.component}
        >
          <Route index Component={AppRoutes.productDescription.component} />
          <Route
            path={AppRoutes.productAddition.path}
            Component={AppRoutes.productAddition.component}
          />
          <Route
            path={AppRoutes.productReviews.path}
            Component={AppRoutes.productReviews.component}
          />
        </Route>
      </Routes>
    </Box>
  );
}

export default Product;
