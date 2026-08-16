import type { ExpenseType } from "@/types/expense";
import type { ExpenseCategory } from "./constants/expenseCategories";

export type Expense = {
  id: string;
  user_id: string;
  title: string;
  amount: number;
  category: Partial<ExpenseCategory>;
  date: string;
  note: string | null;
  created_at: string;
  type: Partial<ExpenseType>;
};
