import { Box, Container, Grid, Paper, TablePagination } from "@mui/material";
import { makeStyles } from "@mui/styles";
import queryString from "query-string";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import VideoApi from "../../../api/admin/video/VideoApi";
import FilterViewer from "../components/FilterViewer";
import VideoFilters from "../components/VideoFilters";
import VideoList from "../components/VideoList";
import VideoSkeletonList from "../components/VideoSkeletonList";
import VideoSort from "../components/VideoSort";

const useStyles = makeStyles(() => ({
  root: {},
  left: {
    width: "250px",
  },
  right: {
    flex: "1 1 0",
  },
}));

function VideoListPage() {
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
      isActive: params.isActive === "true",
    };
  }, [location.search]);

  const classes = useStyles();
  const [videos, setVideos] = useState([]);

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
        const videoApi = new VideoApi();

        const { data } = await videoApi.searchPagination(queryParams);

        console.log("Params: ", queryParams);

        console.log(data);

        setVideos(data.data.content);
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

  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              <VideoFilters
                filters={queryParams}
                onChange={handleFiltersChange}
              />
            </Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <VideoSort
                currentValue={queryParams.sortDirector}
                onChange={handleSortChange}
              />
              <FilterViewer filters={queryParams} onChange={handleFilterView} />
              {loading ? (
                <VideoSkeletonList length={videos.length} />
              ) : (
                <VideoList data={videos} />
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

export default VideoListPage;
