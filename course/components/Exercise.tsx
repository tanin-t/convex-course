import type { ReactNode } from "react";

type ExerciseProps = {
  dataCy: string;
  steps: ReactNode[];
};

export function Exercise({ dataCy, steps }: ExerciseProps) {
  return (
    <section
      data-cy={dataCy}
      className="my-6 rounded-r-lg border-l-4 border-emerald-500 bg-emerald-50 p-5"
    >
      <h3 className="flex items-center gap-2 text-lg font-semibold text-emerald-900">
        <span aria-hidden>🧪</span>
        <span>ทดลองเอง</span>
      </h3>
      <ol className="mt-3 space-y-2 list-decimal list-inside text-slate-800 leading-relaxed marker:font-semibold marker:text-emerald-700">
        {steps.map((step, i) => (
          <li key={i} className="pl-1">
            {step}
          </li>
        ))}
      </ol>
    </section>
  );
}
