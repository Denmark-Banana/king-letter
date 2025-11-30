import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider, SignedOut } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Kings Letter - 편지 한 장, 설레임 한스푼",
  description: "느린편지, 늦은편지",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="ko">
        <head>
          <link rel="icon" href="/icon.svg" type="image/svg+xml" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="preload" href="https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/DungGeunMo.woff" as="font" type="font/woff2" crossOrigin="anonymous" />
          <link href="//fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
          {/* <link href="//cdn.jsdelivr.net/gh/neodgm/neodgm-webfont@1.600/neodgm/style.css" rel="stylesheet" /> */}
          <link href="//cdn.jsdelivr.net/npm/galmuri@latest/dist/galmuri.css" rel="stylesheet" />
        </head>
        <body>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
