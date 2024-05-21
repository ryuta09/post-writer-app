import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
export default withAuth(async function middleware(req) {
  const token = await getToken({ req });
  const isAuth = !!token;
  const isAuthPage =
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/register");
  if (isAuthPage) {
    if (isAuth) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return null;
  }
  // ログインされていない時
  if(!isAuth) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
}, {callbacks: {
  async authorized({req, token}) {
    return true;
  }
}});

export const config = {
  matcher: ["/dashboard/:path", "/editor/:path", "/login", "/register"],
};