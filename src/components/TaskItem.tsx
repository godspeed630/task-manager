"use client";

import { useState, type FormEvent } from "react";
import type { Task } from "../types";

const priorityBadge: Record<Task["priority"], string> = {
  low: "border-sky-500/30 bg-sky-500/10 text-sky-300",
  medium: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  high: "border-rose-500/30 bg-rose-500/10 text-rose-300",
};

interface Props {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: (title: string) => void;
}

export function TaskItem({ task, onToggle, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);

  const startEdit = () => {
    setDraft(task.title);
    setEditing(true);
  };

  const cancelEdit = () => {
    setDraft(task.title);
    setEditing(false);
  };

  const saveEdit = (e: FormEvent) => {
    e.preventDefault();
    if (draft.trim()) onEdit(draft);
    setEditing(false);
  };

  return (
    <li className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900 p-3">
      <button
        onClick={onToggle}
        aria-label={task.completed ? "Mark as active" : "Mark as completed"}
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition ${
          task.completed
            ? "border-emerald-500 bg-emerald-500 text-zinc-950"
            : "border-zinc-600 hover:border-zinc-400"
        }`}
      >
        {task.completed && (
          <svg
            viewBox="0 0 12 12"
            className="h-3 w-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              d="M2 6.5 4.8 9 10 3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {editing ? (
        <form onSubmit={saveEdit} className="flex flex-1 items-center gap-2">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Escape") cancelEdit();
            }}
            aria-label="Edit task title"
            className="flex-1 rounded border border-zinc-700 bg-zinc-950 px-2 py-1 text-sm text-zinc-100 outline-none focus:border-zinc-500"
          />
          <button
            type="submit"
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300"
          >
            Save
          </button>
          <button
            type="button"
            onClick={cancelEdit}
            className="text-xs text-zinc-500 hover:text-zinc-300"
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <span
            className={`flex-1 text-sm ${
              task.completed ? "text-zinc-500 line-through" : "text-zinc-100"
            }`}
          >
            {task.title}
          </span>
          <span
            className={`shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-medium ${priorityBadge[task.priority]}`}
          >
            {task.priority}
          </span>
          <button
            onClick={startEdit}
            aria-label="Edit task"
            className="shrink-0 text-xs text-zinc-500 hover:text-zinc-200"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            aria-label="Delete task"
            className="shrink-0 text-xs text-zinc-500 hover:text-rose-400"
          >
            Delete
          </button>
        </>
      )}
    </li>
  );
}
