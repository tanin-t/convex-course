# 📋 Course Outline — Convex Course

> 6 สัปดาห์ × 3 sessions × 1.5 ชั่วโมง = 27 ชั่วโมง
> ภาษา: ไทย | โปรเจกต์: Quiz App
> **Convex เป็น vehicle ไม่ใช่ปลายทาง — ปลายทางคือ developer ที่คิดเป็น เรียนเป็น และพึ่งตัวเองได้**

---

## 📖 วิธีอ่านเอกสารนี้

เอกสารนี้ออกแบบจาก "ใคร" ก่อน "อะไร":

1. **ส่วนที่ 1 — Learner Profile** ใครคือนักเรียน เริ่มจากจุดไหน
2. **ส่วนที่ 2 — Long-term Vision** หลังจบคอร์ส (และอีก 1-2 ปี) นักเรียนเป็นแบบไหน
3. **ส่วนที่ 3 — Development Objectives** สิ่งที่นักเรียนต้องพัฒนา (mindset / skills / habits) — ไม่ใช่สิ่งที่ต้อง "รู้"
4. **ส่วนที่ 4 — Pedagogical Principles** หลักการสอนที่ใช้
5. **ส่วนที่ 5 — Session Anatomy** โครงสร้างของ 1 session
6. **ส่วนที่ 6 — Sessions (18 ครั้ง)** → แยกไว้ที่ [`outline/`](./outline/) — 1 ไฟล์ต่อ 1 session

> **หลักคิดพื้นฐาน:** AI ช่วยเติม knowledge gap ได้ แต่แทน real learning ไม่ได้
> สิ่งที่ AI แทนไม่ได้: judgment, decomposition, debugging instinct, การรู้ว่าจะถามอะไร, การประเมิน output, การสร้าง mental model
> คอร์สนี้สอนสิ่งที่ AI แทนไม่ได้

---
---

# ส่วนที่ 1 — Learner Profile

## นักเรียนเริ่มจากจุดไหน

**พื้นฐานที่มี:**
- HTML, CSS, JavaScript พื้นฐาน
- เคยสร้าง static website ด้วย Next.js (ส่วนใหญ่ผ่าน AI)
- เข้าใจแนวคิด database เบื้องต้น: table, column, relation 1-1 / 1-n / n-n
- ใช้ Cursor / Copilot / ChatGPT เป็นประจำในการเขียน code

**สิ่งที่ "ดูเหมือนรู้" แต่ยังไม่รู้จริง:**
- เคย copy code มาใช้ แต่ถ้าให้อธิบายว่า "ทำไม" บรรทัดนี้ต้องมี — อธิบายไม่ได้
- เห็น error → reflex แรกคือ paste ไปถาม AI โดยไม่อ่าน
- ไม่แน่ใจว่า frontend จบที่ไหน backend เริ่มที่ไหน
- ไม่เคยรับผิดชอบ data จริงของผู้ใช้คนอื่น
- ไม่เคย deploy code ที่ตัวเองเขียนให้คนอื่นใช้

**ความเสี่ยงที่ AI สร้าง (และคอร์สนี้ต้องระวัง):**
- **Comprehension illusion** — รู้สึกว่า "เข้าใจ" เพราะ AI อธิบายให้ฟัง แต่ทำเองไม่ได้
- **Outsourced thinking** — เจอปัญหา → ถาม AI ทันที โดยยังไม่ได้คิดเอง
- **Cargo-culting** — copy pattern มาใช้โดยไม่รู้ว่าเหมาะกับ context หรือไม่
- **Error blindness** — error message ยาวๆ → scroll ผ่าน → paste ทั้งก้อนให้ AI

**แรงจูงใจที่มักมี:**
- อยากสร้างของได้จริง อยากเห็นโปรเจกต์ทำงาน
- อยากได้ skill ที่ใช้ทำงานจริงได้
- กลัวจะ "ตกขบวน" ในยุค AI

---
---

# ส่วนที่ 2 — Long-term Vision (จบคอร์ส + 1-2 ปี)

นักเรียนที่ได้รับประโยชน์เต็มที่จากคอร์สนี้ ภายใน 1-2 ปีหลังจบ จะเป็น developer แบบนี้:

### 🧭 1. รู้ว่าตัวเองกำลังพยายามแก้ปัญหาอะไร
ไม่ใช่ "เขียน code ตามที่ AI ให้มา" แต่ "ฉันรู้ว่ากำลังพยายามทำอะไร ทำไม และ AI กำลังช่วยฉันที่ตรงไหน"

