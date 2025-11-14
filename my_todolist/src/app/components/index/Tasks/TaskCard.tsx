"use client";

import { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { SubTask, TaskPayload } from "@/types/task";
import { EditTaskModal } from "../../modals/EditTaskModal/EditTaskModal";
import { deleteTask, updateTask } from "@/services/taskService";
import { ConfirmModal } from "../../common/ConfirmModal";
import { ConfettiEffect } from '../../common/ConfettiEffect';
import { useRef } from "react";

interface TaskCardProps {
  _id: string;
  title: string;
  startTime?: Date | null;
  endTime?: Date | null;
  description?: string;
  priority?: "low" | "medium" | "high";
  color?: string;
  subtasks: SubTask[];
  onDeleted?: (id: string) => void;
}

export const TaskCard = ({
  _id,
  title,
  startTime,
  endTime,
  description,
  priority = "medium",
  color = "blue",
  subtasks,
  onDeleted
}: TaskCardProps) => {
  // State cho UI
  const [taskTitle, setTaskTitle] = useState(title);
  const [taskDescription, setTaskDescription] = useState(description ?? "");
  const [taskPriority, setTaskPriority] = useState(priority ?? "medium");
  const [taskStart, setTaskStart] = useState(startTime ?? null);
  const [taskEnd, setTaskEnd] = useState(endTime ?? null);
  const [subTaskList, setSubTaskList] = useState(subtasks);
  const [celebrated, setCelebrated] = useState(false); // NEW: nhớ đã ăn mừng hay chưa
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Cập nhật task
  const handleEditTask = async (updatedTask: TaskPayload) => {
    try {
      await updateTask(_id, updatedTask);

      setTaskTitle(updatedTask.title);
      setTaskDescription(updatedTask.description);
      setTaskPriority(updatedTask.priority);
      setTaskStart(updatedTask.start);
      setTaskEnd(updatedTask.end);
      setSubTaskList(updatedTask.subtasks ?? []);

      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(_id);
      onDeleted?.(_id);
      setConfirmOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  // Tính phần trăm hoàn thành
  const completedCount = subTaskList.filter((s) => s.done).length;
  const progress = subTaskList.length > 0 ? Math.round((completedCount / subTaskList.length) * 100) : 0;

  const prevProgress = useRef(progress);
  useEffect(() => {
    if (prevProgress.current < 100 && progress === 100) {
      setCelebrated(true);
    } else if (progress < 100) {
      setCelebrated(false);
    }
    prevProgress.current = progress;
  }, [progress]);

  const handleToggleSubTask = async (id: string) => {
    const updatedList = subTaskList.map((s) =>
      s._id === id ? { ...s, done: !s.done } : s
    );

    setSubTaskList(updatedList); // update UI ngay lập tức

    try {
      await updateTask(_id, {
        title: taskTitle,
        description: taskDescription,
        priority: taskPriority,
        start: taskStart,
        end: taskEnd,
        subtasks: updatedList,
      });
    } catch (err) {
      console.error("Failed to update subtask:", err);
      setSubTaskList(subTaskList); // rollback nếu lỗi
    }
  };

  const priorityColor = taskPriority === "high" ? "text-red-400" : taskPriority === "medium" ? "text-yellow-400" : "text-green-400";

  return (
    <div
      className={`relative p-6 rounded-2xl bg-white/5 backdrop-blur-md flex flex-col gap-3
      ${progress === 100 ? "border-none shadow-none" : "shadow-md border border-white/10"}
      h-auto`}
    >
      {/* Confetti hiệu ứng hoàn thành */}
      <ConfettiEffect trigger={celebrated} />

      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-white flex items-center gap-2">
            {taskTitle}
          </h3>
          <div className="mt-3">
            <p className="text-sm text-gray-400">
              Bắt đầu: {taskStart ? taskStart.toLocaleString() : "—"}
            </p>
            <p className="text-sm text-gray-400">
              Kết thúc: {taskEnd ? taskEnd.toLocaleString() : "—"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-gray-400">
          <button
            onClick={() => setIsModalOpen(true)}
            className="hover:text-blue-400 transition cursor-pointer"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => setConfirmOpen(true)}
            disabled={isDeleting}
            className="hover:text-red-400 transition cursor-pointer"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Description */}
      {taskDescription && (
        <p className="text-sm text-gray-300">{taskDescription}</p>
      )}

      {/* Subtasks */}
      <div className="flex flex-col gap-2 mt-2">
        {subTaskList.map((sub) => (
          <div key={sub._id} className="flex items-center gap-2">
            <label className="flex items-center gap-2 cursor-pointer flex-1">
              <input
                type="checkbox"
                checked={sub.done}
                onChange={() => handleToggleSubTask(sub._id)}
                className="accent-purple-500 w-4 h-4"
              />
              <span
                className={`text-sm ${sub.done ? "line-through text-gray-500" : "text-white"
                  }`}
              >
                {sub.text}
              </span>
            </label>
          </div>
        ))}
      </div>

      {/* Priority */}
      <p className={`text-xs font-medium ${priorityColor}`}>
        {taskPriority === "high" && "🔴 High Priority"}
        {taskPriority === "medium" && "🟡 Medium Priority"}
        {taskPriority === "low" && "🟢 Low Priority"}
      </p>

      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-700 rounded mt-2">
        <div
          className={`h-2 bg-${color}-500 rounded transition-all duration-300`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Progress info */}
      <p className="text-xs text-gray-400 text-right">
        {completedCount}/{subTaskList.length} ({progress}%)
      </p>

      {/* Complete message */}
      {progress === 100 && (
        <div className="complete-message text-center text-green-400 font-bold mt-2 animate-bounce">
          🎉 Complete! 🎉
        </div>
      )}

      {/* Modal */}
      <EditTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onEditTask={handleEditTask}
        task={{
          title: taskTitle,
          description: taskDescription,
          priority: taskPriority,
          start: taskStart,
          end: taskEnd,
          subtasks: subTaskList,
        }}
      />
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        title="❓ Xác nhận xoá"
        message="Bạn có chắc chắn muốn xoá task này không?"
      />
    </div>
  );
};
