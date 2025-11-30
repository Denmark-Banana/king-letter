'use client';

import { useEffect } from 'react';
import { AuthenticateWithRedirectCallback, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function SSOCallback() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  // 이미 로그인되어 있으면 즉시 inbox로 이동
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      // OAuth callback이 아닌 직접 접근인 경우
      const hasOAuthCallback = window.location.search.includes('__clerk_status=') || 
                               window.location.hash.includes('access_token') ||
                               window.location.search.includes('code=');
      
      if (!hasOAuthCallback) {
        router.replace('/inbox');
      }
    }
  }, [isLoaded, isSignedIn, router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 to-purple-200 flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-black border-t-purple-500 mx-auto mb-4"></div>
        <p className="text-xl font-bold">로그인 처리 중...</p>
      </div>
      
      {/* Clerk CAPTCHA 위젯을 위한 컨테이너 */}
      <div id="clerk-captcha" className="w-full max-w-md"></div>
      
      <AuthenticateWithRedirectCallback 
        signInFallbackRedirectUrl="/inbox"
        signUpFallbackRedirectUrl="/inbox"
      />
    </div>
  );
}
