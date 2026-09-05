import type { LoginFormData, RegisterFormData } from "../schemas/auth.schema";

const API_URL = "http://localhost:5000/api/auth";

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
  }

  return data;
}

export async function logout() {
  localStorage.removeItem("token");
  return true;
}

export async function getCurrentUser() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const response = await fetch(`${API_URL}/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    localStorage.removeItem("token");
    throw new Error(data.error || "Failed to fetch current user");
  }

  return data.user;
}
