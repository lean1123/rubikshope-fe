import { Paper, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

DescriptionComponent.propTypes = {
  video: PropTypes.object,
};

function DescriptionComponent({ video = {} }) {
  return (
    <Paper elevation={0}>
      <Typography textAlign="center" component="h2">
        {video.description}
      </Typography>
    </Paper>
  );
}

export default DescriptionComponent;
