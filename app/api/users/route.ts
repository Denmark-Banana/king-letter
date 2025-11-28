import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!process.env.CLERK_SECRET_KEY) {
      return NextResponse.json(
        { error: "Missing CLERK_SECRET_KEY (server env)" },
        { status: 500 }
      );
    }

    // Clerk 관리 REST API로 호출 (SDK 이슈 우회)
    const api = process.env.CLERK_API_URL || "https://api.clerk.com";
    const resp = await fetch(`${api}/v1/users?limit=50`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
      // Next fetch 캐싱 방지
      cache: "no-store",
    });
    if (!resp.ok) {
      const txt = await resp.text();
      return NextResponse.json(
        { error: `Clerk API ${resp.status}: ${txt}` },
        { status: 500 }
      );
    }
    const users = (await resp.json()) as any[];

    const simplified = users
      .filter((u) => u?.id !== userId)
      .map((u) => {
        const primaryEmail =
          u?.email_addresses?.find(
            (e: any) => e.id === u?.primary_email_address_id
          )?.email_address ?? u?.email_addresses?.[0]?.email_address;
        return {
          id: u?.id as string,
          email: (primaryEmail ?? "") as string,
          name:
            [u?.first_name, u?.last_name].filter(Boolean).join(" ") ||
            (u?.username ?? ""),
        };
      })
      // 이메일 없는 계정은 제외
      .filter((u) => !!u.email);

    return NextResponse.json({ users: simplified });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "Internal Server Error" },
      { status: 500 }
    );
  }
}
