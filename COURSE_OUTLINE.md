# 📋 Course Outline — รายละเอียดทุก Session

> 6 สัปดาห์ × 3 sessions × 1.5 ชั่วโมง = 27 ชั่วโมง  
> ภาษา: ไทย | ระดับ: ผู้เริ่มต้น | โปรเจกต์: Quiz App

---

## 📖 วิธีอ่าน Outline นี้

แต่ละ session มีโครงสร้างดังนี้:

```
🎯 เป้าหมาย   — นักเรียนได้อะไรจาก session นี้
💡 แนวคิด     — concept ที่สอน (what + why)
👀 ตัวอย่าง   — code/diagram ที่แสดงให้ดู
🤖 Cursor     — ตัวอย่าง prompt ที่ดี สำหรับฝึก
🧪 ทดลอง      — exercise ที่นักเรียนทำเอง
💥 ทำให้พัง  — error ที่เตรียมไว้ให้เจอและแก้
✅ สรุป       — recap + คำถามทบทวน
```

---

---

# 📅 WEEK 1 — รู้จัก Convex + Schema + Query

**เป้าหมายของสัปดาห์:** นักเรียนเข้าใจว่า Convex คืออะไร ทำไมต้องใช้ และอ่านข้อมูลจาก database ได้ครั้งแรก

---

## Session 1 — Convex คืออะไร และทำไมต้องใช้

### 🎯 เป้าหมาย
- เข้าใจว่า backend คืออะไร และ Convex แก้ปัญหาอะไร
- setup Convex project และเชื่อมกับ Next.js ได้
- เปิด Convex Dashboard เห็นของจริง

### 💡 แนวคิด

**Backend คืออะไร?**
```
ที่นักเรียนรู้อยู่แล้ว:
Browser → Next.js → แสดงหน้าเว็บ (static)

สิ่งที่ขาดไป:
Browser → ??? → Database → ข้อมูลจริง
              ↑
          นี่คือ backend
```

**ปัญหาของ backend แบบเดิม:**
- ต้องตั้ง server เอง (Express, Django, etc.)
- ต้องจัดการ connection pool, scaling, security
- ซับซ้อนมากสำหรับผู้เริ่มต้น

**Convex แก้ปัญหานี้ยังไง:**
```
Browser → Convex Cloud → Database (built-in)
              ↑
   เราแค่เขียน function — ส่วนที่เหลือ Convex จัดการ
```

Convex คือ **Backend-as-a-Service** ที่มี:
- Database (built-in)
- Real-time (built-in)
- Auth (built-in)
- File storage (built-in)
- Deploy (built-in)

### 👀 ตัวอย่าง
```
โครงสร้างของ Convex project:
quiz-app/
├── convex/
│   ├── schema.ts      ← นิยามโครงสร้าง database
│   ├── questions.ts   ← functions สำหรับ questions
│   └── _generated/    ← auto-generated (ไม่ต้องแตะ)
└── app/
    └── page.tsx       ← Next.js page ที่เรียกใช้ functions
```

### 🤖 Cursor Prompt ตัวอย่าง
```
"Setup Convex in an existing Next.js project.
Show me the minimal files I need to create,
and how to wrap the app with ConvexProvider in layout.tsx"
```

