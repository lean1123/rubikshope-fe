import axios from "axios";

const getToken = async () => {
  // const token = JSON.parse(localStorage.getItem("jwt"));
  const token = localStorage.getItem("jwt");
  return token ? token : null;
};

const AdminAxiosClient = axios.create({
  baseURL: "http://localhost:3333/",
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshToken = async (token) => {
  const url = "http://localhost:3333/auth/refresh";
  return axios.post(url, JSON.stringify({ token }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

AdminAxiosClient.interceptors.request.use(
  async (config) => {
    const publicEndpoints = [
      /user\/login/,
      /user\/register/,
      /auth\/refresh/,
      /admin\/products/,
      /admin\/categories/,
    ];

    const isPublicEndpoint = publicEndpoints.some((pattern) =>
      pattern.test(config.url)
    );

    if (isPublicEndpoint) {
      if (config.headers.Authorization) {
        delete config.headers.Authorization;
      }
      return config;
    }

    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

AdminAxiosClient.interceptors.response.use(
  (response) => {
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

        console.log("No refresh token returned");
        return Promise.reject(error);
      } catch (err) {
        console.error("Error during token refresh request", err);
        return Promise.reject(err);
      }
    }

    if (error.response) {
      console.error("Response error", error.response);
    } else if (error.request) {
      console.error("No response received", error.request);
    } else {
      console.error("Request setup error", error.message);
    }

    return Promise.reject(error);
  }
);

export default AdminAxiosClient;