### 🔍 2. ตั้งคำถามได้คม
รู้ว่าจุดไหนของตัวเองที่ไม่เข้าใจ และอธิบายได้ว่า "ฉันคาดว่า X แต่เกิด Y" — แทนที่จะบอกแค่ "มัน error"

### 🛠 3. แตกปัญหาใหญ่เป็นชิ้นเล็กได้
เห็นโจทย์ "สร้าง quiz app" → ไม่ panic, แต่แตกออกได้ว่าจริงๆ ต้องการอะไรบ้าง

### 🔬 4. Debug แบบนักวิทยาศาสตร์
hypothesis → test → observe → adjust
ไม่ใช่ "เปลี่ยน code ไปเรื่อยๆ จนกว่าจะใช้ได้"

### ⚖️ 5. ตอบ "it depends" ได้
รู้ว่าทุก choice มี trade-off — index ทำให้ read เร็วแต่ write ช้า, schema เคร่งทำให้ปลอดภัยแต่ flexible น้อย

### 🤝 6. ใช้ AI เป็น collaborator ไม่ใช่ oracle
- prompt ได้ outcome ที่ต้องการ
- ตรวจสอบ output ก่อนเชื่อ
- รู้ว่าตอนไหนควรถาม AI, ตอนไหนควรอ่าน docs, ตอนไหนควรลองเอง

### 📚 7. เรียนรู้ของใหม่ด้วยตัวเองได้
หลังจบคอร์ส เปิด docs ของ tech ใหม่ → อ่านได้ — ไม่ต้องรอใครสอน

### 💼 8. มี ownership ต่อ code ที่เขียน
ไม่โทษ AI, ไม่โทษ library — ถ้า code ของฉันพัง ฉันรับผิดชอบหา root cause

---
---

# ส่วนที่ 3 — Development Objectives

สิ่งที่นักเรียนต้อง "พัฒนา" ระหว่างคอร์ส (ไม่ใช่สิ่งที่ต้อง "รู้")

## A. Mindset (ทัศนคติ)

| # | Mindset | จาก... | ไป... |
|---|---|---|---|
| A1 | **คิดก่อน code** | "ลองรันดู" | "ฉันคาดว่ามันจะทำอะไร แล้วค่อยรัน" |
| A2 | **Productive struggle** | งง = ขอความช่วยทันที | งง = สัญญาณว่ากำลังเรียนรู้ ลองเองอีกหน่อย |
| A3 | **Make it break on purpose** | กลัวพัง | ทำให้พังเพื่อเข้าใจขอบเขต |
| A4 | **Ownership** | "AI ให้ code มาแบบนี้" | "ฉันเลือกที่จะใช้ code นี้ และเข้าใจมัน" |
| A5 | **It depends** | "วิธีไหนถูก?" | "วิธีไหนเหมาะกับ context นี้?" |

## B. Learning Skills (วิธีเรียน)

| # | Skill | สัญญาณว่าพัฒนาแล้ว |
|---|---|---|
| B1 | **อ่าน official docs** | เปิด Convex docs เจอคำตอบเอง ไม่ต้องผ่าน AI ก่อน |
| B2 | **ตั้งคำถามที่ดี** | คำถามมี context: ทำอะไร คาดอะไร เกิดอะไร พบอะไรแล้วบ้าง |
| B3 | **สร้าง mental model** | อธิบาย Convex ให้เพื่อนฟังด้วยภาษาตัวเองได้ |
| B4 | **Reflective** | ตอบได้ว่า "session นี้ฉันเรียนรู้อะไรที่ session ที่แล้วยังไม่รู้" |

## C. Engineering Skills (ทักษะวิศวกรรม)

| # | Skill | สัญญาณว่าพัฒนาแล้ว |
|---|---|---|
| C1 | **Decomposition** | แตกโจทย์ "ทำ leaderboard" → list ของ sub-tasks ที่ทำทีละชิ้นได้ |
| C2 | **Hypothesis-driven debug** | ก่อน fix → เขียน "ฉันคิดว่าปัญหาเกิดจาก X เพราะ Y" |
| C3 | **อ่าน error message** | อ่าน error → indentify ส่วนที่สำคัญที่สุดได้ ก่อนไปถามใคร |
| C4 | **Trade-off thinking** | ก่อนเลือก approach → list อย่างน้อย 2 ทาง พร้อมข้อดี-ข้อเสีย |
| C5 | **Verify, don't trust** | code ที่ AI ให้มา → test กรณีขอบ ก่อนเชื่อ |

