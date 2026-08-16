import { useExpenses } from "@/features/expenses/hooks/useExpenses";
import type { SpendingByCategory, SpendingsByMonth } from "../types";
import type { ExpenseCategory } from "@/features/expenses/constants/expenseCategories";

export function useDashboardData() {
  const { data: expenses = [], isLoading, error } = useExpenses();
  const now = new Date();

  const totalExpenses = expenses
    .filter((transaction) => transaction.type === "Expense")
    .reduce((sum, expense) => sum + expense.amount, 0);

  const totalIncome = expenses
    .filter((transaction) => transaction.type === "Income")
    .reduce((sum, expense) => sum + expense.amount, 0);

  const totalBalance = totalIncome - totalExpenses;

  const currentMonthExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);

    return (
      expense.type === "Expense" &&
      expenseDate.getMonth() === now.getMonth() &&
      expenseDate.getFullYear() === now.getFullYear()
    );
  });

  const currentMonthIncome = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);

    return (
      expense.type === "Income" &&
      expenseDate.getMonth() === now.getMonth() &&
      expenseDate.getFullYear() === now.getFullYear()
    );
  });

  const currentMonthExpensesTotal = currentMonthExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );

  const currentMonthExpenseCount = currentMonthExpenses.length;

  const pastMonthsExpenses: SpendingsByMonth[] = [];

  for (let pastMonths = 11; pastMonths >= 0; pastMonths--) {
    const date = new Date(now.getFullYear(), now.getMonth() - pastMonths);

    pastMonthsExpenses.push({
      month: date.toLocaleString("en-US", { month: "short" }),
      year: date.getFullYear(),
      amount: expenses
        .filter((expense) => {
          const expenseDate = new Date(expense.date);

          return (
            expense.type === "Expense" &&
            expenseDate.getMonth() === date.getMonth() &&
            expenseDate.getFullYear() === date.getFullYear()
          );
        })
        .reduce((sum, expense) => sum + expense.amount, 0),
    });
  }

  const currentMonthAverageExpense =
    currentMonthExpenseCount > 0
      ? currentMonthExpensesTotal / currentMonthExpenseCount
      : 0;

  const currentMonthIncomeTotal = currentMonthIncome.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );

  const recentExpenses = [...expenses]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    .slice(0, 5);

  const groupedCategorySpending = currentMonthExpenses.reduce(
    (acc, expense) => {
      acc[expense.category] = (acc[expense.category] ?? 0) + expense.amount;
      return acc;
    },
    {} as Record<string, number>,
  );

  const spendingByCategory: SpendingByCategory[] = Object.entries(
    groupedCategorySpending,
  ).map(([category, amount]) => ({
    category: category as ExpenseCategory,
    amount,
  }));

  return {
    pastMonthsExpenses,
    currentMonthAverageExpense,
    currentMonthExpenseCount,
    spendingByCategory,
    currentMonthExpensesTotal,
    currentMonthIncomeTotal,
    currentMonthExpenses,
    currentMonthIncome,
    totalBalance,
    totalIncome,
    totalExpenses,
    recentExpenses,
    isLoading,
    error,
  };
}
