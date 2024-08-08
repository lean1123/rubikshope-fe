import { Box, createTheme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  root: {},
  containing: {
    "& > h6": {
      paddingTop: theme.spacing(1),
    },
  },
}));

function AboutOur() {
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="h6" fontWeight="bold" padding="8px 0">
        ABOUT OUR
      </Typography>
      <Box className={classes.containing}>
        <Typography variant="subtitle2" fontWeight="bold">
          Top one in VietNam
        </Typography>
        <Typography variant="subtitle2" fontWeight="bold">
          Address: <Typography component="span">Q1, HoChiMinh City</Typography>
        </Typography>
        <Typography variant="subtitle2" fontWeight="bold">
          Phone number:<Typography component="span">0123456789</Typography>
        </Typography>
        <Typography variant="subtitle2" fontWeight="bold">
          Email: <Typography component="span">rubikshop@shopvn.vn</Typography>
        </Typography>
      </Box>
    </Box>
  );
}

export default AboutOur;
