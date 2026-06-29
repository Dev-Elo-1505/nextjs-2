"use client";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { addTodo } from "@/actions/todo-actions";
import { TodoType } from "@/schemas/todo-schema";
import { toast } from "sonner";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const mutation = useMutation({
    mutationFn: (data: TodoType) => addTodo(data),
    onSuccess: () => {
      toast.success("Todo added successfully");
    },
    onError: () => {
      toast.error("Failed to add todo");
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(
      { title },
      {
        onSuccess: () => {
          setTitle("");
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <Input
        type="text"
        placeholder="Add a new task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1"
        disabled={mutation.isPending}
      />
      <Button type="submit" disabled={mutation.isPending}>
        <Plus size={20} className="mr-2" />
        {mutation.isPending ? "Adding..." : "Add"}
      </Button>
    </form>
  );
};
export default TodoForm;
