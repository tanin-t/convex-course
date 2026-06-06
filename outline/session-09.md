# Session 9 — Permissions: ป้องกัน Mutation ที่ Server-Side

> **Week 3** · Convex topic: permission guards + server-side security
> Part of [Convex Course Outline](../COURSE_OUTLINE.md)

---

## 🎯 Convex topic
- Permission guard pattern (`requireAdmin(ctx)`)
- Helper functions ใน `convex/lib/`
- ทำไม UI hiding ไม่ใช่ security

## 🌱 Development focus
- **A4** Ownership — security = ของฉัน ไม่ใช่ของ library
- **C5** Verify don't trust — ตรวจสิทธิ์ใน server เสมอ ไม่เชื่อ client
- **D2** Read AI output critically — AI อาจ gen mutation ที่ไม่มี auth check

## 🪝 Hook
**Live demo:** ครูเปิด browser ของ player → DevTools console → เรียก admin mutation ตรงๆ
"ถ้าใน mutation ไม่มี auth check — เกิดอะไรขึ้น?"

## 🧠 Build the model
- Client = untrusted (เปลี่ยนได้ทุกอย่าง)
- Server (Convex function) = trusted boundary
- ซ่อนปุ่มใน UI = UX, ไม่ใช่ security
- Helper functions (`requireAdmin`) = DRY + ลืมยาก

## 💥 Break it
- เขียน mutation `deleteAllQuestions` แบบไม่มี `requireAdmin(ctx)` → login เป็น player → เรียกจาก console → ลบหมด
- ใส่ `requireAdmin(ctx)` → ลองอีก → throw error
- บทเรียน: ทุก mutation ที่เปลี่ยน data → ต้องถามว่าใครเรียกได้

## 🪞 Reflect
1. AI gen code ให้ฉัน — ฉันต้องตรวจอะไรบ้างก่อนใช้
2. ถ้าฉันลืมใส่ auth check ใน 1 mutation จาก 20 อัน — แล้วใครจะเจอ
3. การมี helper `requireAdmin` ช่วยฉันยังไง — เทียบกับเขียน check แต่ละ mutation
