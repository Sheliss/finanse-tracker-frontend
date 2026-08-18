import type { SpendingByCategory } from "../types";
import SpendingsByCategoryChart from "./charts/SpendingsByCategoryChart";

type OwnProps = {
  spendings: SpendingByCategory[];
};

const SpendingsByCategoryCard: React.FC<OwnProps> = ({ spendings }) => {
  return (
    <div>
      <div className="mb-1 text-center font-bold text-xl dark:text-white">
        Monthly spending by category
      </div>
      <div>
        <SpendingsByCategoryChart data={spendings} />
      </div>
    </div>
  );
};
export default SpendingsByCategoryCard;
