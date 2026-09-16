import type { ReactNode } from "react";

type OwnProps = {
  children: ReactNode;
  onClick: () => void;
  isActive?: boolean;
};

const SidebarButton: React.FC<OwnProps> = ({ children, onClick, isActive }) => {
  return (
    <button
      className={`border-0 border-l-8 ${isActive ? "border-white" : "border-transparent"} hover:bg-neutral-800 pl-4 md:pl-10 py-2 mb-4 text-left cursor-pointer font-bold text-white`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default SidebarButton;
