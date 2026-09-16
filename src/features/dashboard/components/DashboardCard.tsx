import { type ReactNode } from "react";

type OwnProps = {
  children: ReactNode;
  className?: string;
};

const DashboardCard: React.FC<OwnProps> = ({ children, className }) => {
  return (
    <div
      className={`${className} border rounded border-neutral-300 bg-white p-2 md:p-4 dark:bg-neutral-800 dark:border-neutral-700`}
    >
      {children}
    </div>
  );
};
export default DashboardCard;
