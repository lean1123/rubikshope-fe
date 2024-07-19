import AdminAxiosClient from "../../admin/AdminAxiosClient";

class OrderApi {
  saveOrder = (orderData) => {
    console.log(orderData);
    const url = "/order/create";
    return AdminAxiosClient.post(url, orderData);
  };
}

export default OrderApi;
