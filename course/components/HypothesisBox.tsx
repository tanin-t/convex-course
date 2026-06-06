"use client";

import type { ReactNode } from "react";
import { useLocalState } from "@/lib/useLocalState";

type HypothesisBoxProps = {
  dataCy: string;
  storageKey: string;
  title?: string;
  setup: ReactNode;
  placeholder?: string;
  revealButton?: string;
  reveal: ReactNode;
};

export function HypothesisBox({
  dataCy,
  storageKey,
  title = "ทำให้พัง — เดาก่อน",
  setup,
  placeholder = "ฉันคิดว่า ... เพราะ ...",
  revealButton = "ลองทำดู แล้วเปิดคำตอบ",
  reveal,
}: HypothesisBoxProps) {
  const [hypothesis, setHypothesis] = useLocalState(
    `${storageKey}:hypothesis`,
    "",
  );
  const [shown, setShown] = useLocalState(`${storageKey}:shown`, false);

  return (
    <section
      data-cy={dataCy}
      className="my-6 rounded-r-lg border-l-4 border-rose-500 bg-rose-50 p-5"
    >
      <h3 className="flex items-center gap-2 text-lg font-semibold text-rose-900">
        <span aria-hidden>💥</span>
        <span>{title}</span>
      </h3>
      <div className="mt-3 text-slate-800 leading-relaxed">{setup}</div>
      <textarea
        value={hypothesis}
        onChange={(e) => setHypothesis(e.target.value)}
        rows={3}
        placeholder={placeholder}
        className="mt-3 w-full rounded-md border border-rose-200 bg-white px-3 py-2 text-slate-800 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-200 transition"
      />
      {!shown ? (
        <button
          type="button"
          onClick={() => setShown(true)}
          className="mt-3 inline-flex items-center gap-2 rounded-md bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700 transition"
        >
          {revealButton} →
        </button>
      ) : (
        <div className="mt-4 rounded-md border border-rose-300 bg-white p-4 text-slate-800 leading-relaxed">
          <div className="text-xs font-semibold uppercase tracking-wider text-rose-700 mb-2">
            ผลจริง + บทเรียน
          </div>
          <div>{reveal}</div>
        </div>
      )}
    </section>
  );
}
