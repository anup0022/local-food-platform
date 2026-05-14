import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  /* Rewrite "/" to "/feed" so the feed page (with sidebar layout) serves
     as the home page. The URL bar stays as "/". */
  if (request.nextUrl.pathname === "/") {
    return NextResponse.rewrite(new URL("/feed", request.url));
  }
}

export const config = {
  matcher: ["/"],
};
