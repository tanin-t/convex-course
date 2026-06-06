import type { Metadata } from "next";
import { CheckboxList } from "@/components/CheckboxList";
import { CodeExample } from "@/components/CodeExample";
import { ConfidenceSlider } from "@/components/ConfidenceSlider";
import { DragToBucket } from "@/components/DragToBucket";
import { HypothesisBox } from "@/components/HypothesisBox";
import { Jargon } from "@/components/Jargon";
import { MermaidDiagram } from "@/components/MermaidDiagram";
import { MultipleChoice } from "@/components/MultipleChoice";
import { PersistentReflection } from "@/components/PersistentReflection";
import { PredictThenReveal } from "@/components/PredictThenReveal";
import { SessionNav } from "@/components/SessionNav";
import { StepReveal } from "@/components/StepReveal";
import { ToggleCompare } from "@/components/ToggleCompare";

export const metadata: Metadata = {
  title: "Session 3 — Query: อ่านข้อมูลครั้งแรก + handle states | Convex Course",
};

const SID = "s3";

const QUERY_FILE_CODE = `// convex/questions.ts
import { query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("questions").collect();
  },
});
`;

const PAGE_FILE_CODE = `"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function QuestionsPage() {
  const questions = useQuery(api.questions.list);

  if (questions === undefined) {
    return <p>กำลังโหลด...</p>;
  }
  if (questions.length === 0) {
    return <p>ยังไม่มีคำถาม — เพิ่มได้ที่ Dashboard</p>;
  }
  return (
    <ul>
      {questions.map((q) => (
        <li key={q._id}>{q.title}</li>
      ))}
    </ul>
  );
}
`;

const SUBSCRIPTION_DIAGRAM = `sequenceDiagram
  autonumber
  participant C as Component (useQuery)
  participant CV as Convex Cloud
  participant DB as Database
  C->>CV: subscribe api.questions.list
  Note over C: value = undefined
  CV->>DB: query("questions").collect()
  DB-->>CV: [...docs]
  CV-->>C: push result
  Note over C: value = [...docs] → render
  Note over DB,CV: data changed
  DB-->>CV: change detected
  CV->>DB: re-run query
  DB-->>CV: new result
  CV-->>C: push new value → auto re-render
`;

