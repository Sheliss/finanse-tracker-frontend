import type { Expense } from "@/features/expenses/types";
import { useCurrencySymbolStore } from "@/store/ui-store";
import { getCurrencySymbol } from "@/utils/getCurrencySymbol";

type OwnProps = {
  recentExpenses: Expense[];
};

const RecentTransactionCard: React.FC<OwnProps> = ({ recentExpenses }) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const { currency } = useCurrencySymbolStore();

  const currencySymbol = getCurrencySymbol(currency);

  return (
    <div className="h-80">
      <div className="mb-1 text-center font-bold text-xl dark:text-white">
        Recent expenses
      </div>
      <div>
        {recentExpenses.map((expense) => (
          <div
            className="flex w-full justify-between pb-2 mb-2 border-b border-neutral-300 last:border-b-0 dark:border-neutral-700"
            key={expense.id}
          >
            <div className="dark:text-white">
              <div className="font-bold pb-1">{expense.title}</div>
              <div className="text-sm flex">
                <div>{expense.category}</div>
                <div className="px-1">•</div>
                <div>{formatDate(expense.created_at)}</div>
              </div>
            </div>
            <div
              className={`w-15 flex justify-end ${expense.type === "Expense" ? "text-red-500" : "text-green-600"}`}
            >
              <div className="w-3 text-center">
                {expense.type === "Expense" ? "-" : "+"}
              </div>
              <div>{currencySymbol + expense.amount}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RecentTransactionCard;
