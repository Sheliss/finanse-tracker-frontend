import { supabase } from "@/lib/supabase";
import type { Expense } from "../types";

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
