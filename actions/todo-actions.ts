"use server";
import { connectDB } from "@/lib/db";
import Todo from "@/models/todo";
import { todoSchema, TodoType } from "@/schemas/todo-schema";

export const addTodo = async (data: TodoType) => {
  await connectDB();
  const validatedFields = todoSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: "Invalid Fields",
    };
  }

  try {
    const newTodo = await Todo.create(validatedFields.data);
    return JSON.parse(JSON.stringify(newTodo));
  } catch (error) {
    console.error("Error creating todo:", error);
    return {
      error: "Failed to create todo",
    };
  }
};

export const getTodos = async () => {
  await connectDB();

  try {
    const todos = Todo.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(todos));
  } catch (error) {
    throw new Error("Failed to load todos");
    console.error("Failed to load todos");
  }
};
