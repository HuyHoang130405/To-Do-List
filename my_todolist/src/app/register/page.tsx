"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { LogIn, ArrowLeft } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const username = (form.elements.namedItem("username") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    try {
      const res = await axiosInstance.post("/api/users/register", { username, email, password })
      toast.success("🎉 Tạo tài khoản thành công! Hãy đăng nhập", {
        style: {
          borderRadius: "12px",
          background: "#1f2937",
          color: "#fff",
        },
      });

      // chuyển hướng sang trang login
      setTimeout(() => router.push("/login"), 1200);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Tạo tài khoản thất bại", {
        style: {
          borderRadius: "12px",
          background: "#1f2937",
          color: "#fff",
        },
      });
    }
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 p-4 relative">
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
          Create your account
        </h2>
        <p className="text-gray-400 text-center text-sm mb-8">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-400 hover:underline">
            Sign in
          </Link>
        </p>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleRegister}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full rounded-lg bg-gray-800/80 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email address"
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
            className="w-full rounded-lg bg-white py-3 font-semibold text-black hover:bg-gray-100 transition"
          >
            Sign up
          </button>
        </form>

        {/* Divider with OR */}
        <div className="relative my-6 flex items-center">
          <div className="flex-grow border-t border-gray-700"></div>
          <span className="mx-4 text-gray-400 text-sm">or</span>
          <div className="flex-grow border-t border-gray-700"></div>
        </div>

        {/* Google sign up */}
        <div className="text-center">
          <button className="w-full flex items-center justify-center gap-2 rounded-lg bg-gray-800/80 py-3 text-gray-200 font-semibold hover:bg-gray-700 transition">
            <LogIn size={20} />
            Sign up with Google
          </button>
        </div>
      </motion.div>
    </div>
  );
}
