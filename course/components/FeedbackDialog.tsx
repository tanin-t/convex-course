"use client";

import { useEffect, useRef, useState } from "react";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FeedbackSelectionOverlay } from "./FeedbackSelectionOverlay";

type FeedbackType = "confusion" | "bug" | "suggestion";

type Option = {
  value: FeedbackType;
  label: string;
  emoji: string;
};

const TYPE_OPTIONS: Option[] = [
  { value: "confusion", label: "Confusion", emoji: "😕" },
  { value: "bug", label: "Bug", emoji: "🐞" },
  { value: "suggestion", label: "Suggestion", emoji: "💡" },
];

type FeedbackDialogProps = {
  open: boolean;
  onClose: () => void;
  onSuccess: (issue: { url: string; number: number }) => void;
};

const PANEL_WIDTH = 480;
const MARGIN = 16;

function defaultPosition(): { x: number; y: number } {
  if (typeof window === "undefined") return { x: 0, y: 80 };
  return {
    x: Math.max(MARGIN, window.innerWidth - PANEL_WIDTH - MARGIN),
    y: 80,
  };
}

export function FeedbackDialog({ open, onClose, onSuccess }: FeedbackDialogProps) {
  const create = useAction(api.feedback.create);
  const [type, setType] = useState<FeedbackType>("confusion");
  const [componentDataCy, setComponentDataCy] = useState<string | null>(null);
  const [body, setBody] = useState("");
  const [expected, setExpected] = useState("");
  const [selecting, setSelecting] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pos, setPos] = useState<{ x: number; y: number }>(defaultPosition);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const dragState = useRef<{
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);

  const onDragPointerDown = (e: React.PointerEvent<HTMLElement>) => {
    if (e.button !== 0) return;
    const target = e.target as HTMLElement;
    if (target.closest("button, a, input, textarea")) return;
    e.preventDefault();
    dragState.current = {
      startX: e.clientX,
      startY: e.clientY,
      originX: pos.x,
      originY: pos.y,
    };
    const onMove = (ev: PointerEvent) => {
      const s = dragState.current;
      if (!s) return;
      setPos({
        x: s.originX + (ev.clientX - s.startX),
        y: s.originY + (ev.clientY - s.startY),
      });
    };
    const onUp = () => {
      dragState.current = null;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  useEffect(() => {
    if (open && !selecting) {
      bodyRef.current?.focus();
    }
  }, [open, selecting]);

  useEffect(() => {
    if (!open) {
      setPos(defaultPosition());
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open && !selecting && !submitting) {
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, selecting, submitting]);

  const trimmedBody = body.trim();
  const canSubmit = trimmedBody.length >= 5 && !submitting;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    try {
      const lessonPath =
        typeof window === "undefined" ? "/" : window.location.pathname;
      const issue = await create({
        type,
        lessonPath,
        componentDataCy: componentDataCy ?? undefined,
        body: trimmedBody,
        expected:
          type !== "suggestion" && expected.trim().length > 0
            ? expected.trim()
            : undefined,
      });
      setType("confusion");
      setComponentDataCy(null);
      setBody("");
      setExpected("");
      setSubmitting(false);
      onSuccess(issue);
    } catch (err) {
      setError(err instanceof Error ? err.message : "ส่ง Feedback ไม่สำเร็จ");
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <>
      <form
        onSubmit={submit}
        data-feedback-ui
        role="dialog"
        aria-label="ส่ง Feedback"
        className={`fixed z-50 rounded-xl bg-white shadow-2xl border border-slate-200 overflow-hidden ${
          selecting ? "pointer-events-none opacity-30" : ""
        }`}
        style={{
          left: pos.x,
          top: pos.y,
          width: PANEL_WIDTH,
          maxWidth: `calc(100vw - ${MARGIN * 2}px)`,
        }}
      >
        <header
          onPointerDown={onDragPointerDown}
          className="flex items-center justify-between border-b border-slate-200 px-5 py-3 cursor-grab active:cursor-grabbing select-none touch-none"
        >
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <span aria-hidden className="text-slate-400 text-base">⋮⋮</span>
            ส่ง Feedback
          </h2>
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="text-slate-400 hover:text-slate-700 text-xl leading-none disabled:opacity-50"
              aria-label="ปิด"
            >
              ×
            </button>
          </header>

          <div className="px-5 py-4 space-y-5">
            <fieldset>
              <legend className="text-sm font-medium text-slate-700 mb-2">
                ประเภท
              </legend>
              <div className="flex gap-2">
                {TYPE_OPTIONS.map((opt) => {
                  const active = type === opt.value;
                  return (
                    <label
                      key={opt.value}
                      className={`flex-1 cursor-pointer rounded-lg border px-3 py-2 text-sm text-center transition ${
                        active
                          ? "border-indigo-500 bg-indigo-50 text-indigo-800 font-semibold"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="feedback-type"
                        value={opt.value}
                        checked={active}
                        onChange={() => setType(opt.value)}
                        className="sr-only"
                      />
                      <span aria-hidden className="mr-1">
                        {opt.emoji}
                      </span>
                      {opt.label}
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div>
              <div className="text-sm font-medium text-slate-700 mb-2">
                Component (ไม่บังคับ)
              </div>
              {componentDataCy ? (
                <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-200 px-3 py-1 text-sm text-indigo-800">
                  <span className="font-mono">{componentDataCy}</span>
                  <button
                    type="button"
                    onClick={() => setComponentDataCy(null)}
                    className="text-indigo-500 hover:text-indigo-700"
                    aria-label="ลบ Component ที่แนบ"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setSelecting(true)}
                  className="rounded-md border border-dashed border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:border-indigo-400 hover:text-indigo-700"
                >
                  📎 แนบ Component
                </button>
              )}
            </div>

            <div>
              <label
                htmlFor="feedback-body"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                สิ่งที่อยากบอก <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="feedback-body"
                ref={bodyRef}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={4}
                required
                minLength={5}
                placeholder="อธิบายปัญหา / ไอเดีย / สิ่งที่งง"
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            {type !== "suggestion" && (
              <div>
                <label
                  htmlFor="feedback-expected"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  คาดหวังให้เป็นยังไง (ไม่บังคับ)
                </label>
                <textarea
                  id="feedback-expected"
                  value={expected}
                  onChange={(e) => setExpected(e.target.value)}
                  rows={2}
                  placeholder="เช่น น่าจะอธิบายแบบนี้ / ตัวอย่างที่ทำงานควรเป็นแบบนี้"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>
            )}

            {error && (
              <div className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                {error}
              </div>
            )}
          </div>

          <footer className="flex items-center justify-end gap-2 border-t border-slate-200 bg-slate-50 px-5 py-3">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-200 disabled:opacity-50"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              disabled={!canSubmit}
              className="rounded-md bg-indigo-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:bg-indigo-300"
            >
              {submitting ? "กำลังส่ง…" : "ส่ง Feedback"}
            </button>
        </footer>
      </form>
      {selecting && (
        <FeedbackSelectionOverlay
          onSelect={(dataCy) => {
            setComponentDataCy(dataCy);
            setSelecting(false);
          }}
          onCancel={() => setSelecting(false)}
        />
      )}
    </>
  );
}
