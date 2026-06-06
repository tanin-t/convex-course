import type { Metadata } from "next";
import { CheckboxList } from "@/components/CheckboxList";
import { ClickableDiagram } from "@/components/ClickableDiagram";
import { ConfidenceSlider } from "@/components/ConfidenceSlider";
import { DragToBucket } from "@/components/DragToBucket";
import { HypothesisBox } from "@/components/HypothesisBox";
import { Jargon } from "@/components/Jargon";
import { MultipleChoice } from "@/components/MultipleChoice";
import { PersistentReflection } from "@/components/PersistentReflection";
import { PredictThenReveal } from "@/components/PredictThenReveal";
import { SessionNav } from "@/components/SessionNav";
import { StepReveal } from "@/components/StepReveal";
import { ToggleCompare } from "@/components/ToggleCompare";

export const metadata: Metadata = {
  title: "Session 1 — ไม่ใช่แค่ Setup: เริ่มเข้าใจ Backend | Convex Course",
};

const SID = "s1";

export default function Session1Page() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      {/* Header */}
      <header>
        <div className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
          Week 1 · Session 1
        </div>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          ไม่ใช่แค่ Setup: เริ่มเข้าใจ &ldquo;Backend&rdquo;
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
            อธิบาย &ldquo;backend&rdquo; เป็นภาษาตัวเองได้ (ไม่ต้องท่องคำว่า{" "}
            <Jargon term="BaaS">
              <strong>BaaS</strong> = Backend-as-a-Service
              บริการที่จัดการ backend ให้คุณ ไม่ต้องตั้ง server เอง
            </Jargon>
            )
          </li>
          <li>รู้ว่า Convex คืออะไร แก้ปัญหาอะไร</li>
          <li>มี Convex project รันได้บนเครื่อง + เปิด Dashboard ได้</li>
          <li>
            เริ่มฝึกนิสัย <strong>&ldquo;คาดก่อนรัน&rdquo;</strong>{" "}
            ที่จะใช้ตลอดคอร์ส
          </li>
        </ul>
      </section>

      {/* ───── Section 1: Hook ───── */}
      <Section number={1} title="ข้อมูลของคุณหายไปไหน?">
        <p>
          จำเว็บที่เคยทำได้ไหม? มี form ให้กรอกชื่อ — refresh ปุ๊บข้อมูลหาย
        </p>
        <p className="mt-2">
          คำถามคือ —{" "}
          <strong>
            ถ้าคุณอยากให้ข้อมูลของคนกรอกยังอยู่หลัง refresh
            มันต้องอยู่ที่ไหน?
          </strong>
        </p>
        <p className="mt-2 text-sm text-slate-600 italic">
          หยุดก่อน. ลองคิด 30 วินาที. อย่าพึ่ง scroll ลง.
        </p>

        <PredictThenReveal
          dataCy="predict-data-storage"
          storageKey={`${SID}:hook`}
          question="ข้อมูลของผู้ใช้ที่คุณอยากให้อยู่ตลอด — ต้องเก็บที่ไหน?"
          hint="ลองนึกถึงเว็บที่คุณใช้ทุกวัน (Facebook, Twitter, ...) — ข้อมูลคุณอยู่บนเครื่องคุณคนเดียวเหรอ?"
          reveal={
            <>
              <p>
                คำตอบสั้น:{" "}
                <strong>
                  อยู่ที่ &ldquo;เครื่องอื่น&rdquo; ที่ทุกคนเข้าถึงได้กลาง
                </strong>
              </p>
              <ul className="mt-2 list-disc list-inside space-y-1">
                <li>
                  เครื่องนั้นเรียกว่า <strong>server</strong>
                </li>
                <li>
                  ที่เก็บข้อมูลในเครื่องนั้นเรียกว่า{" "}
                  <strong>database</strong>
                </li>
                <li>
                  ตัวกลางที่จัดการระหว่าง browser ของคุณกับ database เรียกว่า{" "}
                  <strong>backend</strong>
                </li>
              </ul>
              <p className="mt-2">
                คอร์สนี้จะสอนคุณสร้าง &ldquo;ตัวกลาง&rdquo; นั้นด้วย Convex
              </p>
            </>
          }
          note="คำตอบของคุณไม่ต้องตรงเฉลย — แค่ได้คิดก่อนเห็นคือเป้าหมาย"
        />
      </Section>

      {/* ───── Section 2: Mental model ───── */}
      <Section number={2} title="&quot;ตัวกลาง&quot; คืออะไร">
        <p>
          ลองดูภาพนี้ — browser ของผู้ใช้หลายคน คุยกับ database ผ่าน{" "}
          <em>???</em> อันเดียวกัน. <em>???</em> มีหน้าที่อะไร?
        </p>

        <ClickableDiagram
          dataCy="diagram-middleman"
          nodes={[
            {
              id: "alice",
              label: "Browser ของ Alice",
              col: 0,
              row: 0,
              tooltip:
                "เว็บที่ผู้ใช้ Alice เปิดอยู่ — เห็นและคลิกได้ที่นี่ ข้อมูลที่ Alice เห็นถูกส่งมาจาก backend",
            },
            {
              id: "bob",
              label: "Browser ของ Bob",
              col: 0,
              row: 1,
              tooltip:
                "อีกผู้ใช้คนละเครื่อง — คุยกับตัวกลางเดียวกัน เห็นข้อมูลชุดเดียวกันที่ Alice เห็น (ถ้าเป็นข้อมูล public)",
            },
            {
              id: "backend",
              label: "??? (Backend)",
              col: 1,
              row: 0,
              tooltip: (
                <>
                  ตัวกลางที่ทำงานบน server หน้าที่:
                  <ul className="mt-1 list-disc list-inside">
                    <li>รับ request จาก browser</li>
                    <li>ตรวจว่า request ถูกไหม / ใครส่งมา</li>
                    <li>อ่าน/เขียน database</li>
                    <li>ส่งคำตอบกลับ</li>
                  </ul>
                  <p className="mt-2">
                    Browser ไม่แตะ database ตรงๆ —{" "}
                    <strong>ต้องผ่านตัวกลางเสมอ</strong>
                  </p>
                </>
              ),
            },
            {
              id: "db",
              label: "Database",
              col: 2,
              row: 0,
              tooltip:
                "ที่เก็บข้อมูลจริง — รอด refresh, รอด ปิดเบราว์เซอร์, รอด restart Browser ไม่เข้ามาที่นี่โดยตรง — ผ่าน backend เสมอ",
            },
          ]}
          edges={[
            { from: "Alice", to: "Backend" },
            { from: "Bob", to: "Backend" },
            { from: "Backend", to: "Database", label: "อ่าน/เขียน" },
          ]}
        />

        <h3 className="mt-6 font-semibold text-slate-900">
          คิดเหมือนร้านอาหาร 🍜
        </h3>
        <ul className="mt-2 space-y-1 list-disc list-inside text-slate-800">
          <li>
            <strong>ลูกค้า (browser)</strong> — สั่งของ ไม่ได้เดินเข้าครัวเอง
          </li>
          <li>
            <strong>พนักงาน (backend)</strong> — รับ order ตรวจว่าสั่งถูกไหม
            ส่งให้ครัว เอามาเสิร์ฟ
          </li>
          <li>
            <strong>ครัว (database)</strong> — เก็บของจริง
          </li>
        </ul>

        <MultipleChoice
          dataCy="mc-why-no-direct-db"
          storageKey={`${SID}:mc-direct-db`}
          question="ทำไมเราไม่ให้ browser คุยกับ database ตรงๆ?"
          options={[
            {
              id: "A",
              label: "เพราะ database ช้าเกินไป",
              correct: false,
              explanation:
                "ไม่ใช่ — database เร็วพอ ปัญหาไม่ใช่ความเร็ว",
            },
            {
              id: "B",
              label:
                "เพราะถ้าใครก็ได้เข้า database ตรง = ลบ/ขโมยข้อมูลคนอื่นได้",
              correct: true,
              explanation:
                "ใช่ — backend คือ 'ด่าน' ที่ตรวจว่าใครได้ทำอะไรได้บ้าง คอร์สนี้ Week 3 จะเรียนเรื่องนี้",
            },
            {
              id: "C",
              label: "เพราะ database ใช้ภาษาที่ browser ไม่รู้จัก",
              correct: false,
              explanation:
                "ส่วนหนึ่งจริง — แต่ไม่ใช่เหตุผลหลัก เหตุผลหลักคือ security + control",
            },
            {
              id: "D",
              label: "ไม่รู้ — ขอเลือกอันนี้ก่อน",
              correct: false,
              explanation:
                "ไม่เป็นไร — เลื่อนกลับไปอ่าน analogy ร้านอาหารแล้วลองเดาอีกครั้ง",
            },
          ]}
        />
      </Section>

      {/* ───── Section 3: Data placement ───── */}
      <Section number={3} title="ข้อมูลแต่ละแบบ — ควรเก็บที่ไหน?">
        <p>
          ก่อนเราพูดถึง Convex —{" "}
          มาดูก่อนว่าข้อมูลแต่ละแบบ ควรเก็บที่ไหนกันแน่{" "}
          เลือกข้อมูลแล้วคลิกกล่องที่คิดว่าใช่
        </p>

        <DragToBucket
          dataCy="bucket-data-placement"
          storageKey={`${SID}:bucket`}
          buckets={[
            {
              id: "browser-memory",
              label: "Browser memory (useState)",
              description: "หายเมื่อ refresh",
            },
            {
              id: "localstorage",
              label: "Browser localStorage",
              description:
                "อยู่บน device คนนั้น — refresh ไม่หาย แต่ device อื่นไม่เห็น",
            },
            {
              id: "database",
              label: "Database (ผ่าน backend)",
              description: "ทุก device ของทุก user เห็นเหมือนกัน",
            },
          ]}
          items={[
            {
              id: "input-typing",
              text: "ค่า input ที่ user กำลังพิมพ์ (ยังไม่ submit)",
              correctBucket: "browser-memory",
              why: "ไม่จำเป็นต้องอยู่นาน — submit แล้วค่อยส่ง",
            },
            {
              id: "theme",
              text: "Theme dark/light ที่ user เลือก",
              correctBucket: "localstorage",
              why: "เป็น preference ของ device นั้น — ไม่ต้อง sync ทุก user",
              note: "ถ้าอยาก sync ทุก device ของ user คนเดียวกัน — ใส่ database ก็ได้",
            },
            {
              id: "post",
              text: "Post ที่ user เขียนใน social network",
              correctBucket: "database",
              why: "ทุกคนต้องเห็นได้ — refresh ไม่หาย เปิด device อื่นก็เห็น",
            },
            {
              id: "score",
              text: "Score ของผู้ใช้ในเกม (สำหรับ leaderboard)",
              correctBucket: "database",
              why: "Leaderboard ต้องเห็นกันได้ทุกคน",
            },
            {
              id: "scroll",
              text: "Scroll position ตอนนี้ของ user",
              correctBucket: "browser-memory",
              why: "ไม่มีใครต้องรู้ — refresh แล้วเริ่มใหม่ก็ได้",
            },
          ]}
        />

        <p className="mt-4">
          สังเกตไหม? ข้อมูลที่อยากให้ <strong>คนอื่นเห็น</strong> หรือ{" "}
          <strong>device อื่นเห็น</strong> ต้องอยู่ใน database
          และทุกครั้งที่ database — ต้องผ่าน backend
        </p>
        <p className="mt-2 font-semibold text-slate-900">
          คอร์สนี้คือเรื่องนั้น
        </p>
      </Section>

      {/* ───── Section 4: Traditional pain ───── */}
      <Section number={4} title="ปัญหาของ backend แบบเดิม">
        <p>
          ก่อน Convex จะเกิด คนทำ backend ยังไง? ลองเปิดทีละข้อ
        </p>

        <StepReveal
          dataCy="step-traditional-backend-pain"
          storageKey={`${SID}:traditional-pain`}
          intro="สิ่งที่ developer ต้องตั้งเอง ถ้าทำ backend แบบดั้งเดิม:"
          steps={[
            {
              title: "1. หา server (เครื่อง) — ต้องเช่า",
              body: "AWS, Google Cloud, ... — เลือก spec จ่ายต่อชั่วโมง ดูแลให้ทำงาน 24/7",
            },
            {
              title: "2. ตั้ง database",
              body: "ติดตั้ง PostgreSQL/MongoDB เอง — กำหนด user/password, backup, scale ตอน data โต",
            },
            {
              title: "3. เขียน server เอง",
              body: "Express, Django, Rails — handle request, route, parse JSON, ...",
            },
            {
              title: "4. ทำ authentication",
              body: "Hash password, จัดการ session token, reset password ... — security เผลอผิดง่ายมาก",
            },
            {
              title: "5. Deploy",
              body: "Build, push image, configure environment variable, set up CI/CD, monitor logs",
            },
            {
              title: "6. Scale ตอนคนเยอะ",
              body: "Load balancer, replica, caching, database sharding ...",
            },
          ]}
          revealButtonLabel="เปิดข้อต่อไป"
          closing={
            <>
              นี่คือทำไม backend ขึ้นชื่อว่ายาก —
              ก่อนได้เริ่มเขียน feature จริงๆ ต้องผ่าน 6 ขั้นข้างบนก่อน{" "}
              <strong>สำหรับ beginner — แทบเป็นไปไม่ได้</strong>
            </>
          }
        />
      </Section>

      {/* ───── Section 5: Convex ───── */}
      <Section number={5} title="Convex คืออะไร">
        <p>
          Convex บอกว่า: &ldquo;6 ข้อข้างบน เราทำให้ —
          คุณแค่เขียน function&rdquo;
        </p>

        <ToggleCompare
          dataCy="compare-traditional-vs-convex"
          left={{
            id: "traditional",
            label: "Backend แบบเดิม",
            title: "สิ่งที่คุณต้องทำเอง",
            content: (
              <ul className="space-y-1 list-disc list-inside">
                <li>เช่า server</li>
                <li>ตั้ง database</li>
                <li>เขียน server (Express, ...)</li>
                <li>ทำ auth (hash password เอง)</li>
                <li>Deploy + CI/CD</li>
                <li>Scale + monitor</li>
                <li>...แล้วค่อยเขียน feature</li>
              </ul>
            ),
          }}
          right={{
            id: "convex",
            label: "Convex",
            title: "สิ่งที่คุณต้องทำ",
            content: (
              <ul className="space-y-1 list-disc list-inside">
                <li>เขียน function</li>
                <li className="text-slate-500 italic">
                  (Convex จัดการที่เหลือให้)
                </li>
              </ul>
            ),
          }}
          caption="นี่คือ promise ของ Convex — ตลอดคอร์สนี้คุณจะเห็นว่ามันจริงแค่ไหน + มี trade-off อะไรบ้าง"
        />

        <p className="mt-6">Convex มีของพร้อมใช้ — เปิดดูทีละอัน:</p>

        <StepReveal
          dataCy="step-convex-builtins"
          storageKey={`${SID}:convex-builtins`}
          intro="Convex built-in:"
          steps={[
            {
              title: "🗄 Database",
              body: "เก็บข้อมูล ไม่ต้องตั้ง PostgreSQL/Mongo เอง — Session 2-3 จะเริ่มใช้",
            },
            {
              title: "⚡ Real-time",
              body: "ข้อมูลเปลี่ยน → ทุก browser ที่ดูอยู่อัปเดตทันที (Session 10)",
            },
            {
              title: "🔐 Auth",
              body: "Login / register / session — ไม่ต้องเขียนเอง (Session 7-9)",
            },
            {
              title: "📁 File storage",
              body: "Upload รูป/ไฟล์ — มี CDN ในตัว (Session 13)",
            },
            {
              title: "🚀 Deploy",
              body: "npx convex deploy — เสร็จ (Session 18)",
            },
          ]}
        />

        <MultipleChoice
          dataCy="mc-convex-not-free"
          storageKey={`${SID}:mc-convex-not-free`}
          question="ข้อใดต่อไปนี้ ไม่ใช่ สิ่งที่ Convex จัดการให้ฟรี?"
          options={[
            {
              id: "A",
              label: "ตั้ง database ขึ้นมาเอง",
              correct: false,
              explanation: "Convex จัดการ database ให้ — ฟรี",
            },
            {
              id: "B",
              label:
                "เขียน business logic ของแอป (เช่น 'ตอบถูก = +10 คะแนน')",
              correct: true,
              explanation:
                "ใช่ — นี่คือสิ่งที่ คุณ ต้องเขียน Convex รัน function ให้ แต่ logic เป็นของคุณ — นั่นคือเหตุผลที่ Convex ไม่ใช่ 'no-code'",
            },
            {
              id: "C",
              label: "Auth (login/register)",
              correct: false,
              explanation: "Convex มี Convex Auth — ฟรี",
            },
            {
              id: "D",
              label: "Real-time update",
              correct: false,
              explanation: "Convex มี built-in — ฟรี",
            },
          ]}
        />
      </Section>

      {/* ───── Section 6: Setup ───── */}
      <Section number={6} title="เห็นของจริง: Setup Convex">
        <p>
          พอเรารู้จัก Convex แล้ว — ตอนนี้มาทำให้รันบนเครื่องคุณจริงๆ
        </p>
        <p className="mt-2 text-sm text-slate-600 italic">
          เป้า: หลังส่วนนี้จบ — คุณจะมี Convex project + Dashboard เปิดได้
        </p>

        <CheckboxList
          dataCy="checklist-prereq"
          storageKey={`${SID}:prereq`}
          title="ก่อนเริ่ม ตรวจของในเครื่อง"
          items={[
            {
              id: "node",
              label: (
                <>
                  Node.js ≥ 18 (รัน{" "}
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm">
                    node --version
                  </code>{" "}
                  ใน terminal)
                </>
              ),
              hint: "ถ้ายังไม่มี → ติดตั้งจาก nodejs.org",
            },
            {
              id: "npm",
              label: (
                <>
                  npm ≥ 9 (รัน{" "}
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm">
                    npm --version
                  </code>
                  )
                </>
              ),
            },
            {
              id: "cursor",
              label: "Cursor IDE เปิดอยู่",
              hint: "ถ้ายังไม่มี → cursor.com",
            },
            {
              id: "github",
              label: "GitHub account (สำหรับ login Convex)",
            },
          ]}
        />

        <h3 className="mt-6 font-semibold text-slate-900">
          ลำดับขั้น — ทำตามทีละข้อ
        </h3>

        <CheckboxList
          dataCy="checklist-setup"
          storageKey={`${SID}:setup`}
          title="Setup checklist"
          note="กดรายละเอียดเพื่อดู option ที่ควรเลือก — ขีด ✓ เมื่อทำเสร็จ"
          items={[
            {
              id: "create-next",
              label: (
                <>
                  สร้าง Next.js project ใหม่ —{" "}
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm">
                    npx create-next-app@latest quiz-app
                  </code>
                </>
              ),
              detail: (
                <>
                  เลือก options:{" "}
                  <strong>TypeScript ✅, ESLint ✅, Tailwind ✅, App Router ✅</strong>
                  <br />
                  เมื่อเสร็จ:{" "}
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs">
                    cd quiz-app
                  </code>
                </>
              ),
            },
            {
              id: "install-convex",
              label: (
                <>
                  ติดตั้ง Convex —{" "}
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm">
                    npm install convex
                  </code>
                </>
              ),
            },
            {
              id: "convex-dev",
              label: (
                <>
                  รัน{" "}
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm">
                    npx convex dev
                  </code>
                </>
              ),
              detail: (
                <>
                  ครั้งแรก: Convex จะถาม login → เลือก GitHub
                  <br />
                  จากนั้นถามชื่อ project → ตั้งชื่อ &ldquo;quiz-app&rdquo;
                  <br />
                  Convex จะสร้าง deployment ใหม่
                  <br />
                  <strong>terminal นี้รันค้างไว้!</strong> (อย่าปิด —
                  มัน sync code ของคุณกับ Convex Cloud)
                </>
              ),
            },
            {
              id: "dashboard",
              label: "เปิด Convex Dashboard (terminal จะมี URL ให้)",
              detail: (
                <>
                  ดู tab <strong>Data</strong> (ตอนนี้ว่าง) และ{" "}
                  <strong>Functions</strong> (ตอนนี้ว่าง)
                  <br />
                  นี่คือหน้าต่างไปดู Cloud ของคุณ
                </>
              ),
            },
            {
              id: "env",
              label: (
                <>
                  ตรวจ{" "}
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm">
                    .env.local
                  </code>{" "}
                  มี{" "}
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm">
                    NEXT_PUBLIC_CONVEX_URL=...
                  </code>
                </>
              ),
              hint: "ถ้าไม่มี — npx convex dev ครั้งแรกจะสร้างให้อัตโนมัติ",
            },
            {
              id: "provider",
              label: (
                <>
                  Wrap Next.js app ด้วย{" "}
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm">
                    ConvexProvider
                  </code>{" "}
                  ใน{" "}
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm">
                    app/layout.tsx
                  </code>
                </>
              ),
              detail: (
                <>
                  ตาม docs ของ Convex:{" "}
                  <a
                    href="https://docs.convex.dev/quickstart/nextjs"
                    className="text-emerald-700 underline"
                    target="_blank"
                    rel="noopener"
                  >
                    docs.convex.dev/quickstart/nextjs
                  </a>
                  <br />
                  ส่วนสำคัญ: import{" "}
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    ConvexProvider
                  </code>{" "}
                  +{" "}
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    ConvexReactClient
                  </code>
                  , สร้าง client จาก{" "}
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    NEXT_PUBLIC_CONVEX_URL
                  </code>
                  , wrap children
                </>
              ),
            },
            {
              id: "next-dev",
              label: (
                <>
                  เปิดอีก terminal → รัน{" "}
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm">
                    npm run dev
                  </code>
                </>
              ),
              detail: (
                <>
                  จะมี 2 terminal รันพร้อมกัน:
                  <ul className="mt-1 list-disc list-inside">
                    <li>
                      <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                        npx convex dev
                      </code>{" "}
                      (sync convex/)
                    </li>
                    <li>
                      <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                        npm run dev
                      </code>{" "}
                      (Next.js)
                    </li>
                  </ul>
                  เปิด{" "}
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    http://localhost:3000
                  </code>{" "}
                  → ควรเห็นหน้า Next.js default
                </>
              ),
            },
          ]}
        />

        <PredictThenReveal
          dataCy="predict-dashboard"
          storageKey={`${SID}:predict-dashboard`}
          question="ก่อนเปิด Dashboard — คุณคาดว่ามีอะไรให้ดูบ้าง?"
          revealButton="เปิด Dashboard เปรียบเทียบ"
          reveal={
            <>
              <p>Dashboard มี tabs หลัก:</p>
              <ul className="mt-2 list-disc list-inside space-y-1">
                <li>
                  <strong>Data</strong> — ดูทุก document ใน database
                  (ตอนนี้ว่างเพราะยังไม่มี data)
                </li>
                <li>
                  <strong>Functions</strong> — list ของ
                  query/mutation/action ที่ deploy แล้ว
                </li>
                <li>
                  <strong>Logs</strong> — log ของทุกครั้งที่ function ถูกเรียก
                </li>
                <li>
                  <strong>Schedules</strong> — task ที่รันตามเวลา (เรียนทีหลัง)
                </li>
                <li>
                  <strong>Settings</strong> — env variables, members, ...
                </li>
              </ul>
              <p className="mt-3">
                เปรียบกับที่คุณเดา — ตรงไหนใกล้, ตรงไหนไม่คิดถึง?
              </p>
            </>
          }
        />
      </Section>

      {/* ───── Section 7: Break it ───── */}
      <Section number={7} title="💥 ทำให้พัง: หา edge ของ mental model">
        <p>
          ตอนนี้คุณมี Convex รันได้แล้ว — มาเล่นให้พังกัน
        </p>
        <p className="mt-2 font-semibold text-rose-900">
          กฎ: ทุก scenario — เขียน hypothesis ก่อนทำ แล้วค่อยลอง
        </p>

        <HypothesisBox
          dataCy="break-close-convex-dev"
          storageKey={`${SID}:break-1`}
          title="💥 Break 1 — ปิด npx convex dev"
          setup={
            <ol className="list-decimal list-inside space-y-1">
              <li>
                ปิด terminal ที่รัน{" "}
                <code className="rounded bg-rose-100 px-1 font-mono text-xs">
                  npx convex dev
                </code>
              </li>
              <li>เปิด Dashboard refresh</li>
              <li>
                ลองแก้ไฟล์ใน{" "}
                <code className="rounded bg-rose-100 px-1 font-mono text-xs">
                  convex/
                </code>{" "}
                แล้ว save
              </li>
            </ol>
          }
          reveal={
            <>
              <p>
                <strong>สิ่งที่เกิด:</strong>
              </p>
              <ul className="mt-1 list-disc list-inside space-y-1">
                <li>
                  Dashboard refresh → <strong>ยังเห็นข้อมูลอยู่</strong>{" "}
                  (เพราะ Dashboard คุยกับ Cloud ตรง ไม่ผ่าน dev server)
                </li>
                <li>
                  แก้ไฟล์ใน convex/ → <strong>ไม่ deploy</strong> ขึ้น Cloud
                  (dev server ไม่ทำงาน)
                </li>
              </ul>
              <p className="mt-3">
                <strong>บทเรียน:</strong>
              </p>
              <ul className="mt-1 list-disc list-inside space-y-1">
                <li>
                  npx convex dev = sync จาก <strong>เครื่องคุณ</strong> → Cloud
                </li>
                <li>Cloud ยังอยู่แม้คุณปิด dev — แต่การแก้ของคุณไม่ไป Cloud</li>
                <li>กลับมารัน npx convex dev อีกครั้ง → ของที่ค้างจะ sync</li>
              </ul>
            </>
          }
        />

        <HypothesisBox
          dataCy="break-double-convex-dev"
          storageKey={`${SID}:break-2`}
          title="💥 Break 2 — รัน npx convex dev 2 ตัวพร้อมกัน"
          setup={
            <>
              เปิด terminal ใหม่ใน project เดียวกัน — รัน{" "}
              <code className="rounded bg-rose-100 px-1 font-mono text-xs">
                npx convex dev
              </code>{" "}
              อีกครั้ง คาดว่า?
            </>
          }
          reveal={
            <>
              <p>
                Convex จะ warn — มันรู้ว่า dev server อีกตัวรันอยู่แล้ว
                (หรือ behavior แปลกๆ ขึ้นกับ version)
              </p>
              <p className="mt-2">
                <strong>บทเรียน:</strong> dev server{" "}
                <strong>ไม่ใช่ stateless command</strong> — มี state รันซ้อนกันไม่ได้
              </p>
            </>
          }
        />

        <HypothesisBox
          dataCy="break-remove-env"
          storageKey={`${SID}:break-3`}
          title="💥 Break 3 — ลบ NEXT_PUBLIC_CONVEX_URL"
          setup={
            <>
              ใน{" "}
              <code className="rounded bg-rose-100 px-1 font-mono text-xs">
                .env.local
              </code>{" "}
              ลบบรรทัด NEXT_PUBLIC_CONVEX_URL → restart npm run dev →
              เปิด localhost:3000 — คาดว่า?
            </>
          }
          reveal={
            <>
              <p>
                <strong>Console error:</strong> &ldquo;Missing
                CONVEX_URL&rdquo; หรือ ConvexProvider พัง
              </p>
              <p className="mt-2">
                <strong>บทเรียน:</strong> Next.js ต้องรู้ว่า Convex ของคุณอยู่ที่
                URL ไหน — ไม่งั้นไม่รู้จะคุยกับใคร
              </p>
              <p className="mt-2">
                คืน env variable เดิม → restart → กลับมาทำงาน
              </p>
              <p className="mt-2 text-sm italic text-slate-600">
                ภายหลัง: Session 12 จะอธิบายว่าทำไม prefix{" "}
                <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                  NEXT_PUBLIC_
                </code>{" "}
                มีความหมายด้าน security
              </p>
            </>
          }
        />
      </Section>

      {/* ───── Section 8: Reflect ───── */}
      <Section number={8} title="🪞 Reflect">
        <PersistentReflection
          dataCy="reflect-s1"
          storageKey={`${SID}:reflect`}
          intro="ตอบสั้น ๆ ที่คุณคิด — จะ save บน device คุณอัตโนมัติ (ไม่ส่งไปไหน)"
          questions={[
            {
              id: "r1",
              prompt: (
                <>
                  <strong>ก่อน</strong> session นี้
                  &ldquo;backend&rdquo; สำหรับฉันคือ ...
                  <br />
                  <strong>ตอนนี้</strong> ฉันอธิบายได้ว่า ...
                </>
              ),
              placeholder: "ลองเขียนสั้นๆ 2-3 ประโยค",
            },
            {
              id: "r2",
              prompt: (
                <>
                  ฉันคาดว่า{" "}
                  <code className="rounded bg-amber-100 px-1 font-mono text-xs">
                    npx convex dev
                  </code>{" "}
                  จะทำ X — แต่จริงๆ มันทำ Y
                </>
              ),
            },
            {
              id: "r3",
              prompt: (
                <>
                  ถ้าต้องอธิบาย Convex ให้เพื่อนที่ไม่ได้อ่านหน้านี้ ใน 1
                  ประโยค ฉันจะพูดว่า ...
                  <span className="block mt-1 text-xs italic text-slate-500">
                    (ห้ามใช้คำว่า &ldquo;BaaS&rdquo;, &ldquo;serverless&rdquo;)
                  </span>
                </>
              ),
            },
            {
              id: "r4",
              prompt:
                "ฉันใช้ AI/Cursor ใน session นี้ยังไง? มันพา ฉัน คิด หรือ ทำ ให้ ฉัน?",
            },
            {
              id: "r5",
              prompt:
                "ส่วนที่ฉันยังไม่ชัดที่สุดคือ ... (จะกลายเป็นจุดเริ่ม session ต่อไป)",
            },
          ]}
        />

        <ConfidenceSlider
          dataCy="confidence-s1"
          storageKey={`${SID}:confidence`}
          prompt="หลังหน้านี้ — ฉันมั่นใจแค่ไหนว่า 'backend' คืออะไร?"
          low="ยังเบลออยู่"
          mid="พอเข้าใจ แต่อธิบายยังไม่คล่อง"
          high="อธิบายให้เพื่อนเข้าใจได้แน่นอน"
          note="ไม่มีคำตอบที่ 'ถูก' — แค่ดูตัวเอง"
        />
      </Section>

      {/* Looking ahead */}
      <section className="mt-12 rounded-lg border border-slate-200 bg-slate-50 p-5">
        <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-700">
          <span aria-hidden>🔭</span>
          <span>Looking ahead → Session 2</span>
        </h2>
        <p className="mt-2 text-slate-700 leading-relaxed">
          หน้าต่อไปจะตอบคำถาม:
        </p>
        <ul className="mt-2 list-disc list-inside text-slate-700 space-y-1">
          <li>Convex รู้ได้ยังไงว่า data ของฉันมี structure แบบไหน?</li>
          <li>ทำไมต้อง define อะไรก่อนเขียน?</li>
          <li>ถ้าฉันส่ง data ผิด format — Convex ทำยังไง?</li>
        </ul>
        <p className="mt-3 text-slate-700">
          → คำตอบคือ <strong>Schema</strong> — เครื่องมือสำคัญที่ทำให้ Convex
          ไม่ใช่แค่ &ldquo;MongoDB ปลอม&rdquo;
        </p>
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

function Section({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
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
