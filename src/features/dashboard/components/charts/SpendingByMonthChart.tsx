import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import type { SpendingsByMonth } from "../../types";

type OwnProps = {
  chartData: SpendingsByMonth[];
};

const SpendingByMonthChart: React.FC<OwnProps> = ({ chartData }) => {
  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="month" />
          <Tooltip />
          <Bar radius={[4, 4, 0, 0]} dataKey="amount" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};
export default SpendingByMonthChart;
