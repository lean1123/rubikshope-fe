import AdminAxiosClient from "./AdminAxiosClient";

class VNPayApi {
  getVNPayReturnUrl = () => {
    const url = "order/returnOrder";
    return AdminAxiosClient.get(url);
  };
}

export default VNPayApi;
