# Session 8 — Roles: แยก Convex Auth จาก "User ของเรา"

> **Week 3** · Convex topic: separating identity from profile + roles
> Part of [Convex Course Outline](../COURSE_OUTLINE.md)

---

## 🎯 Convex topic
- Why separate `users` table from Convex Auth identity
- เพิ่ม `role` field ใน `users` table
- Query `getCurrentUser` (join identity → users)
- Conditional UI by role

## 🌱 Development focus
- **B3** Mental model — Convex Auth จัดการ identity, เราจัดการ profile + role
- **C1** Decomposition — แตก concept "user" เป็น "identity" + "profile" + "role"

## 🪝 Hook
"ถ้า role เก็บไว้ใน Convex Auth ได้เลย ทำไมเราถึงสร้าง `users` table แยก? — มี advantage อะไร?"
ให้นักเรียน hypothesize 5 นาที

## 🧠 Build the model
- Convex Auth users (Convex จัดการ): email, password hash, session
- Our `users` table (เราจัดการ): role, displayName, stats, preferences, ...
- Trade-off: ต้อง sync 2 อย่าง — ตอน register ต้องสร้างทั้ง 2

## 💥 Break it
- Register แล้ว **ลืม** สร้าง record ใน `users` table → query `getCurrentUser` → `null`
- บทเรียน: 2 sources of truth = ต้อง sync — เกิด bug ได้ง่าย

## 🪞 Reflect
1. การแยก table มี trade-off อะไร — เทียบกับใส่ field ใน Convex Auth ตรงๆ
2. ฉันออกแบบยังไงไม่ให้ลืมสร้าง user record ตอน register
3. ใน real app — role อาจมีมากกว่า 2 อัน — ฉันจะออกแบบยังไง
