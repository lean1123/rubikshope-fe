import React from "react";
import PropTypes from "prop-types";
import { Box, CardMedia, createTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";

VideoThumnail.propTypes = {
  video: PropTypes.object,
};

const theme = createTheme();

const useStyles = makeStyles(() => ({
  poster: {},
}));

function VideoThumnail({ video }) {
  const handleImageUrl = () => {
    if (!video.poster) {
      return "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg";
    } else {
      return video.poster.substring(0, 5) === "https"
        ? video.poster
        : `http://localhost:8888/admin/videos/images/${video.poster}`;
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

export default VideoThumnail;
