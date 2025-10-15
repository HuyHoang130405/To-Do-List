import axios from "axios";
import { getAccessToken, setAccessTokenGlobal } from "@/context/ATContext";

// hàm refresh sẽ được gắn từ ClientLayout
let refreshAccessTokenFn: (() => Promise<string>) | null = null;
export function setRefreshAccessToken(fn: () => Promise<string>) {
  refreshAccessTokenFn = fn;
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// tránh refresh lặp
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

// Request interceptor → luôn attach accessTokenMemory
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // nếu 401 → thử refresh
    if (error.response?.status === 403 && !(originalRequest as any)._retry) {
      if (!refreshAccessTokenFn) {
        return Promise.reject(error);
      }

      // nếu đang refresh thì subscribe vào queue
      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((token) => {
            (originalRequest as any).headers.Authorization = `Bearer ${token}`;
            resolve(axiosInstance(originalRequest));
          });
        });
      }

      (originalRequest as any)._retry = true;
      isRefreshing = true;

      try {
        const newToken = await refreshAccessTokenFn();
        setAccessTokenGlobal(newToken); // update global ngay
        onRefreshed(newToken);

        (originalRequest as any).headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        setAccessTokenGlobal(null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
