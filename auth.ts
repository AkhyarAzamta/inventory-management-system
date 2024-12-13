import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "@/lib/zod"
import { compareSync } from "bcrypt-ts"

let nextAuth = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt", // Gunakan JWT untuk menyimpan session
    maxAge: 30 * 24 * 60 * 60, // Durasi sesi (30 hari)
  },
    pages: {
    signIn: "/register",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      authorize: async (credentials) => {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (!validatedFields.success) {
          throw new Error("Invalid input");
        }
      
        const { email, password } = validatedFields.data;
        const user = await prisma.user.findUnique({ where: { email } });
      console.log(user);
        if (!user || !user.password) {
          throw new Error("User not found");
        }
      
        const isPasswordValid = compareSync(password, user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }
      
        return user; // Pastikan selalu return user jika berhasil
      },
      
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Redirect ke dashboard jika login berhasil
      if (url.startsWith(baseUrl)) {
        return url;
      }
      return `${baseUrl}/dashboard`; // Default redirect setelah login
    },
  },
});
export const { handlers, auth, signIn, signOut } = nextAuth;

export default nextAuth;