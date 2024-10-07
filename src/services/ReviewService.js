import ReviewApi from "../api/ReviewApi";

const ReviewService = {
  getListReviewPaginationByProduct: async (params) => {
    try {
      const response = await ReviewApi.getAllReviewOfProduct(params);

      const content = response?.data?.content || [];
      const totalPages = response?.data?.totalPages || 0;

      return { content, totalPages };
    } catch (error) {
      console.error("Error in ReviewService", error);
      return { content: [], totalPages: 0 };
    }
  },
};

export default ReviewService;
