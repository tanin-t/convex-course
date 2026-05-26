# 🎓 Convex Course — เรียนรู้ Backend Web Development ด้วย Convex

> คอร์สสำหรับผู้เริ่มต้น สอนแนวคิด backend และ real-time database ผ่านการสร้าง Quiz App จริงๆ

---

## 📌 เกี่ยวกับ Course นี้

Course นี้ออกแบบสำหรับนักเรียนที่มีพื้นฐาน frontend แล้ว และต้องการเรียนรู้ว่า backend ทำงานอย่างไร
โดยใช้ **Convex** เป็นเครื่องมือหลัก ซึ่งช่วยให้เรียนรู้แนวคิดสำคัญได้โดยไม่ต้องตั้ง server เอง

### พื้นฐานที่นักเรียนควรมีก่อนเรียน

- HTML, CSS, JavaScript พื้นฐาน
- สร้าง static website ด้วย Next.js ได้ (ด้วยความช่วยเหลือของ AI)
- เข้าใจแนวคิด database เบื้องต้น: table, column, relation (1-1, 1-n, n-n)

### เมื่อจบ Course นักเรียนจะสามารถ

- [ ] อธิบายได้ว่า serverless backend คืออะไร และ Convex ทำงานอย่างไร
- [ ] เขียน query, mutation, action ด้วย Convex ได้
- [ ] ออกแบบ database schema และ relations ได้ด้วยตัวเอง
- [ ] สร้าง authentication และ role-based permission ได้
- [ ] ใช้ real-time subscription เพื่อสร้าง live UI ได้
- [ ] เรียกใช้ external AI API ผ่าน Convex Action ได้
- [ ] deploy project จริงขึ้น production ได้
- [ ] **เรียนรู้ต่อด้วยตัวเองได้** — นี่คือเป้าหมายสูงสุด

---

## 🛠 Tech Stack

| ส่วน | เทคโนโลยี | หมายเหตุ |
|---|---|---|
| Frontend | Next.js (static export) | ไม่ต้องมี server สำหรับ frontend |
| Backend | Convex Cloud | serverless, real-time |
| Authentication | Convex Auth | built-in กับ Convex |
| Hosting | Firebase Hosting | host static Next.js |
| AI | Gemini API | สำหรับ generate quiz |
| IDE | Cursor | AI coding assistant |
| Language | TypeScript | type safety |

---

## 🎯 โปรเจกต์ — Quiz App

นักเรียนจะสร้าง **Quiz App** ตั้งแต่ต้นจนถึง production
โดยแบ่งเป็น Core (ทุกคนทำ) และ Extension (group project)

### Data Model

```
users
  ├── name, email
  └── role: "admin" | "player"

questions  ← Question Bank
  ├── text
  ├── type: "multiple_choice" | "true_false"
  ├── choices: string[]
  ├── correctAnswer: number | boolean
  ├── topic, difficulty: "easy" | "medium" | "hard"
  └── createdBy → users

quizzes
  ├── title, description
  ├── status: "draft" | "published"
  ├── coverImage?              ← Convex file storage
  └── createdBy → users

quiz_questions  ← junction table (Quiz ↔ Question = n-n)
  ├── quizId → quizzes
  ├── questionId → questions
  └── order: number

game_sessions
  ├── quizId → quizzes
  ├── hostId → users
  ├── mode: "solo" | "multiplayer"
  ├── joinCode?               ← สำหรับ multiplayer
  └── status: "waiting" | "playing" | "completed"

player_sessions
  ├── gameSessionId → game_sessions
  ├── userId → users
  └── score: number

answers
  ├── playerSessionId → player_sessions
  ├── questionId → questions
  ├── answer: string
  └── isCorrect: boolean
```

### Core Features (ทุกคนทำ — งานเดี่ยว)

