'use client';
import React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage, type AuthProvider, type AuthResponse } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import { signInCredentials } from '@/lib/actions';

const providers = [{ id: 'credentials', name: 'Email and Password' }];

const signIn = async (provider: AuthProvider, formData?: FormData): Promise<AuthResponse> => {
  if (provider.id === 'credentials' && formData) {
    const result = await signInCredentials(formData);
console.log(result)
    if (result?.error) {
      return {
        type: 'CredentialsSignin',
        success: 'false', // Ubah ke string
        error: JSON.stringify(result.error), // Kirimkan error sebagai string
      };
    }

    // if (result?.message) {
    //   return {
    //     type: 'CredentialsSignin',
    //     success: 'false', // Ubah ke string
    //     error: result.message,
    //   };
    // }

    return {
      type: 'CredentialsSignin',
      success: 'true', // Ubah ke string
    };
  }

  return {
    type: 'CredentialsSignin',
    success: 'false',
    error: 'Invalid provider or missing form data.',
  };
};

export default function Register() {
  const theme = useTheme();

  return (
    <AppProvider theme={theme}>
      <SignInPage
        signIn={signIn}
        providers={providers}
      />
    </AppProvider>
  );
}
