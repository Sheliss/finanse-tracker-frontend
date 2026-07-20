import { useMutation } from "@tanstack/react-query";
import { logout } from "../api/auth";

export function useLogiut() {
  return useMutation({
    mutationFn: logout,
  });
}