## D. AI Collaboration Skills (ทักษะร่วมงานกับ AI)

| # | Skill | สัญญาณว่าพัฒนาแล้ว |
|---|---|---|
| D1 | **Prompt with intent** | prompt มี: outcome ที่ต้องการ + constraint + context |
| D2 | **Read AI output critically** | อ่าน code ที่ AI ให้ทีละบรรทัด เห็นบรรทัดที่ไม่เข้าใจแล้วถามต่อ |
| D3 | **Know when to NOT ask AI** | บางอย่างเร็วกว่าถ้าอ่าน docs เอง / ทดลองเอง / debug เอง |
| D4 | **Cursor as a teacher** | ใช้ AI เพื่อ "พาฉันคิด" ไม่ใช่ "ทำให้ฉัน" |

## E. Communication (สื่อสาร)

| # | Skill | สัญญาณว่าพัฒนาแล้ว |
|---|---|---|
| E1 | **อธิบายสิ่งที่ไม่เข้าใจ** | "ส่วนที่ฉันไม่เข้าใจคือ ..." แทน "ทุกอย่างมันงงไปหมด" |
| E2 | **ขอความช่วยเหลือมี context** | บอก: ทำอะไรอยู่ คาดอะไร เกิดอะไร ลองอะไรแล้ว |
| E3 | **Present เรื่องเทคนิคได้** | อธิบาย concept ให้คนที่ไม่ได้อยู่ด้วยกันเข้าใจ |

---

## เป้าหมายแต่ละสัปดาห์ (Development Arc)

| สัปดาห์ | Convex topic | Development focus | Mindset shift |
|---|---|---|---|
| W1 | Setup + Schema + Query | A1, B1, B3 | "AI ทำให้" → "ฉันคิดเองแล้วใช้ AI ช่วย" |
| W2 | Mutation + Relations + Index | C1, C4, A5 | "ให้มันรัน" → "ฉันออกแบบให้ดี" |
| W3 | Auth + Roles + Permissions | A4, C5, D2 | "ใครๆ ก็ทำได้" → "ใครได้ทำอะไร ตรวจที่ไหน เพราะอะไร" |
| W4 | Real-time + Actions | B3, C2, D3 | "request-response" → "reactive system" |
| W5 | Storage + AI + Error handling | D1, D2, C5 | "AI สร้างของให้" → "ฉันออกแบบ + ตรวจสอบ AI" |
| W6 | Multiplayer + Deploy | C1, A4, E3 | "code ในเครื่อง" → "ส่งมอบสู่ผู้ใช้จริง" |

---
---

# ส่วนที่ 4 — Pedagogical Principles

หลักการ 7 ข้อที่กำหนดวิธีออกแบบทุก session:

### P1. Why ก่อน What
ทุก concept ต้องเริ่มจาก "ทำไมต้องมีสิ่งนี้" — ปัญหาที่มันแก้ — ก่อนสอนว่า "มันคืออะไร"
→ ถ้าเริ่มจาก "Schema คือ ..." นักเรียนจะจำไม่ได้ ถ้าเริ่มจาก "ถ้าไม่มี schema จะเป็นยังไง..." จะเข้าใจถึงรากของ concept

### P2. Friction is the lesson
**ทำให้พังโดยตั้งใจ** (`💥 BreakIt`) คือส่วนที่เรียนรู้ลึกที่สุด
→ Error ไม่ใช่ความล้มเหลว — เป็น signal ที่บอกขอบเขตของ concept

### P3. Productive struggle ก่อนคำตอบ
ก่อนให้คำตอบ ให้เวลานักเรียนลองคิด/ลองทำเอง 5-10 นาที
→ AI ใช้ได้ แต่เป็น "พา **ฉัน** คิด" ไม่ใช่ "ทำให้ฉัน"

### P4. Cursor as a teacher, not codegen
Cursor prompts ในคอร์สนี้ถูกออกแบบให้ AI "**สอน** ฉันทีละขั้น" ไม่ใช่ "**สร้าง** code ให้ฉัน"
→ อิงตาม [`docs/lesson-generation/04-cursor-as-teacher-not-codegen.md`](./docs/lesson-generation/04-cursor-as-teacher-not-codegen.md)

