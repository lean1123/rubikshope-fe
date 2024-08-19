import AdminAxiosClient from "../admin/AdminAxiosClient";

const ReviewApi = {
  getAllReviewOfProduct: ({ productID, page, size, sort }) => {
    const url = "/reviews/getAllPageable";

    return AdminAxiosClient.get(url, {
      params: { productID, page, size, sort },
    });
  },

  insertReview: (review) => {
    const url = "/reviews/addReview";

    return AdminAxiosClient.post(url, review, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

export default ReviewApi;
