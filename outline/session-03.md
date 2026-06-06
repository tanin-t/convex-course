# Session 3 — Query: อ่านข้อมูลครั้งแรก + handle states

> **Week 1** · Online self-paced tutorial
> Page: `course/app/week-1/session-3/page.tsx`
> Part of [Convex Course Outline](../COURSE_OUTLINE.md)

---

## 🎯 Page goals

หลังจบหน้านี้ นักเรียน:
- อธิบายได้ว่า **query = function อ่านข้อมูล ที่ pure** — ในภาษาตัวเอง
- รู้ว่า `useQuery` มี **3 state ที่ต้องแยก:** `undefined` (ยังไม่รู้) / `[]` หรือ `null` (รู้แล้วว่าไม่มี) / มี data
- เขียน query function แรกได้ และ consume ใน Next.js component ได้
- เริ่มเห็นภาพ **"query เป็น subscription"** — เกริ่นไป Week 4 (real-time)
- ฝึกนิสัย **อ่าน error message** — หา root cause ก่อนถาม AI

**ไม่ใช่เป้าหมาย:** mutation (Session 4), real-time deep dive (Session 10), error boundary แบบ production (Session 15), pagination/index (Session 6)

---

## 🧩 Interactive components ที่ใช้ในหน้านี้

| Component | จำนวน | ใช้ตรงไหน |
|---|---|---|
| `PredictThenReveal` | 3 | Hook + ก่อนเปิด query code + ก่อนเฉลย 3 states |
| `MultipleChoice` | 2 | "undefined แปลว่าอะไร" + "ทำไม query ต้อง pure" |
| `DragToBucket` | 1 | จับคู่ state (`undefined` / `[]` / array มีค่า) กับสิ่งที่ควร render |
| `StepReveal` | 2 | เปิด query file ทีละบรรทัด + 3 states ของ useQuery |
| `ToggleCompare` | 1 | "fetch (เคยรู้จัก)" vs "useQuery (Convex)" |
| `CheckboxList` | 1 | Setup checklist — เขียน query + ใช้ใน page |
| `HypothesisBox` | 3 | Break it scenarios |
| `PersistentReflection` | 5 | Reflection answers |
| `ConfidenceSlider` | 1 | ปิด session — ประเมินความมั่นใจ |
| `MermaidDiagram` | 1 | flow: client subscribe → query function → DB → push update |
| `Jargon` | ~5 | wrap "pure function", "subscription", "hook", "side effect", "deterministic" |

---
---

# Section 1 — Hook: หน้าเว็บที่ "พังตอนโหลด"

### Narrative
"ลองจินตนาการ — คุณเขียน Next.js page ไว้แสดงรายการคำถามจาก database
code มัน 'work' บนเครื่องคุณ. แต่ที่ของเพื่อน — เปิดหน้าปุ๊บ **crash** ทันที.

Error: `Cannot read properties of undefined (reading 'map')`

ก่อนเปิดเฉลย — **ลองเดาก่อน** ว่าเกิดอะไร"

### 🧩 `<PredictThenReveal>`
```yaml
question: "เปิดหน้าเว็บที่อ่าน list จาก database → crash ที่ `.map(...)`. คุณคิดว่าเกิดจากอะไร?"
hint: "นึกถึง 'ตอนไหน' ที่ data ยังไม่ถึงมือ component"
input_type: textarea
reveal_button: "เปิดเฉลย"
reveal_content: |
  คำตอบสั้น: **ตอนแรกที่ component render — data ยังไม่มา**
  ค่าของมันคือ `undefined` ไม่ใช่ array. `undefined.map(...)` → crash

  พอเข้าใจปัญหานี้ → คุณจะรู้ว่าทำไม Convex (และ library ที่ดีทุกตัว) บังคับให้เรา **แยก 3 state เสมอ:**
  1. ยังไม่รู้ (loading)
  2. รู้แล้วว่าไม่มี (empty)
  3. มี data
note: ไม่ต้องตอบถูก — แค่ได้ลองคิด
```

