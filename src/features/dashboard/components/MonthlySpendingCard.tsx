import type { SpendingsByMonth } from "../types";
import SpendingByMonthChart from "./charts/SpendingByMonthChart";

type OwnProps = {
  chartData: SpendingsByMonth[];
};

const MonthlySpendingCard: React.FC<OwnProps> = ({ chartData }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 font-bold text-lg dark:text-white">
        Spending history
      </div>
      <div className="w-full">
        <SpendingByMonthChart chartData={chartData} />
      </div>
    </div>
  );
};
export default MonthlySpendingCard;
