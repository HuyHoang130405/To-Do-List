'use client'
import { createContext, useContext, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { useAccessToken } from "./ATContext";

interface User {
  id: string;
  username: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  fetchUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => { },
  fetchUser: async () => { },
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { accessToken } = useAccessToken();

  const fetchUser = async () => {
    try {
      if (!accessToken) return;
      const res = await axiosInstance.get("/api/users/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUser(res.data.user);
    } catch {
      setUser(null);
    }
  };
  return (
    <UserContext.Provider value={{ user, setUser, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}