### Closing
"Session นี้เราจะ:
- เขียน query function แรก (อ่านข้อมูลจาก Convex)
- ใช้ `useQuery` ใน Next.js
- รู้จัก 3 state ที่ทุก query มีเสมอ
- ทดลองทำให้พังด้วยตัวเอง — เพื่อให้รู้ขอบเขต"

---
---

# Section 2 — Mental model: Query คืออะไร

### Narrative
"ใน Convex มี function ที่ทำหน้าที่ **อ่านข้อมูลอย่างเดียว** — เรียกว่า **query**

ทำไมต้องแยก 'อ่าน' ออกจาก 'เขียน'? — เพราะ Convex อยากให้ query มี 3 คุณสมบัติพิเศษ:

- **Pure** — ผลลัพธ์ขึ้นกับ input + data ใน DB เท่านั้น (ไม่ใช่ random, ไม่ใช่เวลา)
- **Re-runnable** — Convex รัน query ซ้ำได้เมื่อ data เปลี่ยน
- **Subscribable** — client subscribe ได้ → data เปลี่ยน → auto re-render

(ข้อ 2-3 คือรากของ 'real-time' ที่จะเจอ Week 4)"

### 🧩 `<ToggleCompare>` — fetch vs useQuery
```yaml
toggle_options:
  - id: fetch
    label: "fetch (REST API ที่คุณเคยใช้)"
  - id: useQuery
    label: "useQuery (Convex)"

side_fetch:
  title: "fetch: ขอครั้งเดียว"
  body: |
    - คุณยิง request → server ตอบ 1 ครั้ง → จบ
    - data เปลี่ยนทีหลัง? — ต้องยิง request ใหม่เอง (polling / manual refresh)
    - component จัดการ loading / error state เองทั้งหมด

side_useQuery:
  title: "useQuery: subscribe"
  body: |
    - คุณเรียก `useQuery(api.questions.list)` ครั้งเดียว
    - Convex ส่ง data มา + **subscribe** ไว้ให้
    - data ใน DB เปลี่ยน → Convex push ค่าใหม่ → component re-render อัตโนมัติ
    - `undefined` = ยังไม่รู้ (Convex ยังไม่ตอบกลับ)

caption: |
  ความต่างนี้สำคัญ — ไม่ใช่แค่ "syntax สั้นกว่า"
  มันเปลี่ยน mental model จาก "request-response" → "subscription"
```

### Insight
"พอ query เป็น subscription → Convex ต้องการ **garantee** ว่า:
> 'รัน query ครั้งที่ 1 ได้ผล X, รันครั้งที่ 100 บน data เดิม → ต้องได้ X เหมือนเดิม'

ถ้าไม่ — real-time จะเพี้ยน. นี่คือเหตุผลที่ query ต้อง **pure** (จะลงรายละเอียดที่ Section 5)"

---
---

# Section 3 — เห็นของจริง: เขียน query แรก

### Narrative
"พอเข้าใจ 'ทำไม' แล้ว — มาดู query function จริงกัน
**โจทย์:** อ่าน list ของ `questions` ทั้งหมดจาก table ที่เราสร้างไว้ Session 2

ก่อนดู code — ลองเดาก่อนว่ามันหน้าตายังไง"

### 🧩 `<PredictThenReveal>`
```yaml
question: |
  ถ้าคุณต้องเขียน Convex function ที่ "อ่าน list คำถามทั้งหมด" —
  เดาว่า code ต้องประกอบด้วยอะไรบ้าง? (ไม่ต้องเขียน syntax ถูก — แค่ list ว่า "ต้องมีอะไร")
hint: "นึกถึง schema (Session 2) — มี table ชื่อ `questions` แล้ว"
input_type: textarea
reveal_button: "ดูเฉลย"
reveal_content: |
  ```ts
  // convex/questions.ts
  import { query } from "./_generated/server";
  import { v } from "convex/values";

  export const list = query({
    args: {},
    handler: async (ctx) => {
      return await ctx.db.query("questions").collect();
    },
  });
  ```
  สังเกต — 5 ส่วนหลัก:
  1. `import { query }` จาก `_generated/server` (Convex generate ให้เอง)
  2. `export const list = query({...})` — ชื่อ function = ชื่อที่ใช้เรียก
  3. `args: {}` — query นี้ไม่รับ argument
  4. `handler: async (ctx) => ...` — logic จริง
  5. `ctx.db.query("questions").collect()` — อ่าน table แล้วเอามาทั้งหมด
```

