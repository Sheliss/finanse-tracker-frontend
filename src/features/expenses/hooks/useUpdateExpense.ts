import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateExpense } from "../api/expenses";

export function useUpdateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateExpense,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });
    },
  });
}
