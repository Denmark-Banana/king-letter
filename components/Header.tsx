'use client';

import Link from 'next/link';
import { SignedIn, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-600 to-pink-500 border-b-4 border-black">
      <div className="max-w-[500px] mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/inbox" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-yellow-400 border-2 border-black flex items-center justify-center">
            <i className="ri-mail-fill text-lg"></i>
          </div>
          <h1 className="font-PressStart2P text-white text-xs">KINGS LETTER</h1>
        </Link>
        
        <nav className="flex gap-2">
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "size-9",
                  userButtonPopoverCard:
                    "rounded-xl border border-zinc-200",
                },
              }}
            />
          </SignedIn>
          {/* TODO 여기에 Clerk 컴포넌트 넣기, 이후 편지 쓰기 버튼 제거 필요 */}
          {/* <Link 
            href="/write" 
            className="px-3 py-2 bg-yellow-400 border-2 border-black text-sm font-bold hover:bg-yellow-500 transition-colors"
          >
            편지 쓰기
          </Link> */}
        </nav>
      </div>
    </header>
  );
}
