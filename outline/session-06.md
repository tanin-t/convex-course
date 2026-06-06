# Session 6 — Indexes: เห็นความช้าด้วยตาตัวเอง

> **Week 2** · Convex topic: indexes + withIndex + compound index
> Part of [Convex Course Outline](../COURSE_OUTLINE.md)

---

## 🎯 Convex topic
- Full table scan vs. indexed query
- `.index(name, [fields])`
- `.withIndex(...)` ใน query
- Compound index

## 🌱 Development focus
- **C2** Hypothesis-driven debug — ก่อน fix performance → measure ก่อน
- **C4** Trade-off — index เร็ว read แต่ช้า write + ใช้ storage
- **B1** อ่าน docs — Convex docs มีหลาย index pattern อ่านเอง

## 🪝 Hook
Seed 5,000 questions ลง DB → run query filter by `topic` แบบไม่มี index → วัดเวลา
สาธิตด้วย stopwatch
"ทำไมช้า? hypothesize ก่อนฉันบอก"

## 🧠 Build the model
- เปรียบเทียบ: หาในสารบัญหนังสือ vs. พลิกทุกหน้า
- Index = pre-sorted data structure ที่ทำให้ "หาตำแหน่ง" เร็ว
- Convex จะ warn ถ้า query ไม่มี index (อ่าน warning เป็น)

## 💥 Break it
- เพิ่ม index `by_topic_and_difficulty` → ใช้ `.withIndex("by_topic")` (compound แต่ใช้แค่ prefix)
- ลอง query โดยใช้ field ที่ไม่อยู่ index → Convex รัน scan
- บทเรียน: index ต้องตรง field และต้องตรง prefix order

## 🪞 Reflect
1. ก่อน session นี้ ฉันคิดว่า "ทำไม database ต้องช้า?" — ตอนนี้ฉันเข้าใจว่า ...
2. ถ้าวันนึง app ของฉันช้าลง — ฉันจะ debug ยังไง (มีขั้นตอนชัดเจน?)
3. การมี index ทุก field เลยดีไหม — ทำไม
