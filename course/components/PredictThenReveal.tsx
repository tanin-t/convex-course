"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { useLocalState } from "@/lib/useLocalState";

type PredictThenRevealProps = {
  dataCy: string;
  storageKey: string;
  question: string;
  hint?: string;
  revealButton?: string;
  reveal: ReactNode;
  note?: string;
};

export function PredictThenReveal({
  dataCy,
  storageKey,
  question,
  hint,
  revealButton = "ดูคำตอบ",
  reveal,
  note,
}: PredictThenRevealProps) {
  const [answer, setAnswer] = useLocalState(`${storageKey}:answer`, "");
  const [shown, setShown] = useLocalState(`${storageKey}:shown`, false);
  const [focused, setFocused] = useState(false);

  return (
    <section
      data-cy={dataCy}
      className="my-6 rounded-r-lg border-l-4 border-sky-500 bg-sky-50 p-5"
    >
      <h3 className="flex items-center gap-2 text-lg font-semibold text-sky-900">
        <span aria-hidden>🤔</span>
        <span>คิดก่อน scroll</span>
      </h3>
      <p className="mt-2 text-slate-800 leading-relaxed font-medium">{question}</p>
      {hint && (
        <p className="mt-1 text-sm text-slate-600 italic">💭 {hint}</p>
      )}
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={focused || answer.length > 0 ? 4 : 2}
        placeholder="พิมพ์สิ่งที่คุณคิด..."
        className="mt-3 w-full rounded-md border border-sky-200 bg-white px-3 py-2 text-slate-800 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200 transition"
      />
      {!shown ? (
        <button
          type="button"
          onClick={() => setShown(true)}
          className="mt-3 inline-flex items-center gap-2 rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 transition"
        >
          {revealButton} →
        </button>
      ) : (
        <div className="mt-4 rounded-md border border-sky-300 bg-white p-4 text-slate-800 leading-relaxed">
          <div className="text-xs font-semibold uppercase tracking-wider text-sky-700 mb-2">
            คำตอบ
          </div>
          <div className="prose-sm">{reveal}</div>
        </div>
      )}
      {note && <p className="mt-3 text-xs text-slate-500 italic">{note}</p>}
    </section>
  );
}
