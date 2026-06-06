# Session 15 — Error Handling + Loading States: Polish ที่หลีกเลี่ยงไม่ได้

> **Week 5** · Convex topic: error patterns + loading states + self code review
> Part of [Convex Course Outline](../COURSE_OUTLINE.md)

---

## 🎯 Convex topic
- Error pattern ใน Convex function (`throw new Error`)
- Try/catch ใน React component
- Loading state patterns (undefined / null / data)
- Code review ของ code ที่เขียนมาตลอด 14 sessions

## 🌱 Development focus
- **B4** Reflective — กลับมาอ่าน code ตัวเอง — เห็นอะไรที่ตอนเขียนไม่เห็น
- **E1** อธิบายสิ่งที่ไม่เข้าใจ — มี code ที่ "ทำงานได้" แต่อธิบายไม่ได้ไหม
- **A4** Ownership — production code = ต้องรับ edge case ที่ user เจอ

## 🪝 Hook
"app ของคุณรันได้ดีในเครื่อง — แต่ถ้า user A network ช้า, user B login token หมดอายุ, user C ใช้บน iPhone เก่า — เกิดอะไร?"

## 🧠 Build the model
- 3 states ที่ทุก query ต้อง handle: loading / empty / data
- Error categories: network, auth, validation, business logic — handle ต่างกัน
- Pattern: error message ที่ user เข้าใจ ≠ technical error

## 🧪 Activity (สำคัญที่สุดใน session นี้)
**Code review ของตัวเอง:**
1. เปิด `convex/` ทั้ง folder
2. ทุก query/mutation — list down: handle loading ไหม? error message ดีไหม? auth check ไหม?
3. แก้ที่ขาด

## 💥 Break it
- Disconnect WiFi → submit answer → error message เห็นใน UI?
- Login → ลบ session ใน DB → action ต่อไป → error ดูเป็นไง

## 🪞 Reflect
1. ฉันเขียน code ตั้งแต่ session 1-14 — มีกี่ที่ไม่ handle error / loading
2. ความรู้สึก "ตอนนั้นรีบ เลยไม่ handle" — เกิดจากอะไร
3. ถ้าทุก session บังคับ handle ตั้งแต่แรก vs. fix ทีหลัง — แบบไหนดีกว่า ทำไม
