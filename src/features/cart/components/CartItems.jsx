import { Box, Table, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { priceFormat } from "../../../utils/Index";
import CartItem from "./CartItem";

CartItems.propTypes = {
  cartItems: PropTypes.array,
};

function CartItems() {
  const cartItems = useSelector((state) => state.cart.items);
  // const [cartItemTotal, setCartItemTotal] = useState(0);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      return acc + item.quantity * item.product.unitPrice;
    }, 0);
  }, [cartItems]);

  // useEffect(() => {
  //   const total = cartItems.reduce((acc, item) => {
  //     return acc + item.quantity * item.product.unitPrice;
  //   }, 0);
  //   setCartItemTotal(total);
  // }, [cartItems]);

  return (
    <Box component={Paper} marginTop={2} p={1}>
      <Typography variant="h6">Order Details</Typography>

      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Desc</TableCell>
            <TableCell align="right">Qty</TableCell>
            <TableCell align="right">UnitPrice</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{priceFormat(totalPrice)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
}

export default CartItems;
