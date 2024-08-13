import { Button, TableCell, TableRow } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { priceFormat } from "../../../utils/Index";
import { removeFromCart, setQuantity } from "../CartSlice";
import ChangeQuantityForm from "./ChangeQuantityForm";

CartItem.propTypes = {
  item: PropTypes.object,
};

function CartItem({ item, onSubmit }) {
  const { id, product } = item;

  const dispatch = useDispatch();

  const handleChangeQty = (formValues) => {
    console.log(formValues);

    const action = setQuantity({
      id: formValues.id,
      quantity: formValues.quantity,
    });

    dispatch(action);
  };

  const handleClickRemove = () => {
    const action = removeFromCart({
      id,
    });

    dispatch(action);
  };

  return (
    <TableRow>
      <TableCell>{product.productName}</TableCell>
      <TableCell align="right">
        <ChangeQuantityForm onChange={handleChangeQty} item={item} />
      </TableCell>
      <TableCell align="right">{product.unitPrice}</TableCell>
      <TableCell align="right">
        {priceFormat(product.unitPrice * item.quantity)}
      </TableCell>
      <TableCell>
        <Button size="small" variant="outlined" onClick={handleClickRemove}>
          Remove
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default CartItem;
