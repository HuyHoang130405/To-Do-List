"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, Sparkles, Clock, Users, MoveRight } from "lucide-react";
import Navbar from "./components/page/Navbar";
import FeatureCard from "./components/page/FeatureCard";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-slate-900 to-black text-white relative overflow-x-hidden">
      <Navbar />

      {/* Glow & Gradient Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-cyan-400/30 to-indigo-500/20 rounded-full blur-3xl opacity-80 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-gradient-to-br from-indigo-400/20 to-cyan-400/10 rounded-full blur-2xl opacity-70" />
      </div>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-6 py-36 relative z-10">
        <Link href="/home" className="cursor-pointer mb-5 inline-flex 
        items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r 
        from-indigo-500/80 to-cyan-400/80 text-white font-semibold 
        shadow-lg sm:text-lg animate-bounce">
          <Sparkles className="w-6 h-6 animate-spin-slow text-yellow-300" />
          Quản lý công việc ngay <MoveRight></MoveRight>
        </Link>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <h1
            className="font-lora mbs:text-[28px] sm:text-5xl lg:text-7xl font-extrabold
             bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent
             leading-[1.05] md:leading-[1.12] pb-1 drop-shadow-xl"
          >
            Quản lý công việc <span className="text-yellow-300">đỉnh cao</span>
          </h1>
          <motion.p
            className="mt-8 max-w-2xl lg:text-xl md:text-[18px] text-gray-200 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Biến mỗi ngày của bạn trở nên hiệu quả hơn với{" "}
            <span className="text-cyan-400 font-bold">ToDoList</span> – ứng dụng quản lý công việc thông minh, trực quan, hiệu ứng mượt mà và trải nghiệm khác biệt.
          </motion.p>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-24 bg-slate-800/40 backdrop-blur-md relative z-10">
        <h2 className="mbs:text-[28px] sm:text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-lg">
          Tại sao chọn <span className="text-yellow-300">ToDoList?</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <FeatureCard
            icon={<CheckCircle className="mbs:w-10 mbs:h-10 sm:w-14 sm:h-14 text-cyan-400 drop-shadow-xl" />}
            title="Hoàn thành mục tiêu"
            desc="Quản lý công việc khoa học, đạt nhiều thành tựu mỗi ngày. Theo dõi tiến độ, nhận thông báo nhắc nhở thông minh."
          />
          <FeatureCard
            icon={<Clock className="mbs:w-10 mbs:h-10 sm:w-14 sm:h-14 text-indigo-400 drop-shadow-xl" />}
            title="Tiết kiệm thời gian"
            desc="Lập kế hoạch thông minh, giảm stress, tận hưởng sự chủ động. Giao diện tối ưu cho mọi thiết bị."
          />
          <FeatureCard
            icon={<Users className="mbs:w-10 mbs:h-10 sm:w-14 sm:h-14 text-yellow-300 drop-shadow-xl" />}
            title="Chia sẻ & hợp tác"
            desc="Kết nối nhóm, phân công nhiệm vụ dễ dàng – cùng nhau đạt mục tiêu. Hỗ trợ realtime và chat nhóm."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-gray-400 text-base bg-gradient-to-t from-black/80 to-transparent relative z-10">
        <div className="flex flex-col items-center gap-2">
          <span>
            © {new Date().getFullYear()} <span className="text-cyan-400 font-semibold">ToDoList</span>. Made with <span className="animate-pulse text-pink-400">💙</span>
          </span>
          <span className="text-xs text-gray-500">
            Được phát triển bởi những người yêu thích sự hiệu quả và sáng tạo.
          </span>
        </div>
      </footer>
    </div>
  );
}