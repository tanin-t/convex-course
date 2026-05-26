"use client";

import { useEffect, useState } from "react";

type Marker = {
  dataCy: string;
  top: number;
  left: number;
  width: number;
  height: number;
};

type FeedbackSelectionOverlayProps = {
  onSelect: (dataCy: string) => void;
  onCancel: () => void;
};

export function FeedbackSelectionOverlay({
  onSelect,
  onCancel,
}: FeedbackSelectionOverlayProps) {
  const [markers, setMarkers] = useState<Marker[]>([]);

  useEffect(() => {
    const compute = () => {
      const nodes = document.querySelectorAll<HTMLElement>("[data-cy]");
      const next: Marker[] = [];
      nodes.forEach((el) => {
        const dataCy = el.getAttribute("data-cy");
        if (!dataCy) return;
        if (el.closest("[data-feedback-ui]")) return;
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        next.push({
          dataCy,
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        });
      });
      setMarkers(next);
    };
    compute();

    let raf = 0;
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };
    window.addEventListener("scroll", schedule, true);
    window.addEventListener("resize", schedule);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onCancel();
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule, true);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("keydown", onKey);
    };
  }, [onCancel]);

  return (
    <div
      data-feedback-ui
      className="fixed inset-0 z-[60] pointer-events-none"
      aria-label="เลือก Component ที่จะแนบ"
    >
      {markers.map((m) => (
        <button
          key={`${m.dataCy}-${m.top}-${m.left}`}
          type="button"
          onClick={() => onSelect(m.dataCy)}
          className="absolute pointer-events-auto rounded border-2 border-indigo-500 bg-indigo-500/10 hover:bg-indigo-500/20 transition"
          style={{
            top: m.top,
            left: m.left,
            width: m.width,
            height: m.height,
          }}
          aria-label={`แนบ ${m.dataCy}`}
        />
      ))}
      <div className="fixed top-4 right-4 pointer-events-auto">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md bg-slate-900 text-white text-sm font-medium px-3 py-2 shadow-lg hover:bg-slate-800"
        >
          ยกเลิก (Esc)
        </button>
      </div>
    </div>
  );
}
