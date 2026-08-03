import { type ReactNode } from "react";

type OwnProps = {
  children: ReactNode;
  className?: string;
};

const DashboardCard: React.FC<OwnProps> = ({ children, className }) => {
  return <div className={`${className} outline-1 p-2`}>{children}</div>;
};
export default DashboardCard;
