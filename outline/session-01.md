# Session 1 — ไม่ใช่แค่ Setup: เริ่มเข้าใจ "Backend"

> **Week 1** · Online self-paced tutorial
> Page: `course/app/week-1/session-1/page.tsx`
> Part of [Convex Course Outline](../COURSE_OUTLINE.md)

---

## 🎯 Page goals

หลังจบหน้านี้ นักเรียน:
- มี mental model ของ "backend" ที่อธิบายเป็นภาษาตัวเองได้
- รู้ว่า Convex คืออะไร แก้ปัญหาอะไร (โดยไม่ต้องท่องคำว่า "BaaS")
- มี Convex project รันได้บนเครื่อง พร้อม Dashboard เปิดดูได้
- เริ่มฝึกนิสัย "**predict ก่อน run**" ที่จะใช้ตลอดคอร์ส

**ไม่ใช่เป้าหมาย:** เขียน query/mutation (Session 2-3), เข้าใจ real-time (Session 10), รู้จัก deployment (Session 18)

---

## 🧩 Interactive components ที่ใช้ในหน้านี้

| Component | จำนวน | ใช้ตรงไหน |
|---|---|---|
| `PredictThenReveal` | 2 | Hook + ก่อนเปิด Dashboard ครั้งแรก |
| `MultipleChoice` | 2 | Mental model check + Cursor mode check |
| `ClickableDiagram` | 1 | "ตัวกลาง" ใน browser ↔ ??? ↔ database |
| `DragToBucket` | 1 | เก็บข้อมูลที่ไหน |
| `StepReveal` | 1 | ของที่ Convex มี built-in |
| `ToggleCompare` | 1 | Traditional backend vs Convex |
| `CheckboxList` | 1 | Setup checklist (persist) |
| `HypothesisBox` | 3 | Break it scenarios |
| `PersistentReflection` | 5 | Reflection answers |
| `ConfidenceSlider` | 1 | ปิด session — ประเมินความมั่นใจ |

---
---

# Section 1 — Hook: ข้อมูลของคุณหายไปไหน?

### Narrative
"จำเว็บที่คุณเคยทำได้ไหม? มี form ให้กรอกชื่อ — refresh ปุ๊บข้อมูลหาย
คำถามคือ — **ถ้าคุณอยากให้ข้อมูลของคนกรอกยังอยู่หลัง refresh — มันต้องอยู่ที่ไหน?**

หยุดก่อน ลองคิด 30 วินาที. อย่าพึ่ง scroll ลง"

### 🧩 `<PredictThenReveal>`
```yaml
question: "ข้อมูลของผู้ใช้ที่คุณอยากให้อยู่ตลอด — ต้องเก็บที่ไหน?"
hint: "ลองนึกถึงเว็บที่คุณใช้ทุกวัน (Facebook, Twitter, ...) — ข้อมูลคุณอยู่บนเครื่องคุณ?"
input_type: textarea
reveal_button: "ดูคำตอบ"
reveal_content: |
  คำตอบสั้น: **อยู่ที่ "เครื่องอื่น" ที่ทุกคนเข้าถึงได้กลาง**
  เครื่องนั้นเรียกว่า **server**
  ที่เก็บข้อมูลในเครื่องนั้นเรียกว่า **database**
  ตัวกลางที่จัดการระหว่าง browser ของคุณกับ database เรียกว่า **backend**

  คอร์สนี้จะสอนคุณสร้างตัวกลางนั้นด้วย Convex
note: คำตอบของนักเรียนไม่ต้อง "ถูก" — แค่ได้คิดก่อนเห็นเฉลย
```

### Closing
"ตอนนี้ scroll ต่อ — เราจะค่อยๆ ทำความรู้จักกับ 'ตัวกลาง' ที่ว่า"

---
---

# Section 2 — Mental model: "ตัวกลาง" คืออะไร

### Narrative
"ลองดูภาพนี้ — browser ของผู้ใช้หลายคน คุยกับ database ผ่าน '???' อันเดียวกัน
**???** มีหน้าที่อะไร? คลิกแต่ละจุดในภาพเพื่อดู"

