# Session 2 — Schema: ทำไมการ "สัญญา" ก่อนเขียนถึงสำคัญ

> **Week 1** · Online self-paced tutorial
> Page: `course/app/week-1/session-2/page.tsx`
> Part of [Convex Course Outline](../COURSE_OUTLINE.md)

---

## 🎯 Page goals

หลังจบหน้านี้ นักเรียน:
- อธิบายได้ว่า **schema คือ "สัญญา"** ระหว่างเรากับ database — ในภาษาตัวเอง
- รู้ว่า TypeScript ไม่พอ — ต้องมี **runtime validator** ด้วย และอธิบายได้ว่าทำไม
- เขียน schema สำหรับ table `questions` ได้ พร้อมเลือก type ที่เหมาะกับแต่ละ field
- เริ่มคิดแบบ **"it depends"** — รู้ว่า schema เคร่ง/หลวม มี trade-off ทั้งคู่
- เริ่มใช้นิสัย **"เปิด docs เป็นที่แรก"** ก่อนถาม AI

**ไม่ใช่เป้าหมาย:** เขียน query/mutation จริง (Session 3-4), ออกแบบ relations ระหว่าง table (Session 5), index (Session 6), migration จริงบน production (Session 18)

---

## 🧩 Interactive components ที่ใช้ในหน้านี้

| Component | จำนวน | ใช้ตรงไหน |
|---|---|---|
| `PredictThenReveal` | 2 | Hook + ก่อนเปิด docs ครั้งแรก |
| `MultipleChoice` | 2 | TypeScript vs validator + Type picking quiz |
| `DragToBucket` | 1 | จับคู่ field กับ Convex type ที่ถูก |
| `StepReveal` | 1 | 3 ประโยชน์ของ schema (เปิดทีละข้อ) |
| `ToggleCompare` | 1 | Schema เคร่ง vs หลวม — แต่ละข้อให้-แต่ละข้อเสีย |
| `CheckboxList` | 1 | Schema-writing checklist (persist) |
| `HypothesisBox` | 3 | Break it scenarios |
| `PersistentReflection` | 5 | Reflection answers |
| `ConfidenceSlider` | 1 | ปิด session — ประเมินความมั่นใจ |
| `Jargon` | ~5 | wrap คำเช่น "validator", "runtime", "migration", "literal type", "union type" |

---
---

# Section 1 — Hook: ถ้าคุณเป็น Convex จะรู้ได้ยังไงว่าข้อมูลถูก?

### Narrative
"สมมุติว่าคุณเป็น **Convex** — มีนักพัฒนาทั่วโลกส่งข้อมูลมาเก็บใน database ของคุณวันละหลายพันรายการ
ปัญหาคือ: นักพัฒนาบางคนก็ส่ง `{ title: 'Quiz 1', score: 10 }` บางคนส่ง `{ name: 'Quiz 1', points: '10' }` บางคนส่งทั้ง `{ title: null }` ด้วย

**คุณจะรู้ได้ยังไงว่า — อันไหนถูก อันไหนพัง?**

หยุดก่อน ลองคิด 30 วินาที. อย่าพึ่ง scroll ลง"

### 🧩 `<PredictThenReveal>`
```yaml
question: "ถ้าคุณเป็นคนเขียน Convex — คุณจะออกแบบให้ database 'รู้' ว่าข้อมูลที่รับเข้ามาถูก format หรือเปล่ายังไง?"
hint: "นึกถึงตอนคุณกรอก form ที่บังคับว่า 'email ต้องมี @' — ใครเป็นคนตรวจ? ตรวจตอนไหน?"
input_type: textarea
reveal_button: "ดูคำตอบ"
reveal_content: |
  คำตอบสั้น: **ให้นักพัฒนาบอกล่วงหน้าว่า "ข้อมูลของฉันหน้าตาแบบนี้นะ"**
  สิ่งนี้เรียกว่า **schema** — เหมือนการ "ทำสัญญา" ก่อนเริ่มเขียนข้อมูล

  พอมีสัญญา Convex ก็:
  - **ปฏิเสธ** ข้อมูลที่ไม่ตรง format (validation)
  - **บอก IDE ของคุณ** ว่าแต่ละ field type อะไร (TypeScript autocomplete)
  - **เป็นเอกสาร** ให้เพื่อนในทีม (และอนาคตของคุณเอง) อ่านได้
note: ไม่ต้อง "ตอบถูก" — แค่ได้ลองคิดจากมุม Convex ก่อนจะมาเรียนจากมุม developer
```

