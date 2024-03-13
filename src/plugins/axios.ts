import axios from "axios";
import router from "@/router";
import LoginService from "@/services/AuthServices";

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: import.meta.env.VITE_BASE_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

// ℹ️ Add request interceptor to send the authorization header on each subsequent request after login
axiosIns.interceptors.request.use((config) => {
  // Retrieve token from localStorage
  const token = localStorage.getItem("accessToken");

  // If token is found
  if (token) {
    // Get request headers and if headers is undefined assign blank object
    config.headers = config.headers || {};

    // Set authorization header
    // ℹ️ JSON.parse will convert token to string
    config.headers.Authorization = token
      ? `Bearer ${JSON.parse(JSON.stringify(token))}`
      : "";
  }

  // Return modified config
  return config;
});

// ℹ️ Add response interceptor to handle 401 response
axiosIns.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Handle error
    if (error.response.status === 401) {
      if (!localStorage.getItem("refreshToken")) {
        router.push("/admin/login");
      } else {
        const res = await LoginService.RefreshToken();
        if (res.success === true) {
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);
          axiosIns.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${res.data.accessToken}`;
          return axiosIns(error.config);
        } else {
          // ℹ️ Logout user and redirect to login page

          // Remove "accessToken" from localStorage
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");

          // If 401 response returned from api
          router.push("/admin/login");
        }
      }
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosIns;
