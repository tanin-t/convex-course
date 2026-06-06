# Session 13 — File Storage: ทำไม DB ไม่ใช่ที่เก็บรูป

> **Week 5** · Convex topic: file storage + upload flow + storage IDs
> Part of [Convex Course Outline](../COURSE_OUTLINE.md)

---

## 🎯 Convex topic
- Why not BLOB in DB
- `generateUploadUrl()` flow
- `_storage` table & `v.id("_storage")`
- `getUrl()` to display

## 🌱 Development focus
- **C4** Trade-off — BLOB in DB vs. external storage
- **C1** Decomposition — upload flow แตกเป็น 3 steps (URL → upload → save id)

## 🪝 Hook
"ถ้ามีรูป 1MB เก็บใน DB เป็น base64 → ทุกครั้งที่ query โหลด 1MB ทับซ้อนกัน — ในแอปจริงเกิดอะไร?"

## 🧠 Build the model
- DB เก่งเก็บข้อมูลเล็ก, query, transaction
- File storage / CDN เก่งเก็บไฟล์ใหญ่, serve เร็ว, ราคาถูก
- Convex storage = built-in file storage + CDN
- Flow: client ขอ upload URL → client upload ตรง → save storage ID ลง DB

## 💥 Break it
- ลอง upload โดยไม่ขอ URL ก่อน → fail
- เก็บ URL จาก `getUrl()` ไว้ตอน build (static) → ผ่านไป 1 ชม → URL หมดอายุ
- บทเรียน: upload URL = ใช้ครั้งเดียว, view URL = TTL

## 🪞 Reflect
1. ทำไม upload URL ต้อง expire (security?)
2. ฉันจะออกแบบ feature "delete รูป" ยังไง — ใน DB + ใน storage
3. ถ้าผู้ใช้ upload รูป 50MB — ฉันป้องกันยังไง