### Closing
"พอเรารู้แล้วว่า Convex อยากให้เรา 'ทำสัญญา' — มาดูกันว่าสัญญานี้หน้าตายังไง"

---
---

# Section 2 — ลองโลกที่ไม่มี schema

### Narrative
"ก่อนเราจะเข้าใจคุณค่าของ schema — มาดูปัญหาของ database ที่ **ไม่มี** schema เลยกัน

ลองนึกภาพ MongoDB แบบ default — เขียนอะไรเข้าไปก็ได้ ไม่มีใครห้าม
ปีนึงผ่านไป ทีมมีคน 5 คน เขียน data ใส่ table `questions` อย่างนี้:"

### 🧩 `<DragToBucket>` (ใช้ในมุม "ตรวจ data ที่ปนกัน")
```yaml
intro: |
  ทีมเขียน data ปนกันแบบนี้ — ลากแต่ละ document ไปกล่อง "พอใช้ได้" หรือ "พัง"
  (สังเกตว่าไม่มีใครถูก 100% — เพราะไม่มี contract)
buckets:
  - id: ok
    label: "พอใช้ได้ (ตามสมมุติฐานของ developer ที่เขียน)"
  - id: broken
    label: "พังแน่ — UI หรือ logic จะอ่านไม่ได้"
items:
  - text: '{ title: "ทุนนิยมคืออะไร", choices: ["A","B","C"], answer: 0 }'
    correct_bucket: ok
    why: "format มาตรฐาน — ใช้ได้กับ UI ที่คาด format นี้"
  - text: '{ name: "ทุนนิยมคืออะไร", options: ["A","B","C"], correct: "A" }'
    correct_bucket: broken
    why: "field name คนละชื่อ — code ที่อ่าน `title` จะเจอ undefined"
  - text: '{ title: "ทุนนิยมคืออะไร", choices: "A,B,C", answer: "0" }'
    correct_bucket: broken
    why: "type ผิด — `choices` เป็น string ไม่ใช่ array, `answer` เป็น string ไม่ใช่ number"
  - text: '{ title: null, choices: ["A","B"], answer: 1 }'
    correct_bucket: broken
    why: "`title` เป็น null — UI render คำถามว่างเปล่า"
  - text: '{ title: "OK", choices: ["A","B"], answer: 1, rating: 5, tags: ["econ"] }'
    correct_bucket: ok
    why: "field เกินมา แต่ไม่ขัด — ปัญหาคือไม่มีใครรู้ว่า rating/tags มาจากไหน อยู่จริงหรือเปล่าใน document อื่น"
feedback_mode: "instant per drop"
```

### Insight
"สังเกตไหม? โดยที่ไม่มี contract:
- ทุกคนคิดว่าตัวเองเขียน 'ถูก'
- แต่จริงๆ **ไม่มีใครรู้** ว่าอะไรคือ 'ถูก'
- พอ data หลากหลาย → UI ต้อง if-else ครอบทุก field
- พอ debug → ต้องเปิดดู document ทีละอันว่าใครเขียนแบบไหน

นี่คือเหตุผลที่ Convex บอกว่า: **'ก่อนเขียน data เลย — บอกฉันก่อนว่า data หน้าตายังไง'**"

---
---

# Section 3 — Mental model: Schema = สัญญา (Contract)

### Narrative
"คำเดียวที่ขอให้จำหลังจบ section นี้ — **schema = contract (สัญญา)**

สัญญานี้ทำไว้ระหว่าง:
- **คุณ** (developer) ที่ส่ง data เข้าไป
- **Convex** (database) ที่รับเก็บ
- **อนาคต** (เพื่อน + ตัวคุณเอง 6 เดือนข้างหน้า) ที่จะมาอ่าน

พอมีสัญญา → ทั้งสามฝ่ายเข้าใจตรงกัน"

### 3 ประโยชน์ของ schema — เปิดทีละข้อ

