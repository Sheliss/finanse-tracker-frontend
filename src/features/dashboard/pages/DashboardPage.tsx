import RecentTransactionCard from "../components/RecentTransactionCard";
import { useDashboardData } from "../hooks/useDashboardData";

const DashboardPage = () => {
  const { recentExpenses, isLoading, error } = useDashboardData();

  if (isLoading) {
    return <div>{`Loading ∘ ∘ ∘ ( °ヮ° )`}</div>;
  }

  if (error) {
    return <div>{`Error: ${error.message}`}</div>;
  }
  return (
    <div className="p-2">
      <div>
        {recentExpenses && (
          <RecentTransactionCard recentExpenses={recentExpenses} />
        )}
      </div>
    </div>
  );
};
export default DashboardPage;
