import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import Product from "./Product";

ProductList.propTypes = {
  data: PropTypes.array,
};

function ProductList({ data }) {
  return (
    <Box>
      <Grid container>
        {data.map((product, index) => (
          <Grid item sm={6} md={4} key={product.id || index}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductList;
