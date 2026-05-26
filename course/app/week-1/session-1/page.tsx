import type { Metadata } from "next";
import { BreakIt } from "@/components/BreakIt";
import { CodeExample } from "@/components/CodeExample";
import { ConceptBox } from "@/components/ConceptBox";
import { CursorPrompt } from "@/components/CursorPrompt";
import { Exercise } from "@/components/Exercise";
import { SessionNav } from "@/components/SessionNav";

export const metadata: Metadata = {
  title: "Session 1 — Convex คืออะไร และทำไมต้องใช้ | Convex Course",
};

const backendDiagram = `ที่นักเรียนรู้อยู่แล้ว:
Browser → Next.js → แสดงหน้าเว็บ (static)

สิ่งที่ขาดไป:
Browser → ??? → Database → ข้อมูลจริง
              ↑
          นี่คือ backend`;

const convexDiagram = `Browser → Convex Cloud → Database (built-in)
              ↑
   เราแค่เขียน function — ส่วนที่เหลือ Convex จัดการ`;

const projectTree = `quiz-app/
├── convex/
│   ├── schema.ts       ← นิยามโครงสร้าง database
│   ├── questions.ts    ← functions สำหรับ questions
│   └── _generated/     ← auto-generated (ไม่ต้องแตะ)
└── app/
    └── page.tsx        ← Next.js page ที่เรียกใช้ functions`;

const cursorPrompt = `Setup Convex in an existing Next.js project.
Show me the minimal files I need to create,
and how to wrap the app with ConvexProvider in layout.tsx`;

const goodVsBadPrompt = `❌ Prompt แบบกว้างเกินไป:
"ช่วยทำ Convex ให้หน่อย"

✅ Prompt ที่ดี:
"Setup Convex ใน Next.js project ที่มีอยู่แล้ว
บอกว่าต้องสร้างไฟล์อะไรบ้าง (ขอชื่อไฟล์ชัดๆ)
และใส่ ConvexProvider ใน app/layout.tsx ยังไง"

ความต่าง:
- บอก context (Next.js, มี project อยู่แล้ว)
- บอกว่าอยากได้อะไร (ชื่อไฟล์ที่ต้องสร้าง)
- บอกที่จะวาง (layout.tsx)`;

