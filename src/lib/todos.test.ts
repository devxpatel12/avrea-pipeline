import { describe, expect, it } from "vitest";

import {
  addTodo,
  createTodo,
  remainingCount,
  removeTodo,
  toggleTodo,
  type Todo,
} from "./todos";

const sample: Todo[] = [
  { id: "a", text: "Write tests", completed: false },
  { id: "b", text: "Run CI", completed: true },
];

describe("createTodo", () => {
  it("creates a todo from trimmed text", () => {
    const todo = createTodo("  Ship it  ", "fixed-id");
    expect(todo).toEqual({
      id: "fixed-id",
      text: "Ship it",
      completed: false,
    });
  });

  it("returns null for empty text", () => {
    expect(createTodo("   ")).toBeNull();
  });
});

describe("todo list helpers", () => {
  it("adds a todo to the front of the list", () => {
    const next = addTodo(sample, "New task");
    expect(next).toHaveLength(3);
    expect(next[0]?.text).toBe("New task");
    expect(next[0]?.completed).toBe(false);
  });

  it("ignores blank adds", () => {
    expect(addTodo(sample, "  ")).toEqual(sample);
  });

  it("toggles completion by id", () => {
    const next = toggleTodo(sample, "a");
    expect(next.find((todo) => todo.id === "a")?.completed).toBe(true);
    expect(next.find((todo) => todo.id === "b")?.completed).toBe(true);
  });

  it("removes a todo by id", () => {
    expect(removeTodo(sample, "b")).toEqual([sample[0]]);
  });

  it("counts remaining incomplete todos", () => {
    expect(remainingCount(sample)).toBe(1);
  });
});
