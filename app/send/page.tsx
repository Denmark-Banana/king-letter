"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function SendPage() {
  const { user } = useUser();
  const [recipientUserId, setRecipientUserId] = useState<string>("");
  const [recipientEmail, setRecipientEmail] = useState<string>("");
  const [subject, setSubject] = useState("");
  const [openAt, setOpenAt] = useState<string>("");
  const [template, setTemplate] = useState("default");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [userOptions, setUserOptions] = useState<
    { id: string; email: string; name: string }[]
  >([]);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/users", { cache: "no-store" });
        const json = await res.json();
        if (res.ok && alive) {
          setUserOptions(json.users);
        }
      } catch {
        // ignore
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    if (body.trim().length < 30) {
      setStatus({ ok: false, msg: "내용은 최소 30자 이상이어야 합니다." });
      return;
    }
    if (!openAt) {
      setStatus({ ok: false, msg: "봉인 해제일을 선택해주세요." });
      return;
    }
    setLoading(true);
    try {
      if (!recipientUserId) {
        setStatus({ ok: false, msg: "받는 사람을 선택해주세요." });
        return;
      }
      const res = await fetch("/api/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientUserId,
          recipient: recipientEmail || undefined,
          subject: subject || undefined,
          openAt,
          template,
          body,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "문제가 발생했습니다.");
      setStatus({ ok: true, msg: "발송(저장)되었습니다." });
      setRecipientUserId("");
      setRecipientEmail("");
      setSubject("");
      setOpenAt("");
      setTemplate("default");
      setBody("");
    } catch (err: any) {
      setStatus({ ok: false, msg: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold">편지 보내기</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-700">
            받는 사람(Clerk 사용자)
          </label>
          <select
            required
            value={recipientUserId}
            onChange={(e) => {
              const id = e.target.value;
              setRecipientUserId(id);
              const selected = userOptions.find((u) => u.id === id);
              setRecipientEmail(selected?.email ?? "");
            }}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">선택하세요</option>
            {userOptions.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name || u.email} ({u.email})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-700">
            제목
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="제목(옵션)"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700">
              봉인 해제일
            </label>
            <input
              type="datetime-local"
              required
              value={openAt}
              onChange={(e) => setOpenAt(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700">
              양식 종류
            </label>
            <input
              type="text"
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="default"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-700">
            내용(최소 30자)
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={8}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="내용을 입력하세요..."
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="h-10 rounded-full bg-indigo-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 disabled:opacity-60"
          >
            {loading ? "저장 중..." : "발송(저장)"}
          </button>
          {status && (
            <p
              className={`text-sm ${
                status.ok ? "text-emerald-600" : "text-rose-600"
              }`}
            >
              {status.msg}
            </p>
          )}
        </div>
      </form>
    </main>
  );
}
