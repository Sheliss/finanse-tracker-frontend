import type { Expense } from "../types";
import type { ExpenseFormData } from "../schemas/expense.schema";

const API_URL = "http://localhost:5000/api/transactions";

function getAuthHeader() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
}

export interface PaginatedExpensesResponse {
  data: Expense[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export async function getExpenses(
  page: number,
  limit: number,
): Promise<PaginatedExpensesResponse> {
  const response = await fetch(`${API_URL}?page=${page}&limit=${limit}`, {
    method: "GET",
    headers: getAuthHeader(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch expenses");
  }

  return data;
}

export async function createExpense(expense: ExpenseFormData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeader(),
    body: JSON.stringify(expense),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to create expense");
  }

  return data;
}

export async function deleteExpense(expenseID: string) {
  const response = await fetch(`${API_URL}/${expenseID}`, {
    method: "DELETE",
    headers: getAuthHeader(),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "Failed to delete expense");
  }
}

type UpdateExpenseParams = {
  id: string;
  formData: ExpenseFormData;
};

export async function updateExpense({ id, formData }: UpdateExpenseParams) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeader(),
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to update expense");
  }

  return data;
}
