import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import OrderRow from "./OrderRow";

const headers = [
  "OrderID",
  "Products",
  "Order Date",
  "Payment Method",
  "Payment Status",
];

OrdersTable.propTypes = {
  listOrder: PropTypes.array,
};

function OrdersTable({ listOrder }) {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map((item, index) => (
              <TableCell align="left" key={index}>
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {listOrder.map((row) => (
            <OrderRow row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OrdersTable;
