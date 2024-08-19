import { yupResolver } from "@hookform/resolvers/yup";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ImageIcon from "@mui/icons-material/Image";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useStyles } from "./ReviewFormStyle";

import { useSelector } from "react-redux";
import * as yup from "yup";

function ReviewForm(props) {
  const classes = useStyles();

  const isLoggedInUser = useSelector((state) => state.users.current);
  const [value, setValue] = useState(0);
  const [imageList, setImageList] = useState([]);
  const { product, onSubmit } = props;

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length !== 0) {
      form.setValue("listImageFile", files);
      const listFile = [];
      files.forEach((file) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          listFile.push(reader.result);
          setImageList(listFile);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const schema = yup.object().shape({
    rating: yup
      .number()
      .required("Rating field is require!")
      .min(1, "Rating is greater or equal than 1!"),
    comment: yup.string(),
    listImageFile: yup.array(),
  });

  const form = useForm({
    defaultValues: {
      rating: value,
      comment: "",
      listImageFile: imageList,
    },
    resolver: yupResolver(schema),
  });

  const submitReviewValue = async (values) => {
    const { productID } = product;

    const userID = isLoggedInUser.userID;

    if (onSubmit) {
      await onSubmit({ ...values, productID, userID });
    }
    form.reset();
  };

  const { isSubmitting } = form.formState;

  return (
    <Box
      component="form"
      sx={{ overflowY: "auto" }}
      maxHeight="600px"
      onSubmit={form.handleSubmit(submitReviewValue)}
    >
      <Container>
        <Grid container mb={2}>
          <Grid item display="flex" alignItems="center">
            <Box
              mr={1}
              borderRadius="4px"
              maxWidth="100px"
              component="img"
              src={`${product.image}`}
            ></Box>
            <Box display="flex" flexDirection="column" justifyContent="center">
              <Typography>{product.productName}</Typography>
              <Rating
                name="rating"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                  form.setValue("rating", newValue);
                }}
              ></Rating>
            </Box>
          </Grid>
        </Grid>
        <Grid container mb={2}>
          <Grid item width="100%">
            <Typography>Share your thinking !</Typography>
            <TextField
              fullWidth
              id="feelingContent"
              placeholder="Write your feeling about this product..."
              name="feelingContent"
              {...form.register("comment")}
            />
          </Grid>
        </Grid>
        <Grid container mb={2}>
          <Grid item>
            <Box mb={1} textAlign="center" maxHeight="200px" display="flex">
              {imageList.length === 0 ? (
                <Box maxWidth="200px">
                  <ImageIcon fontSize="large" />
                </Box>
              ) : (
                imageList.map((item, index) => (
                  <Box position="relative" key={index} mr={1}>
                    <IconButton
                      data-id={`${item}`}
                      className={classes.removeButton}
                      onClick={(event) => {
                        const dataId = event.currentTarget.dataset.id;
                        const currentListImage = [...imageList];
                        const newListImage = currentListImage.filter(
                          (image) => image !== dataId
                        );
                        setImageList(newListImage);
                      }}
                    >
                      <HighlightOffIcon />
                    </IconButton>
                    <img
                      key={index}
                      src={item}
                      alt="Product"
                      style={{
                        width: "100px",
                        height: "auto",
                        border: "1px solid #ccc",
                        padding: "5px",
                        borderRadius: "4px",
                      }}
                    />
                  </Box>
                ))
              )}
            </Box>
            <input
              multiple
              accept="image/*"
              style={{ display: "none" }}
              id="image-upload"
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="image-upload">
              <Button variant="contained" component="span">
                Upload Image
              </Button>
            </label>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item width="100%">
            <Box component="button" type="submit" className={classes.button}>
              {isSubmitting ? <CircularProgress color="info" /> : "SEND REVIEW"}
            </Box>
          </Grid>
        </Grid>
        {form.formState.errors.rating && (
          <Typography color="error">
            {form.formState.errors.rating.message}
          </Typography>
        )}
      </Container>
    </Box>
  );
}

export default ReviewForm;
