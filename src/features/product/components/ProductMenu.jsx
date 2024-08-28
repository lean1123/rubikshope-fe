import { Box, Link, createTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { NavLink, useResolvedPath } from "react-router-dom";

ProductMenu.propTypes = {};

const theme = createTheme();

const useStyles = makeStyles(() => ({
  root: {
    padding: theme.spacing(2),
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "center",
    justifyContent: "center",

    listStyleType: "none",

    "& > li": {
      margin: theme.spacing(0, 2),
    },

    "& > li > a": {
      color: theme.palette.primary.main,
      textDecoration: "none",
    },

    "& > li > a.active": {
      color: theme.palette.grey[700],
      fontWeight: "bold",
    },
  },

  notActive: {
    color: theme.palette.primary.main + " !important",
    textDecoration: "none !important",
    fontWeight: "normal !important",
  },
}));

function ProductMenu({ descriptionActive }) {
  console.log(descriptionActive);

  const classes = useStyles();

  const indexPathname = useResolvedPath("").pathname;

  return (
    <Box component="ul" className={classes.root}>
      <li>
        <Link
          className={descriptionActive === false ? classes.notActive : ""}
          component={NavLink}
          to={`${indexPathname}`}
        >
          Description
        </Link>
      </li>
      <li>
        <Link component={NavLink} to={`${indexPathname}/addition`}>
          Addition Infomations
        </Link>
      </li>
      <li>
        <Link component={NavLink} to={`${indexPathname}/reviews`}>
          Reviews
        </Link>
      </li>
    </Box>
  );
}

export default ProductMenu;
