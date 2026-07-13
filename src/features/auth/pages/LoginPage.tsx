import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type LoginFormData } from "../schemas/auth.schema";

type FormFields = {
  email: string;
  password: string;
};

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
    <div>
      <form
        className="mx-auto flex flex-col max-w-md outline rounded-xl gap-3 p-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
        <input type="email" {...register("email")} placeholder="Email" />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
        <input
          type="password"
          {...register("password")}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default LoginPage;
