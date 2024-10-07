import AdminAxiosClient from "./AdminAxiosClient";

class OrderApi {
  saveOrder = (orderData) => {
    const url = "/order/create";
    return AdminAxiosClient.post(url, orderData);
  };

  getListOrder = ({ page }) => {
    const url = "/order/listOrder";
    return AdminAxiosClient.get(url, { params: { page } });
  };
}

export default OrderApi;
