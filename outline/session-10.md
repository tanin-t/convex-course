# Session 10 — Real-time Concept: useQuery คือ Subscription

> **Week 4** · Convex topic: WebSocket subscription model
> Part of [Convex Course Outline](../COURSE_OUTLINE.md)

---

## 🎯 Convex topic
- WebSocket vs HTTP polling
- useQuery = subscription (re-runs เมื่อ data ที่ read เปลี่ยน)
- Demo: 2 browser tabs เห็นข้อมูลตรงกัน

## 🌱 Development focus
- **B3** Mental model — push vs pull
- **A1** คิดก่อน code — "real-time" ในแอปของฉันต้อง real-time จริงไหม? ทุก field?

## 🪝 Hook
สาธิต 2 browsers — เพิ่ม question ใน browser 1 → browser 2 อัปเดตทันที
"นี่ไม่ใช่ magic — มันมี mechanism — เดาก่อนฉันบอก"

## 🧠 Build the model
- HTTP polling: ส่ง request ทุก N วินาที ถามว่ามีอะไรใหม่ไหม
- WebSocket subscription: connection เปิดค้าง — server push update มาเอง
- Convex ใช้ WebSocket — track ว่า query ของคุณ read field ไหน → field นั้นเปลี่ยน → re-run query → ส่งผลใหม่กลับมา

## 💥 Break it
- ปิด WiFi → mutation ใน browser 1 → ดู browser 2 → reconnect → ดูว่าอัปเดต
- บทเรียน: real-time ไม่ใช่ "ทันที 100%" — มี edge case (offline, stale)

## 🪞 Reflect
1. ทำไม useQuery ไม่ใช่ `fetch` แม้จะ "ดูเหมือน" fetch
2. ถ้าทุก field ใน app เป็น real-time — มี cost อะไรบ้าง
3. ส่วนของ app ฉันที่ "ควร" real-time vs. ไม่จำเป็น
