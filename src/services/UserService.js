import AuthApi from "../api/AuthApi";
import UserApi from "../api/UserApi";

const UserService = {
  login: async (data) => {
    try {
      const authApi = new AuthApi();
      const response = await authApi.login(data);
      const user = response?.data?.data || {};
      const token = response?.data?.token || "";
      return { user, token };
    } catch (error) {
      console.error("Error in UserService", error);
      return null;
    }
  },
  register: async (data) => {
    try {
      const authApi = new AuthApi();
      const response = await authApi.register(data);
      const user = response?.data?.data || {};
      const token = response?.data?.token || "";
      return { user, token };
    } catch (error) {
      console.error("Error in UserService", error);
      return null;
    }
  },
  getMyInfo: async () => {
    try {
      const response = await UserApi.getMyInfo();

      console.log(response.data);

      const userInfo = response?.data || {};
      return userInfo;
    } catch (error) {
      console.error("Error in UserService", error);
      return null;
    }
  },
};

export default UserService;
