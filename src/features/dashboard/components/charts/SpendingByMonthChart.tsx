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
import { useCurrencySymbolStore } from "@/store/ui-store";
import { getCurrencySymbol } from "@/utils/getCurrencySymbol";

type OwnProps = {
  chartData: SpendingsByMonth[];
};

const SpendingByMonthChart: React.FC<OwnProps> = ({ chartData }) => {
  const { currency } = useCurrencySymbolStore();

  const currencySymbol = getCurrencySymbol(currency);

  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis reversed dataKey="month" />
          <YAxis tickFormatter={(value) => `${currencySymbol + value}`} />
          <Tooltip content={<ChartTooltip />} />
          <CartesianGrid
            vertical={false}
            stroke="#e5e5e5"
            strokeDasharray="3 3"
          />
          <Bar
            formatter={(value) => `${currencySymbol + value}`}
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
