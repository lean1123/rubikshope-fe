import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import Video from "./Video";

VideoList.propTypes = {
  data: PropTypes.array,
};

function VideoList({ data }) {
  return (
    <Box>
      <Grid container>
        {data.map((video, index) => (
          <Grid item sm={6} md={4} key={video.id || index}>
            <Video video={video} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default VideoList;