### 🧩 `<ClickableDiagram>`
```yaml
diagram_type: mermaid_or_svg
nodes:
  - id: browser-alice
    label: "Browser ของ Alice"
    tooltip: "เว็บที่ผู้ใช้ Alice เปิดอยู่ — เห็นและคลิกได้ที่นี่"
  - id: browser-bob
    label: "Browser ของ Bob"
    tooltip: "อีกผู้ใช้คนละเครื่อง — ก็คุยกับตัวกลางเดียวกัน"
  - id: backend
    label: "??? (Backend)"
    tooltip: |
      ตัวกลางที่ทำงานบน server
      หน้าที่: ตรวจว่า request ถูกไหม, อ่าน/เขียน database, ส่งคำตอบกลับ
      โดยที่ browser ไม่ต้องแตะ database ตรงๆ
  - id: database
    label: "Database"
    tooltip: |
      ที่เก็บข้อมูลจริง — รอด refresh, รอด ปิดเบราว์เซอร์, รอด restart
      Browser ไม่เข้ามาที่นี่โดยตรง — ผ่าน backend เสมอ
edges:
  - browser-alice → backend
  - browser-bob → backend
  - backend ↔ database
```

### Analogy
"คิดเหมือนร้านอาหาร:
- **ลูกค้า (browser)** — สั่งของ ไม่ได้เดินเข้าครัวเอง
- **พนักงาน (backend)** — รับ order, ตรวจว่าสั่งถูกไหม, ส่งให้ครัว, เอามาเสิร์ฟ
- **ครัว (database)** — เก็บของจริง

ทำไมไม่ให้ลูกค้าเข้าครัวเอง? ลองตอบในใจ..."

### 🧩 `<MultipleChoice>`
```yaml
question: "ทำไมเราไม่ให้ browser คุยกับ database ตรงๆ?"
options:
  - id: A
    label: "เพราะ database ช้าเกินไป"
    correct: false
    explanation: "ไม่ใช่ — database เร็วพอ แต่ปัญหาไม่ใช่ความเร็ว"
  - id: B
    label: "เพราะถ้าใครก็ได้เข้า database ตรง = ลบ/ขโมยข้อมูลคนอื่นได้"
    correct: true
    explanation: "ใช่ — backend คือ 'ด่าน' ที่ตรวจว่าใครได้ทำอะไรได้บ้าง"
  - id: C
    label: "เพราะ database ใช้ภาษาที่ browser ไม่รู้จัก"
    correct: false
    explanation: "ส่วนหนึ่งจริง — แต่นั่นไม่ใช่เหตุผลหลัก. เหตุผลหลักคือ security + control"
  - id: D
    label: "ไม่รู้"
    correct: false
    explanation: "ไม่เป็นไร — เลื่อนกลับไปอ่าน analogy แล้วลองเดาอีกครั้ง"
show_all_explanations_after_pick: true
```

---
---

# Section 3 — ข้อมูลแต่ละแบบ — ควรเก็บที่ไหน?

### Narrative
"ก่อนเราพูดถึง Convex — มาดูก่อนว่า ข้อมูลแต่ละแบบ ควรเก็บที่ไหนกันแน่
ลากแต่ละข้อไปวางในกล่องที่คิดว่าใช่"

### 🧩 `<DragToBucket>`
```yaml
buckets:
  - id: browser-memory
    label: "Browser memory (React useState)"
    description: "หายเมื่อ refresh"
  - id: localstorage
    label: "Browser localStorage"
    description: "อยู่บน device ผู้ใช้คนนั้น — refresh ไม่หาย แต่ device อื่นไม่เห็น"
  - id: database
    label: "Database (ผ่าน backend)"
    description: "ทุก device ของทุก user เห็นเหมือนกัน"

items:
  - text: "ค่า input ที่ user กำลังพิมพ์ (ยังไม่ submit)"
    correct_bucket: browser-memory
    why: "ไม่จำเป็นต้องอยู่ — submit แล้วค่อยส่ง"
  - text: "Theme dark/light ที่ user เลือก"
    correct_bucket: localstorage
    why: "เป็น preference ของ device นั้น — ไม่ต้อง sync ทุก user"
    note: "ถ้า want sync ทุก device — ก็ใส่ database ได้"
  - text: "Post ที่ user เขียนใน social network"
    correct_bucket: database
    why: "ทุกคนต้องเห็นได้ — refresh ไม่หาย — เปิด device อื่นก็เห็น"
  - text: "Score ของผู้ใช้ในเกม"
    correct_bucket: database
    why: "Leaderboard ต้องเห็นกันได้"
  - text: "Scroll position ตอนนี้ของ user"
    correct_bucket: browser-memory
    why: "ไม่มีใครต้องรู้, refresh แล้วเริ่มใหม่ก็ได้"

feedback_mode: "instant per drop"
```

