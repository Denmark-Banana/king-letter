import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// 공개 경로 (로그인 없이 접근 가능)
const isPublicRoute = createRouteMatcher([
  '/.well-known(.*)',
  '/login(.*)',
  '/sso-callback(.*)',
  '/api(.*)',
]);

export default clerkMiddleware(async (auth, request) => {
  const { userId } = await auth();

  // 공개 경로는 그대로 통과
  if (isPublicRoute(request)) {
    return NextResponse.next();
  }

  // 로그인되지 않은 사용자는 /login으로 리다이렉트
  if (!userId) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
