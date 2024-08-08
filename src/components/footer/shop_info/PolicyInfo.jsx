import { Box, createTheme, Link, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { NavLink } from "react-router-dom";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  root: {},
  containing: {
    paddingLeft: 0,

    "& > li": {
      paddingTop: theme.spacing(1),
      listStyle: "none",
      "& > a": {
        color: theme.palette.text.primary,
        textDecoration: "none",
      },
    },
  },
}));

function PolicyInfo() {
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="h6" fontWeight="bold" padding="8px 0">
        INFOMATIONS
      </Typography>
      <Box>
        <ul className={classes.containing}>
          <li>
            <Link component={NavLink} to={"/privatePolicy"}>
              Private Policy
            </Link>
          </li>
          <li>
            <Link component={NavLink} to={"/privatePolicy"}>
              Private Policy
            </Link>
          </li>
          <li>
            <Link component={NavLink} to={"/privatePolicy"}>
              Private Policy
            </Link>
          </li>
        </ul>
      </Box>
    </Box>
  );
}

export default PolicyInfo;
