"use client";

import { usePathname } from "next/navigation";
import { Home, ListTodo, Calendar, Settings, LogOut } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import Link from "next/link";

const navItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "All Tasks", href: "/tasks", icon: ListTodo },
  { name: "Calendar", href: "/calendar", icon: Calendar },
];

const bottomItems = [
  { name: "Cài đặt", href: "/settings", icon: Settings },
];

export const Sidebar = () => {
  const pathname = usePathname();

  const handleLogout = async () => {
    await axiosInstance.post("/api/users/logout");
    window.location.href = "/login"; // reload lại trang
  };

  return (
    <aside className="w-64 p-6 bg-white/5 backdrop-blur-md flex flex-col justify-between border-r border-white/10">
      <div>
        <Link href="/">
          <h1 className="text-2xl font-bold text-blue-400 mb-8">
            ✨ ToDoList
          </h1>
        </Link>
        <nav className="flex flex-col gap-2 text-gray-300 font-medium">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <a
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-colors
                  ${isActive ? "bg-blue-500/20 text-blue-400" : "hover:bg-white/10 hover:text-blue-400"}
                `}
              >
                <Icon size={18} /> {item.name}
              </a>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col gap-2">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <a
              key={item.name}
              href={item.href}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-colors
                ${isActive ? "bg-blue-500/20 text-blue-400" : "hover:bg-white/10 hover:text-blue-400"}
              `}
            >
              <Icon size={18} /> {item.name}
            </a>
          );
        })}

        <button
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-500 transition-colors"
          onClick={handleLogout}
        >
          <LogOut size={18} /> Đăng xuất
        </button>
      </div>
    </aside>
  );
};
