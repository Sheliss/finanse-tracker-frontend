import { type ReactNode } from "react";

type OwnProps = {
  children: ReactNode;
  className?: string;
};

const DashboardCard: React.FC<OwnProps> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};
export default DashboardCard;
