import axios from "axios";

const API = axios.create({
  baseURL: "/api", // Proxy configuration handles routing to the backend
  withCredentials: true, // Required for cookies
});

// Add Authorization header for requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Refresh access token if expired
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.post("/api/Admin/refreshToken");
        localStorage.setItem("admin_token", data.token);
        originalRequest.headers["Authorization"] = `Bearer ${data.token}`;
        return API(originalRequest);
      } catch (err) {
        console.error("Token refresh failed:", err);
        localStorage.removeItem("admin_token");
        window.location.href = "/adminLogin";
      }
    }

    return Promise.reject(error);
  }
);

export default API;
