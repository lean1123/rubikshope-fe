import {
  Box,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";
import { useSelector } from "react-redux";

ShippingInfo.propTypes = {
  form: PropTypes.object.isRequired,
};

function ShippingInfo({ form }) {
  const user = useSelector((state) => state.users.current) || {};
  // const [payment, setPayment] = useState("COD");

  // const handleChangePayment = (event) => {
  //   const value = event.target.value;
  //   setPayment(value);
  // };

  return (
    <Box p={2} component={Paper}>
      <Typography variant="h6">Customer Information</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            value={user.fullName}
            label="Full Name"
            {...form.register("fullName")}
            error={!!form.formState.errors.fullName}
            helperText={form.formState.errors.fullName?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            value={user.email}
            label="Email"
            {...form.register("email")}
            error={!!form.formState.errors.email}
            helperText={form.formState.errors.email?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            value={user.address}
            label="National"
            {...form.register("address")}
            error={!!form.formState.errors.address}
            helperText={form.formState.errors.address?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Road Name"
            {...form.register("roadName")}
            error={!!form.formState.errors.address}
            helperText={form.formState.errors.address?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="District"
            {...form.register("district")}
            error={!!form.formState.errors.address}
            helperText={form.formState.errors.address?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="City"
            {...form.register("city")}
            error={!!form.formState.errors.address}
            helperText={form.formState.errors.address?.message}
          />
        </Grid>
      </Grid>
      <Grid item>
        <FormLabel id="payment-method-group-label">Payments</FormLabel>
        <Controller
          name="paymentMethod"
          control={form.control}
          render={({ field }) => (
            <RadioGroup aria-labelledby="payment-method-group-label" {...field}>
              <FormControlLabel value="COD" control={<Radio />} label="COD" />
              <FormControlLabel
                value="VNPAY"
                control={<Radio />}
                label="VNPAY"
              />
            </RadioGroup>
          )}
        />
      </Grid>
    </Box>
  );
}

export default ShippingInfo;
