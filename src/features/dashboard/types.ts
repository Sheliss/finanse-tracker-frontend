import type { ExpenseCategory } from "../expenses/constants/expenseCategories";

export type SpendingByCategory = {
  category: ExpenseCategory;
  amount: number;
};

export type SpendingsByMonth = {
  month: string;
  amount: number;
  year: number;
};
