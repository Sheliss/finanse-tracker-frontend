import { useState } from "react";
import { useExpenses } from "../hooks/useExpenses";
import Modal from "@/components/Modal";
import ExpenseCard from "../components/ExpenseCard";
import type { ExpenseFormData } from "../schemas/expense.schema";
import { useCreateExpense } from "../hooks/useCreateExpense";
import ExpenseForm from "../components/ExpenseForm";
import Button from "@/components/Button";

const ExpensesPage = () => {
  const [page, setPage] = useState<number>(1);
  const limit = 1;
  const { data, isPending, isFetching, error } = useExpenses(page, limit);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const addExpense = useCreateExpense();

  if (isPending) {
    return <div>{`Loading ∘ ∘ ∘ ( °ヮ° )`}</div>;
  }

  if (error) {
    return <div>{`Error: ${error.message}`}</div>;
  }

  const onModalClose = () => {
    setIsAddModalOpen(false);
  };

  const onSubmit = async (data: ExpenseFormData) => {
    try {
      await addExpense.mutateAsync(data);
      onModalClose();
    } catch (error) {
      console.error("Failed to add expense:", error);
    }
  };

  const expenses = data?.data ?? [];
  const totalPages = data?.pagination.totalPages ?? 1;

  return (
    <div className="w-full">
      <div className="w-300 mx-auto mt-2 mb-4 flex justify-between items-center">
        <div className="text-xl font-bold dark:text-white">All Expenses</div>
        <Button onClick={() => setIsAddModalOpen(true)}>Add Expense ✚</Button>
      </div>

      <div className="flex flex-col items-center border border-neutral-300 rounded w-300 mx-auto dark:border-neutral-700">
        {expenses?.map((expense) => (
          <ExpenseCard key={expense.id} expense={expense} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex items-center gap-1 mt-4 w-fit mx-auto">
          <div className="w-24">
            <Button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1 || isFetching}
              wFull
            >
              Previous
            </Button>
          </div>
          <div className="w-24">
            <Button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page >= totalPages || isFetching}
              wFull
            >
              Next
            </Button>
          </div>
        </div>
      )}
      {isAddModalOpen && (
        <Modal onClose={onModalClose}>
          <ExpenseForm
            onClose={onModalClose}
            onSubmit={onSubmit}
            submitLabel="Add"
            loadingLabel="Adding..."
            isPending={addExpense.isPending}
          />
        </Modal>
      )}
    </div>
  );
};
export default ExpensesPage;
