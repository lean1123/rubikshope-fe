import React from "react";
import PropTypes from "prop-types";
import { TableCell, TableRow } from "@mui/material";

OrderRow.propTypes = {
  row: PropTypes.object,
};

function OrderRow({ row }) {
  return (
    <TableRow
      key={row.orderID}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell align="right" component="th" scope="row">
        {row.orderID}
      </TableCell>
      <TableCell align="right">
        {row.orderDetail
          ? row.orderDetail.map((item) => `${item.product.productName}, `)
          : ""}
      </TableCell>
      <TableCell align="right">{row.orderDate}</TableCell>
      <TableCell align="right">{row.paymentMethod}</TableCell>
      <TableCell align="right">
        {row.paymented === true ? "Yes" : "No"}
      </TableCell>
    </TableRow>
  );
}

export default OrderRow;
