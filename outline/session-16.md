# Session 16 — Design Multiplayer: Diagram ก่อน Code

> **Week 6** · Convex topic: system design + sequence diagram + race conditions
> Part of [Convex Course Outline](../COURSE_OUTLINE.md)

---

## 🎯 Convex topic
- Multiplayer game flow
- Join code system
- Sequence diagram for system design
- Race condition awareness

## 🌱 Development focus
- **C1** Decomposition — แตก "multiplayer" เป็น sub-features ที่ทำได้ทีละชิ้น
- **E2** Communication — sequence diagram = วิธีคุยกับเพื่อน
- **A1** คิดก่อน code

## 🪝 Hook
"ก่อนเปิด editor — วาด sequence diagram ของ multiplayer game บน whiteboard"
ห้ามใช้ AI ในช่วงนี้

## 🧠 Build the model
- Sequence diagram = actor + time + messages
- Multiplayer = หลาย client + 1 server + state shared
- Race condition: 2 players submit คำตอบพร้อมกัน — ใครก่อน?

## 🧪 Activity (workshop)
1. แต่ละคนวาด diagram 15 นาที
2. เปรียบเทียบ — point out edge case ที่อีกคนไม่เห็น
3. รวมเป็น diagram ที่ทีมเห็นด้วย

## 🪞 Reflect
1. การวาดก่อน code ช้าหรือเร็วกว่า code เลย — สำหรับตัวฉัน
2. Edge case ที่ฉันไม่เห็นแต่เพื่อนเห็นคือ ...
3. ถ้าทำคนเดียวที่บ้าน — ฉันยังจะวาดไหม
