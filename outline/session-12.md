# Session 12 — Actions: เรียก External API + Secrets

> **Week 4** · Convex topic: actions + external APIs + environment variables
> Part of [Convex Course Outline](../COURSE_OUTLINE.md)

---

## 🎯 Convex topic
- Action vs Query vs Mutation
- ทำไม Action ไม่ touch DB ตรงๆ
- `process.env.GEMINI_API_KEY` ใน Convex
- ทำไม secret ห้ามอยู่ใน Next.js

## 🌱 Development focus
- **D3** Know when to ask AI vs read docs — Convex action docs สั้น อ่านเองได้
- **A4** Ownership — secret = ของคุณ ถ้าหลุดคุณรับผิดชอบ
- **C5** Verify before trust — ตรวจว่า key อยู่ใน server ไม่ใช่ bundle

## 🪝 Hook
**Live demo:** เปิด site ที่ใส่ API key ใน `NEXT_PUBLIC_X` → DevTools → Sources tab → ค้น key → เจอ
"ถ้าฉันเอา key ของคุณไปใช้ฟรี — ใครเสียเงิน?"

## 🧠 Build the model
- Query/Mutation = pure & transactional → ไม่ทน external API ที่ slow/fail
- Action = async, ไม่ transactional, เรียก external API ได้
- Action ต้องการ DB? → ใช้ `ctx.runMutation(internal.xxx)`
- `NEXT_PUBLIC_` = ส่งไป browser, Convex env = อยู่ server เท่านั้น

## 💥 Break it
- เขียน action แล้ว `ctx.db.insert` ตรงๆ → Convex error
- ใส่ key ใน `NEXT_PUBLIC_GEMINI_KEY` → build → grep ใน `.next/` → เจอ key
- บทเรียน: prefix ของ env variable มีความหมายด้าน security

## 🪞 Reflect
1. ทำไม Convex แยก action ออกจาก mutation — ไม่รวมเป็น "anything" ไปเลย
2. ถ้าฉันเผลอ push API key ลง GitHub — ฉันจะทำอะไรต่อ
3. ใน app ของฉัน — มี action อะไรอีกบ้างที่ควรใช้ (cron? webhook? external service?)
