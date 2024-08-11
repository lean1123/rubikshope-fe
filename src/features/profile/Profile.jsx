import {
  Box,
  CircularProgress,
  Container,
  createTheme,
  Grid,
  Paper,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import useGetMyAccount from "./hooks/UseMyInfo";
import UserInfomation from "./component/UserInfomation";
import ListOrder from "./component/ListOrder";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  root: {},
  container: {
    padding: "12px",
  },

  loadingBox: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: theme.palette.primary.main,
  },
}));

function Profile() {
  const classes = useStyles();
  const { user, loading } = useGetMyAccount();

  if (loading) {
    return (
      <Box minHeight="400px" component="div" className={classes.loadingBox}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box minHeight="400px">
      <Container>
        <Grid container m={2} p={2}>
          <Grid item flex="2" mr={1}>
            <Paper elevation="2">
              <ListOrder />
            </Paper>
          </Grid>
          <Grid item flex="1">
            <Paper elevation="2">
              <UserInfomation user={user} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Profile;
