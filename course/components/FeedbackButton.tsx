"use client";

import { useEffect, useState } from "react";
import { isProd } from "@/lib/isProd";
import { FeedbackDialog } from "./FeedbackDialog";

type Snack = { url: string; number: number };

export function FeedbackButton() {
  const [open, setOpen] = useState(false);
  const [snack, setSnack] = useState<Snack | null>(null);

  useEffect(() => {
    if (!snack) return;
    const t = setTimeout(() => setSnack(null), 6000);
    return () => clearTimeout(t);
  }, [snack]);

  if (isProd()) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="ส่ง Feedback"
        data-feedback-ui
        className="fixed bottom-6 right-6 z-40 inline-flex items-center justify-center h-12 w-12 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
      >
        <span aria-hidden className="text-xl leading-none">
          💬
        </span>
      </button>
      <FeedbackDialog
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={(issue) => {
          setOpen(false);
          setSnack(issue);
        }}
      />
      {snack && (
        <div
          data-feedback-ui
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-lg bg-slate-900 text-white px-4 py-3 shadow-2xl text-sm"
        >
          <span>
            ขอบคุณสำหรับ Feedback! →{" "}
            <a
              href={snack.url}
              target="_blank"
              rel="noreferrer"
              className="underline font-semibold text-indigo-200 hover:text-white"
            >
              ดูใน GitHub #{snack.number}
            </a>
          </span>
          <button
            type="button"
            onClick={() => setSnack(null)}
            aria-label="ปิด"
            className="text-slate-400 hover:text-white text-lg leading-none"
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}
