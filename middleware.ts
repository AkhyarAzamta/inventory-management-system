export { auth as middleware } from "@/auth"

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
}

// export { auth as middleware } from './auth';

// export const config = {
//   // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
//   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
// };
