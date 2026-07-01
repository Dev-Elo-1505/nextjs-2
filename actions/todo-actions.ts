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
    const todos = await Todo.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(todos));
  } catch (error) {
    console.error("Failed to load todos");
    throw new Error("Failed to load todos");
  }
};

export const toggleTodo = async ({
  _id,
  completed,
}: {
  _id: string;
  completed: boolean;
}) => {
  await connectDB();

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      _id,
      { completed },
      { new: true },
    );
    return JSON.parse(JSON.stringify(updatedTodo));
  } catch (error) {
    console.error("Failed to toggle todos");
    throw new Error("Failed to toggle todos");
  }
};

export const deleteTodo = async (id: string) => {
  await connectDB();

  try {
    await Todo.findByIdAndDelete(id);
    return { success: true };
  } catch (error) {
    console.error("Failed to delete todos");
    throw new Error("Failed to delete todos");
  }
};
