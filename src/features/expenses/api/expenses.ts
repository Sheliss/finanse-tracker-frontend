import { supabase } from "@/lib/supabase";
import type { Expense } from "../types";
import type { ExpenseFormData } from "../schemas/expense.schema";

export async function getExpenses() {
  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data as Expense[];
}

export async function createExpense(expense: ExpenseFormData) {
  const { data, error } = await supabase
    .from("expenses")
    .insert(expense)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