### อ่านทีละบรรทัด

### 🧩 `<StepReveal>`
```yaml
intro: "Query function นี้มีอะไรบ้าง — เปิดทีละจุด:"
steps:
  - title: "`import { query } from \"./_generated/server\"`"
    body: |
      `_generated/` คือโฟลเดอร์ที่ Convex สร้างให้อัตโนมัติตอน `npx convex dev` รันอยู่
      อย่าแก้ในนั้น — มันจะถูก overwrite. ถ้าหายไป → restart `npx convex dev`
  - title: "`export const list = query({...})`"
    body: |
      ตัวแปร `list` ที่ export = **function reference**
      File `convex/questions.ts` + export `list` → เรียกใน client ด้วย `api.questions.list`
      (file-based routing — เหมือน Next.js)
  - title: "`args: {}`"
    body: |
      Validator สำหรับ argument ที่ client ส่งมา — ต้องประกาศเสมอ แม้ไม่รับอะไร
      ถ้าจะรับ argument: `args: { difficulty: v.string() }` แล้ว destructure ใน handler
      (Convex บังคับให้ validator เพราะ client ส่งอะไรเข้ามาก็ได้ — ห้ามเชื่อ)
  - title: "`handler: async (ctx) => ...`"
    body: |
      `ctx` = context — ของที่ Convex เตรียมไว้ให้: `ctx.db`, `ctx.auth`, ...
      สำหรับ query → `ctx.db` มีแค่ method "อ่าน" (`.query`, `.get`) ไม่มี `.insert`/`.patch`
      → **เขียน mutate ไม่ได้แม้พิมพ์** — TypeScript จับได้ตั้งแต่ compile-time
  - title: "`ctx.db.query(\"questions\").collect()`"
    body: |
      `.query("questions")` — เริ่มเลือก table
      `.collect()` — ดึงทุก document มาเป็น array
      มี method อื่นอีก: `.first()`, `.take(10)`, `.filter(...)`, `.withIndex(...)` — เรียนต่อ Session 6
reveal_one_at_a_time: true
```

---
---

# Section 4 — ใช้ใน Next.js: 3 state ของ `useQuery`

### Narrative
"Query function อยู่ที่ Convex Cloud — ฝั่ง Next.js เรียกผ่าน **hook `useQuery`**

ลองเดาก่อน — `useQuery(api.questions.list)` return อะไรได้บ้าง?"

### 🧩 `<PredictThenReveal>`
```yaml
question: "`useQuery(api.questions.list)` return ค่าอะไรได้บ้าง? (เดาไปเลย ผิดถูกไม่เป็นไร)"
hint: "นึกถึงเหตุการณ์ที่อาจเกิด: ยังโหลด, โหลดเสร็จมี data, โหลดเสร็จไม่มี data"
input_type: textarea
reveal_button: "เปิดเฉลย"
reveal_content: |
  `useQuery` return ค่าได้ **3 รูปแบบ:**
  1. `undefined` — **ยังไม่รู้** (Convex ยังตอบไม่กลับ)
  2. `[]` (array ว่าง) หรือ `null` — **รู้แล้วว่าไม่มี data**
  3. array ที่มี item — มี data พร้อมใช้

  สังเกต: `undefined` ≠ `[]`
  - `undefined` = "I don't know yet"
  - `[]` = "I know, and the answer is nothing"

  ความต่างนี้คือ **หัวใจของ session นี้**
