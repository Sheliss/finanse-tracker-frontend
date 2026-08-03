import type { SpendingByCategory } from "../types";

type OwnProps = {
  spendings: SpendingByCategory[];
};

const SpendingsByCategoryCard: React.FC<OwnProps> = ({ spendings }) => {
  return (
    <div>
      {spendings.map((spending) => (
        <div key={spending.category}>
          {spending.category}: -{spending.amount}
        </div>
      ))}
    </div>
  );
};
export default SpendingsByCategoryCard;
