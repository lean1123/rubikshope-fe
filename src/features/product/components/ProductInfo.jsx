import PropTypes from "prop-types";
import { Box, CircularProgress, Typography, createTheme } from "@mui/material";
import { Feed } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import PaidIcon from "@mui/icons-material/Paid";
import { priceFormat } from "../../../utils/Index";

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
    active,
    category: { categoryName },
  } = product;

  return (
    <Box className={classes.root}>
      <Typography fontSize="32px" variant="caption" fontWeight="bold">
        {productName}
      </Typography>
      <Typography variant="subtitle2">
        <span style={{ fontWeight: "bold", fontSize: "14px" }}>Status: </span>
        {active === true ? "In Stock" : "Out of Stock"}
      </Typography>
      <Typography
        component="h2"
        variant="subtitle1"
        className={classes.description}
      >
        <span style={{ fontWeight: "bold", fontSize: "14px" }}>
          Product Description:
        </span>{" "}
        {description}
      </Typography>
      <Box className={classes.subBox}>
        <Typography
          className={classes.views}
          component="span"
          variant="overline"
        >
          <PaidIcon />
          {priceFormat(unitPrice)}
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
