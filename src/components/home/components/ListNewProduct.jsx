import {
  Box,
  Button,
  Container,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductApi from "../../../api/admin/product/ProductApi";
import ProductList from "../../../features/product/components/ProductList";
import { useNavigate } from "react-router-dom";

function ListNewProduct() {
  const [totalPage, setTotalPage] = useState(0);
  const [params, setParams] = useState({
    page: 0,
    size: 3,
  });
  const [listNewProduct, setListNewProduct] = useState([]);

  const navigate = useNavigate();

  const handleOnPageChange = (e, page) => {
    console.log("Page ", page);

    setParams({
      ...params,
      page: page - 1,
    });

    console.log(params);
  };

  const handleWatchMoreAction = () => {
    navigate("/products");
  };

  useEffect(() => {
    (async () => {
      try {
        const productApi = new ProductApi();

        const response = await productApi.getAllProduct(params);

        setTotalPage(response.data.totalPages);

        console.log(response.data);

        setListNewProduct(response.data.content);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [params]);

  return (
    <Box width="100%">
      <Container>
        <Grid container textAlign="center" sx={{ width: "100%" }}>
          <Grid item>
            <Typography variant="h5" fontWeight="bold">
              LIST NEW PRODUCT
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item sx={{ width: "100%" }}>
            <ProductList data={listNewProduct} />
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Grid item>
            <Pagination
              onChange={handleOnPageChange}
              count={totalPage}
              shape="rounded"
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Grid item>
            <Box
              component={Button}
              m={2}
              variant="contained"
              onClick={handleWatchMoreAction}
            >
              Watch More
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListNewProduct;
