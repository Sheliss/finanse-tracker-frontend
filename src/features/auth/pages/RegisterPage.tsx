import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "../schemas/auth.schema";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";
import { useState } from "react";
import SuccessCard from "../components/SuccessCard";
import Button from "@/components/Button";
import Loader from "@/components/Loader";

const RegisterPage = () => {
  const navigate = useNavigate();
  const registerMutation = useRegister();
  const [registeredEmail, setRegisteredEmail] = useState<string | null>(null);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setServerError("");

    try {
      const result = await registerMutation.mutateAsync(data);

      if (!result.session) {
        setRegisteredEmail(data.email);
        return;
      }
    } catch (error: any) {
      setServerError(error.message);
      console.error("Registration failed:", error);
    }
  };

  if (registeredEmail) {
    return <SuccessCard email={registeredEmail} />;
  }

  const kaomoji = () => {
    return registerMutation.isPending ? (
      <Loader isShort isBlack />
    ) : Object.keys(errors).length > 0 || serverError ? (
      `(°ロ°) !`
    ) : (
      `(*￣▽￣)b`
    );
  };

  const INPUT_STYLES =
    "w-full px-3 py-1.5 bg-white border border-neutral-300 rounded";
  const INPUT_ERROR_LABEL = "text-red-500 text-sm pb-1 text-left";

  return (
    <div className="w-full max-w-md rounded-lg bg-white p-10 text-center shadow flex flex-col gap-2">
      <div className="text-2xl font-bold mb-6 tracking-tight">
        Finance Tracker Register
      </div>
      <div className="text-2xl mb-5 font-bold">{kaomoji()}</div>
      <form className="flex flex-col gap-1" onSubmit={handleSubmit(onSubmit)}>
        <div className=" text-neutral-600">
          Already have an account?{" "}
          <button
            type="button"
            className="cursor-pointer text-neutral-900 hover:underline"
            onClick={() => navigate("/login")}
          >
            Login here 👈
          </button>
        </div>
        <div>
          <p
            className={`
                  ${INPUT_ERROR_LABEL}
                  transition-opacity duration-200
                  ${errors.email || serverError ? "opacity-100" : "opacity-0 pointer-events-none"}
                `}
          >
            {errors.email?.message || serverError || "\u00A0"}
          </p>
          <input
            className={INPUT_STYLES}
            type="email"
            {...register("email")}
            placeholder="Email"
            onFocus={() => setServerError("")}
          />
        </div>
        <div className="relative">
          <p
            className={`
                  ${INPUT_ERROR_LABEL}
                  transition-opacity duration-200
                  ${errors.password ? "opacity-100" : "opacity-0 pointer-events-none"}
                `}
          >
            {errors.password?.message || "\u00A0"}
          </p>
          <input
            className={INPUT_STYLES}
            type="password"
            {...register("password")}
            placeholder="Password"
          />
        </div>
        <div>
          <p
            className={`
                  ${INPUT_ERROR_LABEL}
                  transition-opacity duration-200
                  ${errors.confirmPassword ? "opacity-100" : "opacity-0 pointer-events-none"}
                `}
          >
            {errors.confirmPassword?.message || "\u00A0"}
          </p>
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
