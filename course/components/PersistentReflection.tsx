"use client";

import type { ReactNode } from "react";
import { useLocalState } from "@/lib/useLocalState";

export type ReflectionQuestion = {
  id: string;
  prompt: ReactNode;
  placeholder?: string;
};

type PersistentReflectionProps = {
  dataCy: string;
  storageKey: string;
  intro?: ReactNode;
  questions: ReflectionQuestion[];
};

export function PersistentReflection({
  dataCy,
  storageKey,
  intro,
  questions,
}: PersistentReflectionProps) {
  return (
    <section
      data-cy={dataCy}
      className="my-6 rounded-r-lg border-l-4 border-amber-400 bg-amber-50 p-5"
    >
      <h3 className="flex items-center gap-2 text-lg font-semibold text-amber-900">
        <span aria-hidden>🪞</span>
        <span>Reflect</span>
      </h3>
      {intro && (
        <div className="mt-2 text-slate-700 leading-relaxed text-sm italic">
          {intro}
        </div>
      )}
      <ol className="mt-4 space-y-5">
        {questions.map((q, i) => (
          <ReflectionItem
            key={q.id}
            storageKey={`${storageKey}:${q.id}`}
            index={i + 1}
            prompt={q.prompt}
            placeholder={q.placeholder}
          />
        ))}
      </ol>
    </section>
  );
}

function ReflectionItem({
  storageKey,
  index,
  prompt,
  placeholder,
}: {
  storageKey: string;
  index: number;
  prompt: ReactNode;
  placeholder?: string;
}) {
  const [value, setValue] = useLocalState(storageKey, "");
  const saved = value.length > 0;

  return (
    <li>
      <div className="flex gap-2 items-start text-slate-800 leading-relaxed">
        <span className="font-semibold text-amber-800">{index}.</span>
        <div className="flex-1">{prompt}</div>
      </div>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={3}
        placeholder={placeholder ?? "เขียนคำตอบของคุณ..."}
        className="mt-2 w-full rounded-md border border-amber-200 bg-white px-3 py-2 text-slate-800 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200 transition text-sm"
      />
      {saved && (
        <p className="mt-1 text-xs text-amber-700">
          ✓ บันทึกบน device ของคุณแล้ว
        </p>
      )}
    </li>
  );
}
