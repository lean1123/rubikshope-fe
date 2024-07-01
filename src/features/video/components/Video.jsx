import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import {
  Box,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

Video.propTypes = {
  video: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  minHeight: {
    minHeight: "138px",
  },
}));

function Video({ video }) {
  const classes = useStyles();

  const navigate = useNavigate();

  const handleClickVideo = () => {
    navigate(`${video.videoID}`);
  };

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
    <Box padding={1} onClick={handleClickVideo}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          src={handleImageUrl()}
          className={classes.minHeight}
        />

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {video.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {video.description}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Views: {video.views}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default Video;