```

### 🧩 `<StepReveal>` — 3 states
```yaml
intro: "Component ที่ดี ต้องแยก 3 state นี้เสมอ:"
steps:
  - title: "State 1: `undefined` (ยังโหลด)"
    body: |
      ```tsx
      if (questions === undefined) {
        return <p>กำลังโหลด...</p>;
      }
      ```
      ถ้าข้าม check นี้ → component พยายาม `.map(undefined)` → crash
  - title: "State 2: array ว่าง (โหลดเสร็จ ไม่มี data)"
    body: |
      ```tsx
      if (questions.length === 0) {
        return <p>ยังไม่มีคำถาม — เพิ่มได้ที่ Dashboard</p>;
      }
      ```
      ผู้ใช้เปิดเว็บ → เห็นข้อความเข้าใจง่าย ไม่ใช่หน้าว่างมึน
  - title: "State 3: มี data → render"
    body: |
      ```tsx
      return (
        <ul>
          {questions.map((q) => (
            <li key={q._id}>{q.title}</li>
          ))}
        </ul>
      );
      ```
      สังเกต `q._id` — Convex ให้ทุก document มี `_id` อัตโนมัติ (ไม่ต้องประกาศใน schema)
reveal_one_at_a_time: true
closing: |
  Pattern นี้จะใช้ **ทุกครั้ง** ที่ใช้ `useQuery` — จำให้ขึ้นใจ
  (Session 15 จะคุยเรื่อง pattern ที่ดูสะอาดขึ้น แต่ root idea เหมือนเดิม)
```

### 🧩 `<DragToBucket>` — แยกแต่ละ state
```yaml
intro: "ลากแต่ละ scenario → state ที่ตรงกับมัน"
buckets:
  - id: loading
    label: "State 1: `undefined` (ยังโหลด)"
  - id: empty
    label: "State 2: `[]` (โหลดเสร็จ ไม่มี data)"
  - id: data
    label: "State 3: มี data — render"
items:
  - text: "เพิ่งเปิดหน้าเว็บ — Convex ยังตอบไม่กลับ"
    correct_bucket: loading
    why: "Convex ยังไม่ส่ง response แรก → `undefined`"
  - text: "Table `questions` ว่าง — ยังไม่มี admin เพิ่มข้อมูล"
    correct_bucket: empty
    why: "Convex ตอบกลับแล้ว ค่าเป็น `[]` → length === 0"
  - text: "มี 5 คำถามใน table — Convex ส่งกลับมาแล้ว"
    correct_bucket: data
    why: "Array ยาว 5 → render `.map()`"
  - text: "internet ของ user ขาด — connection พัง"
    correct_bucket: loading
    why: "ตราบใดที่ Convex ยังไม่ตอบ → `undefined`. (Session 15 จะคุย error/disconnect แยก)"
feedback_mode: "instant per drop"
```

### 🧩 `<MultipleChoice>`
```yaml
question: "ถ้า `useQuery` return `undefined` คุณคิดว่า Convex กำลังสื่ออะไร?"
options:
  - id: A
    label: "table ว่าง ไม่มี document"
    correct: false
    explanation: "ถ้าตอบเป็น 'ไม่มี data' → ค่าคือ `[]` ไม่ใช่ `undefined`. `undefined` = 'ยังไม่รู้'"
  - id: B
    label: "Query function พัง"
    correct: false
    explanation: "Query พัง → throw error (ดูใน Dashboard logs). ไม่ใช่ `undefined`"
  - id: C
    label: "Convex ยังไม่ตอบกลับ — ยังโหลด"
    correct: true
    explanation: |
      ถูก — `undefined` คือ "I don't know yet"
      ถึง Convex ส่งกลับมาแล้ว ถ้าค่าเป็น `[]` ก็เป็น 'รู้แล้วว่าไม่มี' ไม่ใช่ `undefined`
  - id: D
    label: "เรียก query ผิด file/ผิดชื่อ"
    correct: false
    explanation: |
      เรียกผิด → TypeScript จับได้ตั้งแต่ compile-time (`api.questions.list` ไม่มี autocomplete)
      ไม่ลงไปถึงตอน runtime
