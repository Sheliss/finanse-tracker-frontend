import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
} from "recharts";
import type { SpendingByCategory } from "../../types";
import { EXPENSE_COLORS } from "../../../../constants/expenseConstants";
import ChartTooltip from "./ChartTooltip";

type OwnProps = {
  data: SpendingByCategory[];
};

const SpendingsByCategoryChart: React.FC<OwnProps> = ({ data }) => {
  if (!data.length) {
    return <p>No expenses this month</p>;
  }

  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="category"
            activeShape={(props) => (
              <Sector {...props} outerRadius={(props.outerRadius ?? 0) + 8} />
            )}
            label={({ value }) => `$${value}`}
          >
            {data.map((entry, index) => (
              // TODO: Replace Cell with the shape prop when upgrading to Recharts 4.
              <Cell
                key={`sector-${index}`}
                fill={EXPENSE_COLORS[entry.category] ?? "#94a3b8"}
              />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};
export default SpendingsByCategoryChart;
