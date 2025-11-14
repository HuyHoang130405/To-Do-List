"use client";

import { useState } from "react";
import { PlusCircle, Menu } from "lucide-react";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { tasks, loading, error, fetchTasks } = useTasks();

  const handleAddTask = async (taskData: TaskPayload) => {
    try {
      await createTask(taskData);
      setIsModalOpen(false);
      fetchTasks();
    } catch (err: any) {
      // alert(err?.response?.data?.message || "Thêm task thất bại!");
      throw err;
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <ParticlesBackground />

      {/* Overlay chỉ làm mờ nội dung, không che sidebar */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden 
    ${isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}
  `}
        onClick={() => setIsSidebarOpen(false)}
      />

      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        {/* Sidebar */}
        <div
          className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-slate-800/80 backdrop-blur-md border-r border-white/10 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <Sidebar onClose={() => setIsSidebarOpen(false)} />
        </div>

        {/* Nội dung chính */}
        <div className="flex-1 flex flex-col">
          {/* Header cố định */}
          <header className="flex items-center justify-between px-6 py-4 bg-white/5 backdrop-blur-md border-b border-white/10 sticky top-0 z-30">
            <div className="flex items-center gap-3">
              {/* Hamburger */}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 transition lg:hidden"
              >
                <Menu size={22} />
              </button>
            </div>

            <Header />
          </header>

          {/* Main content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                To-Do List
              </h2>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center cursor-pointer gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-lg hover:scale-105 transition-all duration-200"
              >
                <PlusCircle size={20} />
                <span className="hidden inline">Thêm công việc</span>
                {/* <span className="sm:hidden">Thêm công việc</span> */}
              </button>
            </div>

            {/* Grid chính */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              {/* Task List */}
              <section className="xl:col-span-3">
                <div className="space-y-4 max-h-[calc(100vh-15rem)] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/20">
                  {loading ? (
                    <div className="text-center text-white py-12">Đang tải...</div>
                  ) : error ? (
                    <div className="text-center text-red-400 py-12">{error}</div>
                  ) : tasks?.length === 0 ? (
                    <div className="text-center text-gray-400 py-16 text-lg italic bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                      <p className="mb-2">Chưa có công việc nào.</p>
                      <p>Bắt đầu ngày mới hiệu quả!</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                      {tasks.map((task) => (
                        <TaskCard
                          key={task._id}
                          _id={task._id}
                          title={task.title}
                          startTime={task.start}
                          endTime={task.end}
                          description={task.description}
                          priority={task.priority}
                          color="blue"
                          subtasks={task.subtasks || []}
                          onDeleted={() => fetchTasks()}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </section>

              {/* Desktop Widgets */}
              <aside className="hidden xl:flex xl:col-span-1 flex-col gap-6">
                <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
                  <h3 className="font-semibold text-white mb-2">Ghi chú hôm nay</h3>
                  <p className="text-sm text-gray-300">
                    Planning meetings for the week
                  </p>
                </div>
                <ActivityWidget />
              </aside>
            </div>

            {/* Mobile Widget Toggle */}
            <div className="xl:hidden">
              <details className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
                <summary className="p-4 font-semibold text-white cursor-pointer flex justify-between items-center hover:bg-white/5 transition">
                  Hoạt động & Ghi chú
                  <span className="text-xs transition-transform duration-200 details-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <div className="p-4 border-t border-white/10 space-y-5">
                  <div>
                    <h4 className="font-medium text-white mb-1">Ghi chú</h4>
                    <p className="text-sm text-gray-300">
                      Planning meetings for the week
                    </p>
                  </div>
                  <ActivityWidget />
                </div>
              </details>
            </div>
          </main>
        </div>
      </div>

      {/* Modal */}
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={handleAddTask}
      />
    </div>
  );
}
