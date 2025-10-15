"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Sidebar } from "../components/layout/Sidebar";
import { Header } from "../components/layout/Header";
import { TaskCard } from "../components/index/Tasks/TaskCard";
import { ActivityWidget } from "../components/index/Widgets/ActivityWidget";
import { ParticlesBackground } from "../components/index/Particles/ParticlesBackground";
import { AddTaskModal } from "../components/modals/AddTaskModal/AddTaskModal";
import { useTasks } from "@/hooks/useTasks";
import { createTask } from "@/services/taskService";
import { TaskPayload } from "@/types/task";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { tasks, loading, error, fetchTasks } = useTasks();

  const handleAddTask = async (taskData: TaskPayload) => {
    try {
      await createTask(taskData);
      setIsModalOpen(false);
      fetchTasks(); // reload lại danh sách task
    } catch (err: any) {
      alert(err?.response?.data?.message || "Thêm task thất bại!");
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <ParticlesBackground />

      <div className="relative z-10 flex items-center justify-center p-6">
        <div className="w-full max-w-7xl h-[90vh] rounded-3xl bg-white/5 backdrop-blur-xl shadow-2xl flex overflow-hidden border border-white/10">
          <Sidebar />

          <div className="flex-1 flex flex-col">
            <Header />

            <div className="flex items-center justify-between px-8 py-4">
              <h2 className="text-2xl font-semibold text-white">📋 To-Do List</h2>
              <button
                onClick={() => setIsModalOpen(true)}
                className="cursor-pointer px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow hover:scale-105 transition flex items-center gap-2"
              >
                <PlusCircle size={18} /> Thêm công việc
              </button>
            </div>

            <div className="flex-1 flex gap-6 p-6 overflow-y-auto">
              <main className="flex-1 grid grid-cols-2 gap-6">
                {loading ? (
                  <div className="col-span-2 text-center text-white text-lg">
                    Đang tải danh sách công việc...
                  </div>
                ) : error ? (
                  <div className="col-span-2 text-center text-red-400">
                    {error}
                  </div>
                ) : !tasks || tasks.length === 0 ? (
                  <div className="col-span-2 text-center text-gray-400 text-lg italic">
                    Bạn chưa có công việc nào. Hãy thêm task đầu tiên để bắt đầu
                    ngày mới hiệu quả! 🚀
                  </div>
                ) : (
                  tasks.map((task) => (
                    <TaskCard
                      key={task._id}
                      _id={task._id}
                      title={task.title}
                      startTime={task.start}   // <-- giữ nguyên Date
                      endTime={task.end}
                      description={task.description}
                      priority={task.priority}
                      color="blue"
                      subtasks={task.subtasks || []}
                      onDeleted={() => fetchTasks()}
                    />
                  ))
                )}
              </main>

              <aside className="w-80 flex flex-col gap-6">
                <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md shadow-md border border-white/10">
                  <h3 className="font-semibold mb-2 text-white">📝 Ghi chú hôm nay</h3>
                  <p className="text-sm text-gray-400">
                    Planning meetings for the week 🚀
                  </p>
                </div>
                <ActivityWidget />
              </aside>
            </div>
          </div>
        </div>
      </div>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={handleAddTask}
      />
    </div>
  );
}