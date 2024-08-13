import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, TextField, Typography, createTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FilterAlt } from "@mui/icons-material";

FilterByViews.propTypes = {
  onChange: PropTypes.func,
};

const theme = createTheme();

const useStyles = makeStyles(() => ({
  root: {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.grey[300]}`,
  },

  range: {
    display: "flex",
    flexFlow: "row",
    alignItems: "center",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),

    "& > span": {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  },
}));

function FilterByViews({ onChange }) {
  const classes = useStyles();

  const [values, setValues] = useState({
    startAmount: 0,
    endAmount: 0,
  });

  const handleOnchangeText = (e) => {
    const { name, value } = e.target;
    setValues((preValues) => ({
      ...preValues,
      [name]: value,
    }));
  };

  const handleClick = () => {
    if (onChange) onChange(values);

    setValues({
      startAmount: 0,
      endAmount: 0,
    });
  };

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">FILTER BY PRICE AMOUNT</Typography>
      <Box className={classes.range}>
        <TextField
          placeholder="Start amount"
          name="startAmount"
          value={values.startAmount}
          onChange={handleOnchangeText}
          id="standard-basic"
          label="Number"
          type="number"
          variant="standard"
        />
        <span>-</span>
        <TextField
          placeholder="End amount"
          name="endAmount"
          value={values.endAmount}
          onChange={handleOnchangeText}
          id="standard-basic"
          label="Number"
          type="number"
          variant="standard"
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        size="small"
        fullWidth
      >
        <FilterAlt />
        Apply
      </Button>
    </Box>
  );
}

export default FilterByViews;
