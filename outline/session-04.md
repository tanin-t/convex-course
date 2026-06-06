# Session 4 — Mutation: เขียนข้อมูล + Validation เป็น first defense

> **Week 2** · Convex topic: mutations + validators + CRUD
> Part of [Convex Course Outline](../COURSE_OUTLINE.md)

---

## 🎯 Convex topic
- Mutation function (write, transactional)
- `useMutation` hook
- Validator (args)
- CRUD pattern

## 🌱 Development focus
- **A4** Ownership — เขียน mutation = รับผิดชอบต่อข้อมูล user คนอื่น
- **C5** Verify before trust — ถ้าไม่ validate input → ใครก็ส่งอะไรมาก็ได้
- **B3** Mental model — transactional = "all or nothing"

## 🪝 Hook
"สมมุติคุณเขียน mutation ลบ question — แล้วมี player ส่ง `{ id: null }` มา จะเกิดอะไร? แล้วถ้าส่ง `{ id: 'admin-secret' }` ล่ะ?"

## 🧠 Build the model
- Query vs Mutation:
  - Query: pure, อ่านอย่างเดียว, subscribe ได้
  - Mutation: เขียนได้, transactional, เรียกครั้งเดียว
- **Transactional**: ถ้า mutation มี 5 operations แล้ว operation 3 fail → operation 1-2 rollback อัตโนมัติ
- **Validator = boundary** — เป็นด่านแรกที่กั้น bad data ไม่ให้เข้า DB

## 💥 Break it
- ลบ validator → ส่ง `{ text: 12345, type: "haha" }` → ดูว่าเข้า DB ได้ไหม
- เขียน mutation ที่ `insert` แล้ว `throw new Error()` → check ว่าข้อมูลที่ insert ไป **หายไป** (rollback)
- บทเรียน: Validator คือ contract ที่ tight กว่า TypeScript — TS ตรวจตอน compile, validator ตรวจตอน runtime

## 🪞 Reflect
1. ฉันเข้าใจคำว่า "transactional" ในชีวิตจริงยังไง (เทียบกับการโอนเงิน?)
2. ถ้าไม่มี validator — ใน app ผลิตจริงจะเสี่ยงอะไรบ้าง
3. ฉันเขียน mutation นี้แล้ว — มันป้องกัน edge case อะไรบ้าง / ยังไม่ได้ป้องกันอะไรบ้าง
