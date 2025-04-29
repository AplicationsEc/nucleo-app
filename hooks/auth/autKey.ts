export const authKeys = {
  todos: ["usuario"] as const,
  user: () => [...authKeys.todos, "user"] as const,
};
