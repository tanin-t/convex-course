import Link from "next/link";

type NavLink = {
  href: string;
  label: string;
};

type SessionNavProps = {
  dataCy: string;
  prev?: NavLink;
  next?: NavLink;
};

export function SessionNav({ dataCy, prev, next }: SessionNavProps) {
  return (
    <nav
      data-cy={dataCy}
      className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 border-t border-slate-200 pt-6"
    >
      {prev ? (
        <Link
          href={prev.href}
          className="group rounded-lg border border-slate-200 bg-white p-4 hover:border-indigo-300 hover:bg-indigo-50 transition"
        >
          <div className="text-xs font-medium uppercase tracking-wider text-slate-500">
            ← ย้อนกลับ
          </div>
          <div className="mt-1 font-semibold text-slate-900 group-hover:text-indigo-700">
            {prev.label}
          </div>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={next.href}
          className="group rounded-lg border border-slate-200 bg-white p-4 text-right hover:border-indigo-300 hover:bg-indigo-50 transition"
        >
          <div className="text-xs font-medium uppercase tracking-wider text-slate-500">
            ถัดไป →
          </div>
          <div className="mt-1 font-semibold text-slate-900 group-hover:text-indigo-700">
            {next.label}
          </div>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
