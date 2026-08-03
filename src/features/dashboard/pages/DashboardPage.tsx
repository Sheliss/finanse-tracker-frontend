import BalanceCard from "../components/BalanceCard";
import DashboardCard from "../components/DashboardCard";
import MonthlySpendingCard from "../components/MonthlySpendingCard";
import RecentTransactionCard from "../components/RecentTransactionCard";
import SpendingsByCategoryCard from "../components/SpendingsByCategoryCard";
import ThisMonthCard from "../components/ThisMonthCard";
import { useDashboardData } from "../hooks/useDashboardData";

const DashboardPage = () => {
  const {
    currentMonthAverageExpense,
    currentMonthExpenseCount,
    spendingByCategory,
    currentMonthIncomeTotal,
    currentMonthExpensesTotal,
    totalBalance,
    recentExpenses,
    isLoading,
    error,
  } = useDashboardData();

  if (isLoading) {
    return <div>{`Loading ∘ ∘ ∘ ( °ヮ° )`}</div>;
  }

  if (error) {
    return <div>{`Error: ${error.message}`}</div>;
  }

  return (
    <div className="p-2">
      <div className="grid grid-cols-12 w-full gap-2">
        <DashboardCard className="col-span-6">
          <BalanceCard balance={totalBalance} />
        </DashboardCard>
        <DashboardCard className="col-span-6">
          <ThisMonthCard
            income={currentMonthIncomeTotal}
            expenses={currentMonthExpensesTotal}
          />
        </DashboardCard>
        <DashboardCard className="col-span-12">
          <RecentTransactionCard recentExpenses={recentExpenses} />
        </DashboardCard>
        <DashboardCard className="col-span-6">
          <SpendingsByCategoryCard spendings={spendingByCategory} />
        </DashboardCard>
        <DashboardCard className="col-span-6">
          <MonthlySpendingCard
            totalSpent={currentMonthExpensesTotal}
            totalSpendingsAmount={currentMonthExpenseCount}
            totalSpentAverage={currentMonthAverageExpense}
          />
        </DashboardCard>
      </div>
    </div>
  );
};
export default DashboardPage;
