"use client";

import { useEffect, useRef, useState } from "react";

type MermaidDiagramProps = {
  dataCy: string;
  chart: string;
  caption?: string;
};

export function MermaidDiagram({ dataCy, chart, caption }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "neutral",
          securityLevel: "strict",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        });
        const id = `mermaid-${dataCy.replace(/[^a-zA-Z0-9-]/g, "-")}-${Math.random().toString(36).slice(2, 8)}`;
        const { svg } = await mermaid.render(id, chart);
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : String(err));
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [chart, dataCy]);

  return (
    <figure
      data-cy={dataCy}
      className="my-6 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
    >
      {caption ? (
        <figcaption className="flex items-center gap-2 border-b border-slate-200 bg-slate-100 px-4 py-2 font-mono text-xs text-slate-600">
          <span aria-hidden>👀</span>
          <span>{caption}</span>
        </figcaption>
      ) : null}
      <div className="overflow-x-auto px-4 py-4 flex justify-center">
        {error ? (
          <pre className="text-xs text-red-600 whitespace-pre-wrap">
            Diagram failed to render: {error}
          </pre>
        ) : (
          <div ref={containerRef} className="[&_svg]:max-w-full [&_svg]:h-auto" />
        )}
      </div>
    </figure>
  );
}
