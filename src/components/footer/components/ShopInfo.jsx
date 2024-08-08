import { Box, Grid } from "@mui/material";
import React from "react";
import { Container } from "react-bootstrap";
import AboutOur from "../shop_info/AboutOur";
import PolicyInfo from "../shop_info/PolicyInfo";
import InfoRegister from "../shop_info/InfoRegister";

ShopInfo.propTypes = {};

function ShopInfo() {
  return (
    <Box padding="16px 24px">
      <Container>
        <Grid container>
          <Grid item flex={1} display="flex" justifyContent="space-around">
            <AboutOur />
            <PolicyInfo />
          </Grid>
          <Grid item flex={1} display="flex" justifyContent="center">
            <InfoRegister />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ShopInfo;
