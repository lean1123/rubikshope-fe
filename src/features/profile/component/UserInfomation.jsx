import { Box, createTheme, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import React from "react";
import { Container } from "react-bootstrap";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  root: {},
  button: {
    border: "none",
    backgroundColor: theme.palette.primary.main,
    color: "#ffffff",
    padding: theme.spacing(1),
    borderRadius: "5px",
    width: "100%",

    "&:hover": {
      backgroundColor: "#0d1b6b",
    },
  },
  container: {
    padding: "12px",
  },
}));

UserInfomation.propTypes = {
  user: PropTypes.object,
};

function UserInfomation({ user = {} }) {
  const classes = useStyles();
  return (
    <Box>
      <Container className={classes.container}>
        <Grid container mb={1}>
          <Grid item>
            <Typography
              component="div"
              variant="caption"
              mb={1}
              fontWeight="bold"
              fontSize="24px"
            >
              MY ACCOUNT
            </Typography>
            <Box>
              <Typography variant="subtitle2">
                Full Name:
                <span style={{ fontWeight: "bold", marginLeft: 4 }}>
                  {user.fullName}
                </span>
              </Typography>
              <Typography variant="subtitle2">
                Address:
                <span style={{ fontWeight: "bold", marginLeft: 4 }}>
                  {user.address}
                </span>
              </Typography>
              <Typography variant="subtitle2">
                Email:
                <span style={{ fontWeight: "bold", marginLeft: 4 }}>
                  {user.email}
                </span>
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Grid item width="100%" mb={1}>
            <Box component="button" className={classes.button}>
              Update Account
            </Box>
          </Grid>
          <Grid item width="100%">
            <Box component="button" className={classes.button}>
              Logout
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default UserInfomation;
