# Session 11 — Live Leaderboard: ออกแบบ State Machine

> **Week 4** · Convex topic: state machines + denormalization + real-time aggregation
> Part of [Convex Course Outline](../COURSE_OUTLINE.md)

---

## 🎯 Convex topic
- `game_sessions`, `player_sessions`, `answers` tables
- Status state machine: `waiting → playing → completed`
- Real-time leaderboard query
- Test ด้วยหลาย browser

## 🌱 Development focus
- **C1** Decomposition — game flow แตกเป็น state + transitions
- **C4** Trade-off — store score แบบ denormalized vs. compute on-the-fly

## 🪝 Hook
"คุณจะรู้ได้ยังไงว่าตอนนี้ game อยู่ใน state ไหน — แค่ดู field?"
แนะนำ state machine — ทุก state มี action ที่ legal ต่างกัน

## 🧠 Build the model
- State machine: state + transitions ที่ legal
- ตัวอย่าง: `waiting → playing` legal, `completed → playing` illegal
- Leaderboard = real-time query ที่ aggregate scores
- Denormalize score (เก็บใน `player_sessions.score`) vs. compute (sum answers ทุกครั้ง)

## 💥 Break it
- ลอง transition `completed → playing` (ใน mutation ไม่ check) → ดู bug
- บทเรียน: state machine ต้อง check transition ใน mutation

## 🪞 Reflect
1. State machine ช่วยฉันคิดยังไง vs. เก็บ `isStarted: boolean`
2. ฉันเลือก denormalize score เพราะ ... — trade-off คือ ...
3. ถ้าเพิ่ม state `paused` — ต้อง update อะไรบ้าง
