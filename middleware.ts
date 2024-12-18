// export { auth as middleware } from "@/auth"

// export const config = {
//   matcher: ["/dashboard/:path*", "/api/:path*"],
// }
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // Redirect ke halaman login jika tidak autentik
  },
});

export const config = {
  matcher: ["/:path*"], // Sesuaikan path yang dilindungi
  // matcher: ["/:path*", "/api/:path*"], // Sesuaikan path yang dilindungi
};
