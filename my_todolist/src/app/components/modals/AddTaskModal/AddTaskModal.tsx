"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { ModalHeader } from "./ModalHeader";
import { PriorityDropdown } from "./PrioritySelect";
import { DateTimeInput } from "./DateTimeInput";
import { SubtaskList } from "./SubtaskList";
import "react-datepicker/dist/react-datepicker.css";
import "../../../styles/datetime-picker.css";
import { SubTask, TaskPayload } from "@/types/task";
import { ModalBase } from "../../common/ModalBase";
import toast from "react-hot-toast";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: TaskPayload) => void;
}

export const AddTaskModal = ({
  isOpen,
  onClose,
  onAddTask,
}: AddTaskModalProps) => {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState<Date | null>(new Date());
  const [end, setEnd] = useState<Date | null>(
    new Date(Date.now() + 60 * 60 * 1000)
  );
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [openPriority, setOpenPriority] = useState(false);
  const [subtasks, setSubtasks] = useState<SubTask[]>([]);
  const [newSubtask, setNewSubtask] = useState("");

  const handleAddSubtask = useCallback(() => {
    if (!newSubtask.trim()) return;
    setSubtasks((prev) => [
      ...prev,
      { _id: Date.now().toString(), text: newSubtask, done: false },
    ]);
    setNewSubtask("");
  }, [newSubtask]);

  const handleDeleteSubtask = useCallback((id: string) => {
    setSubtasks((prev) => prev.filter((s) => s._id !== id));
  }, []);

  const toggleSubtask = useCallback((id: string) => {
    setSubtasks((prev) =>
      prev.map((s) =>
        s._id === id ? { ...s, completed: !s.done } : s
      )
    );
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!title.trim()) return toast.error("Vui lòng nhập tiêu đề!");
      if (!start || !end) return toast.error("Vui lòng chọn thời gian!");
      if (end <= start) return toast.error("Thời gian kết thúc phải sau thời gian bắt đầu!");

      try {
        await onAddTask({
          title,
          description,
          priority,
          start,
          end,
          subtasks,
        });

        toast.success("🎉 Đã thêm công việc thành công!");

        // Reset form
        setTitle("");
        setStart(new Date());
        setEnd(new Date(Date.now() + 60 * 60 * 1000));
        setDescription("");
        setPriority("medium");
        setSubtasks([]);
        setNewSubtask("");

        onClose();
      } catch (err: any) {
        toast.error(err?.response?.data?.message || "Thêm công việc thất bại!");
      }
    },
    [title, description, priority, start, end, subtasks, onAddTask, onClose]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalBase isOpen={isOpen} onClose={onClose}>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="relative w-full max-w-4xl rounded-2xl border border-white/10 text-white shadow-lg shadow-black/30 mbl:p-8 mbm:p-6 mbs:p-3
              bg-gradient-to-b from-[#151a2f] to-[#0f1324] backdrop-blur-md
              sm:overflow-hidden sm:max-h-none mbs:overflow-auto mbs:max-h-[90vh]"
            >
              <ModalHeader onClose={onClose} />

              <form onSubmit={handleSubmit} className="relative">
                <div className="sm:grid sm:grid-cols-2 sm:gap-6">
                  {/* Left column: Title, Description */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2 ml-1">
                        Tiêu đề công việc
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl 
                        bg-gradient-to-r from-blue-500/10 to-purple-500/10
                        border border-white/10 text-white placeholder-gray-500 
                        focus:outline-none focus:ring-2 focus:ring-blue-500/60 
                        transition-all duration-200"
                        placeholder="Thêm tiêu đề công việc của bạn ở đây!"
                        required
                      />
                    </div>

                    <div className="group">
                      <label className="block text-sm text-gray-400 mb-2 ml-1">
                        Mô tả
                      </label>
                      <div className="relative">
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 pointer-events-none transition-opacity duration-200 group-hover:opacity-100 opacity-90 z-0" />
                        <textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="relative z-10 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500/60 transition-all duration-200 sm:min-h-[146px] resize-none"
                          placeholder="Thêm một vài mô tả về công việc của bạn"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right column: Start, End, Priority */}
                  <div className="space-y-6 mbs:mt-5 sm:mt-0">
                    <div className="flex flex-col gap-6">
                      <DateTimeInput
                        label="Thời gian bắt đầu"
                        value={start}
                        onChange={setStart}
                        minDate={new Date()}
                        gradient="bg-gradient-to-r from-blue-500/10 to-purple-500/10"
                      />
                      <DateTimeInput
                        label="Thời gian kết thúc"
                        value={end}
                        onChange={setEnd}
                        minDate={start || new Date()}
                        gradient="bg-gradient-to-r from-pink-500/10 to-cyan-500/10"
                      />
                      <PriorityDropdown
                        priority={priority}
                        setPriority={setPriority}
                        open={openPriority}
                        setOpen={setOpenPriority}
                      />
                    </div>
                  </div>
                </div>

                {/* Subtask section */}
                <SubtaskList
                  subtasks={subtasks}
                  newSubtask={newSubtask}
                  setNewSubtask={setNewSubtask}
                  handleAddSubtask={handleAddSubtask}
                  handleDeleteSubtask={handleDeleteSubtask}
                  toggleSubtask={toggleSubtask}
                />

                {/* Preview time */}
                {start && end && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10"
                  >
                    <div className="sm:flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-purple-400" />
                        <span className="text-sm text-purple-200">
                          {start.toLocaleDateString(undefined, {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                          })}{" "}
                          -{" "}
                          {end.toLocaleDateString(undefined, {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="mbs:mt-3 sm:mt-0 flex items-center gap-2">
                        <Clock size={14} className="text-blue-400" />
                        <span className="text-sm text-blue-200">
                          {start.toLocaleTimeString(undefined, {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          -{" "}
                          {end.toLocaleTimeString(undefined, {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-6 mt-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-xl border border-white/10 
                    text-gray-400 hover:text-white hover:bg-white/10 
                    transition-all duration-200"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r 
                    from-blue-600 to-purple-600 text-white font-medium 
                    shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 
                    hover:from-blue-500 hover:to-purple-500 
                    transition-all duration-200 flex items-center gap-2"
                  >
                    <span>Tạo công việc</span>
                    <span>✨</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </ModalBase>
      )}
    </AnimatePresence>
  );
};