### Insight
"สังเกตไหม? ข้อมูลที่อยากให้ '**คนอื่นเห็น**' หรือ '**device อื่นเห็น**' ต้องอยู่ใน database
และทุกครั้งที่ database — ต้องผ่าน backend
**คอร์สนี้คือเรื่องนั้น**"

---
---

# Section 4 — ปัญหาของ backend แบบเดิม

### Narrative
"ก่อน Convex จะเกิด คนทำ backend ยังไง?
ลองดู checklist ของสิ่งที่นักพัฒนาต้องทำเอง — คลิกเปิดทีละข้อ"

### 🧩 `<StepReveal>`
```yaml
intro: "สิ่งที่ developer ต้องตั้งเอง ถ้าทำ backend แบบดั้งเดิม:"
steps:
  - title: "1. หา server (เครื่อง) — ต้องเช่า"
    body: "AWS, Google Cloud, ... — เลือก spec, จ่ายต่อชั่วโมง, ดูแลให้ทำงานตลอด 24/7"
  - title: "2. ตั้ง database"
    body: "ติดตั้ง PostgreSQL/MongoDB เอง — กำหนด user/password, backup, scale ตอน data โต"
  - title: "3. เขียน server เอง"
    body: "Express, Django, Rails — handle request, route, parse JSON, ..."
  - title: "4. ทำ authentication"
    body: "Hash password, จัดการ session token, reset password, ... — security เผลอผิดง่ายมาก"
  - title: "5. Deploy"
    body: "Build, push image, configure environment variable, set up CI/CD, monitor logs"
  - title: "6. Scale ตอนคนเยอะ"
    body: "Load balancer, replica, caching, database sharding..."
reveal_one_at_a_time: true
reveal_button_label: "เปิดข้อต่อไป →"
closing: |
  "นี่คือทำไม backend ขึ้นชื่อว่ายาก — ก่อนได้เริ่มเขียน feature จริงๆ ต้องผ่าน 6 ขั้นข้างบนก่อน
  **สำหรับ beginner — แทบเป็นไปไม่ได้**"
```

---
---

# Section 5 — Convex คืออะไร

### Narrative
"Convex บอกว่า: '6 ข้อข้างบน เราทำให้ — คุณแค่เขียน function'
ลองดูเปรียบเทียบ"

### 🧩 `<ToggleCompare>`
```yaml
toggle_options:
  - id: traditional
    label: "Backend แบบเดิม"
  - id: convex
    label: "Convex"

side_traditional:
  title: "สิ่งที่คุณต้องทำ"
  items:
    - "เช่า server"
    - "ตั้ง database"
    - "เขียน server (Express)"
    - "ทำ auth (hash password เอง)"
    - "Deploy + CI"
    - "Scale + monitor"
    - "...เขียน feature"

side_convex:
  title: "สิ่งที่คุณต้องทำ"
  items:
    - "เขียน function"
    - "(Convex จัดการที่เหลือให้)"

caption: "นี่คือ promise ของ Convex — มันจริงไหม? ตลอดคอร์สนี้คุณจะเห็นว่ามันจริงแค่ไหน + มี trade-off อะไรบ้าง"
```

### ของที่ Convex มี built-in
"Convex มีของพร้อมใช้ — เปิดดูทีละอัน"

### 🧩 `<StepReveal>`
```yaml
intro: "Convex built-in:"
steps:
  - title: "🗄 Database"
    body: "เก็บข้อมูล ไม่ต้องตั้ง PostgreSQL/Mongo เอง"
  - title: "⚡ Real-time"
    body: "ข้อมูลเปลี่ยน → ทุก browser ที่ดูอยู่อัปเดตทันที (Session 10 จะเรียน)"
  - title: "🔐 Auth"
    body: "Login/register/session — ไม่ต้องเขียนเอง (Session 7-9)"
  - title: "📁 File storage"
    body: "Upload รูป/ไฟล์ — มี CDN ในตัว (Session 13)"
  - title: "🚀 Deploy"
    body: "`npx convex deploy` — เสร็จ (Session 18)"
reveal_one_at_a_time: true
```

