"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

type Email = {
  id: string;
  sentAt: string;
  subject: string | null;
  openAt: string;
  body: string;
  template: string;
  recipient: string | null;
  senderId: string;
  readAt: string | null;
};

export default function EmailDetailPage({}: {}) {
  const params = useParams();
  const idParam =
    typeof (params as any)?.id === "string"
      ? ((params as any).id as string)
      : Array.isArray((params as any)?.id)
      ? ((params as any).id[0] as string)
      : "";
  const [email, setEmail] = useState<Email | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!idParam || idParam === "undefined") return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/emails/${idParam}`, {
          cache: "no-store",
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "불러오기 실패");
        if (active) setEmail(json.email as Email);
      } catch (e: any) {
        if (active) setError(e.message);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [idParam]);

  const locked = email ? new Date(email.openAt).getTime() > Date.now() : false;

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">메일 상세</h1>
        <Link
          href="/inbox"
          className="text-sm text-indigo-600 hover:text-indigo-700"
        >
          목록으로
        </Link>
      </div>

      {loading && <div className="text-sm text-zinc-500">불러오는 중...</div>}

      {!loading && error && (
        <div className="rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error === "Not Found"
            ? "해당 메일을 찾을 수 없습니다. (404)"
            : error === "Forbidden"
            ? "해당 메일을 볼 권한이 없습니다. (403)"
            : error}
        </div>
      )}

      {!loading && !error && email && (
        <article className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-lg font-medium text-zinc-900">
                {email.subject || "(제목 없음)"}
              </p>
              <p className="mt-0.5 text-xs text-zinc-500">
                발송일 {formatTime(email.sentAt)} · 봉인 해제{" "}
                {formatTime(email.openAt)}
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

          {locked && (
            <p className="mt-3 text-xs text-amber-700">
              봉인 해제일 이전에는 본문이 가려집니다.
            </p>
          )}

          <div className="mt-4 whitespace-pre-wrap text-sm text-zinc-800">
            {locked ? maskBody(email.body) : email.body}
          </div>

          <div className="mt-4 text-xs text-zinc-500">
            양식: {email.template} · 받는 사람: {email.recipient ?? "-"}
          </div>
        </article>
      )}
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
