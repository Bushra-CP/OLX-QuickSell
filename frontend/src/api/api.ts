import axios from "axios";
import { logout, updateAccessToken } from "@/redux/feactures/authSlice";
import type { AppDispatch, RootState } from "@/redux/store/store";

type StoreType = {
  getState: () => RootState;
  dispatch: AppDispatch;
};

let store: StoreType; // Use a variable to hold the store instance. we will inject later

export const injectStore = (_store: StoreType) => {
  store = _store;
};

const api = axios.create({
  baseURL: "http://localhost:3000/quickSell",
  withCredentials: true,
});

// Request Interceptor (attach token)
api.interceptors.request.use(
  (config) => {
    const token = store?.getState().auth.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // console.log("token:", token);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response Interceptor (refresh logic)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await api.post(
          "http://localhost:3000/quickSell/user/refreshToken",
          {},
          {
            withCredentials: true,
          },
        );

        const newAccessToken = res.data.accessToken;

        // console.log("newAccessToken:", newAccessToken);

        // update Redux
   
          store.dispatch(updateAccessToken(newAccessToken));


        // Retry the original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshErr) {
        console.error("Token refresh failed:", refreshErr);
        // Refresh token failed -> Force Logout

        Promise.resolve().then(() => {
          store.dispatch(logout());
        });

        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
