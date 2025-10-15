import { useState, useEffect, useCallback } from "react";
import { getTasks } from "@/services/taskService";
import { Task } from "@/types/task";
import { useAccessToken } from "@/context/ATContext";

export function useTasks() {
  const { accessToken } = useAccessToken();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function parseVNDateString(dateStr?: string | null): Date | null {
    if (!dateStr) return null;
    const [time, date] = dateStr.split(" ");
    const [day, month, year] = date.split("/").map(Number);
    const [hour, minute, second] = time.split(":").map(Number);
    return new Date(year, month - 1, day, hour, minute, second);
  }

  function normalizeTask(task: any): Task {
    return {
      ...task,
      start: task.startTime ? new Date(task.startTime) : null,
      end: task.endTime ? new Date(task.endTime) : null,
    };
  }

  const fetchTasks = useCallback(async () => {
    if (!accessToken) {
      if (!initialized) setInitialized(true);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await getTasks();
      console.log("📥 Raw data from API:", data);
      const normalized = data.map(normalizeTask);
      console.log("✅ Normalized data:", normalized);
      setTasks(normalized);
    } catch {
      setError("Không thể tải danh sách task!");
    } finally {
      setLoading(false);
      if (!initialized) setInitialized(true);
    }
  }, [accessToken, initialized]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return { tasks, loading, error, fetchTasks, setTasks };
}
