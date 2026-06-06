"use client";

import type { ReactNode } from "react";
import { useLocalState } from "@/lib/useLocalState";

export type StepRevealItem = {
  title: string;
  body: ReactNode;
};

type StepRevealProps = {
  dataCy: string;
  storageKey: string;
  intro?: string;
  steps: StepRevealItem[];
  revealButtonLabel?: string;
  closing?: ReactNode;
};

export function StepReveal({
  dataCy,
  storageKey,
  intro,
  steps,
  revealButtonLabel = "เปิดข้อต่อไป",
  closing,
}: StepRevealProps) {
  const [count, setCount] = useLocalState(`${storageKey}:count`, 0);

  const shown = Math.min(count, steps.length);
  const done = shown >= steps.length;

  return (
    <section
      data-cy={dataCy}
      className="my-6 rounded-r-lg border-l-4 border-slate-500 bg-slate-50 p-5"
    >
      {intro && (
        <p className="text-slate-800 leading-relaxed font-medium">{intro}</p>
      )}
      <ol className="mt-4 space-y-3">
        {steps.slice(0, shown).map((step, i) => (
          <li
            key={i}
            className="rounded-md border border-slate-200 bg-white p-4 animate-in fade-in slide-in-from-top-2 duration-300"
          >
            <div className="font-semibold text-slate-900">{step.title}</div>
            <div className="mt-1 text-slate-700 leading-relaxed">{step.body}</div>
          </li>
        ))}
      </ol>
      {!done ? (
        <button
          type="button"
          onClick={() => setCount(shown + 1)}
          className="mt-4 inline-flex items-center gap-2 rounded-md bg-slate-700 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-900 transition"
        >
          {shown === 0 ? "เริ่ม" : revealButtonLabel} →
        </button>
      ) : (
        closing && (
          <div className="mt-4 rounded-md border border-slate-300 bg-white p-4 text-slate-800 leading-relaxed italic">
            {closing}
          </div>
        )
      )}
      {shown > 0 && !done && (
        <span className="ml-3 text-xs text-slate-500">
          {shown} / {steps.length}
        </span>
      )}
    </section>
  );
}
