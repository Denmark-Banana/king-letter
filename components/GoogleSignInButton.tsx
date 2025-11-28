"use client";

import { useSignIn } from "@clerk/nextjs";
import { useCallback } from "react";

export function GoogleSignInButton() {
  const { signIn, isLoaded } = useSignIn();

  const handleClick = useCallback(async () => {
    if (!isLoaded) return;
    await signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/",
    });
  }, [isLoaded, signIn]);

  return (
    <button
      onClick={handleClick}
      className="inline-flex h-10 items-center gap-2 rounded-full bg-black px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 active:translate-y-px"
      aria-label="Continue with Google"
    >
      <svg width="18" height="18" viewBox="0 0 48 48" className="shrink-0">
        <path
          fill="#FFC107"
          d="M43.611,20.083H42V20H24v8h11.303C33.602,32.91,29.249,36,24,36c-6.627,0-12-5.373-12-12
          s5.373-12,12-12c3.059,0,5.842,1.156,7.961,3.039l5.657-5.657C34.869,6.053,29.702,4,24,4C12.955,4,4,12.955,4,24
          s8.955,20,20,20c10.493,0,19-8.507,19-19C43,23.659,43.387,21.828,43.611,20.083z"
        />
        <path
          fill="#FF3D00"
          d="M6.306,14.691l6.571,4.819C14.655,16.108,18.961,13,24,13c3.059,0,5.842,1.156,7.961,3.039l5.657-5.657
          C34.869,6.053,29.702,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
        />
        <path
          fill="#4CAF50"
          d="M24,44c5.166,0,9.86-1.977,13.409-5.195l-6.2-5.238C29.249,36,24.896,32.91,24,32.91
          c-5.214,0-9.567-3.09-11.287-7.39l-6.488,5.002C9.542,39.556,16.227,44,24,44z"
        />
        <path
          fill="#1976D2"
          d="M43.611,20.083H42V20H24v8h11.303c-1.227,3.522-4.287,6.213-8.124,7.567l6.2,5.238
          C36.509,38.406,43,33.5,43,24C43,23.659,43.387,21.828,43.611,20.083z"
        />
      </svg>
      Continue with Google
    </button>
  );
}
