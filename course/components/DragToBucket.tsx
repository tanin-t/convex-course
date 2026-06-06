"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { useLocalState } from "@/lib/useLocalState";

export type Bucket = {
  id: string;
  label: string;
  description: string;
};

export type DragItem = {
  id: string;
  text: string;
  correctBucket: string;
  why: ReactNode;
  note?: ReactNode;
};

type DragToBucketProps = {
  dataCy: string;
  storageKey: string;
  intro?: ReactNode;
  buckets: Bucket[];
  items: DragItem[];
};

/**
 * Accessibility choice: click-to-select + click-to-place instead of HTML5 drag/drop.
 * Works on touch devices and keyboard.
 */
export function DragToBucket({
  dataCy,
  storageKey,
  intro,
  buckets,
  items,
}: DragToBucketProps) {
  const [placed, setPlaced] = useLocalState<Record<string, string>>(
    `${storageKey}:placed`,
    {},
  );
  const [picked, setPicked] = useState<string | null>(null);

  const placeItem = (itemId: string, bucketId: string) => {
    setPlaced({ ...placed, [itemId]: bucketId });
    setPicked(null);
  };

  const resetItem = (itemId: string) => {
    const next = { ...placed };
    delete next[itemId];
    setPlaced(next);
  };

  const remaining = items.filter((i) => !(i.id in placed));
  const placedCount = items.length - remaining.length;
  const correctCount = items.filter(
    (i) => placed[i.id] === i.correctBucket,
  ).length;

  return (
    <section
      data-cy={dataCy}
      className="my-6 rounded-lg border border-violet-200 bg-violet-50 p-5"
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-violet-900">
          <span aria-hidden>🪣</span>
          <span>จัดข้อมูลเข้ากล่อง</span>
        </h3>
        <span className="text-sm font-mono text-violet-700">
          {placedCount} / {items.length}
        </span>
      </div>
      {intro && (
        <p className="mt-2 text-slate-700 leading-relaxed text-sm">{intro}</p>
      )}

      {/* Pool of unplaced items */}
      {remaining.length > 0 && (
        <div className="mt-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-violet-700 mb-2">
            {picked ? "เลือกกล่องด้านล่าง →" : "1. เลือกข้อมูล"}
          </div>
          <ul className="flex flex-wrap gap-2">
            {remaining.map((item) => {
              const isPicked = picked === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() =>
                      setPicked(isPicked ? null : item.id)
                    }
                    className={`rounded-md border-2 px-3 py-2 text-sm text-left transition ${
                      isPicked
                        ? "border-violet-600 bg-violet-600 text-white shadow-md"
                        : "border-violet-300 bg-white text-slate-800 hover:border-violet-500"
                    }`}
                  >
                    {item.text}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Buckets */}
      <div className="mt-4">
        {remaining.length > 0 && (
          <div className="text-xs font-semibold uppercase tracking-wider text-violet-700 mb-2">
            2. คลิกกล่องที่คิดว่าใช่
          </div>
        )}
        <div className="grid gap-3 md:grid-cols-3">
          {buckets.map((bucket) => {
            const inBucket = items.filter(
              (i) => placed[i.id] === bucket.id,
            );
            return (
              <button
                key={bucket.id}
                type="button"
                onClick={() => picked && placeItem(picked, bucket.id)}
                disabled={!picked}
                className={`text-left rounded-lg border-2 p-3 transition ${
                  picked
                    ? "border-violet-500 bg-white hover:bg-violet-100 cursor-pointer"
                    : "border-violet-200 bg-white cursor-default"
                }`}
              >
                <div className="font-semibold text-violet-900">
                  {bucket.label}
                </div>
                <div className="mt-1 text-xs text-slate-600 leading-snug">
                  {bucket.description}
                </div>
                {inBucket.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {inBucket.map((item) => {
                      const correct = placed[item.id] === item.correctBucket;
                      return (
                        <li
                          key={item.id}
                          className={`rounded-md border p-2 text-sm ${
                            correct
                              ? "border-emerald-300 bg-emerald-50"
                              : "border-rose-300 bg-rose-50"
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            <span>{correct ? "✅" : "❌"}</span>
                            <div className="flex-1">
                              <div
                                className={
                                  correct ? "text-emerald-900" : "text-rose-900"
                                }
                              >
                                {item.text}
                              </div>
                              <div className="mt-1 text-xs text-slate-700">
                                {item.why}
                              </div>
                              {item.note && (
                                <div className="mt-1 text-xs text-slate-500 italic">
                                  💡 {item.note}
                                </div>
                              )}
                              {!correct && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    resetItem(item.id);
                                  }}
                                  className="mt-1 text-xs text-rose-700 hover:text-rose-900 underline"
                                >
                                  ลองอีกครั้ง
                                </button>
                              )}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {remaining.length === 0 && (
        <div
          className={`mt-4 rounded-md border p-3 text-sm ${
            correctCount === items.length
              ? "border-emerald-300 bg-emerald-50 text-emerald-900"
              : "border-amber-300 bg-amber-50 text-amber-900"
          }`}
        >
          ถูก {correctCount} / {items.length}
          {correctCount < items.length &&
            " — กดปุ่ม 'ลองอีกครั้ง' ที่ข้อที่ผิดเพื่อจัดใหม่"}
        </div>
      )}
    </section>
  );
}