export default function Session3Page() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      {/* Header */}
      <header>
        <div className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
          Week 1 · Session 3
        </div>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          Query: อ่านข้อมูลครั้งแรก + handle states
        </h1>
        <p className="mt-3 text-slate-600 leading-relaxed">
          อ่านได้ตามจังหวะตัวเอง — ทุกกล่องสีจะถามให้คิดก่อนเปิดคำตอบ
          คำตอบของคุณ save ไว้บน device นี้ ไม่ส่งไปไหน
        </p>
      </header>

      {/* Page goals */}
      <section className="mt-8 rounded-lg border border-indigo-200 bg-indigo-50 p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-indigo-700">
          🎯 หลังจบหน้านี้ คุณจะ
        </h2>
        <ul className="mt-3 space-y-1.5 text-slate-800 leading-relaxed list-disc list-inside marker:text-indigo-500">
          <li>
            อธิบายได้ว่า <strong>query</strong> คือ{" "}
            <Jargon term="pure function">
              <strong>Pure function</strong> = function ที่ input เดิม + state เดิม
              → return ผลเดิมเสมอ ไม่มี side effect (random, time, network call)
            </Jargon>{" "}
            ที่ &ldquo;อ่าน&rdquo; ข้อมูล
          </li>
          <li>
            แยก 3 state ของ <code className="rounded bg-indigo-100 px-1 font-mono text-sm">useQuery</code> ได้:
            ยังโหลด / โหลดเสร็จไม่มี / มี data
          </li>
          <li>
            เขียน query function แรก + ใช้ใน Next.js page ได้
          </li>
          <li>
            เริ่มเข้าใจว่า <code className="rounded bg-indigo-100 px-1 font-mono text-sm">useQuery</code> ≠ <code className="rounded bg-indigo-100 px-1 font-mono text-sm">fetch</code> —
            มันคือ{" "}
            <Jargon term="subscription">
              <strong>Subscription</strong> = ตามดูค่าตลอด ไม่ใช่ขอครั้งเดียวจบ
              data เปลี่ยน → client ได้ค่าใหม่อัตโนมัติ
            </Jargon>
          </li>
          <li>
            ฝึก <strong>อ่าน error message</strong> — หา root cause ก่อนถาม AI
          </li>
        </ul>
      </section>

      {/* ───── Section 1: Hook ───── */}
      <Section number={1} title="หน้าเว็บที่ &ldquo;พังตอนโหลด&rdquo;">
        <p>
          ลองจินตนาการ — คุณเขียน Next.js page ไว้แสดงรายการคำถามจาก database
        </p>
        <p className="mt-2">
          code &ldquo;work&rdquo; บนเครื่องคุณ. แต่พอเพื่อนเปิดดู —
          <strong> crash ทันที</strong>:
        </p>
        <pre className="mt-3 rounded-md bg-rose-50 border border-rose-200 p-3 text-sm font-mono text-rose-900 overflow-x-auto">
          TypeError: Cannot read properties of undefined (reading &apos;map&apos;)
        </pre>
        <p className="mt-3 text-sm text-slate-600 italic">
          หยุดก่อน. ลองคิด 30 วินาที. อย่าพึ่ง scroll ลง.
        </p>

        <PredictThenReveal
          dataCy="predict-hook-crash"
          storageKey={`${SID}:hook`}
          question="เปิดหน้าเว็บที่อ่าน list จาก database → crash ที่ `.map(...)`. คุณคิดว่าเกิดจากอะไร?"
          hint="นึกถึง 'ตอนไหน' ที่ data ยังไม่ถึงมือ component"
          reveal={
            <>
              <p>
                คำตอบสั้น:{" "}
                <strong>ตอนแรกที่ component render — data ยังไม่มา</strong>
              </p>
              <p className="mt-2">
                ค่าของมันคือ{" "}
                <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                  undefined
                </code>{" "}
                ไม่ใช่ array.{" "}
                <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                  undefined.map(...)
                </code>{" "}
                → crash
              </p>
              <p className="mt-3">
                พอเข้าใจปัญหานี้ → คุณจะรู้ว่าทำไม Convex (และ library ที่ดี
                ทุกตัว) บังคับให้เรา <strong>แยก 3 state เสมอ:</strong>
              </p>
              <ol className="mt-2 list-decimal list-inside space-y-1">
                <li>
                  ยังไม่รู้ (
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    undefined
                  </code>{" "}
                  — loading)
                </li>
                <li>
                  รู้แล้วว่าไม่มี (
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    []
                  </code>{" "}
                  — empty)
                </li>
                <li>มี data</li>
              </ol>
            </>
          }
          note="ไม่ต้องตอบถูก — แค่ได้ลองคิดก่อน"
        />
      </Section>

      {/* ───── Section 2: Mental model ───── */}
      <Section number={2} title="Query คืออะไร — และต่างกับ fetch ยังไง">
        <p>
          ใน Convex มี function ที่ทำหน้าที่{" "}
          <strong>อ่านข้อมูลอย่างเดียว</strong> — เรียกว่า <strong>query</strong>
        </p>
        <p className="mt-2">
          ทำไมต้องแยก &ldquo;อ่าน&rdquo; ออกจาก &ldquo;เขียน&rdquo;? —
          เพราะ Convex อยากให้ query มี 3 คุณสมบัติพิเศษ:
        </p>
        <ul className="mt-2 list-disc list-inside space-y-1 text-slate-800">
          <li>
            <strong>
              <Jargon term="Pure">
                <strong>Pure</strong> = ไม่มี side effect ไม่ใช้ random/time/network
                input เดิม + DB เดิม → ผลเดิมเสมอ
              </Jargon>
            </strong>{" "}
            — ผลลัพธ์ขึ้นกับ input + data ใน DB เท่านั้น
          </li>
          <li>
            <strong>Re-runnable</strong> — Convex รัน query ซ้ำได้เมื่อ data
            เปลี่ยน
          </li>
          <li>
            <strong>Subscribable</strong> — client subscribe ได้ → data เปลี่ยน
            → auto re-render
          </li>
        </ul>
        <p className="mt-3 text-sm text-slate-600 italic">
          ข้อ 2-3 คือรากของ &ldquo;real-time&rdquo; ที่จะเจอ Week 4
        </p>

        <ToggleCompare
          dataCy="compare-fetch-vs-usequery"
          left={{
            id: "fetch",
            label: "fetch (REST API ที่เคยใช้)",
            title: "ขอครั้งเดียว",
            content: (
              <ul className="space-y-1 list-disc list-inside">
                <li>คุณยิง request → server ตอบ 1 ครั้ง → จบ</li>
                <li>
                  data เปลี่ยนทีหลัง? → ต้องยิงใหม่เอง (polling / manual refresh)
                </li>
                <li>component จัดการ loading / error state เองทั้งหมด</li>
                <li>
                  ต้องเขียน{" "}
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    useEffect
                  </code>{" "}
                  +{" "}
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    useState
                  </code>{" "}
                  เอง
                </li>
              </ul>
            ),
          }}
          right={{
            id: "useQuery",
            label: "useQuery (Convex)",
            title: "Subscribe",
            content: (
              <ul className="space-y-1 list-disc list-inside">
                <li>
                  เรียก{" "}
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    useQuery(api.questions.list)
                  </code>{" "}
                  ครั้งเดียว
                </li>
                <li>Convex ส่ง data มา + subscribe ไว้ให้</li>
                <li>
                  data ใน DB เปลี่ยน → Convex push ค่าใหม่ → component re-render
                  อัตโนมัติ
                </li>
                <li>
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    undefined
                  </code>{" "}
                  = ยังไม่รู้ (Convex ยังไม่ตอบกลับ)
                </li>
              </ul>
            ),
          }}
          caption="ความต่างนี้ไม่ใช่แค่ syntax — มันเปลี่ยน mental model จาก 'request-response' → 'subscription'"
        />

        <p className="mt-3">
          พอ query เป็น subscription → Convex ต้องการ <strong>การันตี</strong> ว่า:
        </p>
        <blockquote className="mt-2 border-l-4 border-indigo-400 bg-indigo-50 pl-4 py-2 text-slate-800 italic">
          &ldquo;รัน query ครั้งที่ 1 ได้ผล X — รันครั้งที่ 100 บน data
          เดิม ต้องได้ X เหมือนเดิม&rdquo;
        </blockquote>
        <p className="mt-2">
          ถ้าไม่ — real-time จะเพี้ยน. นี่คือเหตุผลที่ query ต้อง pure
          (จะลงรายละเอียดที่ <a href="#section-5" className="text-indigo-700 underline">Section 5</a>)
        </p>
      </Section>

      {/* ───── Section 3: Write first query ───── */}
      <Section number={3} title="เห็นของจริง: เขียน query แรก">
        <p>
          พอเข้าใจ &ldquo;ทำไม&rdquo; แล้ว — มาดู query function จริงกัน
        </p>
        <p className="mt-2">
          <strong>โจทย์:</strong> อ่าน list ของ{" "}
          <code className="rounded bg-slate-100 px-1 font-mono text-sm">
            questions
          </code>{" "}
          ทั้งหมดจาก table ที่เราสร้างไว้ Session 2
        </p>

        <PredictThenReveal
          dataCy="predict-query-shape"
          storageKey={`${SID}:predict-query`}
          question="ถ้าคุณต้องเขียน Convex function ที่ 'อ่าน list คำถามทั้งหมด' — เดาว่ามันต้องมีอะไรบ้าง?"
          hint="ไม่ต้องเขียน syntax ถูก — แค่ list ว่า 'มันน่าจะมีส่วนอะไรบ้าง'"
          revealButton="ดูเฉลย"
          reveal={
            <>
              <CodeExample
                dataCy="code-query-list"
                filename="convex/questions.ts"
                language="ts"
                code={QUERY_FILE_CODE}
              />
              <p>สังเกต — 5 ส่วนหลัก:</p>
              <ol className="mt-2 list-decimal list-inside space-y-1">
                <li>
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    import &#123; query &#125;
                  </code>{" "}
                  จาก{" "}
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    _generated/server
                  </code>{" "}
                  (Convex generate ให้เอง)
                </li>
                <li>
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    export const list = query(&#123;...&#125;)
                  </code>{" "}
                  — ชื่อ = ชื่อที่ใช้เรียก
                </li>
                <li>
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    args: &#123;&#125;
                  </code>{" "}
                  — query นี้ไม่รับ argument
                </li>
                <li>
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    handler: async (ctx) =&gt; ...
                  </code>{" "}
                  — logic จริง
                </li>
                <li>
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    ctx.db.query(&quot;questions&quot;).collect()
                  </code>{" "}
                  — อ่าน table ทั้งหมด
                </li>
              </ol>
            </>
          }
        />

        <h3 className="mt-6 font-semibold text-slate-900">อ่านทีละบรรทัด</h3>
        <p>แต่ละส่วนมีเหตุผล — เปิดทีละจุด</p>

        <StepReveal
          dataCy="step-query-parts"
          storageKey={`${SID}:query-parts`}
          intro="Query function นี้มีอะไรบ้าง:"
          steps={[
            {
              title: 'import { query } from "./_generated/server"',
              body: (
                <>
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    _generated/
                  </code>{" "}
                  คือโฟลเดอร์ที่ Convex สร้างให้อัตโนมัติตอน{" "}
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    npx convex dev
                  </code>{" "}
                  รันอยู่. <strong>อย่าแก้ในนั้น</strong> — มันจะถูก overwrite
                  ถ้าหายไป → restart{" "}
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    npx convex dev
                  </code>
                </>
              ),
            },
            {
              title: "export const list = query({...})",
              body: (
                <>
                  ตัวแปร <strong>list</strong> ที่ export ={" "}
                  <strong>function reference</strong>
                  <br />
                  File{" "}
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    convex/questions.ts
                  </code>{" "}
                  + export{" "}
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    list
                  </code>{" "}
                  → เรียกใน client ด้วย{" "}
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    api.questions.list
                  </code>
                  <br />
                  (file-based routing — เหมือน Next.js)
                </>
              ),
            },
            {
              title: "args: {}",
              body: (
                <>
                  Validator สำหรับ argument ที่ client ส่งมา — ต้องประกาศเสมอ
                  แม้ไม่รับอะไร
                  <br />
                  ถ้าจะรับ:{" "}
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    args: &#123; difficulty: v.string() &#125;
                  </code>{" "}
                  แล้ว destructure ใน handler
                  <br />
                  (Convex บังคับให้มี validator เพราะ client ส่งอะไรเข้ามาก็ได้
                  — ห้ามเชื่อ — Session 2 ฝึกมาแล้ว)
                </>
              ),
            },
            {
              title: "handler: async (ctx) => ...",
              body: (
                <>
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    ctx
                  </code>{" "}
                  = context — ของที่ Convex เตรียมไว้:{" "}
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    ctx.db
                  </code>
                  ,{" "}
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    ctx.auth
                  </code>
                  , ...
                  <br />
                  สำหรับ query →{" "}
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    ctx.db
                  </code>{" "}
                  มีแค่ method &ldquo;อ่าน&rdquo; (
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    .query
                  </code>
                  ,{" "}
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    .get
                  </code>
                  ) <strong>ไม่มี</strong>{" "}
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    .insert
                  </code>
                  /
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    .patch
                  </code>
                  <br />→ <strong>เขียน mutate ไม่ได้แม้พิมพ์</strong> —
                  TypeScript จับได้ตั้งแต่ compile-time
                </>
              ),
            },
            {
              title: 'ctx.db.query("questions").collect()',
              body: (
                <>
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    .query(&quot;questions&quot;)
                  </code>{" "}
                  — เริ่มเลือก table
                  <br />
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    .collect()
                  </code>{" "}
                  — ดึงทุก document มาเป็น array
                  <br />
                  มี method อื่น:{" "}
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    .first()
                  </code>
                  ,{" "}
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    .take(10)
                  </code>
                  ,{" "}
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    .filter(...)
                  </code>
                  ,{" "}
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    .withIndex(...)
                  </code>{" "}
                  — เรียนต่อ Session 6
                </>
              ),
            },
          ]}
        />
      </Section>

      {/* ───── Section 4: 3 states ───── */}
      <Section number={4} title="ใช้ใน Next.js: 3 state ของ useQuery">
        <p>
          Query function อยู่ที่ Convex Cloud — ฝั่ง Next.js เรียกผ่าน{" "}
          <strong>
            <Jargon term="hook">
              <strong>Hook</strong> = function ของ React ที่ขึ้นต้นด้วย{" "}
              <code>use*</code> — เรียกใน component แล้วผูก state กับ render
              loop
            </Jargon>
          </strong>{" "}
          <code className="rounded bg-slate-100 px-1 font-mono text-sm">
            useQuery
          </code>
        </p>

        <PredictThenReveal
          dataCy="predict-three-states"
          storageKey={`${SID}:predict-states`}
          question="useQuery(api.questions.list) return อะไรได้บ้าง?"
          hint="นึกถึงเหตุการณ์ที่อาจเกิด: ยังโหลด, โหลดเสร็จมี data, โหลดเสร็จไม่มี data"
          reveal={
            <>
              <p>
                <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                  useQuery
                </code>{" "}
                return ค่าได้ <strong>3 รูปแบบ:</strong>
              </p>
              <ol className="mt-2 list-decimal list-inside space-y-1">
                <li>
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    undefined
                  </code>{" "}
                  — <strong>ยังไม่รู้</strong> (Convex ยังตอบไม่กลับ)
                </li>
                <li>
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    []
                  </code>{" "}
                  — <strong>รู้แล้วว่าไม่มี data</strong>
                </li>
                <li>
                  array ที่มี item — <strong>มี data พร้อมใช้</strong>
                </li>
              </ol>
              <p className="mt-3">
                สังเกต:{" "}
                <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                  undefined
                </code>{" "}
                ≠{" "}
                <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                  []
                </code>
              </p>
              <ul className="mt-1 list-disc list-inside text-sm">
                <li>
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    undefined
                  </code>{" "}
                  = &ldquo;I don&apos;t know yet&rdquo;
                </li>
                <li>
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    []
                  </code>{" "}
                  = &ldquo;I know, and the answer is nothing&rdquo;
                </li>
              </ul>
              <p className="mt-3 font-semibold">
                ความต่างนี้คือหัวใจของ session นี้
              </p>
            </>
          }
        />

        <StepReveal
          dataCy="step-three-states"
          storageKey={`${SID}:three-states`}
          intro="Component ที่ดี ต้องแยก 3 state นี้เสมอ:"
          steps={[
            {
              title: "State 1: undefined (ยังโหลด)",
              body: (
                <>
                  <pre className="rounded bg-slate-900 text-slate-100 p-3 text-xs font-mono overflow-x-auto">
{`if (questions === undefined) {
  return <p>กำลังโหลด...</p>;
}`}
                  </pre>
                  <p className="mt-2">
                    ถ้าข้าม check นี้ → component พยายาม{" "}
                    <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                      .map(undefined)
                    </code>{" "}
                    → <strong>crash</strong>
                  </p>
                </>
              ),
            },
            {
              title: "State 2: array ว่าง (โหลดเสร็จ ไม่มี data)",
              body: (
                <>
                  <pre className="rounded bg-slate-900 text-slate-100 p-3 text-xs font-mono overflow-x-auto">
{`if (questions.length === 0) {
  return <p>ยังไม่มีคำถาม — เพิ่มได้ที่ Dashboard</p>;
}`}
                  </pre>
                  <p className="mt-2">
                    ผู้ใช้เปิดเว็บ → เห็นข้อความเข้าใจง่าย ไม่ใช่หน้าว่างมึน
                  </p>
                </>
              ),
            },
            {
              title: "State 3: มี data → render",
              body: (
                <>
                  <pre className="rounded bg-slate-900 text-slate-100 p-3 text-xs font-mono overflow-x-auto">
{`return (
  <ul>
    {questions.map((q) => (
      <li key={q._id}>{q.title}</li>
    ))}
  </ul>
);`}
                  </pre>
                  <p className="mt-2">
                    สังเกต{" "}
                    <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                      q._id
                    </code>{" "}
                    — Convex ให้ทุก document มี{" "}
                    <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                      _id
                    </code>{" "}
                    อัตโนมัติ (ไม่ต้องประกาศใน schema)
                  </p>
                </>
              ),
            },
          ]}
          closing={
            <>
              Pattern นี้จะใช้ <strong>ทุกครั้ง</strong> ที่ใช้{" "}
              <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                useQuery
              </code>{" "}
              — จำให้ขึ้นใจ (Session 15 จะคุยเรื่อง pattern ที่ดูสะอาดขึ้น
              แต่ root idea เหมือนเดิม)
            </>
          }
        />

        <DragToBucket
          dataCy="bucket-states"
          storageKey={`${SID}:bucket-states`}
          buckets={[
            {
              id: "loading",
              label: "State 1: undefined",
              description: "ยังโหลด (Convex ยังไม่ตอบ)",
            },
            {
              id: "empty",
              label: "State 2: []",
              description: "โหลดเสร็จ ไม่มี data",
            },
            {
              id: "data",
              label: "State 3: มี data",
              description: "Array มี item → render .map()",
            },
          ]}
          items={[
            {
              id: "just-opened",
              text: "เพิ่งเปิดหน้าเว็บ — Convex ยังตอบไม่กลับ",
              correctBucket: "loading",
              why: "Convex ยังไม่ส่ง response แรก → undefined",
            },
            {
              id: "no-data-yet",
              text: "Table `questions` ว่าง — ยังไม่มี admin เพิ่มข้อมูล",
              correctBucket: "empty",
              why: "Convex ตอบกลับแล้ว ค่าเป็น [] → length === 0",
            },
            {
              id: "five-questions",
              text: "มี 5 คำถามใน table — Convex ส่งกลับมาแล้ว",
              correctBucket: "data",
              why: "Array ยาว 5 → render .map()",
            },
            {
              id: "offline",
              text: "internet ของ user ขาด — connection พัง (เพิ่งเปิดหน้า)",
              correctBucket: "loading",
              why: "ตราบใดที่ Convex ยังไม่ตอบ → undefined. (Session 15 จะคุย error/disconnect แยก)",
            },
          ]}
        />

        <MultipleChoice
          dataCy="mc-undefined-meaning"
          storageKey={`${SID}:mc-undefined`}
          question="ถ้า useQuery return `undefined` Convex กำลังสื่ออะไร?"
          options={[
            {
              id: "A",
              label: "table ว่าง ไม่มี document",
              correct: false,
              explanation:
                "ถ้าตอบว่า 'ไม่มี data' → ค่าคือ [] ไม่ใช่ undefined. undefined = 'ยังไม่รู้'",
            },
            {
              id: "B",
              label: "Query function พัง",
              correct: false,
              explanation:
                "Query พัง → throw error (ดูใน Dashboard logs). ไม่ใช่ undefined",
            },
            {
              id: "C",
              label: "Convex ยังไม่ตอบกลับ — ยังโหลด",
              correct: true,
              explanation: (
                <>
                  ถูก — <code>undefined</code> = &ldquo;I don&apos;t know
                  yet&rdquo;
                  <br />
                  ถ้า Convex ส่งกลับมาแล้วและค่าเป็น <code>[]</code> ก็เป็น
                  &lsquo;รู้แล้วว่าไม่มี&rsquo; ไม่ใช่ <code>undefined</code>
                </>
              ),
            },
            {
              id: "D",
              label: "เรียก query ผิด file/ผิดชื่อ",
              correct: false,
              explanation:
                "เรียกผิด → TypeScript จับได้ตั้งแต่ compile-time (api.questions.list ไม่มี autocomplete) ไม่ลงไปถึง runtime",
            },
          ]}
        />
      </Section>

      {/* ───── Section 5: Pure ───── */}
      <Section number={5} title="ทำไม query ต้อง pure?" id="section-5">
        <p>
          ตอน Section 2 เกริ่นไว้ว่า query ต้อง{" "}
          <strong>
            <Jargon term="pure">
              ผลขึ้นกับ input + DB เท่านั้น — ไม่มี random, time, network
            </Jargon>
          </strong>{" "}
          — มาเข้าใจให้ลึกตอนนี้
        </p>
        <p className="mt-2">ลองคิดดูก่อน — ถ้าเขียน query แบบนี้:</p>
        <pre className="rounded bg-slate-900 text-slate-100 p-3 text-xs font-mono overflow-x-auto mt-3">
{`export const random = query({
  args: {},
  handler: async () => Math.random(),
});`}
        </pre>
        <p className="mt-2">จะเกิดอะไร?</p>

        <MultipleChoice
          dataCy="mc-why-pure"
          storageKey={`${SID}:mc-pure`}
          question="ทำไม Convex ไม่อนุญาต Math.random() ใน query?"
          options={[
            {
              id: "A",
              label: "Math.random() ทำงานช้า",
              correct: false,
              explanation:
                "ไม่เกี่ยวกับความเร็ว — เกี่ยวกับ 'รัน 2 ครั้งได้ผลเดิมไหม'",
            },
            {
              id: "B",
              label:
                "เพราะ query ต้องคืนผลเดิมเมื่อ input + data เดิม — ไม่งั้น cache + subscription จะเพี้ยน",
              correct: true,
              explanation: (
                <>
                  ใช่ — query เป็น subscription. Convex รันซ้ำเพื่อตรวจว่า data
                  เปลี่ยนไหม
                  <br />
                  ถ้าผลต่างทุกครั้ง → Convex คิดว่า &lsquo;data เปลี่ยน
                  ตลอด&rsquo; → push update รัวๆ → ผู้ใช้เห็นค่าเปลี่ยนวุ่นวาย
                </>
              ),
            },
            {
              id: "C",
              label: "Math.random ไม่ปลอดภัย",
              correct: false,
              explanation:
                "ไม่ใช่เรื่อง security — เรื่อง determinism (ผลซ้ำ)",
            },
            {
              id: "D",
              label: "เพราะ Convex อยาก force ให้ใช้ helper ของเขา",
              correct: false,
              explanation:
                "เหตุผลรากคือ query ต้อง deterministic — ไม่ใช่เพราะ helper",
            },
          ]}
        />

        <h3 className="mt-6 font-semibold text-slate-900">
          ห้ามใช้อะไรบ้างใน query
        </h3>
        <p>กฎ pure ห้ามใช้:</p>
        <ul className="mt-2 list-disc list-inside space-y-1 text-slate-800">
          <li>
            <code className="rounded bg-slate-100 px-1 font-mono text-sm">
              Math.random()
            </code>{" "}
            —{" "}
            <Jargon term="non-deterministic">
              เรียกแต่ละครั้งได้ผลต่างกัน
            </Jargon>
          </li>
          <li>
            <code className="rounded bg-slate-100 px-1 font-mono text-sm">
              Date.now()
            </code>
            ,{" "}
            <code className="rounded bg-slate-100 px-1 font-mono text-sm">
              new Date()
            </code>{" "}
            — เปลี่ยนทุกครั้งที่เรียก
          </li>
          <li>
            <code className="rounded bg-slate-100 px-1 font-mono text-sm">
              fetch(...)
            </code>{" "}
            — เรียก external API (
            <Jargon term="side effect">
              สิ่งที่ function ทำนอกเหนือจาก return ค่า
            </Jargon>
            + ไม่ deterministic + ช้า)
          </li>
          <li>
            เขียน DB (
            <code className="rounded bg-slate-100 px-1 font-mono text-sm">
              ctx.db.insert/patch/delete
            </code>
            ) — query อ่านอย่างเดียว
          </li>
        </ul>
        <p className="mt-3">
          <strong>ถ้าต้องการอะไรพวกนี้</strong> → ใช้ <strong>mutation</strong>{" "}
          (Session 4) หรือ <strong>action</strong> (Session 12)
        </p>

        <h3 className="mt-6 font-semibold text-slate-900">
          คิดเหมือนภาพถ่าย 📷
        </h3>
        <ul className="mt-2 list-disc list-inside space-y-1 text-slate-800">
          <li>ถ่ายภาพห้องตอนนี้ → ได้รูป A</li>
          <li>ถ่ายอีกครั้งเดี๋ยวนี้ (ห้องไม่เปลี่ยน) → ต้องได้รูป A เหมือนเดิม</li>
          <li>ถ้าได้รูป B ทั้งที่ห้องเหมือนเดิม → กล้องผิดปกติ</li>
        </ul>
        <p className="mt-2">
          Query = กล้องที่ต้องถ่ายแล้วได้ผลเดิม ตราบใดที่ scene เดิม
        </p>
      </Section>

      {/* ───── Section 6: Hands-on ───── */}
      <Section number={6} title="🧪 ลงมือ: เขียน query + ใช้ใน page">
        <p>
          ตอนนี้เอา concept ทั้งหมดมาประกอบ — เขียน query จริง + ใช้แสดงผลใน
          Next.js
        </p>
        <p className="mt-2">
          <strong>เป้าหมาย:</strong> หน้า{" "}
          <code className="rounded bg-slate-100 px-1 font-mono text-sm">
            app/questions/page.tsx
          </code>{" "}
          ของคุณ แสดง list questions + handle 3 states ถูกต้อง
        </p>

        <CheckboxList
          dataCy="checklist-setup"
          storageKey={`${SID}:setup`}
          title="Query + page setup"
          note="กดรายละเอียดเพื่อดู code/option — ขีด ✓ เมื่อทำเสร็จ"
          items={[
            {
              id: "prereq",
              label:
                "Session 2 จบ — มี table `questions` ใน schema + insert document ≥ 1 อันผ่าน Dashboard แล้ว",
              detail: (
                <>
                  ถ้ายังไม่มี — กลับไป Session 2 Section 8 ก่อน
                  <br />
                  ถ้าไม่มี document ก็ยังลองได้ — จะเห็น state{" "}
                  <strong>empty</strong> (มีประโยชน์ตอน Break)
                </>
              ),
            },
            {
              id: "file",
              label: (
                <>
                  สร้างไฟล์{" "}
                  <code className="rounded bg-slate-100 px-1 font-mono text-sm">
                    convex/questions.ts
                  </code>
                </>
              ),
              detail: (
                <>
                  ใน folder{" "}
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    convex/
                  </code>{" "}
                  เดียวกับ{" "}
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    schema.ts
                  </code>
                  <br />
                  ตั้งชื่อไฟล์ภาษาอังกฤษ lowercase — ชื่อไฟล์ = ส่วนหนึ่งของ
                  function reference
                </>
              ),
            },
            {
              id: "query",
              label: "วาง query `list` จาก Section 3 ลงในไฟล์",
            },
            {
              id: "dev-sync",
              label: (
                <>
                  ตรวจ{" "}
                  <code className="rounded bg-slate-100 px-1 font-mono text-sm">
                    npx convex dev
                  </code>{" "}
                  รันอยู่ → terminal แจ้ง deploy สำเร็จ
                </>
              ),
              hint: (
                <>
                  ถ้าเจอ error เกี่ยวกับ{" "}
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    _generated/server
                  </code>{" "}
                  → restart{" "}
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    npx convex dev
                  </code>
                </>
              ),
            },
            {
              id: "page-file",
              label: (
                <>
                  สร้างไฟล์{" "}
                  <code className="rounded bg-slate-100 px-1 font-mono text-sm">
                    app/questions/page.tsx
                  </code>{" "}
                  (Next.js App Router)
                </>
              ),
              detail: (
                <>
                  <p className="mb-2">
                    ใส่{" "}
                    <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                      &ldquo;use client&rdquo;
                    </code>{" "}
                    บนสุด เพราะใช้ hook:
                  </p>
                  <pre className="rounded bg-slate-900 text-slate-100 p-3 text-xs font-mono overflow-x-auto">
                    {PAGE_FILE_CODE}
                  </pre>
                </>
              ),
            },
            {
              id: "provider",
              label: (
                <>
                  ตรวจ{" "}
                  <code className="rounded bg-slate-100 px-1 font-mono text-sm">
                    ConvexProvider
                  </code>{" "}
                  wrap อยู่ใน{" "}
                  <code className="rounded bg-slate-100 px-1 font-mono text-sm">
                    app/layout.tsx
                  </code>{" "}
                  (จาก Session 1)
                </>
              ),
              hint: (
                <>
                  ถ้าไม่มี →{" "}
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    useQuery
                  </code>{" "}
                  จะ throw &ldquo;No Convex client&rdquo;
                </>
              ),
            },
            {
              id: "run",
              label: (
                <>
                  เปิด{" "}
                  <code className="rounded bg-slate-100 px-1 font-mono text-sm">
                    http://localhost:3000/questions
                  </code>{" "}
                  → เห็น list (หรือข้อความ &ldquo;ยังไม่มีคำถาม&rdquo;)
                </>
              ),
            },
            {
              id: "live-test",
              label:
                "เปิด Dashboard อีก tab → เพิ่ม document ใหม่ → กลับไปดู /questions",
              detail: (
                <>
                  <strong>ไม่ต้อง refresh</strong> — รายการใหม่ควรขึ้นทันที!
                  <br />
                  นี่คือ &lsquo;real-time&rsquo; ที่ตามมากับ{" "}
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    useQuery
                  </code>{" "}
                  — Session 10 จะอธิบายว่าทำงานยังไง
                </>
              ),
            },
          ]}
        />

        <h3 className="mt-6 font-semibold text-slate-900">
          Flow ที่เกิดขึ้นเบื้องหลัง
        </h3>
        <MermaidDiagram
          dataCy="diagram-subscription-flow"
          chart={SUBSCRIPTION_DIAGRAM}
          caption="useQuery subscribe ครั้งเดียว — Convex push update เองตลอด"
        />
      </Section>

      {/* ───── Section 7: Break it ───── */}
      <Section number={7} title="💥 ทำให้พัง: ทดสอบ mental model">
        <p>ตอนนี้ของรันได้แล้ว — มาทำให้พังเพื่อเห็นขอบเขต</p>
        <p className="mt-2 font-semibold text-rose-900">
          กฎ: ทุก scenario — เขียน hypothesis ก่อนทำ แล้วค่อยลอง
        </p>

        <HypothesisBox
          dataCy="break-remove-loading"
          storageKey={`${SID}:break-1`}
          title="💥 Break 1 — ลบ loading check"
          setup={
            <>
              <p>
                ใน{" "}
                <code className="rounded bg-rose-100 px-1 font-mono text-xs">
                  app/questions/page.tsx
                </code>{" "}
                — ลบบรรทัด{" "}
                <code className="rounded bg-rose-100 px-1 font-mono text-xs">
                  if (questions === undefined) return ...
                </code>{" "}
                ออกทั้งหมด เหลือเฉพาะ{" "}
                <code className="rounded bg-rose-100 px-1 font-mono text-xs">
                  .map(...)
                </code>{" "}
                ตรงๆ
              </p>
              <p className="mt-2">คาดว่าจะเกิดอะไรตอนเปิดหน้า?</p>
            </>
          }
          reveal={
            <>
              <p>
                <strong>สิ่งที่เกิด:</strong> browser console จะ throw
              </p>
              <pre className="mt-2 rounded bg-rose-100 p-2 text-xs font-mono text-rose-900 overflow-x-auto">
                TypeError: Cannot read properties of undefined (reading
                &apos;map&apos;)
              </pre>
              <p className="mt-2">React error overlay ขึ้นแดงเต็มจอ</p>
              <p className="mt-3">
                <strong>บทเรียน:</strong>
              </p>
              <ul className="mt-1 list-disc list-inside space-y-1">
                <li>
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    undefined
                  </code>{" "}
                  ≠ &ldquo;data ว่าง&rdquo; — มันคือ &ldquo;ยังไม่มี data&rdquo;
                </li>
                <li>JS ไม่ห้ามเรียก .map() ตอน TS compile — แต่ runtime crash</li>
                <li>
                  ทุก{" "}
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    useQuery
                  </code>{" "}
                  ต้องมี check{" "}
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    === undefined
                  </code>{" "}
                  เสมอ (หรือใช้ Suspense — Session 15)
                </li>
              </ul>
              <p className="mt-3">
                <strong>ฝึกอ่าน error message:</strong>
              </p>
              <ul className="mt-1 list-disc list-inside space-y-1 text-sm">
                <li>
                  &ldquo;Cannot read properties of <strong>undefined</strong>
                  &rdquo; — บอกว่า value undefined
                </li>
                <li>
                  &ldquo;(reading &apos;<strong>map</strong>&apos;)&rdquo; —
                  บอกว่ากำลังพยายามเรียก .map()
                </li>
                <li>
                  → <strong>root cause:</strong> ตัวที่คุณ .map() มันเป็น
                  undefined
                </li>
              </ul>
              <p className="mt-2 text-sm italic">
                ฝึกอ่านแบบนี้ทุกครั้ง <strong>ก่อน</strong> paste ให้ AI
              </p>
              <p className="mt-3 text-sm text-slate-600">
                <strong>คืนสภาพ:</strong> ใส่ check กลับ
              </p>
            </>
          }
        />

        <HypothesisBox
          dataCy="break-math-random"
          storageKey={`${SID}:break-2`}
          title="💥 Break 2 — ใส่ Math.random() ใน query"
          setup={
            <>
              <p>
                ใน{" "}
                <code className="rounded bg-rose-100 px-1 font-mono text-xs">
                  convex/questions.ts
                </code>{" "}
                — เพิ่ม query ใหม่:
              </p>
              <pre className="mt-2 rounded bg-rose-100 p-2 text-xs font-mono overflow-x-auto">
{`export const random = query({
  args: {},
  handler: async () => Math.random(),
});`}
              </pre>
              <p className="mt-2">
                Save → ดู terminal ของ{" "}
                <code className="rounded bg-rose-100 px-1 font-mono text-xs">
                  npx convex dev
                </code>
              </p>
              <p className="mt-2">คาดว่า Convex จะยอม deploy, warn, หรือ reject?</p>
            </>
          }
          reveal={
            <>
              <p>
                <strong>Convex จะ throw error ตอน deploy หรือตอนรัน</strong> —
                บอกว่า query ต้อง deterministic
              </p>
              <p className="mt-2 text-sm italic">
                (Behavior อาจต่างกันตาม version — บางทีโผล่ตอนเรียก, บางทีตอน
                deploy)
              </p>
              <p className="mt-3">
                <strong>บทเรียน:</strong>
              </p>
              <ul className="mt-1 list-disc list-inside space-y-1">
                <li>
                  Convex ไม่เพียงแนะนำ — มัน <strong>บังคับ</strong>. คุณ bypass
                  ไม่ได้แม้พยายาม
                </li>
                <li>เพราะถ้าปล่อย → real-time + cache เพี้ยนทั้งหมด</li>
                <li>
                  ถ้าต้องการ random ในผลลัพธ์ — generate ใน <strong>mutation</strong>{" "}
                  (Session 4) แล้วเก็บลง DB แทน
                </li>
              </ul>
              <p className="mt-3 text-sm text-slate-600">
                <strong>คืนสภาพ:</strong> ลบ query{" "}
                <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                  random
                </code>{" "}
                ทิ้ง
              </p>
            </>
          }
        />

        <HypothesisBox
          dataCy="break-offline"
          storageKey={`${SID}:break-3`}
          title="💥 Break 3 — ปิดเน็ตกลางทาง"
          setup={
            <>
              <ol className="list-decimal list-inside space-y-1">
                <li>
                  เปิด{" "}
                  <code className="rounded bg-rose-100 px-1 font-mono text-xs">
                    /questions
                  </code>{" "}
                  รอจน list ขึ้น
                </li>
                <li>ปิด Wi-Fi (หรือ DevTools → Network → Offline)</li>
                <li>
                  ลอง insert document ใหม่ผ่าน Dashboard — มันจะ fail (offline)
                </li>
                <li>เปิด Wi-Fi กลับ</li>
                <li>
                  ดู{" "}
                  <code className="rounded bg-rose-100 px-1 font-mono text-xs">
                    /questions
                  </code>{" "}
                  — list update เองไหม?
                </li>
              </ol>
              <p className="mt-2">
                คาดว่า — ต้อง refresh เอง หรือ list มาเอง?
              </p>
            </>
          }
          reveal={
            <>
              <p>
                <strong>list update เอง</strong> — ไม่ต้อง refresh
              </p>
              <p className="mt-2">
                Convex client มี logic reconnect ในตัว — ตอนกลับ online →
                re-subscribe → ดึงค่าใหม่
              </p>
              <p className="mt-3">
                <strong>บทเรียน:</strong>
              </p>
              <ul className="mt-1 list-disc list-inside space-y-1">
                <li>
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    useQuery
                  </code>{" "}
                  ≠{" "}
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    fetch
                  </code>{" "}
                  — มันคือ subscription ที่ดูแล connection ให้
                </li>
                <li>ฝั่งเราไม่ต้องเขียน retry/reconnect เอง</li>
                <li>
                  <strong>แต่ระวัง:</strong> ตอน offline component ยังเห็น
                  &lsquo;value เดิมที่ cache ไว้&rsquo; — ผู้ใช้ไม่รู้ว่า data
                  อาจ stale
                </li>
                <li>Session 15 จะคุยเรื่องบอก user ว่า &lsquo;กำลัง reconnect&rsquo; ยังไง</li>
              </ul>
            </>
          }
        />
      </Section>

      {/* ───── Section 8: Reflect ───── */}
      <Section number={8} title="🪞 Reflect">
        <PersistentReflection
          dataCy="reflect-s3"
          storageKey={`${SID}:reflect`}
          intro="ตอบสั้นๆ ที่คุณคิด — จะ save บน device คุณอัตโนมัติ (ไม่ส่งไปไหน)"
          questions={[
            {
              id: "r1",
              prompt: (
                <>
                  <strong>ก่อน</strong> session นี้ ฉันคิดว่า
                  &ldquo;อ่านข้อมูลจาก backend&rdquo; คือ ...
                  <br />
                  <strong>ตอนนี้</strong> ฉันอธิบายได้ว่า ...
                </>
              ),
              placeholder: "2-3 ประโยค",
            },
            {
              id: "r2",
              prompt: (
                <>
                  ถ้าเพื่อนถามว่า &ldquo;ทำไม{" "}
                  <code className="rounded bg-amber-100 px-1 font-mono text-xs">
                    undefined
                  </code>{" "}
                  กับ{" "}
                  <code className="rounded bg-amber-100 px-1 font-mono text-xs">
                    []
                  </code>{" "}
                  ต่างกัน?&rdquo; ฉันจะตอบใน 1 ประโยคว่า ...
                </>
              ),
            },
            {
              id: "r3",
              prompt: (
                <>
                  ใน Break 1 (ลบ loading check) — error message ที่เจอคือ ...
                  <br />
                  ฉันอ่านมันแล้ว identify root cause ได้จากคำว่า ...
                </>
              ),
            },
            {
              id: "r4",
              prompt: (
                <>
                  ทำไม Convex ห้าม{" "}
                  <code className="rounded bg-amber-100 px-1 font-mono text-xs">
                    Math.random
                  </code>{" "}
                  ใน query? อธิบายเป็นภาษาคน
                  <span className="block mt-1 text-xs italic text-slate-500">
                    (ห้ามใช้คำว่า &ldquo;deterministic&rdquo; /
                    &ldquo;pure&rdquo; — บังคับให้อธิบายแบบเล่าให้คนทั่วไปฟัง)
                  </span>
                </>
              ),
            },
            {
              id: "r5",
              prompt:
                "ส่วนที่ยังไม่ชัดที่สุดของฉันคือ ... (จะเป็นจุดเริ่ม session ต่อไป)",
            },
          ]}
        />

        <ConfidenceSlider
          dataCy="confidence-s3"
          storageKey={`${SID}:confidence`}
          prompt="หลังหน้านี้ — ฉันมั่นใจแค่ไหนว่า 'query + useQuery + 3 states' ทำงานยังไง?"
          low="ยังไม่ค่อยเข้าใจ"
          mid="พอเข้าใจ แต่เขียนเองยังไม่คล่อง"
          high="อธิบายเพื่อน + เขียน query ใหม่ได้แน่นอน"
          note="ถ้า ≤ 5 → กลับไปอ่าน Section 4 (3 states) อีกครั้ง"
        />
      </Section>

      {/* Looking ahead */}
      <section className="mt-12 rounded-lg border border-slate-200 bg-slate-50 p-5">
        <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-700">
          <span aria-hidden>🔭</span>
          <span>Looking ahead → Session 4</span>
        </h2>
        <p className="mt-2 text-slate-700 leading-relaxed">
          หน้าต่อไปจะตอบคำถาม:
        </p>
        <ul className="mt-2 list-disc list-inside text-slate-700 space-y-1">
          <li>ตอนนี้ฉันอ่าน data ได้แล้ว — แต่จะ <strong>เขียน</strong> ลง database ยังไง?</li>
          <li>ถ้า client ส่ง data ผิด format มา — ใครจับ?</li>
          <li>Mutation ต่างกับ query ยังไง — ทำไม Convex ต้องแยก?</li>
        </ul>
        <p className="mt-3 text-slate-700">
          → คำตอบคือ <strong>Mutation + Validation</strong> —
          เริ่มเข้าใจว่าทำไม Convex บังคับให้มี validator ที่ boundary
        </p>
      </section>

      <SessionNav
        dataCy="session-nav"
        prev={{
          href: "/week-1/session-2",
          label: "Session 2 — Schema: ทำไมต้องสัญญาก่อนเขียน",
        }}
        next={{
          href: "/week-1/session-4",
          label: "Session 4 — Mutation: เขียนข้อมูล + Validation",
        }}
      />
    </article>
  );
}

function Section({
  number,
  title,
  id,
  children,
}: {
  number: number;
  title: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12" id={id}>
      <h2 className="flex items-baseline gap-3 text-2xl font-bold text-slate-900">
        <span className="text-sm font-mono text-slate-400">
          {String(number).padStart(2, "0")}
        </span>
        <span dangerouslySetInnerHTML={{ __html: title }} />
      </h2>
      <div className="mt-4 text-slate-800 leading-relaxed space-y-3">
        {children}
      </div>
    </section>
  );
}
