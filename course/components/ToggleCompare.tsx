"use client";

import type { ReactNode } from "react";
import { useState } from "react";

type Side = {
  id: string;
  label: string;
  title: string;
  content: ReactNode;
};

type ToggleCompareProps = {
  dataCy: string;
  left: Side;
  right: Side;
  caption?: ReactNode;
};

export function ToggleCompare({
  dataCy,
  left,
  right,
  caption,
}: ToggleCompareProps) {
  const [active, setActive] = useState<string>(left.id);
  const sides = [left, right];

  return (
    <section
      data-cy={dataCy}
      className="my-6 rounded-lg border border-cyan-200 bg-cyan-50 p-5"
    >
      <div className="inline-flex rounded-full border border-cyan-300 bg-white p-1">
        {sides.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActive(s.id)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              active === s.id
                ? "bg-cyan-600 text-white shadow-sm"
                : "text-cyan-800 hover:bg-cyan-100"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-md border border-cyan-200 bg-white p-5">
        {sides.map((s) =>
          active === s.id ? (
            <div key={s.id}>
              <div className="text-xs font-semibold uppercase tracking-wider text-cyan-700">
                {s.label}
              </div>
              <h4 className="mt-1 text-lg font-semibold text-slate-900">
                {s.title}
              </h4>
              <div className="mt-3 text-slate-800 leading-relaxed">
                {s.content}
              </div>
            </div>
          ) : null,
        )}
      </div>

      {caption && (
        <p className="mt-3 text-sm text-slate-600 italic leading-relaxed">
          {caption}
        </p>
      )}
    </section>
  );
}
