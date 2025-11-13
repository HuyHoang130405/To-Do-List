"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import { useAccessToken } from "../../context/ATContext"
import { useUser } from "@/context/UserContext";
import toast from "react-hot-toast";

export default function LoginPage() {
  const { setAccessToken } = useAccessToken();
  const { setUser } = useUser();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget; // currentTarget chính là <form>
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    try {
      const res = await axiosInstance.post("/api/users/login", { email, password });
      setAccessToken(res.data.accessToken); // nếu backend trả về accessToken
      setUser(res.data.user);
      // Hiển thị thông báo thành công
      toast.success(`🎉 Welcome back, ${res.data.user.username}!`, {
        style: {
          borderRadius: "12px",
          background: "#1f2937",
          color: "#fff",
        },
      });

      // Chuyển hướng sau 1.2s
      setTimeout(() => router.push("/index"), 1200);
    } catch (err: any) {
      // Xử lý lỗi đăng nhập ở đây nếu cần
      toast.error(err?.response?.data?.message || "Login failed", {
        style: {
          borderRadius: "12px",
          background: "#1f2937",
          color: "#fff",
        },
      });
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 p-4">
      {/* Back button */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center text-gray-400 hover:text-white transition"
      >
        <ArrowLeft size={18} className="mr-2" />
        Back
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-8"
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-white font-bold text-lg">
            TL
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white text-center mb-2">
          Yooo, welcome back!
        </h2>
        <p className="text-gray-400 text-center text-sm mb-8">
          First time here?{" "}
          <Link href="/register" className="text-indigo-400 hover:underline">
            Sign up for free
          </Link>
        </p>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Your email"
            className="w-full rounded-lg bg-gray-800/80 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full rounded-lg bg-gray-800/80 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            type="submit"
            className="cursor-pointer w-full rounded-lg bg-white py-3 font-semibold text-black hover:bg-gray-100 transition"
          >
            Sign in
          </button>
        </form>

        {/* Divider with OR */}
        <div className="relative my-6 flex items-center">
          <div className="flex-grow border-t border-gray-700"></div>
          <span className="mx-4 text-gray-400 text-sm">or</span>
          <div className="flex-grow border-t border-gray-700"></div>
        </div>

        {/* Google login */}
        <div className="text-center">
          <button className="cursor-pointer w-full flex items-center justify-center gap-2 rounded-lg bg-gray-800/80 py-3 text-gray-200 font-semibold hover:bg-gray-700 transition">
            <LogIn size={18} />
            Sign in with Google
          </button>
        </div>

        {/* Footer */}
        <p className="mt-8 text-xs text-gray-500 text-center">
          By signing in, you agree to our{" "}
          <Link href="#" className="underline hover:text-gray-300">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="#" className="underline hover:text-gray-300">
            Privacy Policy
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
