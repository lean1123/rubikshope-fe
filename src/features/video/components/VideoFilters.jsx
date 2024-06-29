import React from "react";
import PropTypes from "prop-types";
import FilterByCategory from "./filters/FilterByCategory";
import FilterByViews from "./filters/FilterByViews";
import { Box } from "@mui/material";
import FilterByActive from "./filters/FilterByActive";

VideoFilters.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

function VideoFilters({ filters, onChange }) {
  const handleByCategoryChange = (newCategoryId) => {
    if (!onChange) return;

    const newFilter = {
      ...filters,
      categoryID: newCategoryId,
    };

    onChange(newFilter);
  };

  const handleByViewFilterChange = (viewOptional) => {
    const { startAmount, endAmount } = viewOptional;
    if (!onChange) return;

    const newFilter = {
      ...filters,
      startAmount,
      endAmount,
    };

    onChange(newFilter);
  };

  const handleFilterByActive = (activeValue) => {
    const { isActive } = activeValue;

    if (!onChange) return;

    const newFilter = {
      ...filters,
      isActive,
    };

    console.log("new filters by views", newFilter);

    onChange(newFilter);
  };

  return (
    <Box>
      <FilterByCategory onChange={handleByCategoryChange} />
      <FilterByViews onChange={handleByViewFilterChange} />
      <FilterByActive filters={filters} onChange={handleFilterByActive} />
    </Box>
  );
}

export default VideoFilters;
