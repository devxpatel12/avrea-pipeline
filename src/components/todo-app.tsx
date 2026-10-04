"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  addTodo,
  remainingCount,
  removeTodo,
  toggleTodo,
  type Todo,
} from "@/lib/todos";

const initialTodos: Todo[] = [
  { id: "1", text: "Set up Next.js with App Router", completed: true },
  { id: "2", text: "Add shadcn/ui components", completed: true },
  { id: "3", text: "Compare CI runtimes on Avrea vs GitHub", completed: false },
];

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [text, setText] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTodos((current) => addTodo(current, text));
    setText("");
  }

  const remaining = remainingCount(todos);

  return (
    <Card className="w-full max-w-lg shadow-sm">
      <CardHeader>
        <CardTitle>Todos</CardTitle>
        <CardDescription>
          {remaining === 0
            ? "All caught up."
            : `${remaining} remaining`}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Add a todo..."
            aria-label="New todo"
          />
          <Button type="submit" disabled={!text.trim()}>
            Add
          </Button>
        </form>

        <ul className="space-y-2">
          {todos.length === 0 ? (
            <li className="text-sm text-muted-foreground">No todos yet.</li>
          ) : (
            todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center gap-3 rounded-lg border px-3 py-2"
              >
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={() =>
                    setTodos((current) => toggleTodo(current, todo.id))
                  }
                  aria-label={`Toggle ${todo.text}`}
                />
                <span
                  className={
                    todo.completed
                      ? "flex-1 text-sm text-muted-foreground line-through"
                      : "flex-1 text-sm"
                  }
                >
                  {todo.text}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() =>
                    setTodos((current) => removeTodo(current, todo.id))
                  }
                  aria-label={`Delete ${todo.text}`}
                >
                  <Trash2 />
                </Button>
              </li>
            ))
          )}
        </ul>
      </CardContent>
    </Card>
  );
}
