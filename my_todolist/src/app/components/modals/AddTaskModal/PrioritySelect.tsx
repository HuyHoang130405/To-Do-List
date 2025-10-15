import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

export const PriorityDropdown = React.memo(function PriorityDropdown({
    priority,
    setPriority,
    open,
    setOpen,
}: {
    priority: "low" | "medium" | "high";
    setPriority: (v: "low" | "medium" | "high") => void;
    open: boolean;
    setOpen: (v: boolean) => void;
}) {
    return (
        <div className="relative w-full">
            <label className="block text-sm text-gray-400 mb-2 ml-1">Mức độ ưu tiên</label>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full px-4 py-3 flex items-center justify-between rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-green-500/60 transition-all duration-200"
            >
                <span className="flex items-center gap-2">
                    {priority === "low" && "🟢 Thấp"}
                    {priority === "medium" && "🟡 Trung bình"}
                    {priority === "high" && "🔴 Cao"}
                </span>
                <ChevronDown
                    size={18}
                    className={`transition-transform duration-200 ${open ? "rotate-180" : ""
                        }`}
                />
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="absolute mt-2 w-full rounded-xl bg-[#1C2341]/95 border border-white/10 shadow-lg z-50 overflow-hidden backdrop-blur-xl"
                    >
                        {[
                            { value: "low", label: "🟢 Thấp" },
                            { value: "medium", label: "🟡 Trung bình" },
                            { value: "high", label: "🔴 Cao" },
                        ].map((opt) => (
                            <button
                                key={opt.value}
                                type="button"
                                onClick={() => {
                                    setPriority(opt.value as "low" | "medium" | "high");
                                    setOpen(false);
                                }}
                                className={`w-full text-left px-4 py-3 hover:bg-white/10 transition-all duration-200 ${priority === opt.value ? "bg-white/20" : ""
                                    }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
});