# Session 17 — Implement Multiplayer: Pair Programming

> **Week 6** · Convex topic: join codes + waiting room + race conditions + pair programming
> Part of [Convex Course Outline](../COURSE_OUTLINE.md)

---

## 🎯 Convex topic
- Join code generation + lookup
- Waiting room real-time
- Game state synchronization
- Race condition handling

## 🌱 Development focus
- **E1, E2** Communication — pair programming = สื่อสารตลอดเวลา
- **C2** Hypothesis-driven debug — multiplayer bug ยาก เพราะหลาย actor
- **D4** Cursor as teacher — แต่คราวนี้ AI ช่วย 2 คนพร้อมกัน

## 🪝 Hook
"3 browsers เปิดพร้อมกัน — บางครั้ง player join แต่ host ไม่เห็น — ทำไม?"

## 🧠 Build the model
- Real-time = eventually consistent (อาจ delay เล็กน้อย)
- Race condition strategies: optimistic vs. pessimistic
- Idempotent operations = รันซ้ำได้ผลเหมือนเดิม

## 🧪 Activity
Pair programming:
- Driver = พิมพ์ code
- Navigator = อ่าน, ตั้งคำถาม, ตรวจ AI output
- สลับทุก 20 นาที

## 💥 Break it
- 2 browsers submit answer พร้อมกัน → ดู score ใน DB ถูกไหม
- Host disconnect → ดู game session ค้างไหม

## 🪞 Reflect
1. การ pair programming ช่วยฉันยังไง — เร็วขึ้นหรือช้าลง? เข้าใจมากขึ้นไหม?
2. ฉันใช้ AI ใน pair session ยังไง — ต่างจาก solo ยังไง
3. Bug ที่ยากที่สุดใน session นี้ — ฉัน debug ยังไง