### 🧩 `<MultipleChoice>` — ตรวจความเข้าใจ
```yaml
question: "ข้อใดต่อไปนี้ **ไม่ใช่** สิ่งที่ Convex จัดการให้ฟรี?"
options:
  - id: A
    label: "ตั้ง database ขึ้นมาเอง"
    correct: false
    explanation: "Convex จัดการ database ให้ — ✅ ฟรี"
  - id: B
    label: "เขียน business logic ของแอป (เช่น 'ตอบถูก = +10 คะแนน')"
    correct: true
    explanation: "ใช่ — นี่คือสิ่งที่ **คุณ** ต้องเขียน. Convex รัน function ให้ แต่ logic เป็นของคุณ"
  - id: C
    label: "Auth (login/register)"
    correct: false
    explanation: "Convex มี Convex Auth — ✅ ฟรี"
  - id: D
    label: "Real-time update"
    correct: false
    explanation: "Convex มีในตัว — ✅ ฟรี"
show_all_explanations_after_pick: true
```

---
---

# Section 6 — เห็นของจริง: Setup Convex

### Narrative
"พอเรารู้จัก Convex แล้ว ตอนนี้มาทำให้รันบนเครื่องคุณกันจริงๆ
**เป้า:** หลังส่วนนี้จบ คุณจะมี Convex project + Dashboard เปิดได้

ก่อนเริ่ม — ตรวจของในเครื่องก่อน"

### 🧩 `<CheckboxList>` — Prerequisites
```yaml
title: "ก่อนเริ่ม ตรวจว่าเครื่องคุณมี:"
persist: true
items:
  - id: node
    label: "Node.js ≥ 18 (รัน `node --version` ใน terminal)"
    hint: "ถ้ายังไม่มี → ติดตั้งจาก nodejs.org"
  - id: npm
    label: "npm ≥ 9 (รัน `npm --version`)"
  - id: cursor
    label: "Cursor IDE เปิดอยู่"
    hint: "ถ้ายังไม่มี → cursor.com"
  - id: github
    label: "GitHub account (สำหรับ login Convex)"
all_required_to_proceed: false
note: "ขีด ✓ แล้วค่อยไปต่อ"
```

### Step-by-step
"ลำดับขั้น — ทำตามไปทีละข้อ:"

### 🧩 `<CheckboxList>` — Setup steps
```yaml
title: "Setup checklist (ขีด ✓ เมื่อทำเสร็จ)"
persist: true
items:
  - id: create-next
    label: "สร้าง Next.js project ใหม่ — `npx create-next-app@latest quiz-app`"
    detail_expandable: |
      เลือก options: TypeScript ✅, ESLint ✅, Tailwind ✅, App Router ✅
      เมื่อเสร็จ — `cd quiz-app`
  - id: install-convex
    label: "ติดตั้ง Convex — `npm install convex`"
  - id: convex-dev
    label: "รัน `npx convex dev`"
    detail_expandable: |
      ครั้งแรก: Convex จะถาม login → เลือก GitHub
      จากนั้นถามชื่อ project → ตั้งชื่อ "quiz-app"
      Convex จะสร้าง deployment ใหม่
      **terminal นี้รันค้างไว้!** (อย่าปิด — มัน sync code ของคุณกับ Convex Cloud)
  - id: dashboard
    label: "เปิด Convex Dashboard (terminal จะมี URL ให้)"
    detail_expandable: |
      ดู tab Data (ตอนนี้ว่าง) และ Functions (ตอนนี้ว่าง)
      นี่คือหน้าต่างไปดู Cloud ของคุณ
  - id: env
    label: "ตรวจ `.env.local` มี `NEXT_PUBLIC_CONVEX_URL=...`"
    hint: "ถ้าไม่มี — `npx convex dev` ครั้งแรกจะสร้างให้อัตโนมัติ"
  - id: provider
    label: "Wrap Next.js app ด้วย `ConvexProvider` ใน `app/layout.tsx`"
    detail_expandable: |
      ตาม docs ของ Convex: https://docs.convex.dev/quickstart/nextjs
      ส่วนสำคัญ: import `ConvexProvider` + `ConvexReactClient`, สร้าง client จาก `NEXT_PUBLIC_CONVEX_URL`, wrap children
  - id: next-dev
    label: "เปิดอีก terminal → รัน `npm run dev`"
    detail_expandable: |
      จะมี 2 terminal รันพร้อมกัน:
      - Terminal 1: `npx convex dev` (sync convex/)
      - Terminal 2: `npm run dev` (Next.js)
      เปิด http://localhost:3000 → ควรเห็นหน้า Next.js default
```

