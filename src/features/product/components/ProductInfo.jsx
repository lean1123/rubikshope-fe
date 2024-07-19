import PropTypes from "prop-types";
import { Box, CircularProgress, Typography, createTheme } from "@mui/material";
import { Feed, RemoveRedEye } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

ProductInfo.propTypes = {
  video: PropTypes.object,
};
const theme = createTheme();

const useStyles = makeStyles(() => ({
  root: {
    padding: theme.spacing(0.5),
  },
  title: {},
  description: {
    paddingTop: theme.spacing(1),
  },
  views: {},
  category: {},
  subBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  loadingBox: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function ProductInfo({ product = {} }) {
  const classes = useStyles();

  if (Object.keys(product).length === 0) {
    return (
      <Box component="div" className={classes.loadingBox}>
        <CircularProgress />
      </Box>
    );
  }

  const {
    productName,
    description,
    unitPrice,
    category: { categoryName },
  } = product;

  return (
    <Box className={classes.root}>
      <Typography component="h1" variant="h4">
        {productName}
      </Typography>
      <Typography
        component="h2"
        variant="subtitle1"
        className={classes.description}
      >
        {description}
      </Typography>
      <Box className={classes.subBox}>
        <Typography
          className={classes.views}
          component="span"
          variant="overline"
        >
          <RemoveRedEye />
          {unitPrice}
        </Typography>

        <Typography
          className={classes.category}
          component="span"
          variant="overline"
        >
          <Feed />
          {categoryName}
        </Typography>
      </Box>
    </Box>
  );
}

export default ProductInfo;
