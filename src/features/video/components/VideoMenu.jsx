import { Box, Link, createTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { NavLink, useResolvedPath } from "react-router-dom";

VideoMenu.propTypes = {};

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
      color: theme.palette.primary,
      textDecoration: "none",
    },

    "& > li > a.active": {
      color: theme.palette.grey[700],
      fontWeight: "bold",
    },
  },
}));

function VideoMenu(props) {
  const classes = useStyles();

  const pathName = useResolvedPath("").pathname;

  return (
    <Box component="ul" className={classes.root}>
      <li>
        <Link component={NavLink} to={`${pathName}`}>
          Description
        </Link>
      </li>
      <li>
        <Link component={NavLink} to={`${pathName}/addition`}>
          Addition Infomations
        </Link>
      </li>
      <li>
        <Link component={NavLink} to={`${pathName}/reviews`}>
          Reviews
        </Link>
      </li>
    </Box>
  );
}

export default VideoMenu;