### P5. One concept per session, deepened
อย่ายัด 5 concepts ใน 1 session — ตอน 1 concept แต่ลึก
→ Depth > Breadth สำหรับ beginner

### P6. Reflect more than consume
ทุก session ลงท้ายด้วย reflection ไม่ใช่ recap
→ "ฉันเข้าใจอะไรใหม่บ้าง" ≠ "เราเรียน A, B, C"

### P7. Verify before trust (AI hygiene)
ทุก session ที่ใช้ AI gen code → ต้องมีขั้น "อ่านทีละบรรทัด ขีดส่วนที่ไม่เข้าใจ ถามต่อ"
→ ปลูกฝัง habit ตั้งแต่ session แรก

---
---

# ส่วนที่ 5 — Session Anatomy (1.5 ชั่วโมง)

โครงสร้างใหม่ของ 1 session แทนรูปแบบเดิม:

```
🪝 Hook              ปัญหา/ความขัดแย้ง/คำถามที่ทำให้ "อยากรู้"     (5 นาที)
🧠 Build the model    Mental model + why-first                       (15 นาที)
👀 See it             ตัวอย่างจริง — อ่าน code ทีละบรรทัด            (10 นาที)
🤖 Think with Cursor  prompt Cursor ในฐานะ "ครู" พาคิด                (15 นาที)
🧪 Make it work       ลงมือทำตาม outline                              (25 นาที)
💥 Make it break      ทำให้พังแบบมี hypothesis                        (15 นาที)
🪞 Reflect            ตอบคำถาม reflection 3-5 ข้อ                     (10 นาที)
🎯 Stretch (optional) สำหรับคนที่เสร็จเร็ว — โจทย์เปิด                (เหลือเวลา)
```

### Reflection prompts (ใช้ซ้ำได้ทุก session)
1. ก่อน session นี้ฉันคิดว่า X — ตอนนี้ฉันคิดว่า Y
2. ส่วนที่ยังไม่ชัดที่สุดสำหรับฉันคือ ...
3. ถ้าต้องอธิบาย concept นี้ให้เพื่อนฟัง 1 ประโยค ฉันจะพูดว่า ...
4. ฉันใช้ AI อย่างไรใน session นี้ — ดี/ไม่ดียังไง
5. ฉันอยากลองทำอะไรต่อหลังจาก session นี้

> **Reflection** จะถูกใช้เป็น input ของ Improvement Loop (ดู [`CONTEXT.md`](./CONTEXT.md)) — ครูจะเห็นว่า concept ไหนยังไม่ชัด

---
---

# ส่วนที่ 6 — Sessions (18 ครั้ง)

แต่ละ session มี 6 ส่วน: **🎯 Convex topic** · **🌱 Development focus** · **🪝 Hook** · **🧠 Build the model** · **💥 Break it** · **🪞 Reflect**

> Code snippets / step-by-step details จะอยู่ใน lesson page (`course/app/week-{N}/session-{M}/page.tsx`) — เอกสารนี้เก็บโครงและเหตุผล
> Session ละ 1 ไฟล์ ที่ [`outline/`](./outline/) (ดูได้ที่ [`outline/README.md`](./outline/README.md))

---

## 📅 Week 1 — เริ่มต้น: Mental Model + Convex + การอ่าน
> **Mindset arc:** "AI ทำให้ฉัน" → "ฉันคิดเองแล้วใช้ AI ช่วย"

- [Session 1 — ไม่ใช่แค่ Setup: เริ่มเข้าใจ "Backend"](./outline/session-01.md)
- [Session 2 — Schema: ทำไมการ "สัญญา" ก่อนเขียนถึงสำคัญ](./outline/session-02.md)
- [Session 3 — Query: อ่านข้อมูลครั้งแรก + handle states](./outline/session-03.md)

## 📅 Week 2 — เขียนข้อมูล + ออกแบบความสัมพันธ์ + ประสิทธิภาพ
> **Mindset arc:** "ให้มันรัน" → "ฉันออกแบบให้ดี"

- [Session 4 — Mutation: เขียนข้อมูล + Validation เป็น first defense](./outline/session-04.md)
- [Session 5 — Relations: ออกแบบก่อน Code (Requirements Workshop)](./outline/session-05.md)
- [Session 6 — Indexes: เห็นความช้าด้วยตาตัวเอง](./outline/session-06.md)

## 📅 Week 3 — Trust, Identity, Power
> **Mindset arc:** "ใครๆ ก็ทำได้" → "ใครได้ทำอะไร ตรวจที่ไหน เพราะอะไร"

