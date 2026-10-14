export type Priority = "low" | "medium" | "high";

export type Filter = "all" | "active" | "completed";

export interface Task {
  id: string;
  title: string;
  priority: Priority;
  completed: boolean;
  createdAt: number;
}
