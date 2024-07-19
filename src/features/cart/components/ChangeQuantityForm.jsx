import { Box, Grid, TextField } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

ChangeQuantityForm.propTypes = {
  item: PropTypes.object,
  onSubmit: PropTypes.func,
};

function ChangeQuantityForm({ item, onChange }) {
  const handleOnChangeValue = (e) => {
    const values = {
      id: item.id,
      quantity: e.target.value,
    };

    if (onChange) {
      onChange(values);
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            type="number"
            required
            size="small"
            id="quantity"
            label="Quantity"
            name="quantity"
            defaultValue={item.quantity}
            onBlur={handleOnChangeValue}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ChangeQuantityForm;
