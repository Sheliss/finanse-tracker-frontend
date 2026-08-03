type OwnProps = {
  balance: number;
};

const BalanceCard: React.FC<OwnProps> = ({ balance }) => {
  return <div>Balance: {balance}$</div>;
};
export default BalanceCard;
