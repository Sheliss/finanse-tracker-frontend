import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { SpendingsByMonth } from "../../types";
import ChartTooltip from "./ChartTooltip";

type OwnProps = {
  chartData: SpendingsByMonth[];
};

const SpendingByMonthChart: React.FC<OwnProps> = ({ chartData }) => {
  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis reversed dataKey="month" />
          <YAxis tickFormatter={(value) => `$${value}`} />
          <Tooltip content={<ChartTooltip />} />
          <CartesianGrid
            vertical={false}
            stroke="#e5e5e5"
            strokeDasharray="3 3"
          />
          <Bar
            formatter={(value) => `$${value}`}
            radius={[4, 4, 0, 0]}
            dataKey="amount"
            fill="#171717"
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};
export default SpendingByMonthChart;
