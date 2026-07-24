import { useExpenses } from "../hooks/useExpenses";

const ExpensesPage = () => {
  const { data: expenses, isLoading, error } = useExpenses();

  if (isLoading) {
    return <div>{`Loading ∘ ∘ ∘ ( °ヮ° )`}</div>;
  }

  if (error) {
    return <div>{`Error: ${error.message}`}</div>;
  }

  return (
    <div>
      {expenses?.map((expense) => (
        <div key={expense.id}>
          {expense.title} - {expense.amount}
        </div>
      ))}
    </div>
  );
};
export default ExpensesPage;
