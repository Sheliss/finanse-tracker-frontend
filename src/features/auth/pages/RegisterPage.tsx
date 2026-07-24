import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "../schemas/auth.schema";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";
import { useState } from "react";
import SuccessCard from "../components/SuccessCard";

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

  return (
    <>
      <form
        className="mx-auto flex flex-col max-w-md outline rounded-xl gap-3 p-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          Already have an account?{" "}
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
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
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
        <input
          disabled={registerMutation.isPending}
          className="outline p-2"
          type="password"
          {...register("confirmPassword")}
          placeholder="Confirm Password"
        />
        <button className="cursor-pointer" type="submit">
          {registerMutation.isPending ? "Registering..." : "Register"}
        </button>
      </form>
    </>
  );
};
export default RegisterPage;