show_all_explanations_after_pick: true
```

---
---

# Section 5 — ทำไม query ต้อง pure?

### Narrative
"ตอน Section 2 เกริ่นไว้ว่า query ต้อง **pure** — มาเข้าใจให้ลึกตอนนี้

ลองคิดดูก่อน — ถ้าเขียน query แบบนี้:
```ts
export const random = query({
  args: {},
  handler: async () => Math.random(),
});
```
จะเกิดอะไร?"

### 🧩 `<MultipleChoice>`
```yaml
question: "ทำไม Convex ไม่อนุญาต `Math.random()` ใน query?"
options:
  - id: A
    label: "Math.random() ทำงานช้า"
    correct: false
    explanation: "ไม่เกี่ยวกับความเร็ว — เกี่ยวกับ 'รัน 2 ครั้งได้ผลเดิมไหม'"
  - id: B
    label: "เพราะ query ต้องคืนผลลัพธ์เดิมเมื่อ input + data เดิม — ไม่งั้น cache + subscription จะเพี้ยน"
    correct: true
    explanation: |
      ใช่ — query เป็น subscription. Convex รันซ้ำเพื่อตรวจว่า data เปลี่ยนไหม
      ถ้าผลลัพธ์ต่างทุกครั้ง → Convex คิดว่า 'data เปลี่ยนตลอด' → push update รัวๆ → ผู้ใช้เห็นค่าเปลี่ยนวุ่นวาย
  - id: C
    label: "Math.random ไม่ปลอดภัย"
    correct: false
    explanation: "ไม่ใช่เรื่อง security — เรื่อง determinism"
  - id: D
    label: "เพราะ Convex อยาก force ให้ใช้ random ผ่าน helper ของเขา"
    correct: false
    explanation: |
      Convex มี `ctx.db.system.randomUUID()` แต่นั่นเรื่องแยก
      เหตุผลรากคือ — query ต้อง deterministic
