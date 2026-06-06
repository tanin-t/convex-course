"use client";

import type { ReactNode } from "react";
import { useState } from "react";

export type DiagramNode = {
  id: string;
  label: string;
  tooltip: ReactNode;
  /** column 0..2 (left/middle/right) */
  col: 0 | 1 | 2;
  /** row 0..n */
  row: number;
};

export type DiagramEdge = {
  from: string;
  to: string;
  /** label on the arrow */
  label?: string;
};

type ClickableDiagramProps = {
  dataCy: string;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  caption?: ReactNode;
};

const COL_CLASS = ["col-start-1", "col-start-2", "col-start-3"] as const;

export function ClickableDiagram({
  dataCy,
  nodes,
  edges,
  caption,
}: ClickableDiagramProps) {
  const [active, setActive] = useState<string | null>(null);
  const [seen, setSeen] = useState<Record<string, boolean>>({});

  const handleClick = (id: string) => {
    setActive(active === id ? null : id);
    setSeen({ ...seen, [id]: true });
  };

  const activeNode = nodes.find((n) => n.id === active) ?? null;
  const maxRow = Math.max(...nodes.map((n) => n.row));

  return (
    <section
      data-cy={dataCy}
      className="my-6 rounded-lg border border-violet-200 bg-violet-50 p-5"
    >
      <div className="text-xs font-semibold uppercase tracking-wider text-violet-700 mb-3">
        คลิกแต่ละจุดเพื่อดูว่ามีหน้าที่อะไร
      </div>

      <div
        className="grid grid-cols-3 gap-x-4 gap-y-3"
        style={{ gridTemplateRows: `repeat(${maxRow + 1}, minmax(0, auto))` }}
      >
        {nodes.map((n) => {
          const isActive = active === n.id;
          const wasSeen = seen[n.id];
          return (
            <button
              key={n.id}
              type="button"
              onClick={() => handleClick(n.id)}
              style={{ gridRow: n.row + 1 }}
              className={`${COL_CLASS[n.col]} relative rounded-lg border-2 px-4 py-3 text-sm font-semibold transition ${
                isActive
                  ? "border-violet-600 bg-violet-600 text-white shadow-md scale-105"
                  : wasSeen
                    ? "border-violet-400 bg-white text-violet-900"
                    : "border-dashed border-violet-300 bg-white text-violet-700 hover:border-violet-500 hover:bg-violet-50"
              }`}
            >
              <span className="block">{n.label}</span>
              {!wasSeen && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-violet-500" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-3 text-center text-xs text-slate-600 italic">
        {edges.map((e, i) => (
          <span key={i} className="inline-block mx-1">
            {e.from} {e.label ? `--${e.label}-->` : "→"} {e.to}
          </span>
        ))}
      </div>

      <div className="mt-4 min-h-[5rem] rounded-md border border-violet-300 bg-white p-4">
        {activeNode ? (
          <>
            <div className="text-xs font-semibold uppercase tracking-wider text-violet-700">
              {activeNode.label}
            </div>
            <div className="mt-1 text-slate-800 leading-relaxed text-sm">
              {activeNode.tooltip}
            </div>
          </>
        ) : (
          <div className="text-sm text-slate-500 italic">
            คลิกที่กล่องด้านบนเพื่อดูคำอธิบาย
          </div>
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
