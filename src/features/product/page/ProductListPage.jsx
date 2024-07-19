import {
  Box,
  Container,
  createTheme,
  Grid,
  Paper,
  TablePagination,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import queryString from "query-string";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductApi from "../../../api/admin/product/ProductApi";
import FilterViewer from "../components/FilterViewer";
import ProductFilters from "../components/ProductFilter";
import ProductList from "../components/ProductList";
import ProductSort from "../components/ProductSort";
import ProductSkeletons from "../components/VideoSkeletonList";
import Search from "../components/Search";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  root: {},
  left: {
    width: "250px",
    padding: theme.spacing(0, 1.5),
    borderRight: `1px solid ${theme.palette.grey[300]}`,
  },
  right: {
    flex: "1 1 0",
  },
}));

function ProductListPage() {
  // Muc dich: Dong bo filter tren url
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);

    return {
      ...params,
      searchValue: params.searchValue || "",
      page: Number.parseInt(params.page) || 0,
      size: Number.parseInt(params.size) || 9,
      sortDirector: params.sortDirector || "asc",
    };
  }, [location.search]);

  const classes = useStyles();
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  // Filters
  // const [params, setParams] = useState(() => {
  //   const checkedValue = queryParams.checked;
  //   return {
  //     ...queryParams,
  //     ...(checkedValue !== undefined && { checked: checkedValue === "true" }),
  //     searchValue: queryParams.searchValue || "",
  //     page: Number.parseInt(queryParams.page) || 0,
  //     size: Number.parseInt(queryParams.size) || 9,
  //     sortDirector: queryParams.sortDirector || "asc",
  //   };
  // });

  const [totalElements, setTotalElements] = useState(0);

  const handleChangeRowsPerPage = (event) => {
    // setParams((preParams) => ({
    //   ...preParams,
    //   size: parseInt(event.target.value, 10),
    //   page: 0,
    // }));

    const params = {
      ...queryParams,
      size: parseInt(event.target.value, 10),
      page: 0,
    };

    navigate({
      pathname: location.pathname,
      search: queryString.stringify(params),
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const productApi = new ProductApi();

        const { data } = await productApi.searchPagination(queryParams);

        console.log("Params: ", queryParams);

        console.log("Data", data);

        setProducts(data.data.content);
        setTotalElements(data.data.totalElements);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    })();
  }, [queryParams]);

  // Synch filter on url

  // useEffect(() => {
  //   navigate({
  //     pathname: location.pathname,
  //     search: queryString.stringify(params),
  //   });
  // }, [location.pathname, navigate, params]);

  const handleSortChange = (newValue) => {
    // setParams((preParams) => ({
    //   ...preParams,
    //   sortDirector: newValue,
    // }));

    const params = {
      ...queryParams,
      sortDirector: newValue,
    };

    navigate({
      pathname: location.pathname,
      search: queryString.stringify(params),
    });
  };

  const handleFiltersChange = (newValue) => {
    // setParams((preParams) => ({
    //   ...preParams,
    //   ...newValue,
    // }));

    const params = {
      ...queryParams,
      ...newValue,
    };

    navigate({
      pathname: location.pathname,
      search: queryString.stringify(params),
    });
  };

  const handleFilterView = (newFilter) => {
    // setParams(newFilter);

    navigate({
      pathname: location.pathname,
      search: queryString.stringify(newFilter),
    });
  };

  const handleSearchFormSubmit = (value) => {
    const params = {
      ...queryParams,
      searchValue: value,
    };

    navigate({
      pathname: location.pathname,
      search: queryString.stringify(params),
    });
  };

  return (
    <Box>
      <Container>
        <Grid
          container
          p={4}
          spacing={2}
          justifyContent="end"
          alignItems="center"
        >
          <Search onSubmit={handleSearchFormSubmit} />
        </Grid>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              <ProductFilters
                filters={queryParams}
                onChange={handleFiltersChange}
              />
            </Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <ProductSort
                currentValue={queryParams.sortDirector}
                onChange={handleSortChange}
              />
              <FilterViewer filters={queryParams} onChange={handleFilterView} />
              {loading ? (
                <ProductSkeletons length={products.length} />
              ) : (
                <ProductList data={products} />
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <TablePagination
        component="div"
        count={totalElements}
        page={queryParams.page}
        onPageChange={(e, page) => {
          // setParams((preParams) => ({
          //   ...preParams,
          //   page: page,
          // }));

          const params = {
            ...queryParams,
            page: page,
          };

          navigate({
            pathname: location.pathname,
            search: queryString.stringify(params),
          });
        }}
        rowsPerPage={queryParams.size}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

export default ProductListPage;
