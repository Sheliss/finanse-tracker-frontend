import { useState } from "react";
import { useDeleteExpense } from "../hooks/useDeleteExpense";
import { useUpdateExpense } from "../hooks/useUpdateExpense";
import type { ExpenseFormData } from "../schemas/expense.schema";
import type { Expense } from "../types";
import Modal from "@/components/Modal";
import ExpenseForm from "./ExpenseForm";
import { EXPENSE_COLORS, EXPENSE_EMOJIS } from "@/constants/expenseConstants";
import { useCurrencySymbolStore } from "@/store/ui-store";
import { getCurrencySymbol } from "@/utils/getCurrencySymbol";

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

  const { currency } = useCurrencySymbolStore();

  const currencySymbol = getCurrencySymbol(currency);

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

  const formattedDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      <div
        className="grid grid-cols-12 w-full bg-white px-3 py-2 border-b last:border-0 border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
        key={expense.id}
      >
        <div className="col-span-2 self-center">
          <div
            style={{
              backgroundColor: EXPENSE_COLORS[expense.category],
            }}
            className="px-2 py-1 leading-none text-white rounded-4xl w-fit"
          >
            {EXPENSE_EMOJIS[expense.category]} {expense.category}
          </div>
        </div>
        <div className="col-span-3 overflow-hidden text-ellipsis whitespace-nowrap pr-2">
          {expense.title}
        </div>
        <div className="col-span-4 overflow-hidden text-ellipsis whitespace-nowrap pr-2">
          {expense.note}
        </div>
        <div className="col-span-1">{formattedDate(expense.createdAt)}</div>
        <div
          className={`col-span-1 text-right ${expense.type === "Expense" ? "text-red-600" : "text-green-600"}`}
        >
          {expense.type === "Expense" && "-"}
          {currencySymbol + expense.amount}
        </div>
        <div className="flex justify-end gap-3 col-span-1">
          <button
            className="cursor-pointer hover:scale-120 transform transition-all duration-50 will-change-transform"
            onClick={() => setIsUpdateModalOpen(true)}
          >
            ✏️
          </button>
          <button
            className="cursor-pointer hover:scale-120 transform transition-all duration-50 will-change-transform"
            onClick={handleDelete}
            disabled={deleteExpense.isPending}
          >
            🗑️
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
