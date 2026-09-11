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
import { useCurrencySymbolStore } from "@/store/ui-store";
import { getCurrencySymbol } from "@/utils/getCurrencySymbol";

type OwnProps = {
  data: SpendingByCategory[];
};

const SpendingsByCategoryChart: React.FC<OwnProps> = ({ data }) => {
  const { currency } = useCurrencySymbolStore();

  const currencySymbol = getCurrencySymbol(currency);

  if (!data.length) {
    return (
      <div className="flex flex-col grow justify-center items-center">
        <div className="text-xl font-bold dark:text-white">
          No transactions yet!
        </div>
      </div>
    );
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
            label={({ value }) => `${currencySymbol + value}`}
          >
            {data.map((entry, index) => (
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