### 🧩 `<PredictThenReveal>` — ก่อนเปิด Dashboard
```yaml
question: "ก่อนเปิด Dashboard — คุณคาดว่า Dashboard จะมีอะไรให้ดูบ้าง?"
input_type: textarea
reveal_button: "เปิด Dashboard เปรียบเทียบ"
reveal_content: |
  Dashboard มี tabs หลัก:
  - **Data** — ดูทุก document ใน database (ตอนนี้ว่างเพราะยังไม่มี data)
  - **Functions** — list ของ query/mutation/action ที่ deploy แล้ว
  - **Logs** — log ของทุกครั้งที่ function ถูกเรียก
  - **Schedules** — task ที่รันตามเวลา (เรียนทีหลัง)
  - **Settings** — env variables, members, ...

  เปรียบกับที่คุณเดา — ตรงไหนใกล้, ตรงไหนไม่คิดถึง?
```

---
---

# Section 7 — 💥 ทำให้พัง: หา edge ของ mental model

### Narrative
"ตอนนี้คุณมี Convex รันได้แล้ว — มาเล่นให้พังกัน
**ทุก scenario ข้างล่าง: เขียน hypothesis ก่อนทำ** แล้วค่อยลอง"

### 💥 Break 1 — ปิด `npx convex dev`

### 🧩 `<HypothesisBox>`
```yaml
setup: |
  คุณมี `npx convex dev` รันค้างอยู่ — ถ้าคุณ:
  1. ปิด terminal นั้น
  2. เปิด Dashboard refresh
  3. ลองแก้ไฟล์ใน `convex/` แล้ว save
  ...คุณคาดว่าจะเกิดอะไร?
input_type: textarea
prompt_placeholder: "ฉันคิดว่า ... เพราะ ..."
reveal_button: "ลองทำดู แล้วเปิดคำตอบ"
reveal_content: |
  **สิ่งที่เกิด:**
  - Dashboard refresh → **ยังเห็นข้อมูลอยู่** (เพราะ Dashboard คุยกับ Cloud ตรง ไม่ผ่าน dev server)
  - แก้ไฟล์ใน `convex/` → **ไม่ deploy** ขึ้น Cloud (เพราะ dev server ไม่ทำงาน)

  **บทเรียน:**
  - `npx convex dev` = sync จาก **เครื่องคุณ** → Cloud
  - Cloud ยังอยู่แม้คุณปิด dev — แต่การแก้ของคุณไม่ไป Cloud
  - กลับมารัน `npx convex dev` อีกครั้ง → ของที่ค้างจะ sync
```

### 💥 Break 2 — รัน `npx convex dev` 2 ที่ใน 2 terminal

### 🧩 `<HypothesisBox>`
```yaml
setup: "เปิด terminal ใหม่ในโปรเจกต์เดียวกัน — รัน `npx convex dev` อีกครั้ง — คาดว่า?"
input_type: textarea
reveal_button: "ดูผลจริง"
reveal_content: |
  Convex จะ warn — มันรู้ว่า dev server อีกตัวรันอยู่แล้ว
  **บทเรียน:** dev server ไม่ใช่ stateless command — มี state, ไม่ใช่จะรันซ้อนกี่ตัวก็ได้
```

### 💥 Break 3 — ลบ `NEXT_PUBLIC_CONVEX_URL`

### 🧩 `<HypothesisBox>`
```yaml
setup: |
  ใน `.env.local` ลบบรรทัด `NEXT_PUBLIC_CONVEX_URL=...` แล้ว restart `npm run dev`
  เปิด http://localhost:3000 — คาดว่า?
input_type: textarea
reveal_button: "ดูผลจริง"
reveal_content: |
  **Console error:** "Missing CONVEX_URL" หรือ ConvexProvider พัง
  **บทเรียน:** Next.js ต้องรู้ว่า Convex ของคุณอยู่ที่ URL ไหน — ไม่งั้นไม่รู้จะคุยกับใคร
  → คืน env variable เดิม → restart → กลับมาทำงาน

  **ภายหลัง:** Session 12 จะอธิบายว่าทำไม prefix `NEXT_PUBLIC_` มีความหมาย
```

