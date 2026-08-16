import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "../schemas/auth.schema";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";
import { useState } from "react";
import SuccessCard from "../components/SuccessCard";
import Button from "@/components/Button";

const RegisterPage = () => {
  const navigate = useNavigate();
  const registerMutation = useRegister();
  const [registeredEmail, setRegisteredEmail] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const result = await registerMutation.mutateAsync(data);

      if (!result.session) {
        setRegisteredEmail(data.email);
        return;
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  if (registeredEmail) {
    return <SuccessCard email={registeredEmail} />;
  }

  const INPUT_STYLES =
    "w-full px-3 py-2 bg-white border border-neutral-300 rounded";
  const INPUT_ERROR_LABEL = "absolute -top-4 text-red-500 text-sm";

  return (
    <div className="pt-40">
      <form
        className="mx-auto flex flex-col max-w-md gap-5 p-3 bg-white border border-neutral-300 rounded"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="relative">
          Already have an account?{" "}
          <button
            type="button"
            className="cursor-pointer text-neutral-900 hover:underline"
            onClick={() => navigate("/login")}
          >
            Login here 👈
          </button>
        </div>
        <div className="relative">
          {errors.email && (
            <p className={INPUT_ERROR_LABEL}>{errors.email.message}</p>
          )}
          <input
            className={INPUT_STYLES}
            type="email"
            {...register("email")}
            placeholder="Email"
          />
        </div>
        <div className="relative">
          {errors.password && (
            <p className={INPUT_ERROR_LABEL}>{errors.password.message}</p>
          )}
          <input
            className={INPUT_STYLES}
            type="password"
            {...register("password")}
            placeholder="Password"
          />
        </div>
        <div>
          {errors.confirmPassword && (
            <p className={INPUT_ERROR_LABEL}>
              {errors.confirmPassword.message}
            </p>
          )}
          <input
            disabled={registerMutation.isPending}
            className={INPUT_STYLES}
            type="password"
            {...register("confirmPassword")}
            placeholder="Confirm Password"
          />
        </div>
        <Button type="submit">
          {registerMutation.isPending ? "Registering..." : "Register"}
        </Button>
      </form>
    </div>
  );
};
export default RegisterPage;
