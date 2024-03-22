import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = "/irm-";
const unProtectedRoutes = ["/login"];

const dataIncludes = ['']

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("authToken");

  // unauthorized user try to access protected routes
  const unauthorizedCond = !authCookie && request.nextUrl.pathname.includes(protectedRoutes);
  // authorized user try to access the login route or public routes
  const authorizedCond = authCookie && unProtectedRoutes.includes(request.nextUrl.pathname);

  const paths = request.nextUrl.pathname.split('/')

  console.log(authorizedCond, unProtectedRoutes.includes(request.nextUrl.pathname), paths[paths.length - 1]);

  if (unauthorizedCond) {
    const absoluteURL = new URL("/login", request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  } else if (authorizedCond) {
    const absoluteURL = new URL("/irm-dashboard", request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }


  return NextResponse.next();
}