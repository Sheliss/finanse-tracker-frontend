import Button from "@/components/Button";

interface OwnProps {
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirm: React.FC<OwnProps> = ({ onClose, onConfirm }) => {
  return (
    <div>
      <div className="text-2xl font-bold mb-6 tracking-tight dark:text-white">
        Are you sure you want to delete this expense?
      </div>
      <div className="flex gap-2">
        <Button wFull onClick={onConfirm}>
          Confirm
        </Button>
        <Button wFull onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default DeleteConfirm;
