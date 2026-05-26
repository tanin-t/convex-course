import type { ReactNode } from "react";

type BreakItProps = {
  dataCy: string;
  situation: ReactNode;
  result: ReactNode;
  lesson: ReactNode;
};

export function BreakIt({ dataCy, situation, result, lesson }: BreakItProps) {
  return (
    <section
      data-cy={dataCy}
      className="my-6 rounded-r-lg border-l-4 border-rose-500 bg-rose-50 p-5"
    >
      <h3 className="flex items-center gap-2 text-lg font-semibold text-rose-900">
        <span aria-hidden>💥</span>
        <span>ทำให้มันพัง</span>
      </h3>
      <dl className="mt-3 space-y-3 text-slate-800 leading-relaxed">
        <div>
          <dt className="font-semibold text-rose-800">สถานการณ์</dt>
          <dd className="mt-1 pl-1">{situation}</dd>
        </div>
        <div>
          <dt className="font-semibold text-rose-800">ผลลัพธ์</dt>
          <dd className="mt-1 pl-1">{result}</dd>
        </div>
        <div>
          <dt className="font-semibold text-rose-800">บทเรียน</dt>
          <dd className="mt-1 pl-1">{lesson}</dd>
        </div>
      </dl>
    </section>
  );
}
