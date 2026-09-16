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
import DeleteConfirm from "./DeleteConfirm";

type OwnProps = {
  expense: Expense;
};

const ExpenseCard: React.FC<OwnProps> = ({ expense }) => {
  const deleteExpense = useDeleteExpense();
  const updateExpense = useUpdateExpense();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);

  const onModalClose = () => {
    setIsUpdateModalOpen(false);
    setIsConfirmModalOpen(false);
  };

  const { currency } = useCurrencySymbolStore();

  const currencySymbol = getCurrencySymbol(currency);

  const onDelete = async () => {
    setIsConfirmModalOpen(false);
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
        className="grid grid-cols-12 gap-y-2 md:gap-y-0 w-full bg-white px-3 py-3 md:py-2 border-b last:border-0 border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white items-center"
        key={expense.id}
      >
        <div className="col-span-6 md:col-span-2">
          <div
            style={{
              backgroundColor: EXPENSE_COLORS[expense.category],
            }}
            className="px-2 py-1 leading-none text-white rounded-4xl w-fit text-xs md:text-sm"
          >
            {EXPENSE_EMOJIS[expense.category]} {expense.category}
          </div>
        </div>
        <div
          className={`col-span-6 md:pr-4 md:col-span-1 text-right font-semibold md:font-normal ${
            expense.type === "Expense" ? "text-red-600" : "text-green-600"
          }`}
        >
          {expense.type === "Expense" && "-"}
          {currencySymbol + expense.amount}
        </div>
        <div className="col-span-12 md:col-span-3 font-medium md:font-normal overflow-hidden text-ellipsis whitespace-nowrap pr-2">
          {expense.title}
        </div>
        <div className="hidden md:block md:col-span-4 overflow-hidden text-ellipsis whitespace-nowrap pr-2 text-neutral-400 text-sm">
          {expense.note}
        </div>
        <div className="col-span-6 md:col-span-1 text-xs text-neutral-400 md:text-sm self-center">
          {formattedDate(expense.createdAt)}
        </div>
        <div className="flex justify-end gap-3 col-span-6 md:col-span-1">
          <button
            className="cursor-pointer hover:scale-120 transform transition-all duration-50 will-change-transform p-1"
            onClick={() => setIsUpdateModalOpen(true)}
          >
            ✏️
          </button>
          <button
            className="cursor-pointer hover:scale-120 transform transition-all duration-50 will-change-transform p-1"
            onClick={() => setIsConfirmModalOpen(true)}
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
      {isConfirmModalOpen && (
        <Modal onClose={onModalClose}>
          <DeleteConfirm onClose={onModalClose} onConfirm={onDelete} />
        </Modal>
      )}
    </>
  );
};
export default ExpenseCard;
