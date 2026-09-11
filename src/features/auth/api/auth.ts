import type { LoginFormData, RegisterFormData } from "../schemas/auth.schema";
import { useAuthStore } from "@/store/auth-store";

const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

export async function login(credentials: LoginFormData) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Login failed");
  }

  localStorage.setItem("token", data.token);

  useAuthStore.getState().setUser(data.user);

  return data;
}

export async function register(credentials: RegisterFormData) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Registration failed");
  }

  if (data.token) {
    localStorage.setItem("token", data.token);
    useAuthStore.getState().setUser(data.user);
  }

  return data;
}

export async function logout() {
  localStorage.removeItem("token");

  useAuthStore.getState().setUser(null);

  return true;
}

export async function getCurrentUser() {
  const token = localStorage.getItem("token");
  if (!token) {
    useAuthStore.getState().setUser(null);
    return null;
  }

  const response = await fetch(`${API_URL}/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    localStorage.removeItem("token");
    useAuthStore.getState().setUser(null);
    throw new Error(data.error || "Failed to fetch current user");
  }

  useAuthStore.getState().setUser(data.user);

  return data.user;
}
