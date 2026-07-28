import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  expenseSchema,
  type ExpenseFormData,
  type ExpenseFormInput,
} from "../schemas/expense.schema";
import { EXPENSE_CATEGORIES } from "../constants/categories";
import { useCreateExpense } from "../hooks/useCreateExpense";

type OwnProps = {
  onClose: () => void;
};

const AddExpenseForm: React.FC<OwnProps> = ({ onClose }) => {
  const addExpenseMutation = useCreateExpense();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpenseFormInput, unknown, ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      title: "",
      amount: undefined,
      category: "",
      date: new Date().toISOString().split("T")[0],
      note: "",
    },
  });

  const onSubmit = async (data: ExpenseFormData) => {
    try {
      await addExpenseMutation.mutateAsync(data);
      onClose();
    } catch (error) {
      console.error("Failed to add expense:", error);
    }
  };

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
            disabled={addExpenseMutation.isPending}
            className="cursor-pointer outline py-1 px-2 w-16"
            type="submit"
          >
            {addExpenseMutation.isPending ? "Adding..." : "Add"}
          </button>
          <button
            disabled={addExpenseMutation.isPending}
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
export default AddExpenseForm;
