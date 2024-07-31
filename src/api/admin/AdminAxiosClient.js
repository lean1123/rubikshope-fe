import axios from "axios";

const getToken = async () => {
  const token = JSON.parse(localStorage.getItem("jwt"));
  return token ? token : null;
};

const AdminAxiosClient = axios.create({
  baseURL: "http://localhost:3333/",
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshToken = async (token) => {
  const url = "auth/refresh";
  return AdminAxiosClient.post(url, { token: token });
};

// Add a request interceptor
AdminAxiosClient.interceptors.request.use(
  async (config) => {
    if (
      config.url.includes("user/login") ||
      config.url.includes("user/register") ||
      config.url.includes("auth/refresh")
    ) {
      return config;
    }

    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
AdminAxiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshTokenValue = await getToken();
        if (refreshTokenValue) {
          const response = await refreshToken(refreshTokenValue);
          console.log("Response in admin axios: ", response);
          const newToken = response.data.token;

          localStorage.setItem("jwt", JSON.stringify(newToken));

          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return AdminAxiosClient(originalRequest);
        }
      } catch (err) {
        console.error("Lỗi khi gửi lại yêu cầu sau khi làm mới token", err);
        return Promise.reject(err);
      }
    }

    // Xử lý các lỗi khác
    if (error.response) {
      console.error("Lỗi phản hồi", error.response);
    } else if (error.request) {
      console.error("Không nhận được phản hồi", error.request);
    } else {
      console.error("Lỗi khi thiết lập yêu cầu", error.message);
    }

    return Promise.reject(error);
  }
);

export default AdminAxiosClient;
