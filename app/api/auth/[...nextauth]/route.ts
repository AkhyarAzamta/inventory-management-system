import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { compareSync } from "bcrypt-ts";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
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

        const user = await prisma.users.findUnique({
          where: { email },
        });

        if (!user || !compareSync(password, user.password)) {
          throw new Error("Invalid email or password");
        }

        return {
          id: user.id.toString(),
          name: user.fullname,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user as any;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/admin`;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
