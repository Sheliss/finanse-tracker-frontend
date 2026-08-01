import { useState } from "react";
import { useExpenses } from "../hooks/useExpenses";
import Modal from "@/components/Modal";
import ExpenseCard from "../components/ExpenseCard";
import type { ExpenseFormData } from "../schemas/expense.schema";
import { useCreateExpense } from "../hooks/useCreateExpense";
import ExpenseForm from "../components/ExpenseForm";

const ExpensesPage = () => {
  const { data: expenses, isLoading, error } = useExpenses();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const addExpense = useCreateExpense();

  if (isLoading) {
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

  return (
    <div className="p-5 w-full">
      <button
        className="cursor-pointer p-1 outline-1"
        onClick={() => setIsAddModalOpen(true)}
      >
        Add Expense
      </button>
      <div className="flex flex-col gap-2 items-center">
        {expenses?.map((expense) => (
          <ExpenseCard key={expense.id} expense={expense} />
        ))}
      </div>
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
