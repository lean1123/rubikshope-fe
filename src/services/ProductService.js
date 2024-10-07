import ProductApi from "../api/ProductApi";

const ProductService = {
  getListProductPagination: async (queryParams) => {
    try {
      const productApi = new ProductApi();
      const response = await productApi.searchPagination(queryParams);
      const content = response?.data?.data?.content || [];
      const totalPages = response?.data?.data?.totalPages || 0;

      return { content, totalPages };
    } catch (error) {
      console.error("Error in PropductService", error);
      return [];
    }
  },
  getProductById: async (id) => {
    try {
      const productApi = new ProductApi();
      const response = await productApi.getByID(id);
      const product = response?.data || {};
      return product;
    } catch (error) {
      console.error("Error in ProductService", error);
      return null;
    }
  },
};

export default ProductService;
