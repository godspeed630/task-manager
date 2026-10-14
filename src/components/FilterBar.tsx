"use client";

import type { Filter } from "../types";

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

interface Props {
  filter: Filter;
  onChange: (f: Filter) => void;
  onClearCompleted: () => void;
  completedCount: number;
}

export function FilterBar({
  filter,
  onChange,
  onClearCompleted,
  completedCount,
}: Props) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex gap-1 rounded-lg border border-zinc-800 bg-zinc-900 p-1">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => onChange(f.value)}
            className={`rounded-md px-3 py-1 text-xs font-medium transition ${
              filter === f.value
                ? "bg-zinc-700 text-white"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      {completedCount > 0 && (
        <button
          onClick={onClearCompleted}
          className="text-xs text-zinc-500 hover:text-rose-400"
        >
          Clear completed ({completedCount})
        </button>
      )}
    </div>
  );
}
