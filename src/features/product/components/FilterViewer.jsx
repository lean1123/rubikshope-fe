import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { Box, Chip, createTheme } from "@mui/material";

FilterViewer.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

const theme = createTheme();

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "center",

    margin: theme.spacing(2, 0),
    listStyle: "none",

    "& > li": {
      padding: theme.spacing(1),
      margin: 0,
    },
  },
}));

const FILTER_LIST = [
  {
    id: 1,
    getLabel: () => "Filter by active status",
    isActive: () => true,
    isVisible: (filters) => filters.isActive,
    isRemovable: false,
    onRemove: () => {},
    onToggle: (filters) => {
      const currentFilters = { ...filters };

      if (currentFilters.isActive) {
        delete currentFilters.isActive;
      } else {
        currentFilters.isActive = true;
      }

      return currentFilters;
    },
  },
  {
    id: 2,
    getLabel: (filters) => `Filter by category name`,
    isActive: (filters) => filters.categoryID !== undefined,
    isVisible: (filters) => filters.categoryID != null,
    isRemovable: true,
    onRemove: (filters) => {
      const currentFilters = { ...filters };
      delete currentFilters.categoryID;
      return currentFilters;
    },
    onToggle: () => {},
  },
  {
    id: 3,
    getLabel: (filters) =>
      `From ${filters.startAmount} to ${filters.endAmount}`,
    isActive: (filters) =>
      filters.startAmount !== undefined && filters.endAmount !== undefined,
    isVisible: (filters) =>
      filters.startAmount !== undefined && filters.endAmount !== undefined,
    isRemovable: true,
    onRemove: (filters) => {
      const currentFilters = { ...filters };
      delete currentFilters.startAmount;
      delete currentFilters.endAmount;
      return currentFilters;
    },
    onToggle: () => {},
  },
];

function FilterViewer({ filters = {}, onChange }) {
  const classes = useStyles();

  const filterVisible = useMemo(() => {
    return FILTER_LIST.filter((filterItem) => filterItem.isActive(filters));
  }, [filters]);

  return (
    <Box component="ul" className={classes.root}>
      {filterVisible.map((item) => (
        <li key={item.id}>
          <Chip
            size="small"
            label={item.getLabel(filters)}
            color={item.isVisible(filters) ? "primary" : "default"}
            clickable={!item.isRemovable}
            onDelete={
              item.isRemovable
                ? () => {
                    if (!onChange) return;

                    const newFilters = item.onRemove(filters);
                    onChange(newFilters);
                  }
                : null
            }
            onClick={
              item.isRemovable
                ? null
                : () => {
                    if (!onChange) return;

                    const newFilters = item.onToggle(filters);
                    onChange(newFilters);
                  }
            }
          />
        </li>
      ))}
    </Box>
  );
}

export default FilterViewer;
