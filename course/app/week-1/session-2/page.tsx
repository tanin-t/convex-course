import type { Metadata } from "next";
import { CheckboxList } from "@/components/CheckboxList";
import { CodeExample } from "@/components/CodeExample";
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
  title: "Session 2 — Schema: ทำไมการสัญญาก่อนเขียนถึงสำคัญ | Convex Course",
};

const SID = "s2";

const SCHEMA_CODE = `// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  questions: defineTable({
    title: v.string(),
    choices: v.array(v.string()),
    answerIndex: v.number(),
    difficulty: v.union(
      v.literal("easy"),
      v.literal("medium"),
      v.literal("hard"),
    ),
    explanation: v.optional(v.string()),
  }),
});
`;

export default async function Session2Page() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      {/* Header */}
      <header>
        <div className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
          Week 1 · Session 2
        </div>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          Schema: ทำไมการ &ldquo;สัญญา&rdquo; ก่อนเขียนถึงสำคัญ
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
            อธิบายได้ว่า <strong>schema คือ &ldquo;สัญญา&rdquo;</strong>{" "}
            ระหว่างคุณกับ database — ด้วยภาษาตัวเอง
          </li>
          <li>
            รู้ว่า TypeScript ไม่พอ — ต้องมี{" "}
            <Jargon term="runtime validator">
              <strong>Runtime validator</strong> = ตัวตรวจสอบที่ทำงานตอน{" "}
              <em>โปรแกรมรันจริง</em> ไม่ใช่ตอนเขียน code
              ต่างกับ TypeScript ที่ตรวจตอน compile
            </Jargon>{" "}
            ด้วย — และอธิบายได้ว่าทำไม
          </li>
          <li>
            เขียน schema สำหรับ table{" "}
            <code className="rounded bg-indigo-100 px-1.5 py-0.5 font-mono text-sm">
              questions
            </code>{" "}
            ได้ พร้อมเลือก type ที่เหมาะกับแต่ละ field
          </li>
          <li>
            เริ่มคิดแบบ <strong>&ldquo;it depends&rdquo;</strong> —
            รู้ว่า schema เคร่ง/หลวม มี trade-off ทั้งคู่
          </li>
          <li>
            เริ่มนิสัย <strong>&ldquo;เปิด docs เป็นที่แรก&rdquo;</strong>{" "}
            ก่อนถาม AI
          </li>
        </ul>
      </section>

      {/* ───── Section 1: Hook ───── */}
      <Section
        number={1}
        title="ถ้าคุณเป็น Convex จะรู้ได้ยังไงว่าข้อมูลถูก?"
      >
        <p>
          สมมุติคุณเป็น <strong>Convex</strong> —
          มีนักพัฒนาทั่วโลกส่งข้อมูลมาเก็บใน database ของคุณวันละหลายพันรายการ
        </p>
        <p className="mt-2">ปัญหาคือ: นักพัฒนาบางคนส่ง</p>
        <ul className="mt-1 list-disc list-inside space-y-1 text-slate-700">
          <li>
            <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs">
              {`{ title: 'Quiz 1', score: 10 }`}
            </code>
          </li>
          <li>
            บางคนส่ง{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs">
              {`{ name: 'Quiz 1', points: '10' }`}
            </code>
          </li>
          <li>
            บางคนส่ง{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs">
              {`{ title: null }`}
            </code>
          </li>
        </ul>
        <p className="mt-3 font-semibold">
          คุณจะรู้ได้ยังไงว่า — อันไหนถูก อันไหนพัง?
        </p>
        <p className="mt-2 text-sm text-slate-600 italic">
          หยุดก่อน. ลองคิด 30 วินาที. อย่าพึ่ง scroll ลง.
        </p>

        <PredictThenReveal
          dataCy="predict-contract"
          storageKey={`${SID}:hook`}
          question="ถ้าคุณเป็นคนเขียน Convex — คุณจะออกแบบให้ database 'รู้' ว่าข้อมูลที่รับเข้ามาถูก format หรือเปล่ายังไง?"
          hint="นึกถึงตอนคุณกรอก form ที่บังคับว่า 'email ต้องมี @' — ใครเป็นคนตรวจ? ตรวจตอนไหน?"
          reveal={
            <>
              <p>
                คำตอบสั้น:{" "}
                <strong>
                  ให้นักพัฒนาบอกล่วงหน้าว่า &ldquo;ข้อมูลของฉันหน้าตาแบบนี้นะ&rdquo;
                </strong>
              </p>
              <p className="mt-2">
                สิ่งนี้เรียกว่า <strong>schema</strong> — เหมือนการ
                &ldquo;ทำสัญญา&rdquo; ก่อนเริ่มเขียนข้อมูล
              </p>
              <p className="mt-3">พอมีสัญญา Convex ก็:</p>
              <ul className="mt-1 list-disc list-inside space-y-1">
                <li>
                  <strong>ปฏิเสธ</strong> ข้อมูลที่ไม่ตรง format (validation)
                </li>
                <li>
                  <strong>บอก IDE ของคุณ</strong> ว่าแต่ละ field type อะไร
                  (TypeScript autocomplete)
                </li>
                <li>
                  <strong>เป็นเอกสาร</strong> ให้เพื่อนในทีม
                  (และอนาคตของคุณเอง) อ่านได้
                </li>
              </ul>
            </>
          }
          note="ไม่ต้อง 'ตอบถูก' — แค่ได้ลองคิดจากมุม Convex ก่อนจะมาเรียนจากมุม developer"
        />
      </Section>

      {/* ───── Section 2: Without schema ───── */}
      <Section number={2} title="ลองโลกที่ไม่มี schema">
        <p>
          ก่อนเราจะเข้าใจคุณค่าของ schema — มาดูปัญหาของ database ที่{" "}
          <strong>ไม่มี</strong> schema เลยกัน
        </p>
        <p className="mt-2">
          ลองนึกภาพ MongoDB แบบ default — เขียนอะไรเข้าไปก็ได้ ไม่มีใครห้าม
          ปีนึงผ่านไป ทีมมีคน 5 คน เขียน data ใส่ table{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm">
            questions
          </code>{" "}
          อย่างนี้:
        </p>

        <DragToBucket
          dataCy="bucket-no-schema-chaos"
          storageKey={`${SID}:chaos`}
          buckets={[
            {
              id: "ok",
              label: "พอใช้ได้",
              description: "ตามสมมุติฐานของ developer ที่เขียน",
            },
            {
              id: "broken",
              label: "พังแน่",
              description: "UI หรือ logic จะอ่านไม่ได้",
            },
          ]}
          items={[
            {
              id: "doc1",
              text: `{ title: "ทุนนิยมคืออะไร", choices: ["A","B","C"], answer: 0 }`,
              correctBucket: "ok",
              why: "format มาตรฐาน — ใช้ได้กับ UI ที่คาด format นี้",
            },
            {
              id: "doc2",
              text: `{ name: "ทุนนิยมคืออะไร", options: ["A","B","C"], correct: "A" }`,
              correctBucket: "broken",
              why: "field name คนละชื่อ — code ที่อ่าน title จะเจอ undefined",
            },
            {
              id: "doc3",
              text: `{ title: "...", choices: "A,B,C", answer: "0" }`,
              correctBucket: "broken",
              why: "type ผิด — choices เป็น string ไม่ใช่ array, answer เป็น string ไม่ใช่ number",
            },
            {
              id: "doc4",
              text: `{ title: null, choices: ["A","B"], answer: 1 }`,
              correctBucket: "broken",
              why: "title เป็น null — UI render คำถามว่างเปล่า",
            },
            {
              id: "doc5",
              text: `{ title: "OK", choices: ["A","B"], answer: 1, rating: 5, tags: ["econ"] }`,
              correctBucket: "ok",
              why: "field เกินมา แต่ไม่ขัด — ปัญหาคือไม่มีใครรู้ว่า rating/tags มาจากไหน อยู่จริงใน document อื่นหรือเปล่า",
            },
          ]}
        />

        <p className="mt-4">สังเกตไหม? โดยที่ไม่มี contract:</p>
        <ul className="mt-1 list-disc list-inside space-y-1 text-slate-700">
          <li>ทุกคนคิดว่าตัวเองเขียน &ldquo;ถูก&rdquo;</li>
          <li>
            แต่จริงๆ <strong>ไม่มีใครรู้</strong> ว่าอะไรคือ &ldquo;ถูก&rdquo;
          </li>
          <li>พอ data หลากหลาย → UI ต้อง if-else ครอบทุก field</li>
          <li>พอ debug → ต้องเปิด document ทีละอันว่าใครเขียนแบบไหน</li>
        </ul>
        <p className="mt-3 font-semibold text-slate-900">
          นี่คือเหตุผลที่ Convex บอกว่า: &ldquo;ก่อนเขียน data เลย —
          บอกฉันก่อนว่า data หน้าตายังไง&rdquo;
        </p>
      </Section>

      {/* ───── Section 3: Mental model ───── */}
      <Section number={3} title="Mental model: Schema = สัญญา (Contract)">
        <p>
          คำเดียวที่ขอให้จำหลังจบ section นี้ —{" "}
          <strong>schema = contract (สัญญา)</strong>
        </p>
        <p className="mt-2">สัญญานี้ทำไว้ระหว่าง:</p>
        <ul className="mt-1 list-disc list-inside space-y-1">
          <li>
            <strong>คุณ</strong> (developer) ที่ส่ง data เข้าไป
          </li>
          <li>
            <strong>Convex</strong> (database) ที่รับเก็บ
          </li>
          <li>
            <strong>อนาคต</strong> (เพื่อน + ตัวคุณเอง 6 เดือนข้างหน้า)
            ที่จะมาอ่าน
          </li>
        </ul>
        <p className="mt-3">พอมีสัญญา → ทั้งสามฝ่ายเข้าใจตรงกัน</p>

        <h3 className="mt-6 font-semibold text-slate-900">
          3 ประโยชน์ของ schema
        </h3>

        <StepReveal
          dataCy="step-schema-benefits"
          storageKey={`${SID}:benefits`}
          intro="Schema ให้อะไรเรา 3 อย่าง:"
          steps={[
            {
              title: "1. 🛡 Validation (runtime)",
              body: (
                <>
                  ตอนที่ data ถูกส่งไป Convex Cloud → Convex ตรวจกับ schema
                  ทันที ถ้าผิด format →{" "}
                  <strong>reject ไม่ให้เขียนลง database</strong>{" "}
                  (เกิดในเครื่อง Convex — ไม่ใช่ในเครื่องคุณ → bypass ไม่ได้)
                </>
              ),
            },
            {
              title: "2. 🧠 Type safety (TypeScript)",
              body: "Schema generate types ให้อัตโนมัติ → IDE รู้ว่าแต่ละ field type อะไร → autocomplete + จับ typo ก่อน save ไฟล์",
            },
            {
              title: "3. 📖 Documentation (เพื่อน + ตัวคุณ)",
              body: "เพื่อนเปิด schema.ts → อ่านเข้าใจทันทีว่า table นี้เก็บอะไร ไม่ต้องเดาจาก code, ไม่ต้องเปิด Dashboard ดู",
            },
          ]}
          closing={
            <>
              สังเกต — ข้อ 1 และ 2 ทำงานคนละเวลา:
              <ul className="mt-2 list-disc list-inside space-y-1">
                <li>
                  <strong>TypeScript</strong> ตรวจตอน{" "}
                  <strong>เขียน code</strong> (compile-time)
                </li>
                <li>
                  <strong>Validator</strong> ตรวจตอน <strong>รัน</strong>{" "}
                  (runtime)
                </li>
              </ul>
              <p className="mt-2">
                ทำไมต้องมีทั้งสอง? เก็บคำถามนี้ไว้ — section ต่อไปจะคุย
              </p>
            </>
          }
        />
      </Section>

      {/* ───── Section 4: TypeScript not enough ───── */}
      <Section number={4} title="TypeScript ทำไมไม่พอ?">
        <p>คำถามที่ developer ส่วนใหญ่เจอครั้งแรก:</p>
        <blockquote className="mt-2 border-l-4 border-slate-300 bg-slate-50 px-4 py-2 italic text-slate-700">
          ฉันเขียน TypeScript อยู่แล้ว — รู้ type ทุก field แล้ว
          ทำไมต้องมี validator อีก?
        </blockquote>
        <p className="mt-2 text-sm text-slate-600 italic">
          ลองคิดดูก่อน 30 วินาที. อย่าพึ่ง scroll
        </p>

        <MultipleChoice
          dataCy="mc-typescript-not-enough"
          storageKey={`${SID}:mc-ts-not-enough`}
          question="ทำไม TypeScript types อย่างเดียว ไม่พอ สำหรับ database?"
          options={[
            {
              id: "A",
              label: "TypeScript ช้าเกินไป",
              correct: false,
              explanation:
                "ไม่ใช่ — TypeScript เร็วมาก. ปัญหาคือเรื่อง 'ตอนไหน' TypeScript ทำงาน ไม่ใช่ 'เร็วแค่ไหน'",
            },
            {
              id: "B",
              label:
                "TypeScript ตรวจตอน compile — พอ deploy ขึ้น server แล้ว type หายไป ไม่มีใครตรวจ runtime",
              correct: true,
              explanation:
                "ใช่ — นี่คือหัวใจ TypeScript = 'เครื่องช่วย developer ตอนพิมพ์ code' พอ compile เป็น JavaScript → type ถูกลบทิ้ง ที่ Convex server — มันรู้แค่ JavaScript ที่รัน ถ้าไม่มี validator runtime → ใครก็ส่ง JSON อะไรมาก็ได้",
            },
            {
              id: "C",
              label: "เพราะ Convex ไม่ support TypeScript",
              correct: false,
              explanation:
                "Convex support TypeScript เต็มที่ — schema คุณเขียนเป็น TypeScript นั่นแหละ ปัญหาไม่ใช่ support",
            },
            {
              id: "D",
              label: "เพราะ database เก็บข้อมูลเป็น binary ไม่ใช่ JSON",
              correct: false,
              explanation:
                "ไม่เกี่ยวกับ storage format — เกี่ยวกับว่า 'มีใครยืน guard ตอน runtime ไหม'",
            },
          ]}
        />

        <h3 className="mt-6 font-semibold text-slate-900">
          คิดเหมือนสนามบิน ✈️
        </h3>
        <ul className="mt-2 list-disc list-inside space-y-1 text-slate-800">
          <li>
            <strong>TypeScript</strong> = แผนที่บอกผู้โดยสารว่าเกตอยู่ไหน{" "}
            (ช่วยคนเดินทาง = developer)
          </li>
          <li>
            <strong>Validator (schema)</strong> ={" "}
            เจ้าหน้าที่ตรวจ passport ที่ประตูเข้าเครื่อง (ช่วย system = database)
          </li>
        </ul>
        <p className="mt-2">
          แผนที่ไม่ได้กั้นใคร — เจ้าหน้าที่ตรวจ passport กั้น
          ถ้าไม่มีเจ้าหน้าที่ — ใครก็ขึ้นเครื่องได้แม้ไม่มี passport
        </p>
      </Section>

      {/* ───── Section 5: See it ───── */}
      <Section
        number={5}
        title="เห็นของจริง: เขียน schema สำหรับ questions"
      >
        <p>
          พอเข้าใจ &ldquo;ทำไม&rdquo; แล้ว — มาเขียน schema จริงกัน
        </p>
        <p className="mt-2">
          <strong>โจทย์:</strong> quiz app ของเราต้องเก็บคำถาม.
          คำถามแต่ละข้อมี:
        </p>
        <ul className="mt-1 list-disc list-inside space-y-1 text-slate-700">
          <li>หัวข้อ (text)</li>
          <li>ตัวเลือก (array ของ text)</li>
          <li>คำตอบที่ถูก (index ของตัวเลือก)</li>
          <li>ระดับความยาก (easy / medium / hard)</li>
          <li>คำอธิบายเฉลย (มีหรือไม่มีก็ได้)</li>
        </ul>
        <p className="mt-3">ก่อนดู code — ลองเดาก่อน</p>

        <PredictThenReveal
          dataCy="predict-schema"
          storageKey={`${SID}:predict-schema`}
          question="ถ้าคุณเป็นคนเขียน schema นี้ — แต่ละ field ใช้ type อะไร?"
          hint="ลองนึกถึง TypeScript ที่คุณเคยเขียน — string, number, array, union, optional..."
          revealButton="ดูเฉลย"
          reveal={
            <>
              <p>เฉลย:</p>
              <CodeExample
                dataCy="code-schema-questions"
                filename="convex/schema.ts"
                language="ts"
                code={SCHEMA_CODE}
              />
              <p>เปรียบกับที่คุณเดา — ตรงไหนตรง, ตรงไหนคิดต่าง?</p>
            </>
          }
        />

        <h3 className="mt-6 font-semibold text-slate-900">อ่านทีละบรรทัด</h3>
        <p>ทุกบรรทัดมีเหตุผล — เปิดทีละจุด</p>

        <StepReveal
          dataCy="step-schema-types"
          storageKey={`${SID}:types`}
          intro="Schema นี้ใช้ types อะไรบ้าง:"
          steps={[
            {
              title: "v.string()",
              body: "ค่า text ปกติ ถ้าส่ง number หรือ null มา → reject",
            },
            {
              title: "v.number()",
              body: "ตัวเลข Convex ไม่แยก int/float — เก็บเป็น number ตัวเดียว",
            },
            {
              title: "v.array(v.string())",
              body: "Array ของ string สังเกต: ใส่ v.string() ข้างใน → ทุก element ต้องเป็น string Array of mixed types ก็ทำได้ด้วย v.union",
            },
            {
              title: "v.union(v.literal('easy'), ...)",
              body: (
                <>
                  <strong>union</strong> = หนึ่งในหลายอย่าง <strong>literal</strong>{" "}
                  = ค่าตายตัวเป๊ะ
                  <br />
                  รวมกัน = &ldquo;ค่าต้องเป็น &lsquo;easy&rsquo; หรือ
                  &lsquo;medium&rsquo; หรือ &lsquo;hard&rsquo; เท่านั้น —
                  ค่าอื่น reject&rdquo;
                  <br />
                  เทียบ TypeScript:{" "}
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    type Difficulty = &apos;easy&apos; | &apos;medium&apos; |
                    &apos;hard&apos;
                  </code>
                </>
              ),
            },
            {
              title: "v.optional(v.string())",
              body: "field นี้จะมีหรือไม่มีก็ได้ ถ้ามี → ต้องเป็น string ถ้าไม่มี → ok ไม่ใส่ field เลย",
            },
          ]}
        />

        <h3 className="mt-6 font-semibold text-slate-900">
          ลองจับคู่ — แต่ละ field ควรใช้ type ไหน?
        </h3>

        <DragToBucket
          dataCy="bucket-type-matching"
          storageKey={`${SID}:type-match`}
          buckets={[
            {
              id: "string",
              label: "v.string()",
              description: "text เปิดกว้าง",
            },
            {
              id: "number",
              label: "v.number()",
              description: "ตัวเลข",
            },
            {
              id: "union-literal",
              label: "v.union(v.literal(...), ...)",
              description: "ค่าจำกัดไม่กี่ตัว",
            },
            {
              id: "array",
              label: "v.array(...)",
              description: "หลายค่า ชนิดเดียวกัน",
            },
            {
              id: "optional",
              label: "v.optional(...)",
              description: "มีหรือไม่มีก็ได้",
            },
          ]}
          items={[
            {
              id: "username",
              text: "ชื่อผู้ใช้",
              correctBucket: "string",
              why: "text เปิดกว้าง — ไม่ใช่ค่าตายตัว",
            },
            {
              id: "order-status",
              text: "สถานะคำสั่งซื้อ (pending/paid/shipped)",
              correctBucket: "union-literal",
              why: "ค่าจำกัด 3 ตัว — union ของ literal เหมาะกว่า string (string จะรับค่าผิดได้)",
            },
            {
              id: "price",
              text: "ราคาสินค้า (บาท)",
              correctBucket: "number",
              why: "ตัวเลข",
            },
            {
              id: "tags",
              text: "Tags ของบทความ",
              correctBucket: "array",
              why: "หลายค่า → array ข้างในใส่ v.string() อีกที",
            },
            {
              id: "bio",
              text: "Bio ของ user (อาจไม่กรอกก็ได้)",
              correctBucket: "optional",
              why: "ไม่บังคับมี → optional ข้างในใส่ v.string()",
            },
          ]}
        />
      </Section>

      {/* ───── Section 6: Trade-off ───── */}
      <Section number={6} title="Trade-off: เคร่ง vs หลวม">
        <p>คำถามที่ developer ใหม่มักถาม:</p>
        <blockquote className="mt-2 border-l-4 border-slate-300 bg-slate-50 px-4 py-2 italic text-slate-700">
          ถ้า schema เคร่งดีนัก — ใส่ทุก field ให้ strict ไปเลยสิ?
        </blockquote>
        <p className="mt-2">
          คำตอบ: <strong>it depends</strong> — มาดูทั้ง 2 ฝั่ง
        </p>

        <ToggleCompare
          dataCy="compare-strict-vs-flexible"
          left={{
            id: "strict",
            label: "Schema เคร่ง",
            title: "ทุก field strict + union literal",
            content: (
              <>
                <p className="font-semibold text-emerald-700">✓ ข้อดี</p>
                <ul className="mt-1 space-y-1 list-disc list-inside">
                  <li>Bug น้อย — ข้อมูลผิด format โดน reject ทันที</li>
                  <li>TypeScript autocomplete แม่นมาก</li>
                  <li>อ่าน schema เข้าใจ business rule ได้เลย</li>
                </ul>
                <p className="mt-3 font-semibold text-rose-700">✗ ข้อเสีย</p>
                <ul className="mt-1 space-y-1 list-disc list-inside">
                  <li>
                    เพิ่ม value ใหม่ใน union → ต้องแก้ schema + migrate data เก่า
                  </li>
                  <li>Prototype ช้า — ทดลองอะไรก็ต้อง declare ทุกอย่าง</li>
                  <li>ออกแบบผิดตั้งแต่ต้น → แก้ยาก</li>
                </ul>
              </>
            ),
          }}
          right={{
            id: "flexible",
            label: "Schema หลวม",
            title: "v.any, optional เยอะ, ไม่มี literal",
            content: (
              <>
                <p className="font-semibold text-emerald-700">✓ ข้อดี</p>
                <ul className="mt-1 space-y-1 list-disc list-inside">
                  <li>Prototype เร็ว — เปลี่ยน shape ได้ไม่ต้องแก้ schema</li>
                  <li>Migration เกือบไม่เจ็บ</li>
                  <li>
                    เหมาะกับช่วง &ldquo;ยังไม่รู้ว่าจะเก็บอะไรกันแน่&rdquo;
                  </li>
                </ul>
                <p className="mt-3 font-semibold text-rose-700">✗ ข้อเสีย</p>
                <ul className="mt-1 space-y-1 list-disc list-inside">
                  <li>Bug runtime เพิ่ม — ส่ง garbage มาเก็บได้</li>
                  <li>TypeScript ช่วยไม่ค่อยได้ (type เป็น any)</li>
                  <li>ผ่านไป 6 เดือน → ไม่มีใครรู้ shape จริงของ data</li>
                </ul>
              </>
            ),
          }}
          caption="Heuristic: เริ่มเคร่งกลางๆ — ทำให้หลวมเมื่อมีเหตุผลจริง ไม่ใช่ 'หลวมไว้ก่อน เผื่อ flexible' เพราะค่าจ่ายมักโผล่ตอน production"
        />

        <MultipleChoice
          dataCy="mc-tradeoff-scenario"
          storageKey={`${SID}:mc-tradeoff`}
          question="ทีมคุณกำลังทำ MVP สำหรับ pitch ภายใน 1 สัปดาห์ ยังไม่ได้คุยกับลูกค้าจริง คุณกำลังออกแบบ table submissions — ควรเลือก schema แบบไหน?"
          options={[
            {
              id: "A",
              label:
                "Strict สุด — ทุก field มี v.literal/union แม้ไม่รู้ค่าทั้งหมด",
              correct: false,
              explanation:
                "ตอนนี้ยังไม่รู้ทุก case — เคร่งเกินจะติดที่ตัวเองเป็นประจำ รอให้ใช้จริงก่อน แล้วค่อยรัด",
            },
            {
              id: "B",
              label:
                "เคร่งพอดี — field ที่รู้แน่ ใส่ strict / field ที่ยังลังเลใส่ optional หรือ string ก่อน",
              correct: true,
              explanation:
                "ใช่ — strict ในจุดที่มั่นใจ + ยืดหยุ่นในจุดที่ยังลังเล พอ MVP มี feedback จริง → ค่อยรัดมาเรื่อยๆ",
            },
            {
              id: "C",
              label: "ไม่ใช้ schema เลย — เร็วที่สุด",
              correct: false,
              explanation:
                "Convex บังคับให้มี schema (หรือไม่ก็ใช้ v.any()) 'เร็ว' ตอนนี้ = bug ตอน demo สด",
            },
          ]}
        />
      </Section>

      {/* ───── Section 7: Docs habit ───── */}
      <Section number={7} title="🤖 ใช้ docs (ไม่ใช่ AI) เป็นที่แรก">
        <p>
          นิสัยสำคัญที่จะใช้ตลอดคอร์ส:{" "}
          <strong>เปิด docs ก่อนถาม AI</strong>
        </p>
        <p className="mt-2">ทำไม?</p>
        <ul className="mt-1 list-disc list-inside space-y-1 text-slate-700">
          <li>Docs ของ Convex เขียนเอง — ถูกเสมอ</li>
          <li>
            AI อาจ{" "}
            <Jargon term="hallucinate">
              <strong>Hallucinate</strong> = AI ตอบมั่วๆ ด้วยความมั่นใจ
              สร้างชื่อ function ที่ไม่มีจริง หรือ method ที่ไม่ exist
            </Jargon>{" "}
            type/method ที่ไม่มีจริง (โดยเฉพาะ library ที่ใหม่)
          </li>
          <li>ฝึกอ่าน docs = skill ที่ใช้กับทุก library ในชีวิต</li>
        </ul>

        <CheckboxList
          dataCy="checklist-docs-hunt"
          storageKey={`${SID}:docs-hunt`}
          title="เปิด Convex schema docs — หาคำตอบ 3 ข้อนี้เอง"
          note="ตอบไม่ได้ก็ไม่เป็นไร — ขีด ✓ ตอนคุณ 'หา' แล้ว ไม่ต้องรอ 'เข้าใจ 100%'"
          items={[
            {
              id: "doc-link",
              label: (
                <>
                  เปิดหน้า{" "}
                  <a
                    href="https://docs.convex.dev/database/schemas"
                    className="text-emerald-700 underline"
                    target="_blank"
                    rel="noopener"
                  >
                    docs.convex.dev/database/schemas
                  </a>
                </>
              ),
            },
            {
              id: "q1",
              label:
                "Convex มี type สำหรับ boolean (true/false) ไหม? ชื่ออะไร?",
              hint: "Search หน้า docs ด้วยคำว่า 'boolean'",
            },
            {
              id: "q2",
              label: "ถ้าอยากเก็บ field ที่เป็น object ซ้อน — ใช้ type อะไร?",
              hint: "ลองอ่านส่วน 'Validators' หรือ 'Nested objects'",
            },
            {
              id: "q3",
              label:
                "Convex มี type สำหรับเก็บวันที่ (Date) แยกไหม? ถ้าไม่มี — เก็บยังไง?",
              hint: "Search ด้วยคำว่า 'date' หรือ 'timestamp' — คำตอบอาจไม่ใช่อย่างที่คาด",
            },
          ]}
        />

        <PredictThenReveal
          dataCy="predict-docs-answers"
          storageKey={`${SID}:predict-docs`}
          question="เขียนคำตอบสั้นๆ ของ 3 ข้อด้านบน ก่อนกดดูเฉลย"
          revealButton="เปิดเฉลย"
          reveal={
            <>
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  <strong>Boolean:</strong>{" "}
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs">
                    v.boolean()
                  </code>{" "}
                  — รับ true หรือ false เท่านั้น
                </li>
                <li>
                  <strong>Object ซ้อน:</strong>{" "}
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs">
                    v.object({"{ ... }"})
                  </code>{" "}
                  — เช่น{" "}
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs">
                    address: v.object({"{ city: v.string(), zip: v.string() }"})
                  </code>
                </li>
                <li>
                  <strong>Date:</strong> ไม่มี{" "}
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs">
                    v.date()
                  </code>{" "}
                  — เก็บเป็น{" "}
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs">
                    v.number()
                  </code>{" "}
                  แทน (Unix timestamp ใน ms)
                  <br />
                  <span className="text-sm text-slate-600">
                    เหตุผล: JSON ไม่มี Date type — Convex storage = JSON-based →
                    ใช้ number แล้ว format ใน UI
                  </span>
                </li>
              </ol>
              <p className="mt-3">
                ทุกคำตอบนี้คุณ <strong>หาเอง</strong> ได้ใน docs —
                ไม่ต้องรอใครบอก นี่คือ skill ที่ใช้ตลอดอาชีพ
              </p>
            </>
          }
        />

        <p className="mt-4 text-slate-700">
          จากนี้ไป — ก่อนถาม AI ลองถามตัวเอง:{" "}
          <strong>&ldquo;ฉันลองเปิด docs ดูแล้วหรือยัง?&rdquo;</strong>
        </p>
      </Section>

      {/* ───── Section 8: Make it work ───── */}
      <Section number={8} title="🧪 ลงมือ: ใส่ schema เข้าโปรเจกต์">
        <p>
          ตอนนี้ใส่ schema ที่เราเห็นใน Section 5 ลงโปรเจกต์จริง
        </p>
        <p className="mt-2 text-sm text-slate-600 italic">
          เป้า: ให้ Convex Dashboard ขึ้น table questions พร้อม schema ที่เขียนไว้
        </p>

        <CheckboxList
          dataCy="checklist-schema-setup"
          storageKey={`${SID}:schema-setup`}
          title="Schema setup"
          note="กดรายละเอียดเพื่อดู option ที่ควรเลือก — ขีด ✓ เมื่อทำเสร็จ"
          items={[
            {
              id: "file",
              label: (
                <>
                  สร้างไฟล์{" "}
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm">
                    convex/schema.ts
                  </code>
                </>
              ),
              detail: (
                <>
                  ในโฟลเดอร์{" "}
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    convex/
                  </code>{" "}
                  (ที่ Session 1 สร้างไว้)
                  <br />
                  ถ้ายังไม่มี — สร้างใหม่ที่ root ของ{" "}
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    convex/
                  </code>
                </>
              ),
            },
            {
              id: "paste",
              label: "Copy schema จาก Section 5 ใส่ในไฟล์นี้",
            },
            {
              id: "dev-running",
              label: (
                <>
                  ตรวจว่า{" "}
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm">
                    npx convex dev
                  </code>{" "}
                  รันอยู่ใน terminal อีกอันหนึ่ง
                </>
              ),
              hint: "ถ้าไม่รัน — schema จะไม่ sync ขึ้น Cloud",
            },
            {
              id: "deploy-msg",
              label:
                "ดู terminal ของ npx convex dev — ต้องมีข้อความว่า schema deployed สำเร็จ",
              detail: (
                <>
                  ถ้าเจอ error เช่น{" "}
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    Cannot find module &quot;convex/values&quot;
                  </code>
                  <br />→ ตรวจว่าได้ทำ Session 1 จบครบ (npm install convex แล้ว)
                </>
              ),
            },
            {
              id: "dashboard",
              label:
                "เปิด Convex Dashboard → tab 'Data' → ต้องเห็น table questions (empty)",
              detail: (
                <>
                  Table จะปรากฏแม้ยังไม่มี document — เพราะ schema ประกาศไว้แล้ว
                  <br />
                  Click ที่ table → tab &lsquo;Schema&rsquo; → เห็น structure
                  ที่คุณ define
                </>
              ),
            },
            {
              id: "try-insert",
              label: "ลอง insert document ผ่าน Dashboard (ปุ่ม 'Add document')",
              detail: (
                <>
                  Dashboard มี form ตาม schema — กรอก title, choices, answerIndex,
                  difficulty
                  <br />
                  สังเกตว่า field <strong>difficulty</strong> มี dropdown แค่ 3
                  ค่า (จาก union literal)
                  <br />→ นี่คือสัญญาที่ทำงาน
                </>
              ),
            },
          ]}
        />
      </Section>

      {/* ───── Section 9: Break it ───── */}
      <Section number={9} title="💥 ทำให้พัง: ทดสอบสัญญา">
        <p>
          ตอนนี้ schema ทำงานแล้ว — มาทดสอบว่า &ldquo;สัญญา&rdquo;
          มันรัดแน่นแค่ไหน
        </p>
        <p className="mt-2 font-semibold text-rose-900">
          กฎ: ทุก scenario — เขียน hypothesis ก่อนทำ แล้วค่อยลอง
        </p>

        <HypothesisBox
          dataCy="break-extra-field"
          storageKey={`${SID}:break-1`}
          title="💥 Break 1 — เพิ่ม field ที่ไม่ได้อยู่ใน schema"
          setup={
            <>
              <p>
                ใน Dashboard → ลอง insert document ที่มี field พิเศษ เช่น:
              </p>
              <pre className="mt-2 overflow-x-auto rounded bg-rose-50 border border-rose-200 px-3 py-2 text-xs font-mono text-slate-800">
                {`{ "title": "test", "choices": ["A","B"], "answerIndex": 0,
  "difficulty": "easy", "rating": 5 }`}
              </pre>
              <p className="mt-2">
                (rating ไม่ได้อยู่ใน schema) — Convex จะ reject, ยอมรับ, หรือ
                ignore?
              </p>
            </>
          }
          reveal={
            <>
              <p>
                <strong>สิ่งที่เกิด:</strong> Convex <strong>reject</strong> —
                error บอกว่า &ldquo;Object contains extra field&rdquo;
              </p>
              <p className="mt-3">
                <strong>บทเรียน:</strong>
              </p>
              <ul className="mt-1 list-disc list-inside space-y-1">
                <li>
                  Default ของ Convex schema = <strong>strict</strong> —
                  field ที่ไม่ประกาศไว้ = ไม่ยอมรับ
                </li>
                <li>
                  ป้องกัน typo เช่น{" "}
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    titel: &quot;...&quot;
                  </code>{" "}
                  (พิมพ์ผิด title) ไม่ให้แอบเข้า database
                </li>
                <li>
                  ถ้าอยากอนุญาต extra fields → ใช้ option ใน defineTable
                  (ลองเปิด docs หาดู — ฝึก B1)
                </li>
              </ul>
            </>
          }
        />

        <HypothesisBox
          dataCy="break-wrong-type"
          storageKey={`${SID}:break-2`}
          title="💥 Break 2 — ส่ง type ผิด"
          setup={
            <>
              <p>ลอง insert document นี้:</p>
              <pre className="mt-2 overflow-x-auto rounded bg-rose-50 border border-rose-200 px-3 py-2 text-xs font-mono text-slate-800">
                {`{ "title": "test", "choices": ["A","B"],
  "answerIndex": "0", "difficulty": "easy" }`}
              </pre>
              <p className="mt-2">
                สังเกต: <code className="rounded bg-rose-100 px-1 font-mono text-xs">answerIndex</code>{" "}
                เป็น{" "}
                <code className="rounded bg-rose-100 px-1 font-mono text-xs">
                  &quot;0&quot;
                </code>{" "}
                (string) ไม่ใช่{" "}
                <code className="rounded bg-rose-100 px-1 font-mono text-xs">
                  0
                </code>{" "}
                (number)
              </p>
              <p className="mt-2">Convex จะทำยังไง?</p>
            </>
          }
          reveal={
            <>
              <p>
                <strong>Reject</strong> — error: &ldquo;Expected number, got
                string&rdquo;
              </p>
              <p className="mt-3">
                <strong>บทเรียน:</strong>
              </p>
              <ul className="mt-1 list-disc list-inside space-y-1">
                <li>
                  Validator <strong>ไม่ auto-cast</strong> —{" "}
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    &quot;0&quot;
                  </code>{" "}
                  ≠{" "}
                  <code className="rounded bg-slate-100 px-1 font-mono text-xs">
                    0
                  </code>{" "}
                  Convex ไม่ &ldquo;เดาให้&rdquo;
                </li>
                <li>
                  ใจดีต่อ developer = โหดต่อ data quality Convex เลือกข้างหลัง
                </li>
                <li>
                  ถ้า bug ของคุณคือ &ldquo;frontend ส่ง string มาแทน
                  number&rdquo; → schema จะจับได้ทันที (ไม่ลามไปถึง query เพี้ยน)
                </li>
              </ul>
            </>
          }
        />

        <HypothesisBox
          dataCy="break-change-schema"
          storageKey={`${SID}:break-3`}
          title="💥 Break 3 — เปลี่ยน schema หลังมีข้อมูล"
          setup={
            <ol className="list-decimal list-inside space-y-1">
              <li>
                ตอนนี้ table questions มี document อย่างน้อย 1 อัน (จาก Section
                8) แล้ว
              </li>
              <li>
                แก้{" "}
                <code className="rounded bg-rose-100 px-1 font-mono text-xs">
                  schema.ts
                </code>{" "}
                — เปลี่ยน{" "}
                <code className="rounded bg-rose-100 px-1 font-mono text-xs">
                  answerIndex: v.number()
                </code>{" "}
                เป็น{" "}
                <code className="rounded bg-rose-100 px-1 font-mono text-xs">
                  answerIndex: v.string()
                </code>
              </li>
              <li>
                Save → ดู terminal ของ{" "}
                <code className="rounded bg-rose-100 px-1 font-mono text-xs">
                  npx convex dev
                </code>
              </li>
            </ol>
          }
          reveal={
            <>
              <p>
                <strong>Schema deployment FAIL</strong> — Convex บอก:
              </p>
              <blockquote className="mt-2 border-l-4 border-rose-300 bg-rose-50 px-3 py-2 text-sm italic">
                Schema validation failed: existing documents do not match new
                schema
              </blockquote>
              <p className="mt-2 text-sm">
                พร้อมตัวอย่าง document ที่ขัดกับ schema ใหม่
              </p>
              <p className="mt-3">
                <strong>บทเรียน (สำคัญที่สุดของ session):</strong>
              </p>
              <ul className="mt-1 list-disc list-inside space-y-1">
                <li>
                  Schema = <strong>สัญญา</strong> — เปลี่ยนทีหลัง ={" "}
                  <strong>เจ็บ</strong>
                </li>
                <li>
                  Convex ไม่ยอม deploy ถ้า data เก่าไม่ match → กัน production พัง
                </li>
                <li>
                  ทางแก้: เขียน <strong>migration</strong> (Session 18
                  จะพูดถึง) เพื่อแปลง data เก่าก่อน แล้วค่อยเปลี่ยน schema
                </li>
                <li>
                  <strong>Implication:</strong> ออกแบบ schema ครั้งแรก
                  ควรคิดให้ดี (แต่ก็ไม่ต้อง perfect — ของเปลี่ยนได้ แค่มี cost)
                </li>
              </ul>
              <p className="mt-3 text-sm text-slate-700">
                <strong>คืนสภาพ:</strong> เปลี่ยน answerIndex กลับเป็น
                v.number() → save → schema deploy ผ่าน
              </p>
            </>
          }
        />
      </Section>

      {/* ───── Section 10: Reflect ───── */}
      <Section number={10} title="🪞 Reflect">
        <PersistentReflection
          dataCy="reflect-s2"
          storageKey={`${SID}:reflect`}
          intro="ตอบสั้นๆ ที่คุณคิด — จะ save บน device คุณอัตโนมัติ (ไม่ส่งไปไหน)"
          questions={[
            {
              id: "r1",
              prompt: (
                <>
                  <strong>ก่อน</strong> session นี้ ฉันคิดว่า
                  &ldquo;schema&rdquo; คือ ...
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
                  ถ้าเพื่อนถามว่า &ldquo;ทำไม TypeScript ไม่พอ ต้องมี validator
                  อีกทำไม?&rdquo; ฉันจะตอบใน 1 ประโยคว่า ...
                  <span className="block mt-1 text-xs italic text-slate-500">
                    (ห้ามใช้คำว่า &ldquo;compile-time&rdquo; /
                    &ldquo;runtime&rdquo; — บังคับให้อธิบายเป็นภาษาคน)
                  </span>
                </>
              ),
            },
            {
              id: "r3",
              prompt:
                "ใน Break 3 (เปลี่ยน type หลังมีข้อมูล) — สิ่งที่เกิดทำให้ฉันเข้าใจว่า ... และถ้าฉันออกแบบ schema ครั้งต่อไป ฉันจะ ...",
            },
            {
              id: "r4",
              prompt:
                "ฉันเปิด Convex docs ใน Section 7 — ความรู้สึกแรกเป็นยังไง? ง่ายหรือยาก? ฉันเจออะไรใน docs ที่ AI อาจตอบไม่ตรงเป๊ะ?",
            },
            {
              id: "r5",
              prompt:
                "ส่วนที่ยังไม่ชัดที่สุดของฉันคือ ... (จะเป็นจุดเริ่ม session ต่อไป)",
            },
          ]}
        />

        <ConfidenceSlider
          dataCy="confidence-s2"
          storageKey={`${SID}:confidence`}
          prompt="หลังหน้านี้ — ฉันมั่นใจแค่ไหนว่า 'schema คืออะไร และทำไมต้องมี'?"
          low="ยังไม่ค่อยเข้าใจว่าทำไม"
          mid="พอเข้าใจ why แต่เขียน schema ใหม่เองยังไม่คล่อง"
          high="อธิบายเพื่อน + เขียน schema ใหม่ได้แน่นอน"
          note="ถ้า ≤ 5 → กลับไปอ่าน Section 3-4 อีกครั้งโดยไม่ต้องรีบ ไม่มีคำตอบที่ 'ถูก'"
        />
      </Section>

      {/* Looking ahead */}
      <section className="mt-12 rounded-lg border border-slate-200 bg-slate-50 p-5">
        <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-700">
          <span aria-hidden>🔭</span>
          <span>Looking ahead → Session 3</span>
        </h2>
        <p className="mt-2 text-slate-700 leading-relaxed">
          หน้าต่อไปจะตอบคำถาม:
        </p>
        <ul className="mt-2 list-disc list-inside text-slate-700 space-y-1">
          <li>
            ตอนนี้ schema มีแล้ว — แต่จะ <strong>อ่าน</strong> data จาก
            database ยังไง?
          </li>
          <li>
            ทำไม React component ต้องรู้ตอน &lsquo;ยังโหลดอยู่&rsquo; vs
            &lsquo;โหลดเสร็จแล้วว่าง&rsquo; vs &lsquo;โหลดเสร็จมี data&rsquo;?
          </li>
          <li>
            Convex query คืออะไร — ต่างกับ HTTP API request ที่เคยใช้ยังไง?
          </li>
        </ul>
        <p className="mt-3 text-slate-700">
          → คำตอบคือ <strong>Query + Loading states</strong> —
          รากของสิ่งที่ทำให้ Convex รู้สึก &ldquo;real-time&rdquo;
        </p>
      </section>

      <SessionNav
        dataCy="session-nav"
        prev={{
          href: "/week-1/session-1",
          label: "Session 1 — เริ่มเข้าใจ Backend",
        }}
        next={{
          href: "/week-1/session-3",
          label: "Session 3 — Query: อ่านข้อมูลครั้งแรก",
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
