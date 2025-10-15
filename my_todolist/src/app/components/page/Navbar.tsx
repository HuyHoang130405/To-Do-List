import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-5 bg-transparent fixed top-0 left-0 w-full z-50">
      <Link href="/" className="text-3xl font-extrabold tracking-tight drop-shadow-lg">
        <span className="animate-pulse bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
          ToDoList
        </span>
      </Link>
      <div className="flex items-center gap-4">
        <Link
          href="/login"
          className="px-5 py-2 rounded-xl bg-indigo-500/90 hover:bg-indigo-600 text-white font-semibold shadow-lg transition-all duration-200"
        >
          Đăng nhập
        </Link>
        <Link
          href="/register"
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-400 hover:opacity-90 text-white font-semibold shadow-lg transition-all duration-200"
        >
          Đăng ký
        </Link>
      </div>
    </nav>
  );
}