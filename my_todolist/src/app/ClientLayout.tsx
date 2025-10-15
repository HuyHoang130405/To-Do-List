"use client";
import { useEffect } from "react";
import { useAccessToken } from "@/context/ATContext";
import { useUser } from "@/context/UserContext";
import { setRefreshAccessToken } from "../lib/axiosInstance";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { accessToken, refreshAccessToken } = useAccessToken();
  const { fetchUser } = useUser();

  // Gắn hàm refresh token cho axios interceptor
  useEffect(() => {
    setRefreshAccessToken(refreshAccessToken);
  }, [refreshAccessToken]);

  useEffect(() => {
    refreshAccessToken();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (accessToken) {
      fetchUser();
    }
    // eslint-disable-next-line
  }, [accessToken]);

  return <>{children}</>;
}