- [Session 7 — Auth: คุณเป็นใคร (Authentication)](./outline/session-07.md)
- [Session 8 — Roles: แยก Convex Auth จาก "User ของเรา"](./outline/session-08.md)
- [Session 9 — Permissions: ป้องกัน Mutation ที่ Server-Side](./outline/session-09.md)

## 📅 Week 4 — Reactive Systems + External World
> **Mindset arc:** "request-response" → "reactive system"

- [Session 10 — Real-time Concept: useQuery คือ Subscription](./outline/session-10.md)
- [Session 11 — Live Leaderboard: ออกแบบ State Machine](./outline/session-11.md)
- [Session 12 — Actions: เรียก External API + Secrets](./outline/session-12.md)

## 📅 Week 5 — Storage + AI: ใช้ AI อย่างมีวินัย
> **Mindset arc:** "AI สร้างของให้" → "ฉันออกแบบ + ตรวจสอบ AI"

- [Session 13 — File Storage: ทำไม DB ไม่ใช่ที่เก็บรูป](./outline/session-13.md)
- [Session 14 — AI Generate Quiz: Prompt Engineering + Validation](./outline/session-14.md)
- [Session 15 — Error Handling + Loading States: Polish ที่หลีกเลี่ยงไม่ได้](./outline/session-15.md)

## 📅 Week 6 — ส่งมอบสู่ผู้ใช้จริง
> **Mindset arc:** "code ในเครื่อง" → "ส่งมอบสู่ผู้ใช้จริง"

- [Session 16 — Design Multiplayer: Diagram ก่อน Code](./outline/session-16.md)
- [Session 17 — Implement Multiplayer: Pair Programming](./outline/session-17.md)
- [Session 18 — Deploy + Wrap-up: ส่งมอบ + Reflect ทั้งคอร์ส](./outline/session-18.md)

---
---

# 📊 Appendix A — สิ่งที่ "พัง" ทั้งคอร์ส (Intentional Breaks)

| Session | สิ่งที่ทำให้พัง | บทเรียน (Mindset / Skill) |
|---|---|---|
| S1 | ปิด `npx convex dev` กลางทาง | dev server = live process (B3) |
| S2 | เพิ่ม field ผิด schema / migrate ผิด | Schema = contract เปลี่ยนยาก (A5, C4) |
| S3 | ลบ loading state check / `Math.random` ใน query | undefined = ยังไม่รู้ / pure คืออะไร (B3, C3) |
| S4 | ลบ validator / throw หลัง insert | Boundary + Transactional (A4, C5) |
| S5 | Reference ID ที่ไม่ exist | Convex ไม่ตรวจ existence — เราต้องตรวจเอง (C5) |
| S6 | Query field ที่ไม่อยู่ index | Compound index prefix order (B1, C2) |
| S7 | Login ด้วย password ผิด | Token vs Password (B3) |
| S8 | ลืมสร้าง user record ตอน register | 2 sources of truth = sync issue (C1) |
| S9 | เรียก admin mutation จาก console เป็น player | UI ≠ security (A4, D2) |
| S10 | Offline → mutation → reconnect | Real-time ≠ instant (B3) |
| S11 | Illegal state transition | State machine ต้อง check transition (C1, C4) |
| S12 | `NEXT_PUBLIC_` key + เขียน DB ใน action | Prefix มี security meaning (A4, C5) |
| S13 | Static-cached `getUrl()` หมดอายุ | URL TTL (B3, C4) |
| S14 | Prompt ไม่ชัด / prompt injection | AI output = untrusted (D1, C5) |
| S15 | Disconnect / expired session | Error categories (E1, A4) |
| S16 | (Workshop — break ความคิด ไม่ใช่ code) | Edge case ที่คนเดียวมองไม่เห็น (E2) |
| S17 | Concurrent submit / host disconnect | Race condition + idempotency (C2) |
| S18 | Production checklist ตัวเอง — ดูว่าลืมอะไร | "เสร็จ" คืออะไร (A4, E3) |

---

# 📊 Appendix B — Development Objective Map (sessions ที่ครอบคลุม)

