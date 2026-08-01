import { useExpenses } from "@/features/expenses/hooks/useExpenses";

export function useDashboardData() {
  const { data: expenses = [], isLoading, error } = useExpenses();

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );

  const recentExpenses = [...expenses]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    .slice(0, 5);

  return {
    totalExpenses,
    recentExpenses,
    isLoading,
    error,
  };
}
