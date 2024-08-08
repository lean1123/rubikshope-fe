import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, createTheme, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import OrderApi from "../../api/user/order/Order";
import AuthDialog from "../auth/AuthDialog";
import { refreshCart } from "./CartSlice";
import CartItems from "./components/CartItems";
import ShippingInfo from "./components/ShippingInfo";

Cart.propTypes = {};

const theme = createTheme();

const useStyles = makeStyles(() => ({
  root: {},
  left: {
    width: "500px",
    borderRight: `1px solid ${theme.palette.grey[300]}`,
    padding: theme.spacing(1.5),
  },
  right: {
    padding: theme.spacing(1.5),
  },
  loadingBox: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonWrap: {
    justifyContent: "end",
    backgroundColor: theme.palette.grey[200],
    alignItems: "center",
    padding: theme.spacing(2),
  },
}));

function Cart() {
  const classes = useStyles();
  const user = useSelector((state) => state.users.current);
  const cartItems = useSelector((state) => state.cart.items);
  const [cartItemTotal, setCartItemTotal] = useState(0);
  const [open, setOpen] = useState(false);

  const handleClose = (e, mess) => {
    if (mess === "backdropClick") {
      e.stopPropagation();
      return;
    } else setOpen(false);
  };

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => {
      return acc + item.quantity * item.product.unitPrice;
    }, 0);
    setCartItemTotal(total);
  }, [cartItems]);

  const schema = yup.object().shape({
    fullName: yup.string().required("Full name is required"),
    email: yup.string().required("Email is required").email("Email is invalid"),
    address: yup.string().required("Address is required"),
    roadName: yup.string().required("roadName is required"),
    district: yup.string().required("district is required"),
    city: yup.string().required("city is required"),
    paymentMethod: yup.string().required("Payment method is required"),
  });

  const form = useForm({
    defaultValues: {
      fullName: user?.fullName || "",
      email: user?.email || "",
      address: user?.address || "",
      paymentMethod: "",
      roadName: "",
      district: "",
      city: "",
    },
    resolver: yupResolver(schema),
  });

  const disPatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleOnSubmit = async (values) => {
    const orderData = {
      userID: user.userID,
      paymentMethod: values.paymentMethod,
      fullName: values.fullName,
      email: values.email,
      address: values.address,
      roadName: values.roadName,
      district: values.district,
      city: values.city,
      cartItems,
      totalAmount: cartItemTotal,
    };

    try {
      const orderApi = new OrderApi();

      const response = await orderApi.saveOrder(orderData);
      enqueueSnackbar("Order successfully", { variant: "success" });

      form.reset();

      if (cartItems.length > 0) {
        disPatch(refreshCart());
      }

      if (response.data) {
        const url = response.data.split("url:")[1];
        window.location = url;
      }
    } catch (err) {
      const { response } = err;

      if (response) {
        if (response.status === 401 && localStorage.getItem("user") === null) {
          // navigate("/login");
          setOpen(true);
        }
      }

      enqueueSnackbar("Error: " + err.message, { variant: "error" });
    }
  };
  return (
    <Box
      className={classes.root}
      component="form"
      onSubmit={form.handleSubmit(handleOnSubmit)}
    >
      <Container>
        <Grid container>
          <Grid item className={classes.left}>
            <ShippingInfo form={form} />
          </Grid>
          <Grid item className={classes.right}>
            <CartItems />
          </Grid>
        </Grid>
        <Grid container className={classes.buttonWrap}>
          <Button
            type="submit"
            size="large"
            variant="contained"
            disabled={cartItems.length <= 0}
          >
            Order
          </Button>
        </Grid>
      </Container>

      <AuthDialog open={open} handleCloseDialog={handleClose} />
    </Box>
  );
}

export default Cart;
