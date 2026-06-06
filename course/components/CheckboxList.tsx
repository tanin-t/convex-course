"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { useLocalState } from "@/lib/useLocalState";

export type CheckItem = {
  id: string;
  label: ReactNode;
  hint?: ReactNode;
  detail?: ReactNode;
};

type CheckboxListProps = {
  dataCy: string;
  storageKey: string;
  title: string;
  items: CheckItem[];
  note?: ReactNode;
};

export function CheckboxList({
  dataCy,
  storageKey,
  title,
  items,
  note,
}: CheckboxListProps) {
  const [checked, setChecked] = useLocalState<Record<string, boolean>>(
    `${storageKey}:checked`,
    {},
  );
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const completed = items.filter((i) => checked[i.id]).length;

  const toggle = (id: string) =>
    setChecked({ ...checked, [id]: !checked[id] });

  return (
    <section
      data-cy={dataCy}
      className="my-6 rounded-lg border border-emerald-200 bg-emerald-50 p-5"
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-emerald-900">
          <span aria-hidden>✅</span>
          <span>{title}</span>
        </h3>
        <span className="text-sm font-mono text-emerald-700">
          {completed} / {items.length}
        </span>
      </div>
      <ul className="mt-4 space-y-2">
        {items.map((item) => {
          const isChecked = !!checked[item.id];
          const isOpen = !!open[item.id];
          return (
            <li
              key={item.id}
              className="rounded-md border border-emerald-200 bg-white p-3"
            >
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggle(item.id)}
                  className="mt-1 h-4 w-4 rounded border-emerald-400 text-emerald-600 focus:ring-emerald-500"
                />
                <div className="flex-1">
                  <div
                    className={`leading-relaxed ${
                      isChecked
                        ? "text-slate-500 line-through"
                        : "text-slate-800"
                    }`}
                  >
                    {item.label}
                  </div>
                  {item.hint && (
                    <div className="mt-1 text-xs text-slate-500 italic">
                      💭 {item.hint}
                    </div>
                  )}
                </div>
              </label>
              {item.detail && (
                <div className="mt-2 ml-7">
                  <button
                    type="button"
                    onClick={() =>
                      setOpen({ ...open, [item.id]: !isOpen })
                    }
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-900"
                  >
                    {isOpen ? "▼ ซ่อนรายละเอียด" : "▶ ดูรายละเอียด"}
                  </button>
                  {isOpen && (
                    <div className="mt-2 rounded-md border border-emerald-100 bg-emerald-50/50 p-3 text-sm text-slate-700 leading-relaxed">
                      {item.detail}
                    </div>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>
      {note && (
        <p className="mt-3 text-xs text-slate-600 italic">{note}</p>
      )}
    </section>
  );
}
