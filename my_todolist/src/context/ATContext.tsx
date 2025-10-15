"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";

type ATContextType = {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  refreshAccessToken: () => Promise<string>;
};

const ATContext = createContext<ATContextType | undefined>(undefined);

// biến global để axiosInstance có thể đọc AT mới nhất
let accessTokenMemory: string | null = null;

export function ATProvider({ children }: { children: ReactNode }) {
  const [accessToken, _setAccessToken] = useState<string | null>(null);

  const setAccessToken = (token: string | null) => {
    accessTokenMemory = token;
    _setAccessToken(token);
  };

  // Hàm refresh token
  const refreshAccessToken = async (): Promise<string> => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/refresh`,
        {},
        { withCredentials: true }
      );

      const newToken = res.data.accessToken as string;
      setAccessToken(newToken);
      return newToken;
    } catch (err) {
      setAccessToken(null);
      throw err;
    }
  };

  return (
    <ATContext.Provider value={{ accessToken, setAccessToken, refreshAccessToken }}>
      {children}
    </ATContext.Provider>
  );
}

// hook cho component dùng
export function useAccessToken() {
  const context = useContext(ATContext);
  if (!context) {
    throw new Error("useAccessToken must be used inside ATProvider");
  }
  return context;
}

// export getter cho axiosInstance
export function getAccessToken() {
  return accessTokenMemory;
}

// export setter để axiosInstance cũng có thể update
export function setAccessTokenGlobal(token: string | null) {
  accessTokenMemory = token;
}