---
---

# Section 8 — 🪞 Reflect

### Narrative
"ก่อนปิดหน้านี้ — ตอบคำถามนี้ลงไปจริงๆ (จะถูก save อัตโนมัติบน device คุณ)
ไม่ต้องเขียนยาว — เขียนตรงๆ ที่คุณคิด"

### 🧩 `<PersistentReflection>` × 5
```yaml
questions:
  - id: r1
    prompt: |
      **ก่อน** session นี้ "backend" สำหรับฉันคือ ...
      **ตอนนี้** ฉันอธิบายได้ว่า ...
    placeholder: "ลองเขียนสั้นๆ — 2-3 ประโยค"

  - id: r2
    prompt: "ฉันคาดว่า `npx convex dev` จะทำ X — แต่จริงๆ มันทำ Y"

  - id: r3
    prompt: |
      ถ้าต้องอธิบาย Convex ให้เพื่อนที่ไม่ได้อ่านหน้านี้ ใน 1 ประโยค ฉันจะพูดว่า ...
      *(ห้ามใช้คำว่า "BaaS", "serverless")*

  - id: r4
    prompt: "ฉันใช้ AI/Cursor ใน session นี้ยังไง? มันพา **ฉัน** คิด หรือ ทำ **ให้** ฉัน?"

  - id: r5
    prompt: "ส่วนที่ฉันยังไม่ชัดที่สุดคือ ... (จะกลายเป็นจุดเริ่ม session ต่อไป)"
```

### 🧩 `<ConfidenceSlider>`
```yaml
prompt: "หลังหน้านี้ — ฉันมั่นใจแค่ไหนว่า 'backend' คืออะไร?"
scale: 0-10
labels:
  0: "ยังเบลออยู่"
  5: "พอเข้าใจ แต่อธิบายยังไม่คล่อง"
  10: "อธิบายให้เพื่อนเข้าใจได้แน่นอน"
persist: true
note: "ไม่มีคำตอบที่ 'ถูก' — แค่ดูตัวเอง. ถ้า ≤ 5 → กลับไปอ่าน Section 2 อีกครั้งโดยไม่ต้องรีบ"
```

---
---

# 🔭 Looking ahead → Session 2

หน้าต่อไปจะตอบคำถาม:
- "Convex รู้ได้ยังไงว่า data ของฉันมี structure แบบไหน?"
- "ทำไมต้อง define อะไรก่อนเขียน?"
- "ถ้าฉันส่ง data ผิด format — Convex ทำยังไง?"

→ คำตอบคือ **Schema** — เครื่องมือสำคัญที่ทำให้ Convex ไม่ใช่แค่ "MongoDB ปลอม"

---

## 📝 Notes for page author

- ทุก `<HypothesisBox>` และ `<PersistentReflection>` ใช้ `localStorage` key ที่ scoped ตาม session id (เช่น `s1-r1`, `s1-break-1`) เพื่อให้ refresh แล้วค่าเดิมยังอยู่
- `<CheckboxList>` setup steps ต้อง persist เพราะนักเรียนอาจปิด tab แล้วกลับมา (อย่ารีเซ็ต)
- `<ClickableDiagram>` browser↔backend↔database — แนะนำ Mermaid (ตาม pattern [01](../docs/lesson-generation/01-diagrams-use-mermaid.md)) หรือ SVG ถ้า Mermaid limit interactivity
- ภาษา: ไทยเป็นหลัก. ศัพท์เทคนิคไม่คุ้น (เช่น "deployment", "environment variable") → wrap ใน [`<Jargon>`](../docs/lesson-generation/02-beginner-jargon-tooltips.md)
- `<MultipleChoice>` — ต้องแสดง explanation **ทุกตัวเลือก** หลังนักเรียนตอบ ไม่ใช่แค่ที่ถูก (เพราะส่วน "ทำไมตัวเลือก B แม้เหมือนถูกแต่ผิด" คือที่ value)
- ห้าม gate session ต่อไปด้วย quiz — soft progress only. นักเรียนรู้ตัวเองว่าพร้อมไหม
