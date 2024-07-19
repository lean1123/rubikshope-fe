import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Paper,
  createTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useParams } from "react-router-dom";
import AddToCartForm from "../components/AddToCartForm";
import AdditionalInfo from "../components/video_menu/AdditionalInfo";
import DescriptionComponent from "../components/video_menu/DescriptionComponent";
import ReviewsComponent from "../components/video_menu/ReviewsComponent";
import useProductItem from "../hooks/ProductItemHook";

import { addToCart } from "../../cart/CartSlice";
import ProductInfo from "../components/ProductInfo";
import ProductMenu from "../components/ProductMenu";
import ProductThumnail from "../components/ProductThumnail";
// import VideoThumnail from "";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  root: {},
  left: {
    width: "600px",
    borderRight: `1px solid ${theme.palette.grey[300]}`,
    padding: theme.spacing(1.5),
  },
  right: {
    flex: "1 1 0",
    padding: theme.spacing(1.5),
  },
  loadingBox: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function ProductDetailPage(props) {
  const classes = useStyles();

  const param = useParams();

  // const pathName = useResolvedPath("").pathname;

  const { loading, product } = useProductItem(param.id);

  console.log(product);

  const dispatch = useDispatch();

  if (loading) {
    return (
      <Box component="div" className={classes.loadingBox}>
        <CircularProgress />
      </Box>
    );
  }

  const handleAddtoCardFormSubmit = (formValues) => {
    const action = addToCart({
      id: product.productID,
      product,
      quantity: formValues.quantity,
    });

    dispatch(action);
  };

  return (
    <Box className={classes.root}>
      <Container>
        <Paper elevation={0}>
          <Grid container spacing={1}>
            <Grid item className={classes.left}>
              <ProductThumnail product={product} />
            </Grid>
            <Grid item className={classes.right}>
              <ProductInfo product={product} />
              <AddToCartForm onSubmit={handleAddtoCardFormSubmit} />
            </Grid>
          </Grid>
        </Paper>
        <ProductMenu />

        <Routes>
          <Route index element={<DescriptionComponent product={product} />} />
          <Route
            path="addition"
            element={<AdditionalInfo product={product} />}
          />
          <Route
            path="reviews"
            element={<ReviewsComponent product={product} />}
          />
        </Routes>
      </Container>
    </Box>
  );
}

export default ProductDetailPage;
