# Session 7 — Auth: คุณเป็นใคร (Authentication)

> **Week 3** · Convex topic: Convex Auth + identity + sessions
> Part of [Convex Course Outline](../COURSE_OUTLINE.md)

---

## 🎯 Convex topic
- Authentication vs Authorization
- Convex Auth setup (Password provider)
- Login / Register form
- `ctx.auth.getUserIdentity()`

## 🌱 Development focus
- **B3** Mental model — distinguish "verify identity" (Auth) vs "what you can do" (Authz)
- **A4** Ownership — เก็บรหัสผ่าน = รับผิดชอบต่อ user
- **B1** อ่าน docs — Convex Auth docs ค่อนข้างใหม่ ต้องอ่านเอง

## 🪝 Hook
"ถ้าฉัน clone repo ของคุณแล้วรัน — ฉันจะเข้า account ของ user ใน DB ของคุณได้ไหม? ทำไม?"

## 🧠 Build the model
- Authentication = "ใคร" — ผ่าน identity provider (email/password, Google, etc.)
- Authorization = "ทำอะไรได้" — ตรวจหลัง auth (Session 8-9)
- Convex Auth = library ที่ handle: signup, login, session token, refresh
- `ctx.auth` คือเครื่องมืออ่าน identity ใน function (server-side)

## 💥 Break it
- ลอง `signIn` ด้วย password ผิด → ดู error
- ดู Network tab → token เก็บใน cookie ยังไง
- บทเรียน: token ไม่ใช่ password — มันคือ "proof ว่าคุณ login แล้ว"

## 🪞 Reflect
1. ทำไมเรา **ไม่** เก็บ password ตรงๆ ใน DB
2. ถ้า user logout — เกิดอะไรขึ้นกับ token
3. ส่วนที่ฉันยังไม่เข้าใจเกี่ยวกับ auth flow คือ ...
