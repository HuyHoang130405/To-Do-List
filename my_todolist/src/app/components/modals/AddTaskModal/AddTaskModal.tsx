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
  ); // default +1h
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [openPriority, setOpenPriority] = useState(false);
  const [subtasks, setSubtasks] = useState<SubTask[]>([]);
  const [newSubtask, setNewSubtask] = useState("");

  // Memoized handlers
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
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!title.trim()) {
        alert("Please enter a task title");
        return;
      }
      if (!start || !end) {
        alert("Please select start and end times");
        return;
      }
      if (end <= start) {
        alert("End time must be after start time");
        return;
      }
      onAddTask({
        title,
        description,
        priority,
        start,
        end,
        subtasks,
      });

      toast.success("🎉 Đã thêm công việc thành công!", {
        duration: 5000, // 5 giây
      });

      setTitle("");
      setStart(new Date());
      setEnd(new Date(Date.now() + 60 * 60 * 1000));
      setDescription("");
      setPriority("medium");
      setSubtasks([]);
      setNewSubtask("");
      onClose();
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
              className="absolute inset-0 bg-black/70 backdrop-blur-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-4xl bg-gradient-to-br from-[#1C2341]/95 to-[#0F1324]/95 rounded-2xl shadow-2xl p-8 border border-white/20 text-white backdrop-blur-xl sm:overflow-hidden sm:max-h-none mbs:overflow-auto mbs:max-h-[90vh]"
            >
              {/* Decorative elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-tr from-pink-500/20 to-cyan-500/20 blur-3xl" />
              </div>

              <ModalHeader onClose={onClose} />
              <form onSubmit={handleSubmit} className="relative">
                <div className="sm:grid sm:grid-cols-2 sm:gap-6">
                  {/* Left column: Title, Description */}
                  <div className="space-y-6">
                    {/* Title */}
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

                    {/* Description */}
                    <div className="group">
                      <label className="block text-sm text-gray-400 mb-2 ml-1">
                        {" "}
                        Mô tả{" "}
                      </label>
                      <div className="relative">
                        {" "}
                        {/* overlay */}
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

                  {/* Right column: Start, End, Priority (dọc) */}
                  <div className="space-y-6 mbl:mt-5 sm:mt-0">
                    <div className="flex flex-col gap-6">
                      {/* Start Time */}
                      <div>
                        <div className="relative w-full">
                          <DateTimeInput
                            label="Thời gian bắt đầu"
                            value={start}
                            onChange={setStart}
                            minDate={new Date()}
                            gradient="bg-gradient-to-r from-blue-500/10 to-purple-500/10"
                          />
                        </div>
                      </div>
                      {/* End Time */}
                      <div>
                        <div className="relative w-full">
                          <DateTimeInput
                            label="Thời gian kết thúc"
                            value={end}
                            onChange={setEnd}
                            minDate={start || new Date()}
                            gradient="bg-gradient-to-r from-pink-500/10 to-cyan-500/10"
                          />
                        </div>
                      </div>
                      {/* Priority */}
                      <div className="relative w-full">
                        <PriorityDropdown
                          priority={priority}
                          setPriority={setPriority}
                          open={openPriority}
                          setOpen={setOpenPriority}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <SubtaskList
                  subtasks={subtasks}
                  newSubtask={newSubtask}
                  setNewSubtask={setNewSubtask}
                  handleAddSubtask={handleAddSubtask}
                  handleDeleteSubtask={handleDeleteSubtask}
                  toggleSubtask={toggleSubtask}
                />
                {/* Date/Time preview */}
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
                      <div className="mbl:mt-3 sm:mt-0 flex items-center gap-2">
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
