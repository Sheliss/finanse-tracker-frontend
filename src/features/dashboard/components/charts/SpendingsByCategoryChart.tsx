import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { SpendingByCategory } from "../../types";
import { EXPENSE_COLORS } from "../../constants/expenseColors";

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
          <Pie data={data} dataKey="amount" nameKey="category" label>
            {data.map((entry, index) => (
              // TODO: Replace Cell with the shape prop when upgrading to Recharts 4.
              <Cell
                key={`sector-${index}`}
                fill={EXPENSE_COLORS[entry.category] ?? "#94a3b8"}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      ;
    </>
  );
};
export default SpendingsByCategoryChart;
