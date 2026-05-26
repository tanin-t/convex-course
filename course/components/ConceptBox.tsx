import type { ReactNode } from "react";

type ConceptBoxProps = {
  dataCy: string;
  title: string;
  children: ReactNode;
};

export function ConceptBox({ dataCy, title, children }: ConceptBoxProps) {
  return (
    <section
      data-cy={dataCy}
      className="my-6 rounded-r-lg border-l-4 border-amber-400 bg-amber-50 p-5"
    >
      <h3 className="flex items-center gap-2 text-lg font-semibold text-amber-900">
        <span aria-hidden>💡</span>
        <span>{title}</span>
      </h3>
      <div className="mt-3 text-slate-800 leading-relaxed space-y-3">
        {children}
      </div>
    </section>
  );
}
