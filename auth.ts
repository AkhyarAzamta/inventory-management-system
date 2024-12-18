import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { compareSync } from "bcrypt-ts";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (!user) {
          throw new Error("User not found");
        }

        const isPasswordValid = await compareSync(password, user.password ?? '');
        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user.id.toString(),
          name: user.name,
          username: user.email,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    error: "/auth/error", // Atur custom error page
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      // console.log("Token JWT:", token); // Debug token di server
      return token;
    },
    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user as { id: string; name: string; email: string; role: string };
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/`;
    },
  },
};