| Feature | Convex Concept ที่เรียน |
|---|---|
| Question Bank CRUD | Query, Mutation, Validator |
| Quiz CRUD + link questions | Relations (n-n), Junction table |
| Auth (login/register) | Convex Auth |
| Roles (admin/player) | Authorization, identity |
| Play quiz + บันทึกคำตอบ | Mutation chain, state |
| Real-time leaderboard | Reactive query, real-time |

### Extension Features (group project — 3 คน, 3 features)

| นักเรียน | Feature | Convex Concept ที่เรียน |
|---|---|---|
| คนที่ 1 | AI Generate Quiz | Action, Gemini API, env secrets |
| คนที่ 2 | File Upload (cover image) | File storage, generateUploadUrl |
| คนที่ 3 | Performance Analysis | Action, aggregate query, AI feedback |

**SDLC ที่ฝึก:** Git branch → code → commit → PR → review → merge

```
main
 └── uat
      ├── feature/ai-quiz-gen
      ├── feature/file-upload
      └── feature/perf-analysis
```

---

## 📅 Course Structure — 6 สัปดาห์

| สัปดาห์ | หัวข้อหลัก | Concept สำคัญ |
|---|---|---|
| Week 1 | รู้จัก Convex + Schema + Query | Serverless, Types, useQuery |
| Week 2 | Mutation + Relations + Indexes | CRUD, n-n relation, Index |
| Week 3 | Auth + Roles + Permissions | Authentication, Authorization |
| Week 4 | Real-time + Actions | Reactive query, External API |
| Week 5 | File Storage + AI Integration | Storage, Gemini API, Error handling |
| Week 6 | Multiplayer + Deploy | State machine, Firebase deploy |

> รายละเอียดแต่ละ session → ดูที่ [COURSE_OUTLINE.md](./COURSE_OUTLINE.md)

---

## 📝 Format ของแต่ละ Session (1.5 ชั่วโมง)

```
🎯 เป้าหมาย         สั้นๆ ว่าจะได้อะไร                    (2 นาที)
💡 แนวคิด           อธิบาย what + why                     (10 นาที)
👀 ดูตัวอย่าง       เห็น code จริงก่อนเขียนเอง             (10 นาที)
🤖 Prompt กับ Cursor วิธี prompt ที่ถูกต้อง + อ่าน output  (20 นาที)
🧪 ทดลองเอง         นักเรียนแก้ไข ดูผลลัพธ์               (25 นาที)
💥 ทำให้มันพัง      error ที่เตรียมไว้ เรียนจากการแก้      (15 นาที)
✅ สรุป             recap concepts + คำถามทบทวน           (8 นาที)
```

---

## 🎤 Assessment

นักเรียนแต่ละคน **present ให้เพื่อนฟัง** โดยครอบคลุม:

1. **Demo** — แสดง project ที่สร้างขึ้น
2. **Concept** — อธิบาย concept ที่สำคัญที่สุดที่ได้เรียน
3. **ข้อผิดพลาด** — เล่าถึง error ที่ยากที่สุดที่เจอ และแก้ยังไง
4. **แนวทางต่อไป** — สิ่งที่อยากเรียนรู้เพิ่มเติมด้วยตัวเอง

> เป้าหมายไม่ใช่ความสมบูรณ์แบบ แต่คือการเรียนรู้และแบ่งปัน

---

## ⚙️ Setup

### Prerequisites

```bash
node >= 18
npm >= 9
Cursor IDE
```

### การติดตั้ง

```bash
# 1. Clone project นี้
git clone <repo-url>
cd convex-course

# 2. สร้าง Next.js + Convex project ใหม่ (นักเรียนทำใน Session 1)
npx create-next-app@latest quiz-app
cd quiz-app
npm install convex
npx convex dev
```

### Environment Variables

```bash
# .env.local (Next.js — commit ได้ เพราะเป็น public URL)
NEXT_PUBLIC_CONVEX_URL=https://xxxx.convex.cloud

# Convex Dashboard → Settings → Environment Variables (ไม่ commit!)
GEMINI_API_KEY=your-key-here
```

