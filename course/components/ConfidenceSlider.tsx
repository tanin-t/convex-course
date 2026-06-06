"use client";

import { useLocalState } from "@/lib/useLocalState";

type ConfidenceSliderProps = {
  dataCy: string;
  storageKey: string;
  prompt: string;
  low?: string;
  mid?: string;
  high?: string;
  note?: string;
};

export function ConfidenceSlider({
  dataCy,
  storageKey,
  prompt,
  low = "ยังเบลออยู่",
  mid = "พอเข้าใจ แต่อธิบายยังไม่คล่อง",
  high = "อธิบายให้เพื่อนเข้าใจได้แน่นอน",
  note,
}: ConfidenceSliderProps) {
  const [value, setValue] = useLocalState(`${storageKey}:value`, 5);
  const [touched, setTouched] = useLocalState(`${storageKey}:touched`, false);

  return (
    <section
      data-cy={dataCy}
      className="my-6 rounded-lg border border-indigo-200 bg-indigo-50 p-5"
    >
      <h3 className="flex items-center gap-2 text-lg font-semibold text-indigo-900">
        <span aria-hidden>📊</span>
        <span>ประเมินตัวเอง</span>
      </h3>
      <p className="mt-2 text-slate-800 leading-relaxed font-medium">{prompt}</p>

      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
          <span>0</span>
          <span className="font-mono text-base font-bold text-indigo-700">
            {touched ? value : "—"}
          </span>
          <span>10</span>
        </div>
        <input
          type="range"
          min={0}
          max={10}
          step={1}
          value={value}
          onChange={(e) => {
            setValue(Number(e.target.value));
            setTouched(true);
          }}
          className="w-full accent-indigo-600"
          aria-label={prompt}
        />
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-slate-600">
        <span className="text-left">0 — {low}</span>
        <span className="text-center">5 — {mid}</span>
        <span className="text-right">10 — {high}</span>
      </div>

      {touched && value <= 5 && (
        <div className="mt-4 rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          ไม่เป็นไร — เลื่อนกลับไปอ่าน section ที่ยังเบลออีกครั้งโดยไม่ต้องรีบ
        </div>
      )}
      {touched && value >= 8 && (
        <div className="mt-4 rounded-md border border-emerald-300 bg-emerald-50 p-3 text-sm text-emerald-900">
          เจ๋งมาก — ลองเล่าให้เพื่อนฟัง 1 ครั้ง ถ้าเล่าได้ = ของจริง
        </div>
      )}

      {note && <p className="mt-3 text-xs text-slate-500 italic">{note}</p>}
    </section>
  );
}