### 🧩 `<StepReveal>`
```yaml
intro: "Schema ให้อะไรเรา 3 อย่าง:"
steps:
  - title: "1. 🛡 Validation (runtime)"
    body: |
      ตอนที่ data ถูกส่งไป Convex Cloud → Convex ตรวจกับ schema ทันที
      ถ้าผิด format → **reject ไม่ให้เขียนลง database**
      (เกิดในเครื่อง Convex — ไม่ใช่ในเครื่องคุณ → bypass ไม่ได้)
  - title: "2. 🧠 Type safety (TypeScript)"
    body: |
      Schema generate types ให้อัตโนมัติ → IDE รู้ว่าแต่ละ field type อะไร
      → autocomplete + caught typo ก่อน save ไฟล์
  - title: "3. 📖 Documentation (เพื่อน + ตัวคุณ)"
    body: |
      เพื่อนเปิด `schema.ts` → อ่านเข้าใจทันทีว่า table นี้เก็บอะไร
      ไม่ต้องเดาจาก code, ไม่ต้องเปิด Dashboard ดู
reveal_one_at_a_time: true
reveal_button_label: "เปิดข้อต่อไป →"
closing: |
  สังเกต — 1 และ 2 ทำงานคนละเวลา:
  - **TypeScript** ตรวจตอน **เขียน code** (compile-time)
  - **Validator** ตรวจตอน **รัน** (runtime)
  ทำไมต้องมีทั้งสอง? เก็บคำถามนี้ไว้ — section ต่อไปจะคุย
```

---
---

# Section 4 — TypeScript ทำไมไม่พอ?

### Narrative
"คำถามที่ developer ส่วนใหญ่เจอครั้งแรก:
> 'ฉันเขียน TypeScript อยู่แล้ว — รู้ type ทุก field แล้ว ทำไมต้องมี validator อีก?'

ลองคิดดูก่อน 30 วินาที. อย่าพึ่ง scroll"

### 🧩 `<MultipleChoice>`
```yaml
question: "ทำไม TypeScript types อย่างเดียว **ไม่พอ** สำหรับ database?"
options:
  - id: A
    label: "TypeScript ช้าเกินไป"
    correct: false
    explanation: "ไม่ใช่ — TypeScript เร็วมาก. ปัญหาคือเรื่อง 'ตอนไหน' TypeScript ทำงาน ไม่ใช่ 'เร็วแค่ไหน'"
  - id: B
    label: "TypeScript ตรวจตอน compile — พอ deploy ขึ้น server แล้ว type หายไป ไม่มีใครตรวจ runtime"
    correct: true
    explanation: |
      ใช่ — นี่คือหัวใจ.
      TypeScript = "เครื่องช่วย developer ตอนพิมพ์ code". พอ compile เป็น JavaScript → type ถูกลบทิ้ง
      ที่ Convex server — มันรู้แค่ JavaScript ที่รัน. ถ้าไม่มี validator runtime → ใครก็ส่ง JSON อะไรมาก็ได้
  - id: C
    label: "เพราะ Convex ไม่ support TypeScript"
    correct: false
    explanation: "Convex support TypeScript เต็มที่ — schema คุณเขียนเป็น TypeScript นั่นแหละ. ปัญหาไม่ใช่ support"
  - id: D
    label: "เพราะ database เก็บข้อมูลเป็น binary ไม่ใช่ JSON"
    correct: false
    explanation: "ไม่เกี่ยวกับ storage format — เกี่ยวกับว่า 'มีใครยืน guard ตอน runtime ไหม'"
show_all_explanations_after_pick: true
```

### Mental model
"คิดเหมือนสนามบิน:
- **TypeScript** = แผนที่บอกผู้โดยสารว่าเกตอยู่ไหน (ช่วยคนเดินทาง = developer)
- **Validator (schema)** = เจ้าหน้าที่ตรวจ passport ที่ประตูเข้าเครื่อง (ช่วย system = database)

แผนที่ไม่ได้กั้นใคร — เจ้าหน้าที่ตรวจ passport กั้น
ถ้าไม่มีเจ้าหน้าที่ — ใครก็ขึ้นเครื่องได้แม้ไม่มี passport"

---
---

# Section 5 — เห็นของจริง: เขียน schema สำหรับ `questions`

### Narrative
"พอเข้าใจ 'ทำไม' แล้ว — มาเขียน schema จริงกัน
**โจทย์:** quiz app ของเราต้องเก็บคำถาม. คำถามแต่ละข้อมี:
- หัวข้อ (text)
- ตัวเลือก (array ของ text)
- คำตอบที่ถูก (index ของตัวเลือก)
- ระดับความยาก (easy / medium / hard)
- คำอธิบายเฉลย (มีหรือไม่มีก็ได้)

