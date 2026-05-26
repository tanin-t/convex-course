import type { ReactNode } from "react";

type CursorPromptProps = {
  dataCy: string;
  children: ReactNode;
};

export function CursorPrompt({ dataCy, children }: CursorPromptProps) {
  return (
    <section
      data-cy={dataCy}
      className="my-6 rounded-r-lg border-l-4 border-sky-500 bg-sky-50 p-5"
    >
      <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-sky-800">
        <span aria-hidden>🤖</span>
        <span>Cursor Prompt</span>
      </h3>
      <div className="mt-3 rounded-md border border-sky-200 bg-white px-4 py-3 font-mono text-sm leading-relaxed text-slate-800 whitespace-pre-wrap">
        {children}
      </div>
      <p className="mt-3 text-xs text-sky-700">
        คัดลอกไปวางใน Cursor — ยิ่ง prompt ชัด ผลลัพธ์ยิ่งดี
      </p>
    </section>
  );
}
