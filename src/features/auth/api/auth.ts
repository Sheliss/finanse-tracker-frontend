import { supabase } from "@/lib/supabase";
import type { LoginFormData, RegisterFormData } from "../schemas/auth.schema";

export async function login(credentials: LoginFormData) {
  const { data, error } = await supabase.auth.signInWithPassword(credentials);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function register(credentials: RegisterFormData) {
  const { data, error } = await supabase.auth.signUp(credentials);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
  return true;
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }
  return data.user;
}