ก่อนดู code — ลองเดาก่อน"

### 🧩 `<PredictThenReveal>`
```yaml
question: "ถ้าคุณเป็นคนเขียน schema นี้ — แต่ละ field ใช้ type อะไร (เดาด้วยชื่อ type ที่คุณคิดออกก็พอ)"
hint: "ลองนึกถึง TypeScript ที่คุณเคยเขียน — string, number, array, union, optional..."
input_type: textarea
reveal_button: "ดูเฉลย"
reveal_content: |
  ```ts
  // convex/schema.ts
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
  ```
  เปรียบกับที่คุณเดา — ตรงไหนตรง, ตรงไหนคิดต่าง?
```

### อ่านทีละบรรทัด
"ทุกบรรทัดมีเหตุผล — เปิดทีละจุด"

### 🧩 `<StepReveal>`
```yaml
intro: "Schema นี้ใช้ types อะไรบ้าง:"
steps:
  - title: "`v.string()`"
    body: "ค่า text ปกติ. ถ้าส่ง number หรือ null มา → reject"
  - title: "`v.number()`"
    body: "ตัวเลข. Convex ไม่แยก int/float — เก็บเป็น number ตัวเดียว"
  - title: "`v.array(v.string())`"
    body: "Array ของ string. สังเกต: ใส่ `v.string()` ข้างใน → ทุก element ต้องเป็น string. Array of mixed types ก็ทำได้ด้วย `v.union`"
  - title: "`v.union(v.literal('easy'), ...)`"
    body: |
      **union** = หนึ่งในหลายอย่าง. **literal** = ค่าตายตัวเป๊ะ
      รวมกัน = "ค่าต้องเป็น 'easy' หรือ 'medium' หรือ 'hard' เท่านั้น — ค่าอื่น reject"
      เทียบ TypeScript: `type Difficulty = 'easy' | 'medium' | 'hard'`
  - title: "`v.optional(v.string())`"
    body: "field นี้จะมีหรือไม่มีก็ได้. ถ้ามี → ต้องเป็น string. ถ้าไม่มี → ok ไม่ใส่ field เลย"
reveal_one_at_a_time: true
```

### 🧩 `<DragToBucket>` — Type matching
```yaml
intro: "ลองจับคู่ — แต่ละ field ควรใช้ type ไหน?"
buckets:
  - id: string
    label: "v.string()"
  - id: number
    label: "v.number()"
  - id: union-literal
    label: "v.union(v.literal(...), ...)"
  - id: array
    label: "v.array(...)"
  - id: optional
    label: "v.optional(...)"
items:
  - text: "ชื่อผู้ใช้"
    correct_bucket: string
    why: "text เปิดกว้าง — ไม่ใช่ค่าตายตัว"
  - text: "สถานะคำสั่งซื้อ (pending/paid/shipped)"
    correct_bucket: union-literal
    why: "ค่าจำกัด 3 ตัว — union ของ literal เหมาะกว่า string (เพราะ string จะรับค่าผิดได้)"
  - text: "ราคาสินค้า (บาท)"
    correct_bucket: number
    why: "ตัวเลข"
  - text: "Tags ของบทความ"
    correct_bucket: array
    why: "หลายค่า → array. ข้างในใส่ v.string() อีกที"
  - text: "Bio ของ user (อาจไม่กรอกก็ได้)"
    correct_bucket: optional
    why: "ไม่บังคับมี → optional. ข้างในใส่ v.string()"
feedback_mode: "instant per drop"
```

---
---

# Section 6 — Trade-off: เคร่ง vs หลวม

### Narrative
"คำถามที่ developer ใหม่มักถาม:
> 'ถ้า schema เคร่งดีนัก — ใส่ทุก field ให้ strict ไปเลยสิ?'

คำตอบ: **it depends** — มาดูทั้ง 2 ฝั่ง"

