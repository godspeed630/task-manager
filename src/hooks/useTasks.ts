"use client";

import { useEffect, useState } from "react";
import type { Task, Priority } from "../types";

const STORAGE_KEY = "task-manager-tasks";

function loadTasks(): Task[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Task[]) : [];
  } catch {
    return [];
  }
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setTasks(loadTasks());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // storage unavailable (private mode etc.) — keep in-memory state
    }
  }, [tasks, hydrated]);

  const addTask = (title: string, priority: Priority) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    const task: Task = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      title: trimmed,
      priority,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => [task, ...prev]);
  };

  const toggleTask = (id: string) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );

  const deleteTask = (id: string) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  const editTask = (id: string, title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, title: trimmed } : t)));
  };

  const clearCompleted = () =>
    setTasks((prev) => prev.filter((t) => !t.completed));

  return {
    tasks,
    hydrated,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    clearCompleted,
  };
}
