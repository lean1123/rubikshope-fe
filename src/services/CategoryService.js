import CategoryApi from "../api/CategoryApi";

const CategoryService = {
  getListCategories: async () => {
    try {
      const categoryApi = new CategoryApi();

      const { data } = await categoryApi.getAll();

      if (!data) return [];
      return data;
    } catch (error) {
      console.error("Error in CategoryService", error);
      return [];
    }
  },
};

export default CategoryService;
