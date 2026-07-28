import { useState } from "react";
import { useExpenses } from "../hooks/useExpenses";
import Modal from "@/components/Modal";
import AddExpenseForm from "../components/AddExpenseForm";

const ExpensesPage = () => {
  const { data: expenses, isLoading, error } = useExpenses();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  if (isLoading) {
    return <div>{`Loading ∘ ∘ ∘ ( °ヮ° )`}</div>;
  }

  if (error) {
    return <div>{`Error: ${error.message}`}</div>;
  }

  const onModalClose = () => {
    setIsAddModalOpen(false);
  };

  return (
    <>
      <button
        className="cursor-pointer"
        onClick={() => setIsAddModalOpen(true)}
      >
        Add Expense
      </button>
      <div>
        {expenses?.map((expense) => (
          <div key={expense.id}>
            {expense.title} - {expense.amount}
          </div>
        ))}
      </div>
      {isAddModalOpen && (
        <Modal onClose={onModalClose}>
          <AddExpenseForm onClose={onModalClose} />
        </Modal>
      )}
    </>
  );
};
export default ExpensesPage;
