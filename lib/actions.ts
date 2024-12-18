'use server';

import { LoginSchema, RegisterSchema } from "@/lib/zod";
import { compareSync, hashSync } from "bcrypt-ts";
import { prisma } from "./prisma";
import { redirect } from "next/navigation";

// Fungsi Sign Up
export const signUpCredentials = async (formData: FormData) => {
  const validatedFields = RegisterSchema.safeParse(Object.fromEntries(formData));
  if (!validatedFields.success) {
    return {
      error: validatedFields.error?.flatten().fieldErrors,
    };
  }

  const { name, email, password, role } = validatedFields.data;
  const hashedPassword = hashSync(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    redirect("/login");
    return { user };
  } catch (error) {
    return { message: "Failed to create user" };
  }
};

// Fungsi Sign In
export const signInCredentials = async (formData: FormData) => {
  const validatedFields = LoginSchema.safeParse(Object.fromEntries(formData));

  if (!validatedFields.success) {
    return {
      error: validatedFields.error?.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.password) {
      throw new Error("User not found");
    }

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    return { success: true, user }; // Jangan panggil signIn di server
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Unknown error occurred." };
  }
};
