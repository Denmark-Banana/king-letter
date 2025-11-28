"use client";

import { useEffect, useState } from "react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

type EmailItem = {
  id: string;
  sentAt: string;
  subject: string | null;
  openAt: string;
  body: string;
  template: string;
  recipient: string | null;
  senderId: string;
};

export default function InboxPage() {
  const [emails, setEmails] = useState<EmailItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      setError(null);
      try {
        const res = await fetch("/api/emails", { cache: "no-store" });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "불러오기 실패");
        if (active) setEmails(json.emails as EmailItem[]);
      } catch (e: any) {
        if (active) setError(e.message);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold">받은 편지함</h1>

      <SignedOut>
        <div className="rounded-lg border border-zinc-200 p-6">
          <p className="mb-4 text-zinc-700">로그인이 필요합니다.</p>
          <SignInButton mode="modal">
            <button className="h-10 rounded-full bg-indigo-600 px-5 text-sm font-semibold text-white">
              Sign in
            </button>
          </SignInButton>
        </div>
      </SignedOut>

      <SignedIn>
        {error && (
          <div className="mb-4 rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        {!emails && !error && (
          <div className="text-sm text-zinc-500">불러오는 중...</div>
        )}

        {emails && emails.length === 0 && (
          <div className="rounded-lg border border-zinc-200 p-6 text-sm text-zinc-600">
            받은 편지가 없습니다.
          </div>
        )}

        {emails && emails.length > 0 && (
          <ul className="space-y-3">
            {emails.map((m) => {
              const locked = new Date(m.openAt).getTime() > Date.now();
              const bodyPreview = locked
                ? maskBody(m.body)
                : m.body.slice(0, 180);
              return (
                <li
                  key={m.id}
                  className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-zinc-900">
                        {m.subject || "(제목 없음)"}
                      </p>
                      <p className="mt-0.5 text-xs text-zinc-500">
                        발송일 {formatTime(m.sentAt)} · 봉인 해제{" "}
                        {formatTime(m.openAt)}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${
                        locked
                          ? "bg-amber-100 text-amber-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {locked ? "봉인됨" : "열람 가능"}
                    </span>
                  </div>
                  <p className="mt-3 whitespace-pre-wrap text-sm text-zinc-700">
                    {bodyPreview}
                    {bodyPreview.length < m.body.length ? "…" : ""}
                  </p>
                  <div className="mt-2 text-xs text-zinc-500">
                    양식: {m.template} · 받는 사람: {m.recipient ?? "-"}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </SignedIn>
    </main>
  );
}

function formatTime(input: string) {
  try {
    return new Date(input).toLocaleString();
  } catch {
    return input;
  }
}

function maskBody(text: string) {
  const keep = Math.max(10, Math.floor(text.length * 0.15));
  const visible = text.slice(0, keep);
  const hidden = "•".repeat(Math.max(0, text.length - keep));
  return visible + hidden;
}
