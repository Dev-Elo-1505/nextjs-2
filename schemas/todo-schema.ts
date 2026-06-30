import { z } from "zod";

export const todoSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).max(100),
});

export const todoActionSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).max(100),
  completed: z.boolean().optional(),
});

export type TodoType = z.infer<typeof todoSchema>;
export type TodoActionType = z.infer<typeof todoActionSchema>;
