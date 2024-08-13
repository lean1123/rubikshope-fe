import {
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  createTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import React from "react";

FilterByActive.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

const theme = createTheme();

const useStyles = makeStyles(() => ({
  root: {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.grey[300]}`,
  },

  checkBox: {
    padding: 0,
    margin: 0,
  },
}));

function FilterByActive({ filters, onChange }) {
  const classes = useStyles();

  const handleOnchange = (e) => {
    if (!onChange) return;

    const { name, checked } = e.target;

    onChange({ [name]: checked });
  };

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2" fontSize="12px">
        FILTER BY ACTIVE PRODUCTS
      </Typography>
      <FormControlLabel
        className={classes.checkBox}
        control={
          <Checkbox
            name="isActive"
            onChange={handleOnchange}
            checked={!filters["isActive"] ? false : filters["isActive"]}
          />
        }
        label="Active status"
      />
    </Box>
  );
}

export default FilterByActive;