show_all_explanations_after_pick: true
```

### ห้ามใช้อะไรบ้างใน query
"กฎ pure ห้ามใช้:
- `Math.random()` — non-deterministic
- `Date.now()`, `new Date()` — เปลี่ยนทุกครั้งที่เรียก
- `fetch(...)` — เรียก external API (ไม่ deterministic + slow)
- เขียน DB (`ctx.db.insert/patch/delete`) — query อ่านอย่างเดียว

**ถ้าต้องการอะไรพวกนี้** → ใช้ **mutation** (Session 4) หรือ **action** (Session 12)"

### Mental model
"คิดเหมือน **ภาพถ่าย**:
- ถ่ายภาพห้องตอนนี้ → ได้รูป A
- ถ่ายอีกครั้งเดี๋ยวนี้ (ห้องไม่เปลี่ยน) → ต้องได้รูป A เหมือนเดิม
- ถ้าได้รูป B ทั้งที่ห้องเหมือนเดิม → กล้องผิดปกติ

Query = กล้องที่ต้องถ่ายแล้วได้ผลเดิม ตราบใดที่ scene เดิม"

---
---

# Section 6 — 🧪 ลงมือ: เขียน query + ใช้ใน page

### Narrative
"ตอนนี้เอา concept ทั้งหมดมาประกอบ — เขียน query จริง + ใช้แสดงผลใน Next.js

**เป้าหมาย:** หน้า `app/questions/page.tsx` ของคุณ แสดง list questions + handle 3 states ถูกต้อง"

### 🧩 `<CheckboxList>` — Setup
```yaml
title: "Query + page setup (persist)"
persist: true
items:
  - id: prereq
    label: "Session 2 จบ — มี table `questions` ใน schema + insert document อย่างน้อย 1 อันผ่าน Dashboard แล้ว"
    detail_expandable: |
      ถ้ายังไม่มี — กลับไป Session 2 Section 8 ก่อน
      ถ้าไม่มี document ก็ยังลองได้ — จะเห็น state 'empty' (มีประโยชน์ตอน Break)
  - id: file
    label: "สร้างไฟล์ `convex/questions.ts`"
    detail_expandable: |
      ใน folder `convex/` เดียวกับ `schema.ts`
      ตั้งชื่อไฟล์ภาษาอังกฤษ lowercase — ชื่อไฟล์ = ส่วนหนึ่งของ function reference
  - id: query
    label: "วาง query `list` จาก Section 3 ลงในไฟล์"
  - id: dev-sync
    label: "ตรวจ `npx convex dev` รันอยู่ → terminal แจ้ง deploy สำเร็จ"
    hint: "ถ้าเจอ error เกี่ยวกับ `_generated/server` → restart `npx convex dev`"
  - id: page-file
    label: "สร้างไฟล์ `app/questions/page.tsx` (Next.js App Router)"
    detail_expandable: |
      โครง `"use client"` บนสุด เพราะใช้ hook
      ```tsx
      "use client";
      import { useQuery } from "convex/react";
      import { api } from "../../convex/_generated/api";

      export default function QuestionsPage() {
        const questions = useQuery(api.questions.list);
        if (questions === undefined) return <p>กำลังโหลด...</p>;
        if (questions.length === 0) return <p>ยังไม่มีคำถาม</p>;
        return (
          <ul>
            {questions.map((q) => <li key={q._id}>{q.title}</li>)}
          </ul>
        );
      }
      ```
  - id: provider
    label: "ตรวจ `ConvexProvider` wrap อยู่ใน `app/layout.tsx` (จาก Session 1)"
    hint: "ถ้าไม่มี → useQuery จะ throw \"No Convex client\""
  - id: run
    label: "เปิด `http://localhost:3000/questions` → เห็น list (หรือข้อความ 'ยังไม่มีคำถาม')"
  - id: live-test
    label: "เปิด Dashboard อีก tab → เพิ่ม document ใหม่ผ่าน Dashboard → กลับไปดู `/questions`"
    detail_expandable: |
      **ไม่ต้อง refresh** — รายการใหม่ควรขึ้นทันที!
      นี่คือ 'real-time' ที่ตามมากับ useQuery — Session 10 จะอธิบายว่าทำงานยังไง
```

### 🧩 `<MermaidDiagram>` — flow
```yaml
chart: |
  sequenceDiagram
    autonumber
    participant C as Component (useQuery)
    participant CV as Convex Cloud
    participant DB as Database
    C->>CV: subscribe api.questions.list
    Note over C: ตอนนี้ value = undefined
    CV->>DB: query("questions").collect()
    DB-->>CV: [...docs]
    CV-->>C: push result
    Note over C: value = [...docs] → render
    Note over DB,CV: data เปลี่ยน?
    DB-->>CV: change detected
    CV->>DB: re-run query
    DB-->>CV: new result
    CV-->>C: push new value → auto re-render
caption: "useQuery subscribe ครั้งเดียว — Convex push update เองตลอด"
```

---
---

# Section 7 — 💥 ทำให้พัง: ทดสอบ mental model

### Narrative
"ตอนนี้ของรันได้แล้ว — มาทำให้พังเพื่อเห็นขอบเขต
**กฎเดิม: เขียน hypothesis ก่อนทำ**"

### 💥 Break 1 — ลบ loading check

### 🧩 `<HypothesisBox>`
```yaml
setup: |
  ใน `app/questions/page.tsx` — ลบบรรทัด `if (questions === undefined) return ...`
  ออกทั้งหมด เหลือเฉพาะ `.map(...)` ตรงๆ

  คาดว่าจะเกิดอะไรตอนเปิดหน้า?
