"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type JargonProps = {
  term: string;
  children: ReactNode;
};

export function Jargon({ term, children }: JargonProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClick = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <span ref={wrapperRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="font-medium text-indigo-700 underline decoration-dotted decoration-indigo-400 underline-offset-4 hover:text-indigo-900 hover:decoration-indigo-700 cursor-help"
      >
        {term}
      </button>
      {open ? (
        <span
          role="tooltip"
          className="absolute left-1/2 z-20 mt-2 w-64 -translate-x-1/2 rounded-md border border-slate-300 bg-white p-3 text-xs leading-relaxed text-slate-700 shadow-lg"
        >
          {children}
        </span>
      ) : null}
    </span>
  );
}
