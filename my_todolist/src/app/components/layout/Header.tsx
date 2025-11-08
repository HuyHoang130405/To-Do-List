import { useUser } from '@/context/UserContext';
import { Search, Bell } from 'lucide-react';

export const Header = () => {
  const { user } = useUser(); // user chứa username

  return (
    <div className="flex items-center justify-end gap-2">
      {/* Nút search */}
      {/* <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
        <Search size={18} className="text-white" />
      </button> */}

      {/* Nút thông báo */}
      {/* <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition mx-1">
        <Bell size={18} className="text-white" />
      </button> */}

      {/* Avatar + Lời chào */}
      <div className="flex items-center gap-3 ml-2">
        <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold cursor-pointer">
          {user?.username?.[0]?.toUpperCase() || "?"}
        </div>
        {user && (
          <div className="text-sm leading-tight">
            <p className="text-gray-300">Xin chào,</p>
            <p className="font-semibold text-indigo-400">{user.username} 🎉</p>
          </div>
        )}
      </div>
    </div>
  );
};
