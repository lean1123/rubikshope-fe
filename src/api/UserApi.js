import AdminAxiosClient from "./AdminAxiosClient";

const UserApi = {
  getMyInfo: () => {
    const url = "/admin/users/myInfo";

    return AdminAxiosClient.get(url);
  },
};

export default UserApi;
