import AdminAxiosClient from "../admin/AdminAxiosClient";

const PaymentApi = {
  getPaymentByOrderID: (orderID) => {
    const url = `/payments/order/${orderID}`;

    return AdminAxiosClient.get(url);
  },
};

export default PaymentApi;
