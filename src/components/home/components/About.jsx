import React from "react";

import {
    Box,
    Button,
    Grid,
    Paper,
    Typography
} from "@mui/material";
import {makeStyles} from "@mui/styles";


const useStyles = makeStyles(() => ({
  root: {},
  paragraphWrapper: {
    display: "flex",
    alignItems: "center",
  },
  paragraph: {
    textAlign: "justify",
    padding: "8px 12px 8px 8px",
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
  },
  moreBtn: {
    backgroundColor: "#aeaeae !important",
  },
}));

function About() {
  const classes = useStyles();

  return (
    <Box>
      <Grid container>
        <Grid item sx={{ width: "700px" }} className={classes.paragraphWrapper}>
          <Paper
            sx={{ width: "100%" }}
            className={classes.paragraph}
            elevation={16}
          >
            <Typography component="h2" variant="h5" m="8px 0">
              About Our
            </Typography>
            <Typography component="h1" variant="h4" m="8px 0">
              Rubik Shop Name
            </Typography>
            <Typography component="p" m="8px 0">
              Tự hào là người tiên phong trong lĩnh vực, H2 Rubik Shop đã phát
              triển và được các bạn trẻ toàn quốc biết đến như những địa chỉ mua
              Rubik uy tín nhất. Mục tiêu của chúng tôi không chỉ là bán đồ chơi
              trí tuệ với giá cả tốt nhất, chất lượng nhất mà còn là sự thân
              thiện với người dùng, trải nghiệm mua hàng tốt và không ngừng nâng
              cao chất lượng dịch vụ.
            </Typography>
            <Box className={classes.buttonWrapper} m="24px 0">
              <Box
                component={Button}
                m="0 8px 0 0"
                variant="contained"
                className={classes.moreBtn}
              >
                More
              </Box>
              <Button variant="contained">Our Shop</Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item sx={{ width: "450px" }}>
          <Box
            component="img"
            src="https://bizweb.dktcdn.net/100/316/286/files/vac-435c4918-1116-43c1-b408-2fcf64c59f98.jpg?v=1564893609437"
            width="100%"
          ></Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default About;
