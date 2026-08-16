import { useState } from "react";
import { useExpenses } from "../hooks/useExpenses";
import Modal from "@/components/Modal";
import ExpenseCard from "../components/ExpenseCard";
import type { ExpenseFormData } from "../schemas/expense.schema";
import { useCreateExpense } from "../hooks/useCreateExpense";
import ExpenseForm from "../components/ExpenseForm";
import Button from "@/components/Button";

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
    <div className="w-full">
      <div className="w-300 mx-auto mt-2 mb-4 flex justify-between items-center">
        <div className="text-xl font-bold">All Expenses</div>
        <Button onClick={() => setIsAddModalOpen(true)}>Add Expense ✚</Button>
      </div>

      <div className="flex flex-col items-center border border-neutral-300 rounded w-300 mx-auto">
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
