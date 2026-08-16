import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type LoginFormData } from "../schemas/auth.schema";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";

const LoginPage = () => {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await loginMutation.mutateAsync(data);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const INPUT_STYLES =
    "w-full px-3 py-2 bg-white border border-neutral-300 rounded";
  const INPUT_ERROR_LABEL = "absolute -top-4 text-red-500 text-sm";

  return (
    <div className="pt-40">
      <form
        className="mx-auto flex flex-col max-w-md gap-5 p-3 bg-white border border-neutral-300 rounded"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          Don't have an account?{" "}
          <button
            type="button"
            className="cursor-pointer text-neutral-900 hover:underline"
            onClick={() => navigate("/register")}
          >
            Register here 👈
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
        <Button disabled={loginMutation.isPending} type="submit">
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
};
export default LoginPage;