> ⚠️ ห้าม commit GEMINI_API_KEY ลง git เด็ดขาด — จะสอนเรื่องนี้ใน Session 12

---

## 📚 Resources

- [Convex Documentation](https://docs.convex.dev)
- [Convex Auth](https://labs.convex.dev/auth)
- [Next.js Documentation](https://nextjs.org/docs)
- [Google AI Studio](https://aistudio.google.com) — สำหรับ Gemini API key
- [Firebase Hosting](https://firebase.google.com/docs/hosting)

---

## 🗂 Repository Structure

```
convex-course/
├── README.md              ← ภาพรวม course นี้
├── COURSE_OUTLINE.md      ← รายละเอียดทุก session
│
├── course/                ← Next.js app สำหรับ tutorial pages (ภาษาไทย)
│   ├── app/
│   │   ├── page.tsx       ← หน้า index (overview + navigation)
│   │   ├── week-1/
│   │   │   ├── session-1/ ← Convex คืออะไร + Setup
│   │   │   ├── session-2/ ← Schema
│   │   │   └── session-3/ ← Query
│   │   ├── week-2/
│   │   │   ├── session-4/ ← Mutation
│   │   │   ├── session-5/ ← Relations
│   │   │   └── session-6/ ← Indexes
│   │   ├── week-3/ ...
│   │   ├── week-4/ ...
│   │   ├── week-5/ ...
│   │   └── week-6/ ...
│   └── components/
│       ├── ConceptBox.tsx    ← กล่องอธิบาย concept (💡)
│       ├── CodeExample.tsx   ← แสดง code พร้อม syntax highlight (👀)
│       ├── CursorPrompt.tsx  ← กล่อง prompt สำหรับ Cursor (🤖)
│       ├── Exercise.tsx      ← exercise ที่นักเรียนทำ (🧪)
│       ├── BreakIt.tsx       ← intentional error section (💥)
│       └── SessionNav.tsx    ← navigation ระหว่าง sessions
│
└── quiz-app/              ← โปรเจกต์จริงที่นักเรียนสร้างระหว่าง course
    ├── app/               ← Next.js pages
    ├── convex/            ← Convex functions + schema
    │   ├── schema.ts
    │   ├── questions.ts
    │   ├── quizzes.ts
    │   ├── auth.ts
    │   └── ...
    └── components/
```

### course/ vs quiz-app/

| | `course/` | `quiz-app/` |
|---|---|---|
| คืออะไร | Tutorial website ที่ครูสร้าง | Project ที่นักเรียนสร้างเอง |
| ใครเป็น owner | ครู | นักเรียนแต่ละคน (fork) |
| ภาษา | ไทย | - |
| Deploy | Firebase Hosting + Convex (สำหรับ Feedback) | Firebase Hosting (project ของนักเรียน) |

---

## 🔁 Feedback Loop

ทุกหน้า Lesson มีปุ่ม **Feedback** (มุมล่างขวา) สำหรับ flag จุดที่งง / bug / ข้อเสนอแนะ
Feedback ถูกส่งผ่าน Convex action ไปสร้าง GitHub Issue ในรีโปนี้

ครูจะ run **Improvement Loop** (Claude Code loop บนเครื่องตัวเอง) เพื่ออ่าน issue
แก้ Lesson และอัปเดต `docs/lesson-generation/` — knowledge base ที่ใช้ generate Lesson ครั้งต่อไปให้ดีขึ้น

- v1: ปุ่มซ่อนใน prod, ครูใช้บน localhost เท่านั้น
- v2: เปิดให้นักเรียนใช้บน prod (มี approval gate)

รายละเอียดดีไซน์ → [CONTEXT.md](./CONTEXT.md), [docs/adr/0001-feedback-architecture.md](./docs/adr/0001-feedback-architecture.md)
