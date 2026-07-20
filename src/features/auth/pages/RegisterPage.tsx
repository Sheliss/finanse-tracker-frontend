import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerSchema, type RegisterFormData } from "../schemas/auth.schema";

const RegisterPage = () => {
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

  const onSubmit = (data: RegisterFormData) => {
    console.log(data);
  };

  return (
    <div>
      <form
        className="mx-auto flex flex-col max-w-md outline rounded-xl gap-3 p-3"
        onSubmit={handleSubmit(onSubmit)}
      >
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
          className="outline p-2"
          type="password"
          {...register("confirmPassword")}
          placeholder="Confirm Password"
        />
        <button className="cursor-pointer" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};
export default RegisterPage;
