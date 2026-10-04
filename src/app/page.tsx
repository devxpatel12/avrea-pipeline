import { TodoApp } from "@/components/todo-app";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-16">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Avrea Todo</h1>
        <p className="mt-2 text-muted-foreground">
          A small Next.js app for comparing CI runtimes.
        </p>
      </div>
      <TodoApp />
    </main>
  );
}
