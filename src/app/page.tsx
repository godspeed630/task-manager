"use client";

import { useMemo, useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { TaskForm } from "../components/TaskForm";
import { TaskItem } from "../components/TaskItem";
import { FilterBar } from "../components/FilterBar";
import type { Filter } from "../types";

export default function Home() {
  const {
    tasks,
    hydrated,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    clearCompleted,
  } = useTasks();
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(() => {
    const sorted = [...tasks].sort((a, b) => b.createdAt - a.createdAt);
    if (filter === "active") return sorted.filter((t) => !t.completed);
    if (filter === "completed") return sorted.filter((t) => t.completed);
    return sorted;
  }, [tasks, filter]);

  const activeCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.length - activeCount;

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-xl px-4 py-12">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Task Manager</h1>
          <p className="mt-2 text-sm text-zinc-400">
            {activeCount} active · {completedCount} completed
          </p>
        </header>

        <TaskForm onAdd={addTask} />

        <div className="mt-6">
          <FilterBar
            filter={filter}
            onChange={setFilter}
            onClearCompleted={clearCompleted}
            completedCount={completedCount}
          />
        </div>

        <ul className="mt-4 space-y-2">
          {!hydrated ? (
            <li className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-center text-sm text-zinc-500">
              Loading…
            </li>
          ) : visible.length === 0 ? (
            <li className="rounded-lg border border-dashed border-zinc-800 p-8 text-center text-sm text-zinc-500">
              {filter === "all"
                ? "No tasks yet. Add your first task above."
                : `No ${filter} tasks.`}
            </li>
          ) : (
            visible.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={() => toggleTask(task.id)}
                onDelete={() => deleteTask(task.id)}
                onEdit={(title) => editTask(task.id, title)}
              />
            ))
          )}
        </ul>

        <footer className="mt-10 text-center text-xs text-zinc-600">
          Tasks are saved in your browser (localStorage).
        </footer>
      </div>
    </main>
  );
}
