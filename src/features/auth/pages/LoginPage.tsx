import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type LoginFormData } from "../schemas/auth.schema";

const LoginPage = () => {
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

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <div className="pt-24">
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
          className="outline  p-2"
          type="password"
          {...register("password")}
          placeholder="Password"
        />
        <button className="cursor-pointer" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};
export default LoginPage;
