import { object, string, number } from "zod";

export const LoginSchema = object({
  email: string().email("Email is invalid").min(1, "Email is required"),
  password: string().min(6, "Password must be at least 6 characters")
});

export const RegisterSchema = object({
  name: string().min(1, "Name is required"),
  email: string().email("Email is invalid").min(1, "Email is required"),
  password: string().min(6, "Password must be at least 6 characters"),
  confirmPassword: string().min(6, "Password must be at least 6 characters"),
  role: string().min(1, "Role is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});