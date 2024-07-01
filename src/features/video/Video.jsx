import { Box } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import VideoDetailPage from "./page/VideoDetail";
import VideoListPage from "./page/VideoListPage";
import DescriptionComponent from "./components/video_menu/DescriptionComponent";
import AdditionalInfo from "./components/video_menu/AdditionalInfo";
import ReviewsComponent from "./components/video_menu/ReviewsComponent";

Video.propTypes = {};

function Video(props) {
  return (
    <Box marginTop={4}>
      <Routes>
        <Route index element={<VideoListPage />} />
        <Route path=":id" element={<VideoDetailPage />}>
          <Route index element={<DescriptionComponent />} />
          <Route path="addition" element={<AdditionalInfo />} />
          <Route path="reviews" element={<ReviewsComponent />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default Video;