### 🧩 `<ToggleCompare>`
```yaml
toggle_options:
  - id: strict
    label: "Schema เคร่ง"
  - id: flexible
    label: "Schema หลวม"

side_strict:
  title: "Schema เคร่ง (ทุก field strict + union literal)"
  pros:
    - "Bug น้อย — ข้อมูลผิด format โดน reject ทันที"
    - "TypeScript autocomplete แม่นมาก"
    - "อ่าน schema เข้าใจ business rule ได้เลย"
  cons:
    - "เพิ่ม value ใหม่ใน union → ต้องแก้ schema + migrate data เก่า"
    - "Prototype ช้า — แค่ทดลองก็ต้อง declare ทุกอย่าง"
    - "ถ้าออกแบบผิดตั้งแต่ต้น → แก้ยาก"

side_flexible:
  title: "Schema หลวม (v.any, v.optional เยอะ, ไม่มี literal)"
  pros:
    - "Prototype เร็ว — เปลี่ยน shape ของ data ได้ไม่ต้องแก้ schema"
    - "Migration เกือบไม่เจ็บ"
    - "เหมาะกับช่วง 'ยังไม่รู้ว่าจะเก็บอะไรกันแน่'"
  cons:
    - "Bug runtime เพิ่ม — ส่ง garbage มาเก็บได้"
    - "TypeScript ช่วยไม่ค่อยได้ (type เป็น any)"
    - "ผ่านไป 6 เดือน → ไม่มีใครรู้ shape จริงของ data"

caption: |
  Heuristic: **เริ่มเคร่งกลางๆ — ทำให้หลวมเมื่อมีเหตุผลจริง**
  ไม่ใช่ "หลวมไว้ก่อน เผื่อ flexible" — เพราะค่าจ่ายมักโผล่ตอน production
```

### 🧩 `<MultipleChoice>` — Trade-off scenario
```yaml
question: |
  ทีมคุณกำลังทำ MVP สำหรับ pitch ภายใน 1 สัปดาห์. ยังไม่ได้คุยกับลูกค้าจริง.
  คุณกำลังออกแบบ table `submissions` — ควรเลือก schema แบบไหน?
options:
  - id: A
    label: "Strict สุด — ทุก field มี v.literal/union — แม้ไม่รู้ค่าทั้งหมด"
    correct: false
    explanation: "ตอนนี้ยังไม่รู้ทุก case — เคร่งเกินจะติดที่ตัวเองเป็นประจำ. รอให้ใช้จริงก่อน แล้วค่อยรัด"
  - id: B
    label: "เคร่งพอดี — field ที่รู้แน่ ใส่ strict / field ที่ยังลังเลใส่ optional หรือ string ก่อน"
    correct: true
    explanation: |
      ใช่ — strict ในจุดที่มั่นใจ + ยืดหยุ่นในจุดที่ยังลังเล
      พอ MVP มี feedback จริง → ค่อยรัดมาเรื่อยๆ
  - id: C
    label: "ไม่ใช้ schema เลย — เร็วที่สุด"
    correct: false
    explanation: "Convex บังคับให้มี schema (หรือไม่ก็เป็น `v.any()`). 'เร็ว' ตอนนี้ = bug ตอน demo สด"
show_all_explanations_after_pick: true
```

---
---

# Section 7 — 🤖 ใช้ docs (ไม่ใช่ AI) เป็นที่แรก

### Narrative
"นิสัยสำคัญที่จะใช้ตลอดคอร์ส: **เปิด docs ก่อนถาม AI**

ทำไม? เพราะ:
- Docs ของ Convex เขียนเอง — ถูกเสมอ
- AI อาจ hallucinate type/method ที่ไม่มีจริง (โดยเฉพาะ library ที่ใหม่)
- ฝึกอ่าน docs = skill ที่ใช้กับทุก library ในชีวิต"

### Mini-exercise — ลองเปิด docs

### 🧩 `<CheckboxList>`
```yaml
title: "เปิด Convex schema docs ที่ https://docs.convex.dev/database/schemas — หาคำตอบ 3 ข้อนี้เอง"
persist: true
items:
  - id: q1
    label: "Convex มี type สำหรับ boolean (true/false) ไหม? ชื่ออะไร?"
    hint: "Search หน้า docs ด้วยคำว่า 'boolean'"
  - id: q2
    label: "ถ้าอยากเก็บ field ที่เป็น object ซ้อน — ใช้ type อะไร?"
    hint: "ลองอ่านส่วน 'Validators' หรือ 'Nested objects'"
  - id: q3
    label: "Convex มี type สำหรับเก็บวันที่ (Date) แยกไหม? ถ้าไม่มี — แล้วเก็บยังไง?"
    hint: "Search ด้วยคำว่า 'date' หรือ 'timestamp' — คำตอบอาจไม่ใช่อย่างที่คาด"
note: "ตอบไม่ได้ก็ไม่เป็นไร — ขีด ✓ ตอนคุณ 'หา' แล้ว ไม่ต้องรอ 'เข้าใจ 100%'"
```

