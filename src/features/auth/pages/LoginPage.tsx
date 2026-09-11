import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type LoginFormData } from "../schemas/auth.schema";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import Loader from "@/components/Loader";

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
    <div className="w-full max-w-md rounded-lg bg-white p-10 text-center shadow flex flex-col gap-2">
      <div className="text-2xl font-bold mb-6 tracking-tight">
        Finance Tracker Login
      </div>
      <div className="text-2xl mb-5 font-bold">
        {loginMutation.isPending ? <Loader isBlack isShort /> : `( ˙▿˙ )`}
      </div>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="text-neutral-600">
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
