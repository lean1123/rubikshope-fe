import { Box } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import VideoDetailPage from "./page/VideoDetail";
import VideoListPage from "./page/VideoListPage";

Video.propTypes = {};

function Video(props) {
  return (
    <Box marginTop={4}>
      <Routes>
        <Route index element={<VideoListPage />} />
        <Route path=":id" element={<VideoDetailPage />} />
      </Routes>
    </Box>
  );
}

export default Video;
