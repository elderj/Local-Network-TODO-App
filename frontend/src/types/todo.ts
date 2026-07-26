export const TODO_STATUSES = [
  "backlog",
  "in-progress",
  "blocked",
  "complete",
] as const;

export type TodoStatus = (typeof TODO_STATUSES)[number];

export type Todo = {
  id: number;
  title: string;
  desc: string;
  status: TodoStatus;
};
