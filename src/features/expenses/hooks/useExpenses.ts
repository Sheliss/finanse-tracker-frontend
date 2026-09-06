import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getExpenses } from "../api/expenses";

export function useExpenses(page: number, limit: number) {
  return useQuery({
    queryKey: ["expenses", page, limit],
    queryFn: () => getExpenses(page, limit),
    placeholderData: keepPreviousData,
  });
}
