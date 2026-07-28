import { z } from "zod";
import { EXPENSE_CATEGORIES } from "../constants/categories";

export const expenseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters"),
  amount: z.coerce
    .number({ error: "Amount is required" })
    .positive("Amount must be greater than zero"),
  category: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.enum(EXPENSE_CATEGORIES, {
      error: "Please select a category",
    }),
  ),
  date: z.string().min(1, "Date is required"),
  note: z
    .string()
    .trim()
    .max(500, "Note cannot exceed 500 characters")
    .optional(),
});

export type ExpenseFormInput = z.input<typeof expenseSchema>;

export type ExpenseFormData = z.output<typeof expenseSchema>;
