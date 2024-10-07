import OrderApi from "../api/Order";

const OrderService = {
  getListOrderPagination: async ({ page }) => {
    try {
      const orderApi = new OrderApi();
      const resp = await orderApi.getListOrder({ page });

      const content = resp?.data?.content || [];
      const totalPages = resp?.data?.totalPages || 0;
      return { content, totalPages };
    } catch (error) {
      console.error("Error in OrderService", error);
      return { content: [], totalPages: 0 };
    }
  },

  saveOrder: async (orderData) => {
    try {
      const orderApi = new OrderApi();

      const response = await orderApi.saveOrder(orderData);

      return response.data;
    } catch (error) {
      console.error("Error in OrderService", error);
      return null;
    }
  },
};

export default OrderService;