### 🧩 `<PredictThenReveal>` — ก่อนดูเฉลย
```yaml
question: "เขียนคำตอบสั้นๆ ของ 3 ข้อด้านบน ก่อนกดดูเฉลย"
input_type: textarea
reveal_button: "เปิดเฉลย"
reveal_content: |
  1. **Boolean:** `v.boolean()` — รับ `true` หรือ `false` เท่านั้น
  2. **Object ซ้อน:** `v.object({ ... })` — เช่น `address: v.object({ city: v.string(), zip: v.string() })`
  3. **Date:** ไม่มี `v.date()` — เก็บเป็น `v.number()` แทน (Unix timestamp ใน ms)
     เหตุผล: JSON ไม่มี Date type — Convex storage = JSON-based → ใช้ number แล้ว format ใน UI

  ทุกคำตอบนี้คุณ **หาเอง** ได้ใน docs — ไม่ต้องรอใครบอก. นี่คือ skill ที่ใช้ตลอดอาชีพ
```

### Closing
"จากนี้ไป — ก่อนถาม AI ลองถามตัวเอง:
'ฉันลองเปิด docs ดูแล้วหรือยัง?'"

---
---

# Section 8 — 🧪 ลงมือ: ใส่ schema เข้าโปรเจกต์

### Narrative
"ตอนนี้ใส่ schema ที่เราเห็นใน Section 5 ลงโปรเจกต์จริง

**เป้าหมาย:** ให้ Convex Dashboard ขึ้น table `questions` พร้อม schema ที่เขียนไว้"

### 🧩 `<CheckboxList>` — Schema setup
```yaml
title: "Setup checklist (persist)"
persist: true
items:
  - id: file
    label: "สร้างไฟล์ `convex/schema.ts`"
    detail_expandable: |
      ในโฟลเดอร์ `convex/` (ที่ Session 1 สร้างไว้)
      ถ้ายังไม่มี — สร้างใหม่ที่ root ของ `convex/`
  - id: paste
    label: "Copy schema จาก Section 5 ใส่ในไฟล์นี้"
  - id: dev-running
    label: "ตรวจว่า `npx convex dev` รันอยู่ใน terminal อีกอันหนึ่ง"
    hint: "ถ้าไม่รัน — schema จะไม่ sync ขึ้น Cloud"
  - id: deploy-msg
    label: "ดู terminal ของ `npx convex dev` — ต้องมีข้อความว่า schema deployed สำเร็จ"
    detail_expandable: |
      ถ้าเจอ error เช่น `Cannot find module "convex/values"`
      → ตรวจว่าได้ทำ Session 1 จบครบ (`npm install convex` แล้ว)
  - id: dashboard
    label: "เปิด Convex Dashboard → tab 'Data' → ต้องเห็น table `questions` (empty)"
    detail_expandable: |
      Table จะปรากฏแม้ยังไม่มี document — เพราะ schema ประกาศไว้แล้ว
      Click ที่ table → tab 'Schema' → เห็น structure ที่คุณ define
  - id: try-insert
    label: "ลอง insert document ผ่าน Dashboard (ปุ่ม 'Add document')"
    detail_expandable: |
      Dashboard มี form ตาม schema — กรอก title, choices, answerIndex, difficulty
      สังเกตว่า field `difficulty` มี dropdown แค่ 3 ค่า (จาก union literal)
      → นี่คือสัญญาที่ทำงาน
```

---
---

# Section 9 — 💥 ทำให้พัง: ทดสอบสัญญา

### Narrative
"ตอนนี้ schema ทำงานแล้ว — มาทดสอบว่า 'สัญญา' มันรัดแน่นแค่ไหน
**ทุก scenario ข้างล่าง: เขียน hypothesis ก่อนทำ** แล้วค่อยลอง"

### 💥 Break 1 — เพิ่ม field ที่ไม่ได้อยู่ใน schema

