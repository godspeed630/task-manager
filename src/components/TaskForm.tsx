"use client";

import { useState, type FormEvent } from "react";
import type { Priority } from "../types";

const priorities: { value: Priority; label: string }[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

interface Props {
  onAdd: (title: string, priority: Priority) => void;
}

export function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title, priority);
    setTitle("");
    setPriority("medium");
  };

  return (
    <form
      onSubmit={submit}
      className="flex flex-col gap-2 rounded-xl border border-zinc-800 bg-zinc-900 p-3 sm:flex-row"
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        aria-label="Task title"
        className="flex-1 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-zinc-500"
      />
      <div className="flex gap-2">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          aria-label="Priority"
          className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-zinc-500"
        >
          {priorities.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={!title.trim()}
          className="rounded-lg bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-white disabled:opacity-40"
        >
          Add
        </button>
      </div>
    </form>
  );
}