| Objective | Sessions ที่เน้น |
|---|---|
| **A1** คิดก่อน code | S1, S12, S16 |
| **A2** Productive struggle | ทุก session (ผ่าน Hook) |
| **A3** Make it break | ทุก session (ผ่าน 💥) |
| **A4** Ownership | S4, S7, S9, S12, S15, S18 |
| **A5** It depends | S2, S5, S6, S13 |
| **B1** อ่าน docs | S2, S6, S7, S12 |
| **B2** ตั้งคำถามดี | S3, S5, S15 (review) |
| **B3** Mental model | S1, S3, S8, S10, S11 |
| **B4** Reflective | S15, S18 + reflection ทุก session |
| **C1** Decomposition | S5, S8, S11, S13, S16 |
| **C2** Hypothesis debug | S6, S14, S17 |
| **C3** อ่าน error | S3, S4 |
| **C4** Trade-off | S2, S5, S6, S11, S13 |
| **C5** Verify don't trust | S4, S7, S9, S12, S14 |
| **D1** Prompt with intent | S14 |
| **D2** Read AI output | S9, S14 |
| **D3** When to ask AI | S12, ทั่วทั้งคอร์ส |
| **D4** Cursor as teacher | S1, S17 (ใช้ตลอดคอร์ส) |
| **E1** อธิบายความงง | S15, reflection ทุกสัปดาห์ |
| **E2** Communication context | S5, S16 |
| **E3** Present | S18 |

---

# 📊 Appendix C — Lesson Generation Guide cross-references

หลักการในเอกสารนี้ tie กับ pedagogical patterns ใน [`docs/lesson-generation/`](./docs/lesson-generation/):

| Principle | Guide file |
|---|---|
| P4 (Cursor as teacher) | [04-cursor-as-teacher-not-codegen.md](./docs/lesson-generation/04-cursor-as-teacher-not-codegen.md) |
| Visual diagrams ใน session | [01-diagrams-use-mermaid.md](./docs/lesson-generation/01-diagrams-use-mermaid.md) |
| ภาษาในตัว lesson | [02-beginner-jargon-tooltips.md](./docs/lesson-generation/02-beginner-jargon-tooltips.md) |
| Exercise vs Prompt | [03-no-redundant-prompt-and-exercise.md](./docs/lesson-generation/03-no-redundant-prompt-and-exercise.md) |

Pattern ใหม่ที่ outline นี้น่าจะ generate (จาก feedback ในอนาคต):
- Reflection prompts pattern — ใช้คำถาม 3-5 ข้อปิด session
- "Hook before model" pattern — เริ่มจากความสงสัย ไม่ใช่ definition
- Intentional break pattern — ทุก session มี 💥 ที่เชื่อมกับ mental model ที่สอน

---

# 🔗 Resources

- [Convex Docs](https://docs.convex.dev)
- [Convex Auth Docs](https://labs.convex.dev/auth)
- [Gemini API Docs](https://ai.google.dev/docs)
- [Firebase Hosting](https://firebase.google.com/docs/hosting)

---

# 📝 Notes สำหรับครู

**ทำไมเอกสารนี้ไม่มี code snippets เยอะ:**
Code อยู่ใน lesson page (`course/app/week-{N}/session-{M}/page.tsx`) — เอกสารนี้เก็บ "why + arc + reflection prompts" เพื่อให้ generate lesson ในอนาคตได้ตรงเจตนา

**ก่อนเริ่ม session ทุกครั้ง ครูควรถามตัวเอง:**
1. Hook ของ session นี้เกี่ยวข้องกับชีวิตนักเรียนยังไง
2. Mental model ที่จะสอน — ครูอธิบายเป็นภาษาตัวเองได้ไหม (ไม่อ่าน slide)
3. 💥 ที่เตรียมไว้ — connect กลับไปยัง concept ที่สอนได้ไหม
4. Reflection prompts — ถ้านักเรียนตอบจริงจัง ครูจะได้ข้อมูลอะไรเอาไป improve lesson

**Failure mode ที่ต้องระวัง:**
- Hook ที่ "intro" แทนที่จะ "ตั้งคำถาม"
- Mental model ที่เป็น definition แทน analogy
- Break ที่ random แทนที่จะ connect concept
- Reflection ที่กลายเป็น recap

**สัญญาณว่า course ทำงานดี:**
- นักเรียนเริ่ม "เถียง AI" — เห็น output แปลกๆ บอกว่า "นี่ไม่น่าใช่"
- นักเรียนเปิด docs เอง ไม่รอครู
- นักเรียนถาม "ทำไม" มากกว่า "ทำยังไง"
- นักเรียน present ได้โดยไม่อ่าน slide

