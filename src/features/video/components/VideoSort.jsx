import React from "react";
import PropTypes from "prop-types";
import { Box, Tab, Tabs } from "@mui/material";

VideoSort.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

function VideoSort({ currentValue, onChange }) {
  const handleOnchange = (event, newValue) => {
    console.log(currentValue);
    if (onChange) onChange(newValue);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }} marginBottom="20px">
      <Tabs
        value={currentValue}
        onChange={handleOnchange}
        aria-label="basic tabs example"
      >
        <Tab label="Descending by title" value={"dsc"} />
        <Tab label="Ascending by title" value={"asc"} />
      </Tabs>
    </Box>
  );
}

export default VideoSort;
