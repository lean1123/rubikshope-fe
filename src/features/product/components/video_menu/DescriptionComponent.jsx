import { Paper, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

DescriptionComponent.propTypes = {
  product: PropTypes.object,
};

function DescriptionComponent({ product = {} }) {
  return (
    <Paper elevation={0}>
      <Typography textAlign="center" component="h2">
        {product.description}
      </Typography>
    </Paper>
  );
}

export default DescriptionComponent;
