import AdminAxiosClient from "./AdminAxiosClient";

class AuthApi {
  register = (data) => {
    const url = "/user/register";
    return AdminAxiosClient.post(url, JSON.stringify(data));
  };

  login = (data) => {
    const url = "/user/login";
    return AdminAxiosClient.post(url, JSON.stringify(data));
  };
}

export default AuthApi;