input_type: textarea
prompt_placeholder: "ฉันคิดว่า ... เพราะ ..."
reveal_button: "ลองทำดู แล้วเปิดคำตอบ"
reveal_content: |
  **สิ่งที่เกิด:** browser console จะ throw
  > `TypeError: Cannot read properties of undefined (reading 'map')`

  React error overlay ขึ้นแดงเต็มจอ

  **บทเรียน:**
  - `undefined` ไม่ใช่ "data ว่าง" — มันคือ "ยังไม่มี data"
  - JS ไม่ห้ามเรียก `.map()` ตอน TS compile — แต่ runtime crash
  - ทุก `useQuery` ต้องมี check `=== undefined` เสมอ (หรือใช้ Suspense — Session 15)

  **ฝึกอ่าน error:**
  - "Cannot read properties of **undefined**" — บอกว่า value undefined
  - "(reading '**map**')" — บอกว่ากำลังพยายามเรียก `.map()`
  → root cause: ตัวที่คุณ `.map()` มันเป็น `undefined`
  → ฝึกอ่านแบบนี้ทุกครั้ง ก่อน paste ให้ AI

  **คืนสภาพ:** ใส่ check กลับ
```

### 💥 Break 2 — ใส่ `Math.random()` ใน query

### 🧩 `<HypothesisBox>`
```yaml
setup: |
  ใน `convex/questions.ts` — สร้าง query ใหม่:
  ```ts
  export const random = query({
    args: {},
    handler: async () => Math.random(),
  });
  ```
  Save → ดู terminal ของ `npx convex dev`

  คาดว่า Convex จะยอม deploy, warn, หรือ reject?
input_type: textarea
reveal_button: "ดูผลจริง"
reveal_content: |
  **Convex จะ throw error ตอน deploy หรือตอนรัน** บอกว่า query ต้อง deterministic

  (Behavior อาจต่างกันตาม version — บางทีโผล่ตอนเรียก, บางทีตอน deploy)

  **บทเรียน:**
  - Convex ไม่เพียงแนะนำ — มัน **บังคับ**. คุณ bypass ไม่ได้แม้พยายาม
  - เพราะถ้าปล่อย → real-time + cache เพี้ยนทั้งหมด
  - ถ้าต้องการ random ในผลลัพธ์ — generate ใน **mutation** (Session 4) แล้วเก็บลง DB แทน

  **ลบ query `random` ทิ้ง** หลังทดลองเสร็จ
```

### 💥 Break 3 — ปิดเน็ต กลางทาง

### 🧩 `<HypothesisBox>`
```yaml
setup: |
  1. เปิด `/questions` รอจน list ขึ้น
  2. ปิด Wi-Fi (หรือ DevTools → Network → Offline)
  3. เปิด Dashboard อีก tab (Dashboard cache อยู่ก็ได้) → ลอง insert document ใหม่ — มันจะ fail (offline)
  4. เปิด Wi-Fi กลับ
  5. ดู `/questions` — list update เองไหม?

  คาดว่าหลังเปิดเน็ตกลับ — ต้อง refresh เอง หรือมันมา?
input_type: textarea
reveal_button: "ลองทำดู แล้วเปิดคำตอบ"
reveal_content: |
  **list update เอง** — ไม่ต้อง refresh

  Convex client มี logic reconnect ในตัว — ตอนกลับ online → re-subscribe → ดึงค่าใหม่

  **บทเรียน:**
  - `useQuery` ≠ `fetch` — มันคือ subscription ที่ดูแล connection ให้
  - ฝั่งเราไม่ต้องเขียน retry/reconnect เอง
  - **แต่ระวัง:** ตอน offline component ของคุณยังเห็น 'value เดิมที่ cache ไว้' — ผู้ใช้ไม่รู้ว่า data อาจ stale
  - Session 15 จะคุยเรื่องบอก user ว่า 'กำลัง reconnect' ยังไง
