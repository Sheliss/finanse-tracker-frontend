type OwnProps = {
  totalSpent: number;
  totalSpendingsAmount: number;
  totalSpentAverage: number;
};

const MonthlySpendingCard: React.FC<OwnProps> = ({
  totalSpent,
  totalSpendingsAmount,
  totalSpentAverage,
}) => {
  return (
    <div>
      <div>${totalSpent} spent</div>
      <div>{totalSpendingsAmount} transactions</div>
      <div>Avg: ${totalSpentAverage}</div>
    </div>
  );
};
export default MonthlySpendingCard;
