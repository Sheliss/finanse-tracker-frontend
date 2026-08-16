import type { ExpenseCategory } from "@/features/expenses/constants/expenseCategories";

export const EXPENSE_COLORS: Record<ExpenseCategory, string> = {
  Food: "#F67D2C",
  Transport: "#1691DF",
  Bills: "#0F90E4",
  Entertainment: "#27BF8E",
  Health: "#6A4FB0",
  Shopping: "#FF6B64",
  Salary: "#6460D8",
  Other: "#78949F",
};

export const EXPENSE_EMOJIS: Record<ExpenseCategory, string> = {
  Food: "🍔",
  Transport: "🚗",
  Bills: "💡",
  Entertainment: "🎮",
  Health: "💊",
  Shopping: "🛍️",
  Salary: "💰",
  Other: "📦",
};
