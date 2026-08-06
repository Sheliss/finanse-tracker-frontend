import type { SpendingsByMonth } from "../types";
import SpendingByMonthChart from "./charts/SpendingByMonthChart";

type OwnProps = {
  totalSpent: number;
  totalSpendingsAmount: number;
  totalSpentAverage: number;
  chartData: SpendingsByMonth[];
};

const MonthlySpendingCard: React.FC<OwnProps> = ({
  totalSpent,
  totalSpendingsAmount,
  totalSpentAverage,
  chartData,
}) => {
  return (
    <div>
      <div>
        <div>${totalSpent} spent</div>
        <div>{totalSpendingsAmount} transactions</div>
        <div>Avg: ${Math.trunc(totalSpentAverage)}</div>
      </div>
      <div>
        <SpendingByMonthChart chartData={chartData} />
      </div>
    </div>
  );
};
export default MonthlySpendingCard;
