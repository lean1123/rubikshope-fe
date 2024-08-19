import { Box, createTheme, Rating, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import React from "react";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  root: {},

  avatar: {
    width: "60px",
    borderRadius: "32px",
  },
  username: {
    marginLeft: theme.spacing(1),
  },
  reviewImg: {
    marginRight: theme.spacing(1),
  },
}));

Review.propTypes = {
  review: PropTypes.object,
};

function Review({ review = {} }) {
  const classes = useStyles();

  const { user } = review;

  return (
    <Box borderBottom="1px solid #ccc" width="100%" pb={1} mb={2}>
      <Box display="flex" pb={1}>
        <Box
          className={classes.avatar}
          component="img"
          src={
            user.userImg
              ? `${user.userImg}`
              : "https://t3.ftcdn.net/jpg/05/16/27/58/240_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
          }
        ></Box>
        <Box className={classes.username}>
          <Typography>{user.fullName}</Typography>
          <Rating readOnly name="read-only" value={5} />
        </Box>
      </Box>
      <Typography variant="caption">
        {new Date(review.updatedDate).toLocaleString()}
      </Typography>
      <Box>
        {review.comment && (
          <Typography
            component="div"
            sx={{ backgroundColor: "#f5f5f5", padding: "8px", margin: "8px" }}
            variant="subtitle2"
          >
            {review.comment}
          </Typography>
        )}
        {review.listImageReview &&
          review.listImageReview.map((image, index) => (
            <Box
              key={index}
              className={classes.reviewImg}
              width={100}
              component="img"
              src={`${image}`}
            ></Box>
          ))}
      </Box>
    </Box>
  );
}

export default Review;
