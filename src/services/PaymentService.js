import PaymentApi from "../api/PaymentApi";

const PaymentService = {
  getPaymentByOrder: async (orderID) => {
    try {
      const paymentMatched = await PaymentApi.getPaymentByOrderID(orderID);

      const payment = paymentMatched?.data || {};

      return payment;
    } catch (error) {
      console.error("Error in PaymentService", error);
      return {};
    }
  },
};
export default PaymentService;
