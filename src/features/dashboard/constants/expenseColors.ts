import type { ExpenseCategory } from "@/features/expenses/constants/expenseCategories";

export const EXPENSE_COLORS: Record<ExpenseCategory, string> = {
  Food: "#3b82f6",
  Transport: "#22c55e",
  Bills: "#ef4444",
  Entertainment: "#a855f7",
  Health: "#14b8a6",
  Shopping: "#f59e0b",
  Salary: "#10b981",
  Other: "#64748b",
};
