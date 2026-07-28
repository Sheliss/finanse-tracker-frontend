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

      <div className="fixed inset-0 flex items-center justify-center p-4 z-200 pointer-events-none">
        <div className="p-2 rounded-xl bg-white pointer-events-auto">
          {children}
        </div>
      </div>
    </>
  );
};
export default Modal;