### 🧩 `<HypothesisBox>`
```yaml
setup: |
  ใน Dashboard → ลอง insert document ที่มี field พิเศษ เช่น:
  ```json
  { "title": "test", "choices": ["A","B"], "answerIndex": 0,
    "difficulty": "easy", "rating": 5 }
  ```
  (`rating` ไม่ได้อยู่ใน schema)

  คุณคาดว่าจะเกิดอะไร — Convex จะ reject, ยอมรับ, หรือ ignore?
input_type: textarea
prompt_placeholder: "ฉันคิดว่า ... เพราะ ..."
reveal_button: "ลองทำดู แล้วเปิดคำตอบ"
reveal_content: |
  **สิ่งที่เกิด:** Convex **reject** — error บอกว่า "Object contains extra field"

  **บทเรียน:**
  - Default ของ Convex schema = **strict** — field ที่ไม่ประกาศไว้ = ไม่ยอมรับ
  - ป้องกัน typo เช่น `titel: "..."` (พิมพ์ผิด title) ไม่ให้แอบเข้า database
  - ถ้าอยากอนุญาต extra fields → ใช้ option ใน `defineTable` (ลองเปิด docs หาดู — ฝึก B1)
```

### 💥 Break 2 — ส่ง type ผิด

### 🧩 `<HypothesisBox>`
```yaml
setup: |
  ลอง insert document นี้:
  ```json
  { "title": "test", "choices": ["A","B"],
    "answerIndex": "0", "difficulty": "easy" }
  ```
  สังเกต: `answerIndex` เป็น `"0"` (string) ไม่ใช่ `0` (number)

  Convex จะทำยังไง?
input_type: textarea
reveal_button: "ดูผลจริง"
reveal_content: |
  **Reject** — error: "Expected number, got string"

  **บทเรียน:**
  - Validator ไม่ auto-cast — `"0"` ≠ `0`. Convex ไม่ "เดาให้"
  - ใจดีต่อ developer = โหดต่อ data quality. Convex เลือกข้างหลัง
  - ถ้า bug ของคุณคือ "frontend ส่ง string มาแทน number" → schema จะจับได้ทันที (ไม่ลามไปถึง query เพี้ยน)
```

### 💥 Break 3 — เปลี่ยน schema หลังมีข้อมูล

### 🧩 `<HypothesisBox>`
```yaml
setup: |
  1. ตอนนี้ table `questions` มี document อย่างน้อย 1 อัน (จาก Section 8) แล้ว
  2. แก้ `schema.ts` — เปลี่ยน `answerIndex: v.number()` เป็น `answerIndex: v.string()`
  3. Save → ดู terminal ของ `npx convex dev`

  คุณคาดว่าจะเกิดอะไร — มัน deploy ผ่าน, fail, หรือยอมแล้ว migrate data ให้?
input_type: textarea
reveal_button: "ลองทำดู แล้วเปิดคำตอบ"
reveal_content: |
  **Schema deployment FAIL** — Convex บอก:
  > "Schema validation failed: existing documents do not match new schema"
  พร้อมตัวอย่าง document ที่ขัดกับ schema ใหม่

  **บทเรียน (สำคัญที่สุดของ session):**
  - Schema = **สัญญา** — เปลี่ยนทีหลัง = **เจ็บ**
  - Convex ไม่ยอม deploy ถ้า data เก่าไม่ match → กัน production พัง
  - ทางแก้: เขียน **migration** (Session 18 จะพูดถึง) เพื่อแปลง data เก่าก่อน, แล้วค่อยเปลี่ยน schema
  - **Implication:** ออกแบบ schema ครั้งแรก ควรคิดให้ดี (แต่ก็ไม่ต้อง perfect — ของเปลี่ยนได้ แค่มี cost)

  **คืนสภาพ:** เปลี่ยน `answerIndex` กลับเป็น `v.number()` → save → schema deploy ผ่าน
```

---
---

# Section 10 — 🪞 Reflect

### Narrative
"ก่อนปิดหน้านี้ — ตอบ 5 คำถามนี้จริงๆ (save อัตโนมัติบน device)
เขียนสั้นๆ ตรงๆ ที่คุณคิด — ไม่ต้องสวยหรู"

