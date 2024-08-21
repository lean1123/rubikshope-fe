import { Box, Container, Grid } from "@mui/material";
import React from "react";
import Slider from "./components/Slider";
import About from "./components/About";
import ListNewProduct from "./components/ListNewProduct";

function Home() {
  return (
    <Box minHeight="400px">
      <Container>
        <Grid container mt={4}>
          <Grid item>
            <Slider />
          </Grid>
        </Grid>
        <Grid container mt={4}>
          <Grid item>
            <About />
          </Grid>
        </Grid>
        <Grid container mt={4}>
          <Grid item width="100%">
            <ListNewProduct />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Home;
