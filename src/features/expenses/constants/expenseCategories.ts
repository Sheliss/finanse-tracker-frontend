export const EXPENSE_CATEGORIES = [
  "Food",
  "Transport",
  "Bills",
  "Entertainment",
  "Health",
  "Shopping",
  "Salary",
  "Other",
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];
