import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  expenseSchema,
  type ExpenseFormData,
  type ExpenseFormInput,
} from "../schemas/expense.schema";
import { EXPENSE_CATEGORIES } from "../constants/expenseCategories";
import { EXPENSE_TYPES } from "../../../types/expense";
import Button from "@/components/Button";

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
      type: "Expense",
      category: "",
      date: new Date().toISOString().split("T")[0],
      note: "",
    },
  });

  const INPUT_STYLES =
    "w-full px-3 py-1.5 bg-white border border-neutral-300 rounded dark:border-neutral-700 dark:bg-neutral-600 dark:text-white";
  const INPUT_ERROR_LABEL = "absolute -top-4 text-red-500 text-sm";

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5.5">
        <div className="relative">
          {errors.title && (
            <p className={INPUT_ERROR_LABEL}>{errors.title.message}</p>
          )}
          <input
            className={INPUT_STYLES}
            type="text"
            {...register("title")}
            placeholder="Title"
          />
        </div>
        <div className="relative">
          {errors.amount && (
            <p className={INPUT_ERROR_LABEL}>{errors.amount.message}</p>
          )}

          <input
            className={INPUT_STYLES}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            {...register("amount")}
            placeholder="Amount"
          />
        </div>
        <div className="relative">
          {errors.type && (
            <p className={INPUT_ERROR_LABEL}>{errors.type.message}</p>
          )}
          <select className={INPUT_STYLES} {...register("type")}>
            {EXPENSE_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="relative">
          {errors.category && (
            <p className={INPUT_ERROR_LABEL}>{errors.category.message}</p>
          )}
          <select className={INPUT_STYLES} {...register("category")}>
            <option value="">Select category</option>
            {EXPENSE_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="relative">
          {errors.date && (
            <p className={INPUT_ERROR_LABEL}>{errors.date.message}</p>
          )}

          <input className={INPUT_STYLES} type="date" {...register("date")} />
        </div>
        <div className="relative">
          {errors.note && (
            <p className={INPUT_ERROR_LABEL}>{errors.note.message}</p>
          )}
          <textarea
            className={INPUT_STYLES}
            placeholder="Note (optional)"
            {...register("note")}
          />
        </div>
        <div className="flex gap-3">
          <Button disabled={isPending} type="submit">
            {isPending ? loadingLabel : submitLabel}
          </Button>
          <Button disabled={isPending} onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
export default ExpenseForm;
