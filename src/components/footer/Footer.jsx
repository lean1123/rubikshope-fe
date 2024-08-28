import { Box, Container, createTheme, Grid } from "@mui/material";
import React from "react";
import ShopInfo from "./components/ShopInfo";
import Nocoppyright from "./components/Nocoppyright";
import { makeStyles } from "@mui/styles";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  root: {
    borderTop: `1px solid ${theme.palette.grey[300]}`,
  },
  container: {
    padding: `${theme.spacing(0)} !important`,
  },
  shopInfo: {},
  noCoppyright: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.text.secondary,
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <Box mt={2} sx={{ width: "100%" }} className={classes.root}>
      <Container sx={{ width: "100%" }} className={classes.container}>
        <Grid container className={classes.shopInfo}>
          <Grid item sx={{ width: "100%" }}>
            <ShopInfo />
          </Grid>
        </Grid>
        <Grid
          container
          width="100%"
          className={classes.noCoppyright}
          textAlign="center"
        >
          <Grid item width="100%">
            <Nocoppyright />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;
