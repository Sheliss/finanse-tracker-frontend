import { useState } from "react";
import { useDeleteExpense } from "../hooks/useDeleteExpense";
import { useUpdateExpense } from "../hooks/useUpdateExpense";
import type { ExpenseFormData } from "../schemas/expense.schema";
import type { Expense } from "../types";
import Modal from "@/components/Modal";
import ExpenseForm from "./ExpenseForm";

type OwnProps = {
  expense: Expense;
};

const ExpenseCard: React.FC<OwnProps> = ({ expense }) => {
  const deleteExpense = useDeleteExpense();
  const updateExpense = useUpdateExpense();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);

  const onModalClose = () => {
    setIsUpdateModalOpen(false);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this expense?",
    );

    if (!confirmed) {
      return;
    }

    await deleteExpense.mutateAsync(expense.id);
  };

  const onSubmit = async (data: ExpenseFormData) => {
    try {
      await updateExpense.mutateAsync({
        id: expense.id,
        formData: data,
      });
      setIsUpdateModalOpen(false);
    } catch (error) {
      console.error("Failed to update expense:", error);
    }
  };

  return (
    <>
      <div className="flex items-center w-200 justify-between" key={expense.id}>
        <div>
          {expense.title} - {expense.amount}
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setIsUpdateModalOpen(true)}
            className="p-1 outline-1 cursor-pointer w-15"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={deleteExpense.isPending}
            className="p-1 outline-1 cursor-pointer w-15"
          >
            Delete
          </button>
        </div>
      </div>
      {isUpdateModalOpen && (
        <Modal onClose={onModalClose}>
          <ExpenseForm
            onClose={onModalClose}
            onSubmit={onSubmit}
            submitLabel="Edit"
            loadingLabel="Editing..."
            isPending={updateExpense.isPending}
            initialValues={{
              title: expense.title,
              amount: expense.amount,
              category: expense.category,
              date: expense.date,
              note: expense.note ?? undefined,
            }}
          />
        </Modal>
      )}
    </>
  );
};
export default ExpenseCard;
