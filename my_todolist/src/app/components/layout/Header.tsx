import { useUser } from '@/context/UserContext';
import { Search, Bell } from 'lucide-react';

export const Header = () => {
  const { user } = useUser(); // user chứa username
  return (
    <header className="flex items-center justify-end px-8 py-4 border-b border-white/10 bg-white/5 backdrop-blur-md">
      {/* Nút search */}
      <button className="p-2 rounded-full bg-white/10 hover:bg-white/20">
        <Search size={18} className="text-white" />
      </button>

      {/* Nút thông báo */}
      <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 mx-2">
        <Bell size={18} className="text-white" />
      </button>

      {/* Avatar + Lời chào */}
      <div className="flex items-center gap-3 ml-4">
        <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold cursor-pointer">
          {user?.username?.[0]?.toUpperCase() || "?"}
        </div>
        {user && (
          <div className="text-sm"> 
            <p className="text-gray-300">Xin chào,</p>
            <p className="font-semibold text-indigo-400">{user.username} 🎉</p>
          </div>
        )}
      </div>
    </header>
  );
};
