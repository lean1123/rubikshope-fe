import { Box, createTheme, Grid, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  containing: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(2),
  },
  textFieldWrap: {
    flexGrow: 1,
    marginRight: theme.spacing(1),
  },
  textField: {
    "& > div": {
      borderRadius: "0",
      borderTopLeftRadius: "4px",
      borderBottomLeftRadius: "4px",
    },
  },
  button: {
    height: "100%",
    backgroundColor: theme.palette.primary.light,
    color: "#ffffff",
    padding: theme.spacing(2),
    border: "none",
    borderTopRightRadius: "4px",
    borderBottomRightRadius: "4px",
    "&:hover": {
      backgroundColor: "#0d1b6b",
    },
  },
}));

function InfoRegister() {
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h6" fontWeight="bold" padding="8px 0">
        REGIST TO RECEIV INFO
      </Typography>
      <Box component="form" className={classes.containing}>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item className={classes.textFieldWrap}>
            <TextField
              id="outlined-helperText"
              placeholder="Send your email..."
              variant="outlined"
              fullWidth
              className={classes.textField}
            />
          </Grid>
          <Grid item>
            <Box
              component="button"
              type="submit"
              variant="contained"
              className={classes.button}
            >
              REGISTER
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default InfoRegister;
