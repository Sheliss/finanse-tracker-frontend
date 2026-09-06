import type { Expense } from "@/features/expenses/types";
import type { SpendingByCategory } from "../types";

export type SpendingsByMonth = {
  month: string;
  amount: number;
  year: number;
};

export interface DashboardStats {
  totalBalance: number;
  currentMonthIncome: number;
  currentMonthExpense: number;
  recentExpenses: Expense[];
  spendingByCategory: SpendingByCategory[];
  pastMonthsExpenses: SpendingsByMonth[];
}

const API_URL = "http://localhost:5000/api/transactions";

function getAuthHeader() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const response = await fetch(`${API_URL}/stats`, {
    method: "GET",
    headers: getAuthHeader(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch dashboard stats");
  }

  return data;
}
