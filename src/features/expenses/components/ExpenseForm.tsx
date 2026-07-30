import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  expenseSchema,
  type ExpenseFormData,
  type ExpenseFormInput,
} from "../schemas/expense.schema";
import { EXPENSE_CATEGORIES } from "../constants/categories";

type OwnProps = {
  onClose: () => void;
  initialValues?: Partial<ExpenseFormData>;
  onSubmit: (data: ExpenseFormData) => Promise<void>;
  submitLabel: string;
  loadingLabel: string;
  isPending?: boolean;
};

const ExpenseForm: React.FC<OwnProps> = ({
  onClose,
  onSubmit,
  initialValues,
  submitLabel,
  loadingLabel,
  isPending,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpenseFormInput, unknown, ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: initialValues ?? {
      title: "",
      amount: undefined,
      category: "",
      date: new Date().toISOString().split("T")[0],
      note: "",
    },
  });

  return (
    <div className="p-3">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
        <input
          className="outline p-1"
          type="text"
          {...register("title")}
          placeholder="Title"
        />
        {errors.amount && (
          <p className="text-red-500 text-sm">{errors.amount.message}</p>
        )}
        <input
          className="outline p-1"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          {...register("amount")}
          placeholder="Amount"
        />
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}
        <select className="outline p-1" {...register("category")}>
          <option value="">Select category</option>
          {EXPENSE_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.date && (
          <p className="text-red-500 text-sm">{errors.date.message}</p>
        )}
        <input className="outline p-1" type="date" {...register("date")} />
        {errors.note && (
          <p className="text-red-500 text-sm">{errors.note.message}</p>
        )}
        <input
          className="outline p-1"
          type="text"
          placeholder="Note (optional)"
          {...register("note")}
        />
        <div className="flex gap-3">
          <button
            disabled={isPending}
            className="cursor-pointer outline py-1 px-2 w-16"
            type="submit"
          >
            {isPending ? loadingLabel : submitLabel}
          </button>
          <button
            disabled={isPending}
            className="cursor-pointer outline py-1 px-2 w-16"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
export default ExpenseForm;