export default function Session1Page() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <header>
        <div className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
          Week 1 · Session 1
        </div>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          Convex คืออะไร และทำไมต้องใช้
        </h1>
        <p className="mt-3 text-slate-600">
          ระยะเวลา ~1.5 ชั่วโมง · ระดับ ผู้เริ่มต้น
        </p>
      </header>

      {/* 🎯 เป้าหมาย */}
      <section className="mt-10">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <span aria-hidden>🎯</span>
          <span>เป้าหมายของ Session นี้</span>
        </h2>
        <ul className="mt-4 space-y-2 list-disc list-inside text-slate-800 leading-relaxed marker:text-indigo-500">
          <li>เข้าใจว่า backend คืออะไร และ Convex แก้ปัญหาอะไร</li>
          <li>setup Convex project และเชื่อมกับ Next.js ได้</li>
          <li>เปิด Convex Dashboard เห็นของจริง</li>
        </ul>
      </section>

      {/* 💡 แนวคิด */}
      <section className="mt-12">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <span aria-hidden>💡</span>
          <span>แนวคิด</span>
        </h2>

        <ConceptBox dataCy="concept-what-is-backend" title="Backend คืออะไร?">
          <p>
            ตอนนี้นักเรียนสร้าง static website ด้วย Next.js ได้แล้ว
            แต่ทุกอย่างยัง <strong>hard-code อยู่ในโค้ด</strong>{" "}
            ถ้าอยากเก็บข้อมูลของผู้ใช้จริงๆ (เช่น คะแนน, คำตอบ, ผู้เล่นที่ login)
            — ต้องมี <em>&quot;ตัวกลาง&quot;</em> ระหว่าง browser กับ database
          </p>
          <CodeExample
            dataCy="code-example-backend-diagram"
            language="text"
            code={backendDiagram}
          />
          <p>
            ตัวกลางนี้ก็คือ <strong>backend</strong> นั่นเอง —
            มันรับ request จาก browser, คุยกับ database, แล้วส่งข้อมูลกลับมา
          </p>
        </ConceptBox>

        <ConceptBox
          dataCy="concept-traditional-backend-problems"
          title="ปัญหาของ backend แบบเดิม"
        >
          <ul className="list-disc list-inside space-y-1">
            <li>ต้องตั้ง server เอง (Express, Django, ฯลฯ)</li>
            <li>ต้องจัดการ connection pool, scaling, security เอง</li>
            <li>ต้อง setup database เพิ่ม, จัดการ migration เอง</li>
            <li>
              ต้องเรียน auth, file storage, real-time
              ทีละเรื่องแยกกัน ใช้เวลานานมาก
            </li>
          </ul>
          <p className="text-slate-700">
            สำหรับผู้เริ่มต้น — ขั้นตอนพวกนี้กินเวลา{" "}
            <strong>หลายสัปดาห์</strong> ก่อนจะได้เขียน feature จริง
          </p>
        </ConceptBox>

        <ConceptBox
          dataCy="concept-how-convex-solves-it"
          title="Convex แก้ปัญหานี้ยังไง"
        >
          <CodeExample
            dataCy="code-example-convex-diagram"
            language="text"
            code={convexDiagram}
          />
          <p>
            <strong>Convex = Backend-as-a-Service</strong>{" "}
            — เป็น cloud service ที่รวมทุกอย่างที่ backend ต้องการมาให้แล้ว:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Database</strong> — built-in, ไม่ต้องตั้ง PostgreSQL/MySQL เอง
            </li>
            <li>
              <strong>Real-time</strong> — built-in,
              ข้อมูลเปลี่ยน UI update เองทันที
            </li>
            <li>
              <strong>Auth</strong> — built-in (login/register/session)
            </li>
            <li>
              <strong>File storage</strong> — built-in (upload รูปได้เลย)
            </li>
            <li>
              <strong>Deploy</strong> — built-in (`npx convex deploy`)
            </li>
          </ul>
          <p>เราแค่เขียน function — Convex จัดการที่เหลือทั้งหมด</p>
        </ConceptBox>
      </section>

      {/* 👀 ดูตัวอย่าง */}
      <section className="mt-12">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <span aria-hidden>👀</span>
          <span>ดูตัวอย่าง</span>
        </h2>
        <p className="mt-3 text-slate-700 leading-relaxed">
          เมื่อเรา setup Convex ใน Next.js project แล้ว
          โครงสร้าง folder จะเป็นแบบนี้:
        </p>
        <CodeExample
          dataCy="code-example-project-tree"
          filename="quiz-app/ — โครงสร้างของ Convex project"
          language="text"
          code={projectTree}
        />
        <p className="mt-3 text-slate-700 leading-relaxed">
          สังเกตว่ามี folder <code className="px-1.5 py-0.5 rounded bg-slate-200 font-mono text-sm">convex/</code>{" "}
          เพิ่มเข้ามาในโปรเจกต์ —{" "}
          ทุก file ใน folder นี้คือ <strong>backend function</strong> ที่จะ run บน Convex Cloud
          (ไม่ใช่บน browser และไม่ใช่บน Next.js server)
        </p>
      </section>

      {/* 🤖 Cursor Prompt */}
      <section className="mt-12">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <span aria-hidden>🤖</span>
          <span>ลอง Prompt กับ Cursor</span>
        </h2>
        <p className="mt-3 text-slate-700 leading-relaxed">
          ใน course นี้เราจะใช้ Cursor (AI IDE) ช่วยเขียน code —
          แต่ก่อนจะให้ Cursor ทำให้ ต้องรู้จักวิธี <strong>&quot;คุย&quot;</strong> กับมันก่อน
          ลอง prompt นี้ดู:
        </p>

        <CursorPrompt dataCy="cursor-prompt-setup-convex">
          {cursorPrompt}
        </CursorPrompt>

        <div className="mt-6 rounded-lg border border-slate-200 bg-white p-5">
          <h3 className="font-semibold text-slate-900">
            Prompt ที่ดี vs Prompt ที่กว้างเกินไป
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            Prompt ที่ดีต้องให้{" "}
            <strong>context (โปรเจกต์อะไร), what (อยากได้อะไร), where (วางตรงไหน)</strong>
          </p>
          <CodeExample
            dataCy="code-example-good-vs-bad-prompt"
            language="text"
            code={goodVsBadPrompt}
          />
        </div>
      </section>

      {/* 🧪 ทดลองเอง */}
      <section className="mt-12">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <span aria-hidden>🧪</span>
          <span>ทดลองเอง</span>
        </h2>
        <p className="mt-3 text-slate-700 leading-relaxed">
          ถึงเวลาลงมือทำของจริง — ทำตามขั้นตอนนี้ทีละข้อ
          ถ้าติดตรงไหน ถาม Cursor หรือเพื่อนได้:
        </p>

        <Exercise
          dataCy="exercise-setup-convex-project"
          steps={[
            <>
              สร้าง Next.js project ใหม่ชื่อ <code className="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-sm">quiz-app</code>:
              <CodeExample
                dataCy="code-example-create-next-app"
                language="bash"
                code={`npx create-next-app@latest quiz-app`}
              />
            </>,
            <>
              เข้าไปใน folder แล้วติดตั้ง Convex และรัน dev server:
              <CodeExample
                dataCy="code-example-install-convex"
                language="bash"
                code={`cd quiz-app\nnpm install convex\nnpx convex dev`}
              />
            </>,
            <>
              เปิด <strong>Convex Dashboard</strong> ที่ URL ที่แสดงใน terminal —
              สำรวจดูว่ามีเมนูอะไรบ้าง (Data, Functions, Logs, Settings)
            </>,
            <>
              Deploy function ตัวอย่างที่ Convex ให้มาในโปรเจกต์
              (ดูใน folder <code className="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-sm">convex/</code>)
            </>,
            <>
              เรียก function จาก browser แล้วเปิด DevTools Console —
              ดูผลลัพธ์ที่ return กลับมา
            </>,
          ]}
        />
      </section>

      {/* 💥 ทำให้มันพัง — Session 1 ไม่มี */}
      <section className="mt-12">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <span aria-hidden>💥</span>
          <span>ทำให้มันพัง</span>
        </h2>
        <div className="mt-3 rounded-lg border border-dashed border-slate-300 bg-slate-100 p-5 text-slate-600 leading-relaxed">
          Session นี้ยังอยู่ใน <strong>setup phase</strong> —
          ยังไม่มี intentional error ให้ลอง เริ่ม Session 2
          เป็นต้นไปจะมี section นี้ทุกครั้ง เพื่อให้นักเรียนเรียนรู้จาก error จริง
        </div>
      </section>

      {/* ✅ สรุป */}
      <section className="mt-12">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <span aria-hidden>✅</span>
          <span>สรุป</span>
        </h2>
        <ul className="mt-4 space-y-2 list-disc list-inside text-slate-800 leading-relaxed marker:text-emerald-500">
          <li>
            <strong>Backend</strong> = ตัวกลางระหว่าง browser กับ database
          </li>
          <li>
            <strong>Convex</strong> = Backend-as-a-Service ที่จัดการทุกอย่างให้
            (DB, real-time, auth, storage, deploy)
          </li>
          <li>
            <code className="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-sm">npx convex dev</code>{" "}
            = รัน Convex ใน local development
          </li>
        </ul>

        <div className="mt-6 rounded-lg border border-indigo-200 bg-indigo-50 p-5">
          <h3 className="font-semibold text-indigo-900">คำถามทบทวน</h3>
          <ol className="mt-3 list-decimal list-inside space-y-2 text-slate-800 leading-relaxed">
            <li>ทำไมเราถึงไม่ query database โดยตรงจาก browser?</li>
            <li>Convex Dashboard ใช้ทำอะไรได้บ้าง?</li>
          </ol>
        </div>
      </section>

      <SessionNav
        dataCy="session-nav"
        next={{
          href: "/week-1/session-2",
          label: "Session 2 — Schema: นิยามโครงสร้างข้อมูล",
        }}
      />
    </article>
  );
}
