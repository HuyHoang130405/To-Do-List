import { SubTask } from "@/types/task";
import { Trash2, Plus } from "lucide-react";
import React from "react";


export const SubtaskList = React.memo(function SubtaskList({
    subtasks,
    newSubtask,
    setNewSubtask,
    handleAddSubtask,
    handleDeleteSubtask,
    toggleSubtask,
}: {
    subtasks: SubTask[];
    newSubtask: string;
    setNewSubtask: (v: string) => void;
    handleAddSubtask: () => void;
    handleDeleteSubtask: (id: string) => void;
    toggleSubtask: (id: string) => void;
}) {
    return (
        <div>
            <label className="block text-sm text-gray-400 mt-5 mb-2 ml-1">Nhiệm vụ phụ</label>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={newSubtask}
                    onChange={(e) => setNewSubtask(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddSubtask();
                        }
                    }}
                    className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition-all duration-200"
                    placeholder="Thêm một nhiệm vụ phụ"
                />
                <button
                    type="button"
                    onClick={handleAddSubtask}
                    className="px-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 transition-all flex items-center justify-center"
                >
                    <Plus size={18} />
                </button>
            </div>
            <div className="mt-3 space-y-2 max-h-[80px] overflow-y-auto pr-1">
                {subtasks.map((s) => (
                    <div key={s._id} className="flex justify-between items-center bg-white/5 px-3 py-2 rounded-lg border border-white/10">
                        <div className="flex items-center gap-2">
                            <input type="checkbox" checked={s.done} onChange={() => toggleSubtask(s._id)} />
                            <span className={`text-sm ${s.done ? "line-through text-gray-400" : ""}`}>{s.text}</span>
                        </div>
                        <button type="button" onClick={() => handleDeleteSubtask(s._id)} className="text-gray-400 hover:text-red-400 transition">
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
});