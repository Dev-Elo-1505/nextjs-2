import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { ITodo, TodoActionType } from "@/schemas/todo-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo, toggleTodo } from "@/actions/todo-actions";
import { toast } from "sonner";
import { Checkbox } from "./ui/checkbox";

export interface TodoItemProps {
  todo: ITodo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const queryClient = useQueryClient();
  const { mutate: toggle } = useMutation({
    mutationFn: ({ id, completed }: { id: string; completed: boolean }) =>
      toggleTodo({ _id: id, completed }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: () => {
      toast.error("Failed to toggle todo");
    },
  });
  const { mutate: remove } = useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess: () => {
      toast.success("Task deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: () => {
      toast.error("Failed to toggle todo");
    },
  });

  return (
    <div className="flex items-center justify-between p-4 bg-card border rounded-lg shadow-sm hover:shadow-md transition-shadow mb-3">
      <div className="flex items-center gap-3">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={(checked: boolean) =>
            toggle({ id: todo._id, completed: checked })
          }
          id={`todo-${todo._id}`}
        />
        <label
          htmlFor={`todo-${todo._id}`}
          className={cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer",
            todo.completed && "line-through text-muted-foreground",
          )}
        >
          {todo.title}
        </label>
      </div>
      <Button
        variant="destructive"
        size="icon"
        onClick={() => remove(todo._id)}
      >
        <Trash size={18} />
      </Button>
    </div>
  );
};

export default TodoItem;
