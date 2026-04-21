import { logout, updateAccessToken } from "@/redux/feactures/authSlice";
import { store } from "@/redux/store/store";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/quickSell",
  withCredentials: true,
});

// Request Interceptor (attach token)
api.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response Interceptor (refresh logic)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.get(
          "http://localhost:3000/quickSell/user/refreshToken",
          {
            withCredentials: true,
          },
        );

        const newAccessToken = res.data.accessToken;

        // update Redux
        store.dispatch(updateAccessToken(newAccessToken));

        // Retry the original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshErr) {
        // Refresh token failed -> Force Logout.
        store.dispatch(logout());
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
