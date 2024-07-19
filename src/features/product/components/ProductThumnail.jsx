import { Box, CardMedia } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

ProductThumnail.propTypes = {
  video: PropTypes.object,
};

function ProductThumnail({ product }) {
  const handleImageUrl = () => {
    if (!product.image) {
      return "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg";
    } else {
      return product.image.substring(0, 5) === "https"
        ? product.image
        : `http://localhost:8888/admin/videos/images/${product.image}`;
    }
  };

  return (
    <Box>
      <CardMedia
        src={handleImageUrl()}
        component="img"
        alt="green iguana"
        height="374px"
      />
    </Box>
  );
}

export default ProductThumnail;
