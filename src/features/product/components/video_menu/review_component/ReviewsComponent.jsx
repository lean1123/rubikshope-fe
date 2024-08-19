import { Sheet } from "@mui/joy";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import {
  Box,
  Button,
  Container,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import ReviewApi from "../../../../../api/user/ReviewApi";
import ListReview from "./ListReview";
import ReviewForm from "./ReviewForm";

ReviewsComponent.propTypes = {
  product: PropTypes.object,
};

function ReviewsComponent({ product = {} }) {
  const { productID } = product;

  const [listReview, setListReview] = useState([]);

  const [open, setOpen] = useState(false);

  const [totalPage, setTotalPage] = useState(0);
  const [params, setParams] = useState({ page: 0, size: 5, productID });

  const handleChangeParams = (e, value) => {
    setParams({ ...params, page: value - 1 });
  };

  const handleOpenReviewModal = () => {
    setOpen(true);
  };

  const handleShowListReview = (data) => {
    let currentList = listReview;

    currentList.pop();

    const newListReview = [data, ...currentList];

    setListReview(newListReview);
  };

  const handleSubmitReviewForm = async (values) => {
    try {
      const response = await ReviewApi.insertReview(values);

      if (response.status === 200) {
        enqueueSnackbar("Success inserted", { variant: "success" });
        handleShowListReview(response.data);
      }
    } catch (error) {
      enqueueSnackbar(error, { variant: "error" });
      setOpen(true);
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await ReviewApi.getAllReviewOfProduct(params);

        const { content, totalPages } = response.data;

        setListReview(content);
        setTotalPage(totalPages);
      } catch (error) {
        console.log("Error in load review component: ", error);
      }
    })();
  }, [params]);

  return (
    <Box width={"100%"}>
      <Container>
        <Grid container>
          <Typography variant="caption" m={2} fontSize="24px" fontWeight="bold">
            LIST REVIEW
          </Typography>
        </Grid>
        <Grid container width="100%">
          <Grid item width="100%">
            <ListReview listReview={listReview} />
          </Grid>
        </Grid>

        <Grid container mt={2} justifyContent="center">
          <Grid item>
            <Pagination onChange={handleChangeParams} count={totalPage} />
          </Grid>
        </Grid>

        <Grid container width="100%" justifyContent="flex-end">
          <Button variant="contained" onClick={handleOpenReviewModal}>
            Review
          </Button>
        </Grid>
      </Container>

      <>
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={open}
          onClose={() => setOpen(false)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Sheet
            variant="outlined"
            sx={{
              minWidth: "500px",
              borderRadius: "md",
              p: 3,
              boxShadow: "lg",
            }}
          >
            <ModalClose variant="plain" sx={{ m: 1 }} />
            <Typography fontSize="16px" fontWeight="bold" variant="caption">
              REVIEW FORM
            </Typography>
            <ReviewForm onSubmit={handleSubmitReviewForm} product={product} />
          </Sheet>
        </Modal>
      </>
    </Box>
  );
}

export default ReviewsComponent;