### 🧪 ทดลอง
1. สร้าง Next.js project ใหม่
2. ติดตั้ง Convex ตาม [docs.convex.dev/quickstart/nextjs](https://docs.convex.dev/quickstart/nextjs)
3. รัน `npx convex dev` — เปิด Dashboard ดู
4. ลอง deploy function ตัวอย่างที่ Convex ให้มา
5. เรียก function จาก browser — เห็นผลใน console

### ✅ สรุป
- Backend = ตัวกลางระหว่าง browser กับ database
- Convex = Backend-as-a-Service ที่จัดการทุกอย่างให้
- `npx convex dev` = รัน Convex ใน local development

**คำถามทบทวน:**
- ทำไมเราถึงไม่ query database โดยตรงจาก browser?
- Convex Dashboard ใช้ทำอะไรได้บ้าง?

---

## Session 2 — Schema: นิยามโครงสร้างข้อมูล

### 🎯 เป้าหมาย
- เข้าใจว่า schema คืออะไร และทำไม Convex ต้องการ
- เขียน schema สำหรับ `questions` table ได้
- เข้าใจ types ที่ Convex รองรับ

### 💡 แนวคิด

**Schema คืออะไร?**

นักเรียนรู้จัก SQL table แล้ว — schema ใน Convex คือแนวคิดเดียวกัน แต่เขียนด้วย TypeScript

```
SQL (แบบที่รู้):              Convex Schema (แบบใหม่):
CREATE TABLE questions (      questions: defineTable({
  id INT PRIMARY KEY,           text: v.string(),
  text VARCHAR(500),            type: v.union(
  type VARCHAR(20),               v.literal("multiple_choice"),
  ...                             v.literal("true_false")
);                              ),
                              })
```

**ทำไมต้อง define schema?**
1. **Type safety** — TypeScript รู้ว่า field ไหนมีอยู่ → IDE ช่วยได้
2. **Validation** — Convex ตรวจ type ก่อนบันทึก → ป้องกัน bad data
3. **Documentation** — อ่าน schema = เข้าใจโครงสร้างข้อมูลทันที

**Types ที่ Convex มี:**
```typescript
v.string()           // "hello"
v.number()           // 42
v.boolean()          // true/false
v.array(v.string())  // ["a", "b", "c"]
v.object({...})      // { name: "Alice" }
v.optional(v.string()) // อาจจะมีหรือไม่มีก็ได้
v.union(v.literal("a"), v.literal("b")) // ต้องเป็น "a" หรือ "b" เท่านั้น
v.id("tableName")    // reference ไปยัง document อื่น
```

### 👀 ตัวอย่าง
```typescript
// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  questions: defineTable({
    text: v.string(),
    type: v.union(
      v.literal("multiple_choice"),
      v.literal("true_false")
    ),
    choices: v.optional(v.array(v.string())), // มีเฉพาะ multiple_choice
    correctAnswer: v.union(v.number(), v.boolean()),
    topic: v.string(),
    difficulty: v.union(
      v.literal("easy"),
      v.literal("medium"),
      v.literal("hard")
    ),
    createdBy: v.id("users"),
  }),
});
```

### 🤖 Cursor Prompt ตัวอย่าง
```
"เขียน Convex schema สำหรับ questions table
ที่รองรับทั้ง multiple_choice และ true_false
โดย multiple_choice มี choices เป็น array of string
และ correctAnswer เป็น index ของ choices ที่ถูก
ส่วน true_false มี correctAnswer เป็น boolean
ใช้ Convex v object และ defineTable"
```

### 🧪 ทดลอง
1. เขียน schema สำหรับ `questions` table
2. บันทึก → Convex auto-generate types ให้ดู
3. ลองเพิ่มข้อมูลใน Convex Dashboard ตรงๆ
4. ลองเพิ่มข้อมูลผิด type ดูว่าเกิดอะไรขึ้น

### 💥 ทำให้มันพัง
```
สถานการณ์: ลองเพิ่ม field ใน Dashboard ที่ไม่ได้ define ใน schema
เช่น เพิ่ม "rating: 5" ทั้งที่ schema ไม่มี field นี้

ผลลัพธ์: Convex แจ้ง error
บทเรียน: Schema = contract ของข้อมูล — ออกนอก contract ไม่ได้
```

### ✅ สรุป
- Schema = นิยามโครงสร้างของ database
- Types ช่วยให้ IDE แนะนำ code ได้ถูกต้อง
- Convex validate type ก่อนบันทึกทุกครั้ง

---

## Session 3 — Query: อ่านข้อมูลครั้งแรก

### 🎯 เป้าหมาย
- เขียน Convex query ได้
- ใช้ `useQuery` hook ใน Next.js ได้
- เข้าใจ loading state และ error state

### 💡 แนวคิด

**Query คืออะไร?**

Query = function สำหรับ **อ่านข้อมูล** เท่านั้น — เขียนข้อมูลไม่ได้

```
Browser                    Convex
  |                           |
  |-- useQuery(api.questions.getAll) -->|
  |                           |-- query database
  |<-- { questions: [...] } --|
  |                           |
  | (auto-update เมื่อข้อมูลเปลี่ยน!)
```

**ทำไม query ต้อง "pure"?**

Convex query มีข้อกำหนด: **ห้าม side effects**
- ห้ามเรียก external API
- ห้ามสุ่มเลข (Math.random)
- ห้ามดู current time โดยตรง

เหตุผล: Convex ต้อง run query ซ้ำได้เสมอ เพื่อส่ง real-time update

### 👀 ตัวอย่าง
```typescript
// convex/questions.ts
import { query } from "./_generated/server";
import { v } from "convex/values";

// Query ง่ายๆ — ดึงทุก question
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("questions").collect();
  },
});

// Query พร้อม filter
export const getByTopic = query({
  args: { topic: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("questions")
      .filter((q) => q.eq(q.field("topic"), args.topic))
      .collect();
  },
});
```

```tsx
// app/questions/page.tsx
"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function QuestionsPage() {
  const questions = useQuery(api.questions.getAll);

  // สำคัญมาก: handle loading และ error state!
  if (questions === undefined) return <p>กำลังโหลด...</p>;

  return (
    <ul>
      {questions.map((q) => (
        <li key={q._id}>{q.text}</li>
      ))}
    </ul>
  );
}
```

### 🤖 Cursor Prompt ตัวอย่าง
```
"เขียน Convex query ชื่อ getQuestions ใน convex/questions.ts
ที่รับ argument topic เป็น optional string
ถ้ามี topic ให้ filter เฉพาะ question ที่มี topic นั้น
ถ้าไม่มี topic ให้ return ทั้งหมด
ใช้ schema จาก convex/schema.ts"
```

### 🧪 ทดลอง
1. เพิ่ม question ผ่าน Convex Dashboard 3-5 รายการ
2. เขียน query `getAll` และแสดงผลใน Next.js page
3. เขียน query `getByTopic` และทดสอบ filter
4. ลองเปิด Dashboard แล้วเพิ่มข้อมูล → ดูว่าหน้าเว็บ update เองไหม (spoiler: update!)

### 💥 ทำให้มันพัง
```
สถานการณ์: ลบ if (questions === undefined) ออก

ผลลัพธ์: เมื่อ query ยังโหลดอยู่ questions จะเป็น undefined
          → .map() บน undefined → crash!

บทเรียน: useQuery ใน Convex return undefined ตอนกำลังโหลด
          ต้อง handle loading state ก่อนใช้ข้อมูลเสมอ
```

### ✅ สรุป
- Query = function อ่านข้อมูล (ไม่แก้ไข)
- `useQuery` ทำให้ UI update อัตโนมัติเมื่อข้อมูลเปลี่ยน
- `undefined` = กำลังโหลด, ต้อง handle ก่อนเสมอ

---
---

# 📅 WEEK 2 — Mutation + Relations + Indexes

**เป้าหมายของสัปดาห์:** นักเรียนเขียนข้อมูลลง database ได้ ออกแบบ relation ระหว่าง table ได้ และเข้าใจว่า index คืออะไร

---

## Session 4 — Mutation: เขียนข้อมูล

### 🎯 เป้าหมาย
- เข้าใจความต่างระหว่าง query กับ mutation
- เขียน CRUD mutations สำหรับ questions ได้
- ใช้ `useMutation` hook ใน Next.js ได้

### 💡 แนวคิด

**Query vs Mutation:**

```
Query:    อ่านอย่างเดียว, pure, real-time subscription
Mutation: เขียนข้อมูล, transactional, เรียกครั้งเดียว
```

**Transactional คืออะไร?**

ถ้า mutation มีหลาย operation — ทั้งหมดสำเร็จหรือล้มเหลวพร้อมกัน (all or nothing)

```typescript
// ถ้า db.insert สำเร็จ แต่ db.patch ล้มเหลว
// → Convex จะ rollback db.insert ให้อัตโนมัติ
// ไม่มีข้อมูลค้างครึ่งทาง!
```

**Validator — ทำไมสำคัญ?**

Mutation รับ input จาก user → อาจส่งข้อมูลแปลกๆ มาได้
Validator = ตรวจสอบ input ก่อนที่จะแตะ database

### 👀 ตัวอย่าง
```typescript
// convex/questions.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    text: v.string(),
    type: v.union(v.literal("multiple_choice"), v.literal("true_false")),
    choices: v.optional(v.array(v.string())),
    correctAnswer: v.union(v.number(), v.boolean()),
    topic: v.string(),
    difficulty: v.union(v.literal("easy"), v.literal("medium"), v.literal("hard")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("ต้อง login ก่อน");

    const questionId = await ctx.db.insert("questions", {
      ...args,
      createdBy: identity.subject, // จะเปลี่ยนเป็น user ID จริงๆ ใน Week 3
    });
    return questionId;
  },
});

export const update = mutation({
  args: {
    id: v.id("questions"),
    text: v.optional(v.string()),
    difficulty: v.optional(v.union(v.literal("easy"), v.literal("medium"), v.literal("hard"))),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});

export const remove = mutation({
  args: { id: v.id("questions") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
```

```tsx
// ใช้งานใน component
const createQuestion = useMutation(api.questions.create);

const handleSubmit = async () => {
  await createQuestion({
    text: "2 + 2 = ?",
    type: "multiple_choice",
    choices: ["3", "4", "5", "6"],
    correctAnswer: 1, // index 1 = "4"
    topic: "Math",
    difficulty: "easy",
  });
};
```

### 🤖 Cursor Prompt ตัวอย่าง
```
"เขียน Convex mutation สำหรับ update question
รับ id เป็น v.id('questions') และ field อื่นๆ เป็น optional
ใช้ ctx.db.patch เพื่ออัปเดตเฉพาะ field ที่ส่งมา
ไม่ต้อง update field ที่ไม่ได้ส่งมา"
```

### 🧪 ทดลอง
1. เขียน create/update/delete mutations สำหรับ questions
2. สร้าง form ง่ายๆ สำหรับเพิ่ม question
3. สร้างปุ่ม delete พร้อม confirm dialog
4. ทดสอบครบทุก operation

### 💥 ทำให้มันพัง
```
สถานการณ์: ลบ validator ออกจาก mutation args
           แล้วส่ง { text: 12345, type: "invalid_type" } มา

ผลลัพธ์: ถ้าไม่มี validator → ข้อมูลแปลกๆ เข้า database ได้!
          (หรือ runtime error ที่ไม่ชัดเจน)

บทเรียน: Validator = ด่านแรกป้องกัน bad data
          เขียน mutation ทุกครั้งต้อง define args อย่างละเอียด
```

### ✅ สรุป
- Mutation = function เขียนข้อมูล (insert, patch, delete)
- Transactional = ทุก operation สำเร็จหรือล้มเหลวพร้อมกัน
- Validator = ตรวจ input ก่อนแตะ database เสมอ

---

## Session 5 — Relations: ความสัมพันธ์ระหว่าง Table

### 🎯 เป้าหมาย
- เข้าใจ document reference ใน Convex (เทียบกับ foreign key)
- ออกแบบ n-n relation ด้วย junction table ได้
- *** เรียนรู้ว่า requirement ที่ไม่ชัดส่งผลต่อ schema อย่างไร ***

### 💡 แนวคิด

#### Part 1: Requirements Workshop (30 นาที)

**ก่อน code — ต้องตอบคำถามนี้ก่อน:**

```
คำถาม 1: Question กับ Quiz สัมพันธ์กันยังไง?
  ตัวเลือก A: Question ผูกกับ Quiz เดียว (1-n)
  ตัวเลือก B: Question bank — Quiz หยิบ Question มาใช้ (n-n)

คำถาม 2: Quiz session คืออะไร?
  ตัวเลือก A: เล่นคนเดียว
  ตัวเลือก B: Multiplayer เหมือน Kahoot

คำถาม 3: Leaderboard คือ?
  ตัวเลือก A: Global (rank ทุกคนรวม)
  ตัวเลือก B: Per-quiz (แต่ละ quiz rank แยก)
```

**Activity: แต่ละคน sketch schema ตามที่ตัวเองเลือก**

```
[นักเรียนวาด schema บนกระดาษ]
  → compare กัน
  → เห็นว่า schema ต่างกันมากแค่ไหน!
```

**บทเรียน:**
- Requirement เดียวกัน interpretation ต่าง → code ต่างกัน
- Schema เปลี่ยนยาก — ออกแบบให้ดีตั้งแต่แรก
- Developer ที่ดีต้องถามก่อน code

**Official Requirements ของ Course นี้:**
- ✅ Question bank (n-n) — เรียนเรื่อง junction table
- ✅ Solo ก่อน → Multiplayer ทีหลัง
- ✅ Leaderboard per-quiz

#### Part 2: Implement Relations

**Document Reference ใน Convex:**
```
SQL foreign key:    quiz_questions.quiz_id INT REFERENCES quizzes(id)
Convex reference:   quizId: v.id("quizzes")
```

**n-n ด้วย Junction Table:**
```
quizzes ─────────── quiz_questions ─────────── questions
   1                      n                        1
   (quiz มีหลาย quiz_question) (quiz_question ชี้ไปที่ question เดียว)
```

### 👀 ตัวอย่าง
```typescript
// convex/schema.ts — เพิ่ม tables ใหม่
export default defineSchema({
  // ... questions table เดิม ...

  quizzes: defineTable({
    title: v.string(),
    description: v.string(),
    status: v.union(v.literal("draft"), v.literal("published")),
    createdBy: v.id("users"),
  }),

  // Junction table สำหรับ n-n
  quiz_questions: defineTable({
    quizId: v.id("quizzes"),
    questionId: v.id("questions"),
    order: v.number(), // ลำดับคำถามใน quiz
  }),
});
```

```typescript
// convex/quizzes.ts
export const getWithQuestions = query({
  args: { quizId: v.id("quizzes") },
  handler: async (ctx, args) => {
    const quiz = await ctx.db.get(args.quizId);
    if (!quiz) throw new Error("ไม่พบ quiz นี้");

    // ดึง quiz_questions และ join กับ questions
    const quizQuestions = await ctx.db
      .query("quiz_questions")
      .filter((q) => q.eq(q.field("quizId"), args.quizId))
      .collect();

    const questions = await Promise.all(
      quizQuestions
        .sort((a, b) => a.order - b.order)
        .map((qq) => ctx.db.get(qq.questionId))
    );

    return { ...quiz, questions };
  },
});
```

### 🧪 ทดลอง
1. เพิ่ม `quizzes` และ `quiz_questions` ใน schema
2. เขียน mutation สำหรับสร้าง quiz และ add question เข้า quiz
3. เขียน query ดึง quiz พร้อม questions ทั้งหมด
4. ทดสอบ: question เดียวกันอยู่ใน 2 quiz ได้ไหม?

### ✅ สรุป
- Document reference = foreign key ของ Convex
- Junction table = วิธีทำ n-n relation
- Requirements ไม่ชัด → ออกแบบ database ผิด → แก้ยาก

---

## Session 6 — Indexes: ทำให้ Query เร็ว

### 🎯 เป้าหมาย
- เข้าใจว่าทำไม query ถึงช้าโดยไม่มี index
- เพิ่ม index ใน Convex schema ได้
- เข้าใจ trade-off ของ index (write slower, read faster)

### 💡 แนวคิด

**ปัญหา: Full Table Scan**
```
ถ้าไม่มี index และ filter ด้วย topic:

Convex ต้องอ่านทุก document → เช็คทีละตัวว่า topic ตรงไหม
1,000 questions → อ่าน 1,000 ครั้ง → ช้า!
```

**Index แก้ปัญหายังไง:**
```
Index = สารบัญของ database

เหมือนสารบัญหนังสือ:
ไม่มีสารบัญ → พลิกทุกหน้าหา "Convex"
มีสารบัญ   → เปิดหน้า 42 ตรงเลย

Index บน "topic":
ไม่มี index → scan ทุก document
มี index   → กระโดดไปที่ topic="Math" ตรงๆ
```

**Convex Warning:**

Convex จะ warn เมื่อ filter โดยไม่มี index:
```
[CONVEX] Query is performing a full table scan.
Add an index on "topic" to improve performance.
```

**Trade-off:**
```
Index มี:  Read เร็วขึ้น ✅
           Write ช้าลงนิดหน่อย (ต้อง update index ด้วย)
           ใช้ storage เพิ่ม

→ เหมาะสำหรับ field ที่ filter/sort บ่อยๆ
→ ไม่ต้องทำทุก field
```

### 👀 ตัวอย่าง
```typescript
// convex/schema.ts — เพิ่ม indexes
export default defineSchema({
  questions: defineTable({
    text: v.string(),
    type: v.union(v.literal("multiple_choice"), v.literal("true_false")),
    topic: v.string(),
    difficulty: v.union(v.literal("easy"), v.literal("medium"), v.literal("hard")),
    createdBy: v.id("users"),
  })
  // เพิ่ม index ที่นี่
  .index("by_topic", ["topic"])
  .index("by_topic_and_difficulty", ["topic", "difficulty"]),

  quiz_questions: defineTable({
    quizId: v.id("quizzes"),
    questionId: v.id("questions"),
    order: v.number(),
  })
  .index("by_quiz", ["quizId"]), // ← สำคัญมาก! ใช้บ่อยใน getWithQuestions
});
```

```typescript
// ใช้ index ใน query
export const getByTopic = query({
  args: { topic: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("questions")
      .withIndex("by_topic", (q) => q.eq("topic", args.topic)) // ← ใช้ index
      .collect();
  },
});
```

### 💥 ทำให้มันพัง
```
สถานการณ์: ลอง query quiz_questions โดยไม่มี index "by_quiz"
           ใน getWithQuestions

ผลลัพธ์: Convex แสดง warning ใน console
          "This query reads all documents in quiz_questions..."

ขั้นต่อ: เพิ่ม .index("by_quiz", ["quizId"]) ใน schema
          warning หายไป และ query เร็วขึ้น

บทเรียน: Index ไม่ใช่ optional — เป็น must-have สำหรับ production
```

### ✅ สรุป
- Index = สารบัญ database ทำให้ query เร็ว
- Convex จะ warn เมื่อ query ไม่มี index
- เพิ่ม index บน field ที่ filter/sort บ่อย
- Trade-off: write ช้าลงนิดหน่อย แต่ read เร็วขึ้นมาก

---
---

# 📅 WEEK 3 — Auth + Roles + Permissions

**เป้าหมายของสัปดาห์:** นักเรียนสร้าง authentication และกำหนด permission ได้ว่าใครทำอะไรได้บ้าง

---

## Session 7 — Auth: Login / Register

### 🎯 เป้าหมาย
- เข้าใจความต่างระหว่าง Authentication กับ Authorization
- Setup Convex Auth ได้
- สร้าง login/register form ที่ทำงานได้จริง

### 💡 แนวคิด

**Authentication vs Authorization:**
```
Authentication = "คุณเป็นใคร?"     (login, verify identity)
Authorization  = "คุณทำอะไรได้?"   (role, permission)

ตัวอย่าง:
Auth*entication*: บัตรประชาชน → พิสูจน์ว่าคุณคือ Alice
Auth*orization*:  Alice เป็น admin → เข้า VIP ได้

Week 3 จะสอนทั้งสอง:
Session 7 = Authentication (login/register)
Session 8-9 = Authorization (roles + permissions)
```

**Convex Auth ทำงานยังไง:**
```
1. User ส่ง email + password
2. Convex Auth verify → สร้าง session
3. Browser เก็บ token
4. ทุก request ส่ง token ไปด้วย
5. Convex functions เช็ค token ด้วย ctx.auth
```

### 👀 ตัวอย่าง
```typescript
// convex/auth.ts
import { convexAuth } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [Password],
});
```

```tsx
// components/LoginForm.tsx
"use client";
import { useAuthActions } from "@convex-dev/auth/react";

export function LoginForm() {
  const { signIn } = useAuthActions();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    await signIn("password", {
      email: form.get("email") as string,
      password: form.get("password") as string,
      flow: "signIn",
    });
  };

  return (
    <form onSubmit={handleLogin}>
      <input name="email" type="email" placeholder="Email" />
      <input name="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}
```

### 🧪 ทดลอง
1. Setup Convex Auth ตาม docs
2. สร้าง login และ register form
3. Login แล้วดู user ใน Convex Dashboard (ตาราง `users`)
4. ลอง logout และ login อีกครั้ง

### ✅ สรุป
- Authentication = พิสูจน์ตัวตน
- Convex Auth จัดการ session และ token ให้
- `ctx.auth.getUserIdentity()` = ดู current user ใน function

---

## Session 8 — Roles: Admin vs Player

### 🎯 เป้าหมาย
- เพิ่ม role ใน users table ได้
- อ่าน identity ใน Convex function ได้
- redirect user ตาม role ได้

### 💡 แนวคิด

**Role-Based Access Control (RBAC):**
```
ระบบนี้มี 2 roles:
  admin  → จัดการ quiz, question bank, ดู analytics
  player → register, เล่น quiz, ดู leaderboard

Role เก็บที่ไหน?
  → ใน table "users" ของเราเอง
  → แยกจาก Convex Auth (ที่เก็บแค่ identity)
```

**ทำไมต้องแยก users table ของเราออกจาก Convex Auth?**
```
Convex Auth users:    email, password hash, session data (Convex จัดการ)
Our users table:      role, displayName, stats, preferences (เราจัดการ)

เมื่อ user register → Convex Auth สร้าง identity
                   → เราสร้าง record ใน users table ของเรา
```

### 👀 ตัวอย่าง
```typescript
// convex/schema.ts — เพิ่ม users table
users: defineTable({
  name: v.string(),
  email: v.string(),
  role: v.union(v.literal("admin"), v.literal("player")),
}).index("by_email", ["email"]),
```

```typescript
// convex/users.ts
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    // หา user record ของเราจาก email
    return await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .unique();
  },
});
```

```tsx
// ใช้ใน component
const currentUser = useQuery(api.users.getCurrentUser);

if (currentUser?.role === "admin") {
  return <AdminDashboard />;
}
return <PlayerDashboard />;
```

### 🧪 ทดลอง
1. เพิ่ม `users` table ใน schema
2. เขียน mutation สร้าง user record เมื่อ register
3. เขียน query `getCurrentUser`
4. สร้าง conditional UI ตาม role
5. ลอง set role ให้ตัวเองเป็น admin ผ่าน Dashboard

### ✅ สรุป
- Role เก็บใน `users` table ของเรา แยกจาก Convex Auth
- `ctx.auth.getUserIdentity()` = identity จาก Auth
- ต้อง join กับ `users` table เพื่อดู role

---

## Session 9 — Permissions: ปกป้อง Mutations

### 🎯 เป้าหมาย
- เขียน permission guard ได้
- ปกป้อง mutations ที่ต้องการสิทธิ์พิเศษได้
- แยก auth logic ออกจาก business logic (clean code)

### 💡 แนวคิด

**ปัญหา: ถ้าไม่ตรวจสิทธิ์:**
```
Player ส่ง HTTP request มาโดยตรง:
POST /api/questions/delete → ลบ question ของ admin ได้!

ใน Convex: เรียก mutation โดยตรงจาก browser → ต้องตรวจสิทธิ์ใน function
```

**Pattern: Helper Function สำหรับ Auth**
```typescript
// แทนที่จะ copy-paste auth check ในทุก mutation
// → สร้าง helper function ครั้งเดียว ใช้ได้ทุกที่
```

### 👀 ตัวอย่าง
```typescript
// convex/lib/auth.ts — helper functions
import { MutationCtx, QueryCtx } from "../_generated/server";

export async function getUser(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("ต้อง login ก่อน");

  const user = await ctx.db
    .query("users")
    .withIndex("by_email", (q) => q.eq("email", identity.email!))
    .unique();

  if (!user) throw new Error("ไม่พบข้อมูล user");
  return user;
}

export async function requireAdmin(ctx: QueryCtx | MutationCtx) {
  const user = await getUser(ctx);
  if (user.role !== "admin") {
    throw new Error("ต้องเป็น admin เท่านั้น");
  }
  return user;
}
```

```typescript
// convex/questions.ts — ใช้ helper
export const create = mutation({
  args: { /* ... */ },
  handler: async (ctx, args) => {
    await requireAdmin(ctx); // ← บรรทัดเดียว ตรวจสิทธิ์ทุกอย่าง
    await ctx.db.insert("questions", args);
  },
});

export const remove = mutation({
  args: { id: v.id("questions") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx); // ← ใช้ซ้ำได้เลย
    await ctx.db.delete(args.id);
  },
});
```

### 💥 ทำให้มันพัง
```
สถานการณ์: login ด้วย account ที่มี role: "player"
           แล้วลองเรียก createQuestion mutation

ผลลัพธ์: Error "ต้องเป็น admin เท่านั้น"

ขั้นต่อ: เปลี่ยน role ใน Dashboard เป็น "admin" → ลองใหม่ → สำเร็จ

บทเรียน: Permission check ต้องอยู่ใน server-side เสมอ
          การซ่อนปุ่มใน UI ไม่เพียงพอ
```

### ✅ สรุป
- Permission check ต้องอยู่ใน Convex function (server-side)
- สร้าง helper functions เพื่อ reuse auth logic
- ซ่อนปุ่มใน UI = UX เท่านั้น ไม่ใช่ security

---
---

# 📅 WEEK 4 — Real-time + Actions

**เป้าหมายของสัปดาห์:** นักเรียนเข้าใจ real-time subscription และเรียก external API ได้

---

## Session 10 — Real-time Concept

### 🎯 เป้าหมาย
- เข้าใจว่า `useQuery` ไม่ใช่แค่ fetch แต่คือ subscription
- เห็น real-time update ด้วยตาตัวเอง
- เข้าใจว่า Convex ทำ real-time ได้ยังไง

### 💡 แนวคิด

**useQuery ≠ fetch ปกติ:**
```
fetch ปกติ:
  Browser → Request → Server → Response → จบ
  (ถ้าข้อมูลเปลี่ยน → ต้อง request ใหม่)

useQuery (Convex):
  Browser ← Convex Cloud (connection เปิดตลอด)
  เมื่อข้อมูลเปลี่ยน → Convex ส่ง update มาทันที
  → React re-render อัตโนมัติ
```

**Convex ทำได้ยังไง:**
```
Convex ใช้ WebSocket ในการส่ง update
Query ทุกตัวที่ browser "subscribe" อยู่
→ เมื่อมี mutation เปลี่ยนข้อมูลที่ query นั้นอ่าน
→ Convex re-run query ใหม่
→ ถ้าผลต่างจากเดิม → ส่งมาให้ browser ทันที
```

### 🧪 ทดลอง (Demo สำคัญมาก!)
```
ขั้น 1: เปิด browser 2 หน้าต่าง (หรือ 2 device)
         ทั้งสองเปิดหน้า questions list

ขั้น 2: ใน Convex Dashboard → เพิ่ม question ใหม่
         หรือเปิดหน้าที่ 2 เป็น admin form เพิ่ม question

ขั้น 3: ดูหน้าที่ 1 → question ใหม่ปรากฏทันทีโดยไม่ต้อง refresh!
```

**บทเรียน:** นี่คือสิ่งที่ทำให้ Convex ต่างจาก REST API ทั่วไป

### ✅ สรุป
- `useQuery` = subscription, ไม่ใช่แค่ fetch
- ข้อมูลเปลี่ยน → UI update อัตโนมัติ ทุก browser ที่เปิดอยู่
- ไม่ต้อง polling, ไม่ต้อง refresh — Convex จัดการให้

---

## Session 11 — Live Leaderboard

### 🎯 เป้าหมาย
- Design tables สำหรับ game session ได้
- สร้าง leaderboard ที่ update real-time ได้
- ทดสอบด้วยหลาย browser พร้อมกัน

### 💡 แนวคิด

**State Machine สำหรับ Game:**
```
game_session.status:
  "waiting" → ยังไม่เริ่ม, รอผู้เล่น
  "playing" → กำลังเล่นอยู่
  "completed" → จบแล้ว

การเปลี่ยน status ต้องเป็นไปตาม flow:
waiting → playing → completed (ไม่สามารถข้ามหรือย้อนกลับ)
```

### 👀 ตัวอย่าง
```typescript
// convex/schema.ts — เพิ่ม game tables
game_sessions: defineTable({
  quizId: v.id("quizzes"),
  hostId: v.id("users"),
  mode: v.union(v.literal("solo"), v.literal("multiplayer")),
  status: v.union(
    v.literal("waiting"),
    v.literal("playing"),
    v.literal("completed")
  ),
}).index("by_status", ["status"]),

player_sessions: defineTable({
  gameSessionId: v.id("game_sessions"),
  userId: v.id("users"),
  score: v.number(),
}).index("by_game_session", ["gameSessionId"]),

answers: defineTable({
  playerSessionId: v.id("player_sessions"),
  questionId: v.id("questions"),
  answer: v.string(),
  isCorrect: v.boolean(),
}).index("by_player_session", ["playerSessionId"]),
```

```typescript
// convex/leaderboard.ts
export const getLeaderboard = query({
  args: { gameSessionId: v.id("game_sessions") },
  handler: async (ctx, args) => {
    const playerSessions = await ctx.db
      .query("player_sessions")
      .withIndex("by_game_session", (q) =>
        q.eq("gameSessionId", args.gameSessionId)
      )
      .collect();

    // join กับ users เพื่อดู name
    const withNames = await Promise.all(
      playerSessions.map(async (ps) => {
        const user = await ctx.db.get(ps.userId);
        return { ...ps, userName: user?.name ?? "Unknown" };
      })
    );

    // เรียงตาม score สูงสุด
    return withNames.sort((a, b) => b.score - a.score);
  },
});
```

```tsx
// components/Leaderboard.tsx — real-time!
export function Leaderboard({ gameSessionId }) {
  const leaderboard = useQuery(api.leaderboard.getLeaderboard, {
    gameSessionId
  });

  return (
    <ol>
      {leaderboard?.map((player, index) => (
        <li key={player._id}>
          #{index + 1} {player.userName} — {player.score} คะแนน
        </li>
      ))}
    </ol>
  );
}
```

### 🧪 ทดลอง
1. สร้าง game session ทดสอบ
2. เปิด 2 browser — ทั้งสองดู leaderboard
3. ส่งคำตอบจาก browser หนึ่ง → ดู leaderboard อีก browser อัปเดตทันที

### ✅ สรุป
- State machine ช่วย model game flow ได้ชัดเจน
- Real-time leaderboard = `useQuery` ที่ query score
- เมื่อ submitAnswer mutation รัน → leaderboard ทุกที่ update อัตโนมัติ

---

## Session 12 — Actions: เรียก External API

### 🎯 เป้าหมาย
- เข้าใจความต่างระหว่าง mutation กับ action
- เข้าใจทำไม secrets ต้องอยู่ใน Convex ไม่ใช่ Next.js
- เขียน action เรียก external API แรกได้

### 💡 แนวคิด

**Query / Mutation / Action ต่างกันยังไง:**

| | Query | Mutation | Action |
|---|---|---|---|
| อ่าน DB | ✅ | ✅ | ❌ ต้องใช้ internal query |
| เขียน DB | ❌ | ✅ | ❌ ต้องใช้ internal mutation |
| เรียก external API | ❌ | ❌ | ✅ |
| Async/await | ✅ | ✅ | ✅ |
| Real-time | ✅ | - | - |

**ทำไม Action ถึงอ่าน/เขียน DB ตรงๆ ไม่ได้?**
```
Query และ Mutation รัน transactionally — ต้อง deterministic
Action อาจ call external API ที่ใช้เวลานาน และ fail ได้
→ ไม่ safe ที่จะ mix กัน

ถ้า action ต้อง write DB → ใช้ ctx.runMutation(internal.xxx.yyy)
```

**Security: ทำไม API key ต้องอยู่ใน Convex?**
```
❌ ถ้าใส่ใน Next.js NEXT_PUBLIC_GEMINI_KEY:
   → key ถูกส่งมาที่ browser
   → ดูได้ใน DevTools → ใครก็ใช้ key เราได้!

✅ ถ้าใส่ใน Convex Environment Variables:
   → key อยู่ใน Convex server เท่านั้น
   → browser ไม่เห็น key เลย
   → Action เรียกใช้ได้ใน server-side
```

### 👀 ตัวอย่าง
```typescript
// convex/actions/testGemini.ts
import { action } from "../_generated/server";

export const ping = action({
  args: {},
  handler: async (ctx) => {
    const apiKey = process.env.GEMINI_API_KEY; // ← จาก Convex env variables
    if (!apiKey) throw new Error("ไม่พบ GEMINI_API_KEY");

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: "Say hello in Thai" }] }],
        }),
      }
    );

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  },
});
```

### 💥 ทำให้มันพัง
```
สถานการณ์: ย้าย GEMINI_API_KEY ไปใส่ใน .env.local ของ Next.js
           แล้วชื่อตัวแปร NEXT_PUBLIC_GEMINI_API_KEY

ทดสอบ: เปิด Chrome DevTools → Network tab → ดู page source
ผลลัพธ์: key โผล่ใน JavaScript bundle!

บทเรียน: NEXT_PUBLIC_ prefix = ส่งไปที่ browser
          Secret ต้องอยู่ใน Convex Environment Variables เสมอ
```

### ✅ สรุป
- Action = รัน async code, เรียก external API ได้
- Action ต้องใช้ internal query/mutation ถ้าต้องการ DB
- API secrets ต้องอยู่ใน Convex env variables — ไม่ใช่ Next.js

---
---

# 📅 WEEK 5 — File Storage + AI Integration

**เป้าหมายของสัปดาห์:** นักเรียน upload ไฟล์ได้ และสร้าง AI quiz generation จริงๆ ได้

---

## Session 13 — File Storage: Upload รูปภาพ

### 🎯 เป้าหมาย
- เข้าใจว่าทำไมไม่เก็บรูปใน database โดยตรง
- upload file ผ่าน Convex storage ได้
- แสดงรูปจาก storage ID ได้

### 💡 แนวคิด

**ทำไมไม่เก็บรูปใน DB ตรงๆ?**
```
รูปขนาด 1MB เป็น base64 = ข้อความยาว ~1.3MB

❌ เก็บใน DB:
   - Document ใหญ่มาก → query ช้า
   - ค่าใช้จ่าย storage สูง
   - ส่งข้อมูลซ้ำทุกครั้งที่ query

✅ เก็บใน File Storage:
   - DB เก็บแค่ storageId (string สั้นๆ)
   - รูปอยู่ใน CDN → โหลดเร็ว
   - URL มี TTL → secure
```

**Flow การ upload ใน Convex:**
```
1. Browser ขอ upload URL จาก Convex
2. Browser upload ไฟล์ตรงไปยัง Convex storage (ไม่ผ่าน Next.js)
3. Convex return storageId
4. Browser บันทึก storageId ลง database ผ่าน mutation
```

### 👀 ตัวอย่าง
```typescript
// convex/files.ts
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    return await ctx.storage.generateUploadUrl();
  },
});

export const saveStorageId = mutation({
  args: {
    quizId: v.id("quizzes"),
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    await ctx.db.patch(args.quizId, { coverImage: args.storageId });
  },
});

export const getImageUrl = query({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});
```

```tsx
// components/ImageUpload.tsx
export function ImageUpload({ quizId }) {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const saveStorageId = useMutation(api.files.saveStorageId);

  const handleUpload = async (file: File) => {
    // ขอ upload URL
    const uploadUrl = await generateUploadUrl();

    // upload ไฟล์ตรงไป Convex storage
    const result = await fetch(uploadUrl, {
      method: "POST",
      body: file,
    });
    const { storageId } = await result.json();

    // บันทึก storageId ลง DB
    await saveStorageId({ quizId, storageId });
  };
}
```

### ✅ สรุป
- File storage แยกจาก database — DB เก็บแค่ storageId
- Upload URL = temporary URL สำหรับ upload ครั้งเดียว
- getUrl() แปลง storageId → URL สำหรับแสดงรูป

---

## Session 14 — AI Generate Quiz

### 🎯 เป้าหมาย
- เขียน action เรียก Gemini API เพื่อสร้าง quiz ได้
- เข้าใจ structured output / prompt engineering เบื้องต้น
- บันทึก AI-generated questions ลง database ได้

### 💡 แนวคิด

**Prompt Engineering สำหรับ Structured Output:**
```
ปัญหา: Gemini return text ปกติ → parse ยาก
วิธีแก้: บอก format ที่ต้องการใน prompt

❌ Prompt แย่:
"สร้าง quiz เกี่ยวกับ JavaScript"

✅ Prompt ดี:
"สร้าง 5 คำถาม multiple choice เกี่ยวกับ JavaScript basics
Return เป็น JSON array format ดังนี้:
[{
  "text": "คำถาม",
  "choices": ["A", "B", "C", "D"],
  "correctAnswer": 0,  // index ของคำตอบที่ถูก
  "difficulty": "easy"
}]
Return เฉพาะ JSON ไม่ต้องมีข้อความอื่น"
```

### 👀 ตัวอย่าง
```typescript
// convex/actions/generateQuiz.ts
import { action, internalMutation } from "../_generated/server";
import { v } from "convex/values";
import { internal } from "../_generated/api";

export const generateQuiz = action({
  args: {
    topic: v.string(),
    objective: v.string(),
    count: v.number(),
    quizId: v.id("quizzes"),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("ไม่พบ GEMINI_API_KEY");

    const prompt = `
สร้าง ${args.count} คำถาม multiple choice เกี่ยวกับ "${args.topic}"
วัตถุประสงค์: ${args.objective}

Return เป็น JSON array เท่านั้น (ไม่มีข้อความอื่น):
[{
  "text": "คำถาม",
  "choices": ["ตัวเลือก A", "ตัวเลือก B", "ตัวเลือก C", "ตัวเลือก D"],
  "correctAnswer": 0,
  "difficulty": "easy" | "medium" | "hard"
}]
    `.trim();

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;

    // Parse JSON จาก response
    let questions;
    try {
      questions = JSON.parse(text);
    } catch {
      throw new Error(`Gemini return format ผิด: ${text}`);
    }

    // บันทึกลง database ผ่าน internal mutation
    await ctx.runMutation(internal.questions.bulkCreate, {
      questions,
      quizId: args.quizId,
      topic: args.topic,
    });

    return { created: questions.length };
  },
});
```

### 💥 ทำให้มันพัง
```
สถานการณ์: ลบ "Return เป็น JSON array เท่านั้น" ออกจาก prompt
           Gemini จะ return ข้อความอื่นมาด้วย เช่น "นี่คือคำถาม..."

ผลลัพธ์: JSON.parse() fail → error

ขั้นต่อ: แก้ด้วย regex หรือปรับ prompt ให้ชัดขึ้น
         เรียนรู้ว่า AI output ไม่ stable → ต้องมี error handling

บทเรียน: เมื่อเรียก AI API → ต้อง validate output เสมอ
          AI อาจ return format ผิดได้แม้จะบอกชัดๆ
```

### ✅ สรุป
- Action เรียก Gemini API → parse JSON → save ลง DB via internal mutation
- Prompt engineering สำคัญ — ยิ่งบอก format ชัด ยิ่งดี
- AI output ไม่ stable → validate และ handle error เสมอ

---

## Session 15 — Error Handling + Loading States

### 🎯 เป้าหมาย
- เข้าใจ pattern ของ error handling ใน Convex
- สร้าง loading states ที่ดีใน UI ได้
- review code ทั้งหมดที่เขียนมา และปรับปรุง

### 💡 แนวคิด

**Error Handling Patterns:**
```typescript
// ใน Convex function
throw new Error("ข้อความ error") // → ส่งมาที่ browser

// ใน React component
const [error, setError] = useState<string | null>(null);

try {
  await createQuestion(args);
} catch (err) {
  setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาด");
}
```

**Loading State Pattern:**
```tsx
// 3 states ที่ต้อง handle เสมอ
const data = useQuery(api.questions.getAll);

if (data === undefined) return <LoadingSpinner />;  // กำลังโหลด
if (data === null) return <EmptyState />;            // ไม่มีข้อมูล (ถ้า nullable)
return <QuestionList questions={data} />;            // มีข้อมูล
```

### 🧪 ทดลอง
1. Code review ทุก query และ mutation ที่เขียนมา
2. เพิ่ม error handling ที่ขาดหายไป
3. สร้าง reusable `<LoadingSpinner />` component
4. ทดสอบ error cases ทั้งหมด: network error, auth error, validation error

### ✅ สรุป
- Error handling ไม่ใช่ optional — เป็นส่วนสำคัญของ production code
- Loading state = undefined, Error state = handle ด้วย try/catch
- Code review สม่ำเสมอ = code quality ดีขึ้น

---
---

# 📅 WEEK 6 — Real-time Multiplayer + Deploy

**เป้าหมายของสัปดาห์:** นักเรียน extend solo game เป็น multiplayer และ deploy project ขึ้น production จริงๆ

---

## Session 16 — Design Multiplayer Game

### 🎯 เป้าหมาย
- ออกแบบ real-time multiplayer ก่อน code
- เข้าใจ game state และ synchronization
- วาด flow diagram ก่อน implement

### 💡 แนวคิด

**ข้อดีของการ design ก่อน code:**
```
ถ้า code เลย:
  → เขียนไป แก้ไป → สับสน → ลบทิ้ง → เสียเวลา

ถ้า design ก่อน:
  → เห็นปัญหาก่อนที่จะลง code
  → ทีมเข้าใจตรงกัน
  → estimate เวลาได้แม่นขึ้น
```

**Flow Diagram: Multiplayer Game**
```
Admin                    Host                  Players
  |                       |                      |
  |--- create quiz ------>|                      |
  |                       |-- createSession() -->|
  |                       |   (get joinCode)     |
  |                       |                      |
  |                       |<-- joinSession(code) -|
  |                       |   (waiting room)     |
  |                       |                      |
  |                       |-- startGame() ------->|
  |                       |   status: "playing"  |
  |                       |                      |
  |                       |<-- submitAnswer() ----|  (real-time!)
  |                       |<-- submitAnswer() ----|
  |                       |                      |
  |                       |-- endGame() ----------|
  |                       |   status: "completed"|
```

### 🧪 Activity
นักเรียนแต่ละคนวาด sequence diagram ของตัวเอง
แล้ว present ให้เพื่อนดู → compare และ discuss

### ✅ สรุป
- Design ก่อน code = ประหยัดเวลาในระยะยาว
- State machine ช่วย model game flow ได้ชัดเจน
- Real-time = query ที่ watch ข้อมูลที่เปลี่ยนตลอดเวลา

---

## Session 17 — Implement Multiplayer

### 🎯 เป้าหมาย
- implement join code system ได้
- สร้าง waiting room real-time ได้
- เชื่อม game flow ตั้งแต่ต้นจนจบ

### 👀 ตัวอย่าง

```typescript
// convex/gameSessions.ts
export const createMultiplayerSession = mutation({
  args: { quizId: v.id("quizzes") },
  handler: async (ctx, args) => {
    const user = await getUser(ctx);

    // สร้าง join code แบบ random 6 หลัก
    const joinCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    const sessionId = await ctx.db.insert("game_sessions", {
      quizId: args.quizId,
      hostId: user._id,
      mode: "multiplayer",
      status: "waiting",
      joinCode,
    });

    // host เป็น player คนแรก
    await ctx.db.insert("player_sessions", {
      gameSessionId: sessionId,
      userId: user._id,
      score: 0,
    });

    return { sessionId, joinCode };
  },
});

export const joinSession = mutation({
  args: { joinCode: v.string() },
  handler: async (ctx, args) => {
    const user = await getUser(ctx);

    const session = await ctx.db
      .query("game_sessions")
      .filter((q) => q.eq(q.field("joinCode"), args.joinCode.toUpperCase()))
      .unique();

    if (!session) throw new Error("ไม่พบห้อง");
    if (session.status !== "waiting") throw new Error("เกมเริ่มแล้ว");

    await ctx.db.insert("player_sessions", {
      gameSessionId: session._id,
      userId: user._id,
      score: 0,
    });

    return session._id;
  },
});

// Real-time: ดู players ที่ join ห้อง
export const getWaitingRoom = query({
  args: { sessionId: v.id("game_sessions") },
  handler: async (ctx, args) => {
    const session = await ctx.db.get(args.sessionId);
    const playerSessions = await ctx.db
      .query("player_sessions")
      .withIndex("by_game_session", (q) => q.eq("gameSessionId", args.sessionId))
      .collect();

    const players = await Promise.all(
      playerSessions.map(async (ps) => {
        const user = await ctx.db.get(ps.userId);
        return { name: user?.name };
      })
    );

    return { session, players };
  },
});
```

### 🧪 ทดลอง
1. สร้าง multiplayer session → ได้ join code
2. เปิด browser 2-3 หน้าต่าง → join ด้วย code เดียวกัน
3. ดู waiting room อัปเดต real-time เมื่อมี player join
4. Start game → ทุก player เล่นพร้อมกัน → ดู leaderboard live

### ✅ สรุป
- Join code = string สั้นๆ ที่ map ไปยัง game session
- Waiting room = real-time query ที่ watch players ในห้อง
- State: waiting → playing → completed (ห้ามข้าม)

---

## Session 18 — Deploy + Wrap Up

### 🎯 เป้าหมาย
- deploy Convex ขึ้น production ได้
- deploy Next.js ไปยัง Firebase Hosting ได้
- เตรียม presentation สำหรับ assessment

### 💡 แนวคิด

**Convex Deploy:**
```bash
# development (ใช้ระหว่างเรียน)
npx convex dev

# production deploy
npx convex deploy
```

**Next.js Static Export + Firebase:**
```bash
# build static files
npm run build   # next.config.js ต้องมี output: 'export'

# deploy ไป Firebase Hosting
firebase deploy --only hosting
```

**Environment Variables สำหรับ Production:**
```
Convex Dashboard → Settings → Environment Variables
→ เพิ่ม GEMINI_API_KEY (production key)

.env.local:
NEXT_PUBLIC_CONVEX_URL=https://xxx.convex.cloud  ← production URL
```

### 🧪 ทดลอง
1. Deploy Convex → production URL
2. Build Next.js static export
3. Deploy ไป Firebase Hosting
4. ทดสอบทุก feature บน production จริงๆ
5. แบ่งปัน URL ให้เพื่อนทดสอบ

### ✅ สรุป (Course Wrap-up)

**สิ่งที่นักเรียนได้เรียนรู้ตลอด 6 สัปดาห์:**

| สัปดาห์ | สิ่งที่ทำได้แล้ว |
|---|---|
| 1 | Setup Convex, เขียน schema, อ่านข้อมูลด้วย query |
| 2 | CRUD mutations, ออกแบบ relations, เพิ่ม indexes |
| 3 | สร้าง auth, กำหนด roles, ปกป้อง mutations |
| 4 | Real-time UI, เรียก external API ด้วย actions |
| 5 | Upload ไฟล์, generate quiz ด้วย AI |
| 6 | Real-time multiplayer, deploy production |

**ก้าวต่อไปที่นักเรียนสามารถเรียนรู้เพิ่มเติม:**
- Convex Scheduled Functions (cron jobs)
- HTTP Actions (webhooks)
- Convex Component (reusable backend modules)
- TypeScript advanced patterns
- Testing (unit test สำหรับ Convex functions)

---

# 📊 Appendix: Intentional Errors Summary

| Session | Error ที่เตรียมไว้ | บทเรียน |
|---|---|---|
| S2 | เพิ่มข้อมูลผิด type ใน Dashboard | Schema = contract ของข้อมูล |
| S3 | ลบ loading state check | undefined = กำลังโหลด ต้อง handle |
| S4 | ลบ validator จาก mutation | Bad data เข้า DB ได้ถ้าไม่ validate |
| S6 | Query โดยไม่มี index | Convex warn → เพิ่ม index แก้ได้ |
| S9 | เรียก admin mutation ด้วย player | Permission ต้องอยู่ใน server |
| S12 | ใส่ API key ใน NEXT_PUBLIC_ | Key โผล่ใน browser → อันตราย |
| S14 | Prompt ไม่ชัด → AI return format ผิด | Validate AI output เสมอ |

---

# 🔗 Resources

- [Convex Docs](https://docs.convex.dev)
- [Convex Auth Docs](https://labs.convex.dev/auth)
- [Gemini API Docs](https://ai.google.dev/docs)
- [Firebase Hosting](https://firebase.google.com/docs/hosting)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