### 🧩 `<PersistentReflection>` × 5
```yaml
questions:
  - id: r1
    prompt: |
      **ก่อน** session นี้ ฉันคิดว่า "schema" คือ ...
      **ตอนนี้** ฉันอธิบายได้ว่า ...
    placeholder: "2-3 ประโยค"

  - id: r2
    prompt: |
      ถ้าเพื่อนถามว่า "ทำไม TypeScript ไม่พอ ต้องมี validator อีกทำไม?"
      ฉันจะตอบใน 1 ประโยคว่า ...
      *(ห้ามใช้คำว่า "compile-time" / "runtime" — บังคับให้อธิบายเป็นภาษาคน)*

  - id: r3
    prompt: |
      ใน Break 3 (เปลี่ยน type หลังมีข้อมูล) — สิ่งที่เกิดทำให้ฉันเข้าใจว่า ...
      และถ้าฉันออกแบบ schema ครั้งต่อไป ฉันจะ ...

  - id: r4
    prompt: |
      ฉันเปิด Convex docs ใน Section 7 — ความรู้สึกแรกเป็นยังไง? ง่ายหรือยาก?
      ฉันเจออะไรใน docs ที่ AI อาจตอบไม่ตรงเป๊ะ?

  - id: r5
    prompt: "ส่วนที่ยังไม่ชัดที่สุดของฉันคือ ... (จะเป็นจุดเริ่ม session ต่อไป)"
```

### 🧩 `<ConfidenceSlider>`
```yaml
prompt: "หลังหน้านี้ — ฉันมั่นใจแค่ไหนว่า 'schema คืออะไร และทำไมต้องมี'?"
scale: 0-10
labels:
  0: "ยังไม่ค่อยเข้าใจว่าทำไม"
  5: "พอเข้าใจ why แต่เขียน schema ใหม่เองยังไม่คล่อง"
  10: "อธิบายเพื่อน + เขียน schema ใหม่ได้แน่นอน"
persist: true
note: "ถ้า ≤ 5 → กลับไปอ่าน Section 3-4 อีกครั้งโดยไม่ต้องรีบ. ไม่มีคำตอบที่ 'ถูก'"
```

---
---

# 🔭 Looking ahead → Session 3

หน้าต่อไปจะตอบคำถาม:
- "ตอนนี้ schema มีแล้ว — แต่จะ **อ่าน** data จาก database ยังไง?"
- "ทำไม React component ต้องรู้ตอน 'ยังโหลดอยู่' vs 'โหลดเสร็จแล้วว่าง' vs 'โหลดเสร็จมี data'?"
- "Convex query คืออะไร — ต่างกับ HTTP API request ที่เคยใช้ยังไง?"

→ คำตอบคือ **Query + Loading states** — รากของสิ่งที่ทำให้ Convex รู้สึก "real-time"

---

## 📝 Notes for page author

- ทุก `<HypothesisBox>` และ `<PersistentReflection>` ใช้ `localStorage` key scoped ตาม session id (เช่น `s2-r1`, `s2-break-1`) — refresh แล้วค่าเดิมยังอยู่
- `<CheckboxList>` ทั้ง schema setup และ docs exercise ต้อง persist (นักเรียนอาจปิด tab แล้วกลับมา)
- ภาษา: ไทยเป็นหลัก. ศัพท์ที่ wrap ใน [`<Jargon>`](../docs/lesson-generation/02-beginner-jargon-tooltips.md): "validator", "runtime", "compile-time", "migration", "literal type", "union type", "timestamp"
- `<MultipleChoice>` — แสดง explanation **ทุกตัวเลือก** หลังตอบ (ค่าอยู่ที่ "ทำไมตัวเลือก B ผิดทั้งที่ดูเหมือนถูก")
- Code snippet ของ `schema.ts` ใน Section 5 — render ผ่าน `<CodeExample>` (มี syntax highlight + copy button) ไม่ใช่ ` ``` ` ดิบ
- Break 3 อาจล้มเหลวบ้างเพราะนักเรียนยังไม่ได้ insert document ก่อน → Section 8 checklist ข้อสุดท้าย (`try-insert`) **จำเป็น** สำหรับ Break 3 ทำงาน
- Docs link ใน Section 7 (`https://docs.convex.dev/database/schemas`) — ตรวจอีกครั้งตอน publish ว่ายัง valid
- ห้าม gate session ต่อไปด้วย quiz — soft progress only
- Diagram (ถ้าเพิ่ม) — แนะนำ Mermaid ตาม [01-diagrams-use-mermaid.md](../docs/lesson-generation/01-diagrams-use-mermaid.md). Session นี้ไม่จำเป็นต้องมี diagram ขนาดใหญ่ — visual หลักคือ schema code + dashboard screenshot
