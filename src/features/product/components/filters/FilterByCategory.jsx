import { Box, Typography, createTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import CategoryService from "../../../../services/CategoryService";

FilterByCategory.propTypes = {
  onChange: PropTypes.func,
};

const theme = createTheme();

const useStyles = makeStyles(() => ({
  root: {
    padding: theme.spacing(2),
  },

  menu: {
    padding: 0,
    margin: 0,
    listStyle: "none",

    "& > li": {
      marginTop: theme.spacing(1),
      transition: "all .25s",

      "&:hover": {
        cursor: "pointer",
        color: theme.palette.primary.dark,
      },
    },
  },
}));

function FilterByCategory({ onChange }) {
  const classes = useStyles();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchListCategories = async () => {
      try {
        const categories = await CategoryService.getListCategories();

        setCategories(categories);
      } catch (error) {
        console.error("Error in FilterByCategory: ", error);
      }
    };

    fetchListCategories();
  }, []);

  const handleCategoryClick = (category) => {
    if (onChange) onChange(category.id);
  };

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">FILTER BY CATEGORIES</Typography>

      <ul className={classes.menu}>
        {categories.map((category) => (
          <li key={category.id} onClick={() => handleCategoryClick(category)}>
            <Typography variant="body2">{category.categoryName}</Typography>
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default FilterByCategory;
