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
import { Route, Routes, useParams } from "react-router-dom";
import AddToCartForm from "../components/AddToCartForm";
import VideoInfo from "../components/VideoInfo";
import VideoMenu from "../components/VideoMenu";
import VideoThumnail from "../components/VideoThumnail";
import AdditionalInfo from "../components/video_menu/AdditionalInfo";
import DescriptionComponent from "../components/video_menu/DescriptionComponent";
import ReviewsComponent from "../components/video_menu/ReviewsComponent";
import useVideoItem from "../hooks/VideoItemHook";
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

function VideoDetailPage(props) {
  const classes = useStyles();

  const param = useParams();

  // const pathName = useResolvedPath("").pathname;

  const { loading, video } = useVideoItem(param.id);

  if (loading) {
    return (
      <Box component="div" className={classes.loadingBox}>
        <CircularProgress />
      </Box>
    );
  }

  const handleAddtoCardFormSubmit = (values) => {
    console.log("Add to card", values);
  };

  return (
    <Box className={classes.root}>
      <Container>
        <Paper elevation={0}>
          <Grid container spacing={1}>
            <Grid item className={classes.left}>
              <VideoThumnail video={video} />
            </Grid>
            <Grid item className={classes.right}>
              <VideoInfo video={video} />
              <AddToCartForm onSubmit={handleAddtoCardFormSubmit} />
            </Grid>
          </Grid>
        </Paper>
        <VideoMenu />

        <Routes>
          <Route index element={<DescriptionComponent video={video} />} />
          <Route path="addition" element={<AdditionalInfo video={video} />} />
          <Route path="reviews" element={<ReviewsComponent video={video} />} />
        </Routes>
      </Container>
    </Box>
  );
}

export default VideoDetailPage;
