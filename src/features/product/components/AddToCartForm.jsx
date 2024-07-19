import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid, TextField } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

AddToCartForm.propTypes = {
  onSubmit: PropTypes.func,
};

function AddToCartForm({ onSubmit = null }) {
  // Validate rule
  const schema = yup.object().shape({
    quantity: yup
      .number()
      .required("Quantity mustn't invalid!")
      .min(1, "Quantity greater than or equal 1!")
      .typeError("Please fill with number type"),
  });

  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
    resolver: yupResolver(schema),
  });

  const handleOnSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
    form.reset();
  };

  const { isSubmitting } = form.formState;
  return (
    <Box
      component="form"
      onSubmit={form.handleSubmit(handleOnSubmit)}
      sx={{ mt: 3 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            type="number"
            required
            fullWidth
            id="quantity"
            label="Quantity"
            name="quantity"
            {...form.register("quantity")}
            error={!!form.formState.errors.quantity}
            helperText={form.formState.errors.quantity?.message}
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={isSubmitting}
      >
        Add to card
      </Button>
    </Box>
  );
}

export default AddToCartForm;
