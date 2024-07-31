import AdminAxiosClient from "../AdminAxiosClient";

class CategoryApi {
  getAll = () => {
    const url = "admin/categories";
    return AdminAxiosClient.get(url);
  };

  getByID = (id) => {
    const url = `categories/${id}`;
    return AdminAxiosClient.get(url);
  };

  saveOrUpdate = (data) => {
    const url = `categories/saveOrUpdate/${data}`;
    return AdminAxiosClient.post(url);
  };

  remove = (id) => {
    const url = `categories/remove/${id}`;
    return AdminAxiosClient.get(url);
  };

  searchPagination = (searchValue, size, page) => {
    const url = `categories/searchPagination?seachValue=${searchValue}&size=${size}&page=${page}`;
    return AdminAxiosClient.get(url);
  };
}

export default CategoryApi;
