import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

AdditionalInfo.propTypes = {
  product: PropTypes.object,
};

function AdditionalInfo({ product = {} }) {
  return (
    <Box>
      <Box dangerouslySetInnerHTML={{ __html: product.additionalInfo }} />
    </Box>
  );
}

export default AdditionalInfo;
