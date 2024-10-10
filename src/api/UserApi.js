import AdminAxiosClient from "./AdminAxiosClient";

const UserApi = {
  getMyInfo: () => {
    const url = "/admin/users/myInfo";

    return AdminAxiosClient.get(url);
  },

  introspectToken: (token) => {
    const url = "/auth/introspect";
    return AdminAxiosClient.post(url, JSON.stringify({ token }));
  },

  refreshToken: (token) => {
    const url = "/auth/refresh";
    return AdminAxiosClient.post(url, JSON.stringify({ token }));
  },
};

export default UserApi;
