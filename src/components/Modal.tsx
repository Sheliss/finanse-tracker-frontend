import type { ReactNode } from "react";

interface OwnProps {
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<OwnProps> = ({ onClose, children }) => {
  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-100"
        onClick={onClose}
      />

      <div className="fixed inset-0 flex items-center justify-center z-200 pointer-events-none shadow">
        <div className="w-full max-w-md rounded-lg bg-white mx-4 p-4 md:p-10 text-center shadow pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700">
          {children}
        </div>
      </div>
    </>
  );
};
export default Modal;
