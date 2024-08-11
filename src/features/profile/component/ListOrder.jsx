import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Pagination, Typography } from "@mui/material";
import OrdersTable from "../list_order/OrdersTable";
import OrderApi from "../../../api/user/order/Order";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  pagination: {
    "& > ul": {
      justifyContent: "center",
    },
  },
}));

function ListOrder() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [listOrder, setListOrder] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const orderApi = new OrderApi();
        const resp = await orderApi.getListOrder({ page });

        const { content } = resp.data;
        if (content) {
          setListOrder(content);
        }
        const { totalPages } = resp.data;
        setTotalPage(totalPages);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [page]);

  const handlePageChange = (e, page) => {
    setPage(page - 1);
  };

  return (
    <Box>
      <Container>
        <Grid container>
          <Grid item width={"100%"}>
            <Typography variant="caption" fontWeight="bold" fontSize="24px">
              LIST ORDER HISTORY
            </Typography>
            <Box>
              <OrdersTable listOrder={listOrder} />
            </Box>
            <Box p={2}>
              <Pagination
                className={classes.pagination}
                count={totalPage}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListOrder;
