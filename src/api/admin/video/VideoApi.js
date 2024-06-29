import AdminAxiosClient from "../AdminAxiosClient";

class VideoApi {
  getAll = () => {
    const url = "/videos";
    return AdminAxiosClient.get(url);
  };

  getByID = (id) => {
    const url = `videos/${id}`;
    return AdminAxiosClient.get(url);
  };

  saveOrUpdate = (data) => {
    const url = `videos/saveOrUpdate/${data}`;
    return AdminAxiosClient.post(url);
  };

  remove = (id) => {
    const url = `videos/remove/${id}`;
    return AdminAxiosClient.get(url);
  };

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
    const url = `videos/searchPagination`;
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
}

export default VideoApi;
