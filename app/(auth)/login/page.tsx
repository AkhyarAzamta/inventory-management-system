'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage, type AuthProvider, type AuthResponse } from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";
import { signIn as nextAuthSignIn } from "next-auth/react";

const providers = [{ id: "credentials", name: "Email and Password" }];

const signIn = async (provider: AuthProvider, formData?: FormData): Promise<AuthResponse & { callbackUrl?: string }> => {
  if (provider.id === "credentials" && formData) {
    const result = await nextAuthSignIn("credentials", {
      redirect: false,
      callbackUrl: "/", // Tujuan setelah login berhasil
      email: formData.get("email")?.toString(),
      password: formData.get("password")?.toString(),
    });

    if (result?.error) {
      return { type: "CredentialsSignin", success: "false", error: result.error };
    }

    return { 
      type: "CredentialsSignin", 
      success: "true", 
      callbackUrl: result?.url || "/" // Tambahkan properti callbackUrl
    };
  }

  return { type: "CredentialsSignin", success: "false", error: "Invalid provider or missing form data." };
};

export default function LoginPage() {
  const theme = useTheme();
  const router = useRouter(); // Inisialisasi useRouter
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignIn = async (provider: AuthProvider, formData?: FormData): Promise<AuthResponse> => {
    const response = await signIn(provider, formData);
    if (response.error) {
      setErrorMessage(response.error); // Set pesan error di state
      return { type: "CredentialsSignin", success: "false", error: response.error };
    }

    // Redirect manual jika login berhasil
    if (response.success === "true" && response.callbackUrl) {
      router.push(response.callbackUrl); // Redirect ke URL tujuan
    }

    return { type: "CredentialsSignin", success: "true" };
  };

  return (
    <AppProvider theme={theme}>
      <div>
        {errorMessage && (
          <div style={{ color: "red", marginBottom: "1rem" }}>
            {errorMessage === "CredentialsSignin"
              ? "Email atau password salah. Silakan coba lagi."
              : "Terjadi kesalahan, coba lagi."}
          </div>
        )}
        <SignInPage signIn={handleSignIn} providers={providers} />
      </div>
    </AppProvider>
  );
}
