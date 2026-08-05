import type { SpendingByCategory } from "../types";
import SpendingsByCategoryChart from "./charts/SpendingsByCategoryChart";

type OwnProps = {
  spendings: SpendingByCategory[];
};

const SpendingsByCategoryCard: React.FC<OwnProps> = ({ spendings }) => {
  return (
    <div>
      <div>
        {spendings.map((spending) => (
          <div key={spending.category}>
            {spending.category}: -{spending.amount}
          </div>
        ))}
      </div>
      <div>
        <SpendingsByCategoryChart data={spendings} />
      </div>
    </div>
  );
};
export default SpendingsByCategoryCard;
