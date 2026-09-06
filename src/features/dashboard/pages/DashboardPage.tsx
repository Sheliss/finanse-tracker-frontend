import { formatCurrencyValue } from "@/utils/formatCurrencyValue";
import DashboardCard from "../components/DashboardCard";
import MonthlySpendingCard from "../components/MonthlySpendingCard";
import RecentTransactionCard from "../components/RecentTransactionCard";
import SpendingsByCategoryCard from "../components/SpendingsByCategoryCard";
import StatCard from "../components/StatCard";
import { useDashboardStats } from "../hooks/useDashboardStats";
import { useCurrencySymbolStore } from "@/store/ui-store";
import { getCurrencySymbol } from "@/utils/getCurrencySymbol";

const DashboardPage = () => {
  const { data, isPending, error } = useDashboardStats();

  const { currency } = useCurrencySymbolStore();

  const currencySymbol = getCurrencySymbol(currency);

  const currentMonth = new Date().toLocaleString("en-US", {
    month: "short",
  });

  if (isPending) {
    return <div>{`Loading ∘ ∘ ∘ ( °ヮ° )`}</div>;
  }

  if (error) {
    return <div>{`Error: ${error.message}`}</div>;
  }

  return (
    <div className="min-h-full">
      <div className="grid grid-cols-12 w-full gap-3">
        <DashboardCard className="col-span-3">
          <StatCard
            title="Balance"
            value={formatCurrencyValue(data.totalBalance, currencySymbol)}
            big
          />
        </DashboardCard>
        <DashboardCard className="col-span-3">
          <StatCard
            title="Income"
            subtitle={"(" + currentMonth + ")"}
            value={formatCurrencyValue(data.currentMonthIncome, currencySymbol)}
          />
        </DashboardCard>
        <DashboardCard className="col-span-3">
          <StatCard
            title={"Expenses"}
            subtitle={"(" + currentMonth + ")"}
            value={
              "-" +
              formatCurrencyValue(data.currentMonthExpense, currencySymbol)
            }
          />
        </DashboardCard>
        <DashboardCard className="col-span-3">
          <StatCard
            title="Net"
            subtitle={"(" + currentMonth + ")"}
            value={formatCurrencyValue(
              data.currentMonthIncome - data.currentMonthExpense,
              currencySymbol,
            )}
          />
        </DashboardCard>
        <DashboardCard className="col-span-4">
          <RecentTransactionCard recentExpenses={data.recentExpenses} />
        </DashboardCard>
        <DashboardCard className="col-span-8">
          <SpendingsByCategoryCard spendings={data.spendingByCategory} />
        </DashboardCard>
        <DashboardCard className="col-span-12">
          <MonthlySpendingCard chartData={data.pastMonthsExpenses} />
        </DashboardCard>
      </div>
    </div>
  );
};
export default DashboardPage;
