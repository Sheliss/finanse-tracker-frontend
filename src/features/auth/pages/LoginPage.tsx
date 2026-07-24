import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type LoginFormData } from "../schemas/auth.schema";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="pt-24">
      <form
        className="mx-auto flex flex-col max-w-md outline rounded-xl gap-3 p-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          Don't have an account?{" "}
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
        <input
          className="outline p-2"
          type="email"
          {...register("email")}
          placeholder="Email"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
        <input
          className="outline p-2"
          type="password"
          {...register("password")}
          placeholder="Password"
        />
        <button
          disabled={loginMutation.isPending}
          className="cursor-pointer"
          type="submit"
        >
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};
export default LoginPage;
