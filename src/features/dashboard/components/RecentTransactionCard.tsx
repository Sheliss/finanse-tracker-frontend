import type { Expense } from "@/features/expenses/types";

type OwnProps = {
  recentExpenses: Expense[];
};

const RecentTransactionCard: React.FC<OwnProps> = ({ recentExpenses }) => {
  return (
    <div className=" p-2 outline-1">
      <div className="mb-1 text-center color">RecentExpensesCard</div>
      <div>
        {recentExpenses.map((expense) => (
          <div className="flex w-full justify-between" key={expense.id}>
            <div>{expense.title}</div>
            <div
              className={`w-15 flex ${expense.type === "Expense" ? "text-red-600" : "text-green-600"}`}
            >
              <div className="w-3 text-center">
                {expense.type === "Expense" ? "-" : "+"}
              </div>
              <div>{expense.amount}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RecentTransactionCard;
