"use client";

import { usePathname } from "next/navigation";
import { Home, ListTodo, Calendar, Settings, LogOut, X } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import Link from "next/link";

const navItems = [
  { name: "Dashboard", href: "/index", icon: Home },
  // { name: "All Tasks", href: "/tasks", icon: ListTodo },
  // { name: "Calendar", href: "/calendar", icon: Calendar },
];

const bottomItems = [
  { name: "Cài đặt", href: "#", icon: Settings },
];

interface SidebarProps {
  onClose?: () => void;
}

export const Sidebar = ({ onClose }: SidebarProps) => {
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/api/users/logout");
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Đăng xuất thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <aside className="h-full w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 p-6 flex flex-col justify-between">
      {/* Header + Close Button (mobile) */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              ToDoList
            </h1>
          </Link>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/10 text-gray-300 transition lg:hidden"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Main Navigation */}
        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all
                  ${
                    isActive
                      ? "bg-blue-500/20 text-blue-400 shadow-sm"
                      : "text-gray-300 hover:bg-white/10 hover:text-blue-400"
                  }
                `}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-1.5 border-t border-white/10 pt-4">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all
                ${
                  isActive
                    ? "bg-blue-500/20 text-blue-400"
                    : "text-gray-300 hover:bg-white/10 hover:text-blue-400"
                }
              `}
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </Link>
          );
        })}

        <button
          onClick={handleLogout}
          className="cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-red-400 hover:bg-red-500/10 hover:text-red-500 transition-all mt-2"
        >
          <LogOut size={18} />
          <span>Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
};