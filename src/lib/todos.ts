export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export function createTodo(text: string, id = crypto.randomUUID()): Todo | null {
  const trimmed = text.trim();
  if (!trimmed) return null;

  return {
    id,
    text: trimmed,
    completed: false,
  };
}

export function toggleTodo(todos: Todo[], id: string): Todo[] {
  return todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo,
  );
}

export function removeTodo(todos: Todo[], id: string): Todo[] {
  return todos.filter((todo) => todo.id !== id);
}

export function addTodo(todos: Todo[], text: string): Todo[] {
  const todo = createTodo(text);
  if (!todo) return todos;
  return [todo, ...todos];
}

export function remainingCount(todos: Todo[]): number {
  return todos.filter((todo) => !todo.completed).length;
}
