import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import {
  Box,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { priceFormat } from "../../../utils/Index";

Product.propTypes = {
  video: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  minHeight: {
    minHeight: "138px",
  },
  buttonWrapp: {
    justifyContent: "center",
  },
}));

function Product({ product }) {
  const classes = useStyles();

  const navigate = useNavigate();

  const handleClickVideo = () => {
    navigate(`/products/${product.productID}`);
  };

  const handleImageUrl = () => {
    if (!product.image) {
      return "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg";
    } else {
      return product.image.substring(0, 5) === "https"
        ? product.image
        : `http://localhost:8888/admin/videos/images/${product.image}`;
    }
  };

  return (
    <Box padding={1} onClick={handleClickVideo}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          src={handleImageUrl()}
          className={classes.minHeight}
        />

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.productName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <span style={{ fontWeight: "bold" }}>Description: </span>
            {product.description}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            <span style={{ fontWeight: "bold" }}>Price: </span>
            {priceFormat(product.unitPrice)}
          </Typography>
        </CardContent>
        <CardActions className={classes.buttonWrapp}>
          <Button size="small" variant="contained">
            Buy
          </Button>
          <Button size="small" variant="contained">
            More
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default Product;
