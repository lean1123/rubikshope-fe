import {
  Box,
  Container,
  createTheme,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import queryString from "query-string";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import PaymentApi from "../../api/user/PaymentApi";

import { makeStyles } from "@mui/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  doneIcon: {
    color: `${theme.palette.success.light}`,
  },
  errorIcon: {
    color: `${theme.palette.error.light}`,
  },
}));

function PaymentReturn() {
  const classes = useStyles();
  const [paymentInfo, setPaymentInfo] = useState({});
  const location = useLocation();

  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);

    return {
      orderID: params.orderID,
      transactionStatus: params.transactionStatus,
    };
  }, [location.search]);

  useEffect(() => {
    (async () => {
      try {
        const paymentMatched = await PaymentApi.getPaymentByOrderID(
          queryParams.orderID
        );

        if (paymentMatched) {
          setPaymentInfo(paymentMatched.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [queryParams]);

  return (
    <Box p={theme.spacing(32)}>
      <Paper>
        <Container>
          <Grid container>
            {queryParams.transactionStatus === "success" ? (
              <Grid item md={12} textAlign="center">
                <Typography>
                  Successfully Payment
                  <CheckCircleIcon className={classes.doneIcon} />
                </Typography>
                <Typography mt={theme.spacing(2)}>
                  Payment Info ID:
                  {paymentInfo.paymentInfoID}
                </Typography>
                <Typography mt={theme.spacing(2)}>
                  Content:
                  {paymentInfo.payContent}
                </Typography>
                <Typography mt={theme.spacing(2)}>
                  Time:
                  {paymentInfo.paymentTime}
                </Typography>
                <Typography mt={theme.spacing(2)}>
                  Transaction:
                  {paymentInfo.transactionId}
                </Typography>
              </Grid>
            ) : (
              <Grid item md={12} textAlign="center">
                <Typography
                  textAlign="center"
                  color={`${theme.palette.error.light}`}
                >
                  Failure!
                  <ErrorIcon />
                </Typography>
                <Typography color={`${theme.palette.error.light}`}>
                  Not Found!
                </Typography>
              </Grid>
            )}
          </Grid>
        </Container>
      </Paper>
    </Box>
  );
}

export default PaymentReturn;
