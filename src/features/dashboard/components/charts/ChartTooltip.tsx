import type { TooltipContentProps } from "recharts";

const ChartTooltip: React.FC<Partial<TooltipContentProps>> = ({
  active,
  payload,
}) => {
  if (active && payload && payload.length) {
    const firstItem = payload[0];
    const spendingAmount = firstItem.value ?? firstItem.payload?.value;

    const textColor = firstItem.payload?.fill ?? "#171717";
    const category = firstItem.payload?.category ?? undefined;

    return (
      <div
        style={{ backgroundColor: textColor }}
        className={`border-2 rounded text-white font-medium shadow-[0_2px_5px_rgba(0,0,0,0.15)] py-2 px-2`}
      >{`${category ? category : ""} $${spendingAmount}`}</div>
    );
  } else {
    return null;
  }
};
export default ChartTooltip;
