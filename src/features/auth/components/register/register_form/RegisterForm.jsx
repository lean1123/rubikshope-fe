import { yupResolver } from "@hookform/resolvers/yup";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  LinearProgress,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import styles from "./Styles.module.css";

function RegisterForm(props) {
  const defaultTheme = createTheme();

  // Validate rule
  const schema = yup.object().shape({
    fullName: yup.string().required("Full Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    retypePassword: yup
      .string()
      .required("Retype password is required")
      .min(6, "Retype password must be at least 6 characters"),
    address: yup.string().required("Address is required"),
  });

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      retypePassword: "",
      address: "",
    },
    resolver: yupResolver(schema),
  });

  const handleOnSubmit = async (values) => {
    const { onSubmit } = props;

    console.log(values);

    if (onSubmit) {
      await onSubmit(values);
    }
    form.reset();
  };

  const { isSubmitting } = form.formState;

  return (
    <ThemeProvider theme={defaultTheme}>
      {isSubmitting && <LinearProgress className={styles.progressComponent} />}

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={form.handleSubmit(handleOnSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  name="fullName"
                  autoComplete="family-name"
                  {...form.register("fullName")}
                  error={!!form.formState.errors.lastName}
                  helperText={form.formState.errors.lastName?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  {...form.register("email")}
                  error={!!form.formState.errors.email}
                  helperText={form.formState.errors.email?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...form.register("password")}
                  error={!!form.formState.errors.password}
                  helperText={form.formState.errors.password?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="retypePassword"
                  label="Retype Password"
                  type="password"
                  id="retypePassword"
                  autoComplete="new-password"
                  {...form.register("retypePassword")}
                  error={!!form.formState.errors.password}
                  helperText={form.formState.errors.password?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="address"
                  label="Address"
                  id="address"
                  {...form.register("address")}
                  error={!!form.formState.errors.password}
                  helperText={form.formState.errors.password?.message}
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
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default RegisterForm;
