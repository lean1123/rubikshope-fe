import { Box, Grid, Container, Paper, createTheme } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  root: {},
  left: {
    width: "250px",
    borderRight: `1px solid ${theme.palette.grey[300]}`,
  },
  right: {
    flex: "1 1 0",
  },
}));

function VideoDetailPage(props) {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Container>
        <Grid container>
          <Grid item className={classes.left}>
            <Paper>Left</Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper>Right</Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default VideoDetailPage;
