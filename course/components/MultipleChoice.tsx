"use client";

import type { ReactNode } from "react";
import { useLocalState } from "@/lib/useLocalState";

export type MCOption = {
  id: string;
  label: string;
  correct: boolean;
  explanation: ReactNode;
};

type MultipleChoiceProps = {
  dataCy: string;
  storageKey: string;
  question: string;
  options: MCOption[];
};

export function MultipleChoice({
  dataCy,
  storageKey,
  question,
  options,
}: MultipleChoiceProps) {
  const [picked, setPicked] = useLocalState<string | null>(
    `${storageKey}:picked`,
    null,
  );

  const revealed = picked !== null;

  return (
    <section
      data-cy={dataCy}
      className="my-6 rounded-r-lg border-l-4 border-indigo-500 bg-indigo-50 p-5"
    >
      <h3 className="flex items-center gap-2 text-lg font-semibold text-indigo-900">
        <span aria-hidden>🎯</span>
        <span>เลือกคำตอบ</span>
      </h3>
      <p className="mt-2 text-slate-800 leading-relaxed font-medium">{question}</p>
      <ul className="mt-4 space-y-2">
        {options.map((opt) => {
          const isPicked = picked === opt.id;
          const showAsCorrect = revealed && opt.correct;
          const showAsWrongPick = revealed && isPicked && !opt.correct;

          return (
            <li key={opt.id}>
              <button
                type="button"
                onClick={() => !revealed && setPicked(opt.id)}
                disabled={revealed}
                className={`w-full text-left rounded-md border px-4 py-3 transition ${
                  showAsCorrect
                    ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                    : showAsWrongPick
                      ? "border-rose-400 bg-rose-50 text-rose-900"
                      : isPicked
                        ? "border-indigo-500 bg-white text-indigo-900"
                        : "border-indigo-200 bg-white text-slate-800 hover:border-indigo-400 hover:bg-indigo-50"
                } ${revealed ? "cursor-default" : "cursor-pointer"}`}
              >
                <div className="flex items-start gap-3">
                  <span className="font-mono text-sm font-bold text-indigo-600 mt-0.5">
                    {opt.id}.
                  </span>
                  <div className="flex-1">
                    <div className="font-medium">{opt.label}</div>
                    {revealed && (
                      <div className="mt-2 text-sm text-slate-700 leading-relaxed">
                        <span className="font-semibold">
                          {opt.correct ? "✅ " : isPicked ? "❌ " : "— "}
                        </span>
                        {opt.explanation}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
      {revealed && (
        <button
          type="button"
          onClick={() => setPicked(null)}
          className="mt-4 text-sm text-indigo-700 hover:text-indigo-900 underline"
        >
          ลองตอบใหม่
        </button>
      )}
    </section>
  );
}
