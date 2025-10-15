import axiosInstance from "@/lib/axiosInstance";
import { Task, TaskPayload } from "@/types/task";

// Lấy tất cả task
export async function getTasks(): Promise<Task[]> {
  const res = await axiosInstance.get("/api/tasks/get");
  return res.data.tasks;
}

// Tạo mới task
export async function createTask(payload: TaskPayload) {
  return axiosInstance.post("/api/tasks/create", {
    title: payload.title,
    description: payload.description,
    priority: payload.priority.toLowerCase(), // đảm bảo đúng enum
    startTime: payload.start ? new Date(payload.start).toISOString() : null,
    endTime: payload.end ? new Date(payload.end).toISOString() : null,
    subtasks: payload.subtasks?.map(({ text, done }) => ({
      text,
      done,
    })),
  });
}


// Cập nhật task
export async function updateTask(id: string, payload: TaskPayload) {
  return axiosInstance.put(`/api/tasks/update/${id}`, {
    title: payload.title,
    description: payload.description,
    priority: payload.priority.toLowerCase(), // đảm bảo đúng enum
    startTime: payload.start ? new Date(payload.start).toISOString() : null,
    endTime: payload.end ? new Date(payload.end).toISOString() : null,
    subtasks: payload.subtasks?.map(({ text, done }) => ({
      text,
      done,
    })),
  });
}

// Xoá task
export async function deleteTask(id: string) {
  return axiosInstance.delete(`/api/tasks/delete/${id}`);
}
