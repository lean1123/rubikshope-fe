import axios from "axios";
import UserService from "../services/UserService";

const getToken = async () => {
  const token = localStorage.getItem("jwt");
  console.log("Token in get token: ", token);

  return token ? token : "";
};

const AdminAxiosClient = axios.create({
  baseURL: "http://localhost:3333/",
  headers: {
    "Content-Type": "application/json",
  },
});

AdminAxiosClient.interceptors.request.use(
  async (config) => {
    const publicEndpoints = [
      /user\/login/,
      /user\/register/,
      /auth\/refresh/,
      /auth\/introspect/,
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

    let token = await getToken();
    let isValidToken = false;

    try {
      isValidToken = await UserService.checkExpiredToken(token);
      console.log("check token result: ", isValidToken);
    } catch (error) {
      console.error("Error during token introspection", error);
    }

    if (isValidToken === true) {
      console.log("Token valid!");
    } else {
      try {
        const refreshedToken = await UserService.refreshToken(token);
        console.log("refreshedToken in admin axios: ", refreshedToken);
        if (refreshedToken.length === 0) {
          throw new Error("No token returned"); //Token is empty
        }
        token = refreshedToken;
        localStorage.setItem("jwt", token);
      } catch (error) {
        console.error("Error during token refresh request", error);
      }
    }

    config.headers.Authorization = `Bearer ${token}`;

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
    // const originalRequest = error.config;

    // if (
    //   error.response &&
    //   error.response.status === 401 &&
    //   !originalRequest._retry
    // ) {
    //   originalRequest._retry = true;

    //   try {
    //     const refreshTokenValue = await getToken();
    //     if (refreshTokenValue) {
    //       const response = await refreshToken(refreshTokenValue);

    //       console.log("Response in admin axios: ", response);

    //       const newToken = response.data.token;

    //       localStorage.setItem("jwt", JSON.stringify(newToken));

    //       originalRequest.headers.Authorization = `Bearer ${newToken}`;

    //       return AdminAxiosClient(originalRequest);
    //     }

    //     console.log("No refresh token returned");
    //     return Promise.reject(error);
    //   } catch (err) {
    //     console.error("Error during token refresh request", err);
    //     return Promise.reject(err);
    //   }
    // }

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
