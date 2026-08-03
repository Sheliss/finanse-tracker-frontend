type OwnProps = {
  income: number;
  expenses: number;
};

const ThisMonthCard: React.FC<OwnProps> = ({ income, expenses }) => {
  return (
    <div className="flex flex-col">
      <div>Income: {income}</div>
      <div>Expense: {expenses}</div>
      <div>Net: {income - expenses}</div>
    </div>
  );
};
export default ThisMonthCard;
