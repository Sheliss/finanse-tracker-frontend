import BalanceCard from "../components/BalanceCard";
import DashboardCard from "../components/DashboardCard";
import RecentTransactionCard from "../components/RecentTransactionCard";
import ThisMonthCard from "../components/ThisMonthCard";
import { useDashboardData } from "../hooks/useDashboardData";

const DashboardPage = () => {
  const {
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
      <div className="grid grid-cols-12 w-full">
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
      </div>
    </div>
  );
};
export default DashboardPage;
