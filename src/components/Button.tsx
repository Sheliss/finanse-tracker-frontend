import type { ButtonType } from "@/types/button";
import type { ReactNode } from "react";

interface OwnProps {
  onClick?: () => void;
  children: ReactNode;
  disabled?: boolean;
  type?: ButtonType;
  wFull?: boolean;
}

const Button: React.FC<OwnProps> = ({
  onClick,
  children,
  disabled,
  type,
  wFull,
}) => {
  return (
    <button
      className={`${wFull ? "w-full" : ""} ${
        disabled
          ? "opacity-50 cursor-not-allowed pointer-events-none"
          : "cursor-pointer hover:bg-neutral-500"
      } shadow px-4 py-2 rounded bg-neutral-900 text-white transform transition-all duration-50 border border-transparent dark:border-neutral-700 dark:bg-neutral-800`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};
export default Button;
