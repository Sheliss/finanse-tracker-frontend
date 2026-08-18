import type { ButtonType } from "@/types/button";
import type { ReactNode } from "react";

interface OwnProps {
  onClick?: () => void;
  children: ReactNode;
  disabled?: boolean;
  type?: ButtonType;
}

const Button: React.FC<OwnProps> = ({ onClick, children, disabled, type }) => {
  return (
    <button
      className="shadow cursor-pointer px-4 py-2 rounded bg-neutral-900 hover:bg-neutral-500 text-white transform transition-all duration-50 border border-transparent dark:border-neutral-700 dark:bg-neutral-800"
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};
export default Button;
