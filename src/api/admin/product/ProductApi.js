import AdminAxiosClient from "../AdminAxiosClient";

class ProductApi {
  getAll = () => {
    const url = "/products";
    return AdminAxiosClient.get(url);
  };

  getByID = (id) => {
    const url = `products/${id}`;
    return AdminAxiosClient.get(url);
  };

  // saveOrUpdate = (data) => {
  //   const url = `products/saveOrUpdate/${data}`;
  //   return AdminAxiosClient.post(url);
  // };

  // remove = (id) => {
  //   const url = `products/remove/${id}`;
  //   return AdminAxiosClient.get(url);
  // };

  searchPagination = ({
    searchValue,
    size,
    page,
    sortDirector,
    categoryID,
    startAmount,
    endAmount,
    isActive,
  }) => {
    const url = `products/searchPagination`;
    return AdminAxiosClient.get(url, {
      params: {
        searchValue,
        size,
        page,
        sortDirector,
        categoryID,
        startAmount,
        endAmount,
        isActive,
      },
    });
  };

  getAllProduct = async ({ page, size }) => {
    return AdminAxiosClient.get("admin/products", {
      params: {
        page,
        size,
      },
    });
  };
}

export default ProductApi;
