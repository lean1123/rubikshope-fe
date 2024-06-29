import AdminAxiosClient from "../AdminAxiosClient";

class AuthApi {
  register = (data) => {
    const url = "/auth/register";
    return AdminAxiosClient.post(url, JSON.stringify(data));
  };

  login = (data) => {
    const url = "/auth/login";
    return AdminAxiosClient.post(url, JSON.stringify(data));
  };
}

export default AuthApi;
