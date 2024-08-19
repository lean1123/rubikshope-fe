import { Box, Container, Grid } from "@mui/material";
import React from "react";
import Review from "./Review";
import PropTypes from "prop-types";

ListReview.propTypes = {
  product: PropTypes.object,
};

function ListReview({ listReview }) {
  return (
    <Box width="100%">
      <Container>
        <Grid container>
          <Grid item width="100%">
            {listReview.map((review) => (
              <Review review={review} key={review.id} />
            ))}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListReview;
