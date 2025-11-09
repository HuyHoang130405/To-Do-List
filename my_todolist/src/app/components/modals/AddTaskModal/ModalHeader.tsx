import { X } from "lucide-react";
import React from "react";

export const ModalHeader = React.memo(function ModalHeader({ onClose }: { onClose: () => void }) {
    return (
        <div className="relative flex justify-between items-center mb-8">
            <h3 className="mbs:text-[22px] sm:text-2xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent flex items-center gap-2">
                <span className="text-2xl">✨</span> Thêm công việc mới
            </h3>
            <button
                onClick={onClose}
                className="cursor-pointer p-2 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-200"
            >
                <X size={24} />
            </button>
        </div>
    )
});