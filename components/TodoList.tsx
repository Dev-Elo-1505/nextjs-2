"use client";
import { useQuery } from "@tanstack/react-query";
import TodoItem, { TodoProps } from "./TodoItem";
import { getTodos } from "@/actions/todo-actions";
import { Loader2 } from "lucide-react";

const TodoList = () => {
  const {
    data: todos,
    isPending,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: () => getTodos(),
  });

  if (isPending) {
    return <Loader2 className="animate-spin" />;
  }

  if (error) {
    return (
      <div className="flex justify-center p-8">
        Failed to load todos.
        {/* {error} */}
      </div>
    );
  }

  if (!todos && todos.length === 0) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        No task yet, Add one to get started
      </div>
    );
  }

  return (
    <div className="flex-1">
      {todos.map((todo: TodoProps) => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
