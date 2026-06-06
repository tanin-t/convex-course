# Session 5 — Relations: ออกแบบก่อน Code (Requirements Workshop)

> **Week 2** · Convex topic: references + 1-n / n-n + junction tables
> Part of [Convex Course Outline](../COURSE_OUTLINE.md)

---

## 🎯 Convex topic
- Document reference (`v.id("tableName")`) เทียบ foreign key
- 1-n, n-n relations
- Junction table (n-n)
- Query ที่ join หลาย tables

## 🌱 Development focus
- **C1** Decomposition — แตกโจทย์ "quiz มี questions" → table ที่ต้องมี + relations
- **C4** Trade-off thinking — quiz มี questions ของตัวเอง vs. share จาก question bank — เลือกอันไหน เพราะอะไร
- **E2** Communication — present schema design ให้เพื่อน, ฟังของเพื่อน, เปรียบเทียบ

## 🪝 Hook (Workshop 30 นาที — ก่อนเริ่ม code)
แจกโจทย์: "ออกแบบ Quiz App"
ให้นักเรียน sketch schema ของตัวเอง 15 นาที โดยตอบ:
1. Question ผูกกับ Quiz เดียว หรือ share ได้?
2. Quiz session คืออะไร — solo / multiplayer / ทั้งคู่?
3. Leaderboard global หรือ per-quiz?

แล้ว 3 คน present ให้ห้อง — schema ต่างกันเยอะมาก

**บทเรียนตรงนี้:**
- Requirement เดียวกัน → interpretation ต่าง → schema ต่าง → code ต่าง
- Schema เปลี่ยนยากเมื่อมี data แล้ว → "ออกแบบดี ๆ ตอนแรก" ราคาถูก

## 🧠 Build the model
- Document reference = pointer ไปยัง document อื่น
- Junction table = วิธี implement n-n (เพราะ Convex ไม่มี "many-to-many" native)
- Trade-off: join cost vs. denormalization

## 💥 Break it
- Insert quiz_question ที่ `quizId` ชี้ไปยัง quiz ที่ไม่มีอยู่ → Convex ยอม! (ทำไม)
- บทเรียน: Convex `v.id("quizzes")` ตรวจแค่ format, ไม่ตรวจ existence — ต้องเขียน check เอง

## 🪞 Reflect
1. ฉัน design schema ตอนแรกแบบ A — หลังฟังเพื่อนเปลี่ยนเป็น B เพราะ ...
2. ถ้า requirement บอกว่า "อนาคตอาจจะมี team-based quiz" → schema ฉันรองรับไหม
3. การ design "ก่อน code" ช่วยฉัน vs. ทำให้ฉันช้าลง ยังไง
