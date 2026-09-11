import type { SpendingByCategory } from "../types";
import SpendingsByCategoryChart from "./charts/SpendingsByCategoryChart";

type OwnProps = {
  spendings: SpendingByCategory[];
};

const SpendingsByCategoryCard: React.FC<OwnProps> = ({ spendings }) => {
  return (
    <div className="h-80 flex flex-col">
      <div className="mb-1 text-center font-bold text-xl dark:text-white">
        Monthly spending by category
      </div>
      <SpendingsByCategoryChart data={spendings} />
    </div>
  );
};
export default SpendingsByCategoryCard;