```

---
---

# Section 8 — 🪞 Reflect

### Narrative
"ก่อนปิดหน้านี้ — ตอบ 5 คำถามนี้จริงๆ (save อัตโนมัติบน device)"

### 🧩 `<PersistentReflection>` × 5
```yaml
questions:
  - id: r1
    prompt: |
      **ก่อน** session นี้ ฉันคิดว่า "อ่านข้อมูลจาก backend" คือ ...
      **ตอนนี้** ฉันอธิบายได้ว่า ...
    placeholder: "2-3 ประโยค"

  - id: r2
    prompt: |
      ถ้าเพื่อนถามว่า "ทำไม `undefined` กับ `[]` ต่างกัน?"
      ฉันจะตอบใน 1 ประโยคว่า ...

  - id: r3
    prompt: |
      ใน Break 1 (ลบ loading check) — error message ที่เจอคือ ...
      ฉันอ่านมันแล้ว identify root cause ได้จากคำว่า ...

  - id: r4
    prompt: |
      ทำไม Convex ห้าม `Math.random` ใน query? อธิบายเป็นภาษาคน
      *(ห้ามใช้คำว่า "deterministic" / "pure" — บังคับให้อธิบายแบบเล่าให้คนทั่วไปฟัง)*

  - id: r5
    prompt: "ส่วนที่ยังไม่ชัดที่สุดของฉันคือ ... (จะเป็นจุดเริ่ม session ต่อไป)"
```

### 🧩 `<ConfidenceSlider>`
```yaml
prompt: "หลังหน้านี้ — ฉันมั่นใจแค่ไหนว่า 'query + useQuery + 3 states' ทำงานยังไง?"
scale: 0-10
labels:
  0: "ยังไม่ค่อยเข้าใจ"
  5: "พอเข้าใจ แต่เขียนเองยังไม่คล่อง"
  10: "อธิบายเพื่อน + เขียน query ใหม่ได้แน่นอน"
persist: true
note: "ถ้า ≤ 5 → กลับไปอ่าน Section 4 (3 states) อีกครั้ง"
```

---
---

# 🔭 Looking ahead → Session 4

หน้าต่อไปจะตอบคำถาม:
- "ตอนนี้ฉันอ่าน data ได้แล้ว — แต่จะ **เขียน** ลง database ยังไง?"
- "ถ้า client ส่ง data ผิด format มา — ใครจับ?"
- "Mutation ต่างกับ query ยังไง — ทำไม Convex ต้องแยก?"

→ คำตอบคือ **Mutation + Validation** — เริ่มเข้าใจว่าทำไม Convex บังคับให้ validator ที่ boundary

---

## 📝 Notes for page author

- ทุก `<HypothesisBox>` และ `<PersistentReflection>` ใช้ `localStorage` key scoped ตาม session id (`s3-r1`, `s3-break-1`, ...)
- `<CheckboxList>` Section 6 ต้อง persist (นักเรียนทำกลับมาทำต่อได้)
- ภาษา: ไทยเป็นหลัก. ศัพท์ที่ wrap ใน `<Jargon>`: "pure function", "subscription", "hook", "side effect", "deterministic"
- `<MultipleChoice>` — แสดง explanation **ทุกตัวเลือก** หลังตอบ (ค่าอยู่ที่ "ทำไมตัวเลือกอื่นใกล้แต่ไม่ใช่")
- Code snippets ของ query และ Next.js page — render ผ่าน `<CodeExample>` (มี syntax highlight + theme)
- Break 1 อาศัยให้ Section 6 จบก่อน (มี page รันอยู่)
- Mermaid diagram ใน Section 6 — sequence diagram แสดง subscription flow (ตาม [01-diagrams-use-mermaid.md](../docs/lesson-generation/01-diagrams-use-mermaid.md))
- Break 3 อาจไม่สะดวกสำหรับนักเรียนบางคน (ปิด Wi-Fi) → เน้นว่า "ลองได้ถ้าสะดวก ถ้าไม่ — อ่านคำตอบเข้าใจก็พอ"
- Looking ahead ส่ง mood ไป Session 4 (mutation) — ไม่ใช่ Session 10 (real-time) เพราะ pedagogical arc ยังต้องเดินทีละก้าว
