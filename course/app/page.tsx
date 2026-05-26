import Link from "next/link";

type Session = {
  num: number;
  slug: string;
  title: string;
  available?: boolean;
};

type Week = {
  num: number;
  title: string;
  goal: string;
  sessions: Session[];
};

const weeks: Week[] = [
  {
    num: 1,
    title: "รู้จัก Convex + Schema + Query",
    goal: "เข้าใจว่า Convex คืออะไร และอ่านข้อมูลจาก database ได้ครั้งแรก",
    sessions: [
      {
        num: 1,
        slug: "session-1",
        title: "Convex คืออะไร และทำไมต้องใช้",
        available: true,
      },
      { num: 2, slug: "session-2", title: "Schema: นิยามโครงสร้างข้อมูล" },
      { num: 3, slug: "session-3", title: "Query: อ่านข้อมูลครั้งแรก" },
    ],
  },
  {
    num: 2,
    title: "Mutation + Relations + Indexes",
    goal: "เขียนข้อมูลลง database, ออกแบบ relation, เข้าใจ index",
    sessions: [
      { num: 4, slug: "session-4", title: "Mutation: เขียนข้อมูล" },
      { num: 5, slug: "session-5", title: "Relations: ความสัมพันธ์ระหว่าง Table" },
      { num: 6, slug: "session-6", title: "Indexes: ทำให้ Query เร็ว" },
    ],
  },
  {
    num: 3,
    title: "Auth + Roles + Permissions",
    goal: "สร้าง authentication และกำหนด permission",
    sessions: [
      { num: 7, slug: "session-7", title: "Auth: Login / Register" },
      { num: 8, slug: "session-8", title: "Roles: Admin vs Player" },
      { num: 9, slug: "session-9", title: "Permissions: ปกป้อง Mutations" },
    ],
  },
  {
    num: 4,
    title: "Real-time + Actions",
    goal: "เข้าใจ real-time subscription และเรียก external API",
    sessions: [
      { num: 10, slug: "session-10", title: "Real-time Concept" },
      { num: 11, slug: "session-11", title: "Live Leaderboard" },
      { num: 12, slug: "session-12", title: "Actions: เรียก External API" },
    ],
  },
  {
    num: 5,
    title: "File Storage + AI Integration",
    goal: "Upload ไฟล์ และสร้าง AI quiz generation",
    sessions: [
      { num: 13, slug: "session-13", title: "File Storage: Upload รูปภาพ" },
      { num: 14, slug: "session-14", title: "AI Generate Quiz" },
      { num: 15, slug: "session-15", title: "Error Handling + Loading States" },
    ],
  },
  {
    num: 6,
    title: "Multiplayer + Deploy",
    goal: "Extend solo game เป็น multiplayer และ deploy production",
    sessions: [
      { num: 16, slug: "session-16", title: "Design Multiplayer Game" },
      { num: 17, slug: "session-17", title: "Implement Multiplayer" },
      { num: 18, slug: "session-18", title: "Deploy + Wrap Up" },
    ],
  },
];

const stack = [
  "Next.js",
  "Convex",
  "TypeScript",
  "Tailwind CSS",
  "Convex Auth",
  "Gemini API",
  "Firebase Hosting",
  "Cursor",
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <section className="text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
          เรียนรู้ Backend Web Development
          <br />
          ด้วย <span className="text-indigo-600">Convex</span>
        </h1>
        <p className="mt-5 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          คอร์ส 6 สัปดาห์สำหรับผู้เริ่มต้น
          สอนแนวคิด backend และ real-time database ผ่านการสร้าง Quiz App
          ตั้งแต่ต้นจนถึง production
        </p>
        <div className="mt-8">
          <Link
            href="/week-1/session-1"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-white font-semibold shadow-sm hover:bg-indigo-700 transition"
          >
            เริ่มเรียน Session 1 →
          </Link>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {stack.map((tech) => (
            <span
              key={tech}
              className="inline-block rounded-full bg-slate-200 px-3 py-1 text-xs font-medium text-slate-700"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-slate-900">
          📅 6 สัปดาห์ — 18 Sessions
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {weeks.map((week) => (
            <article
              key={week.num}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                Week {week.num}
              </div>
              <h3 className="mt-1 text-lg font-semibold text-slate-900">
                {week.title}
              </h3>
              <p className="mt-1 text-sm text-slate-600">{week.goal}</p>
              <ul className="mt-4 space-y-1.5">
                {week.sessions.map((s) => (
                  <li key={s.num}>
                    {s.available ? (
                      <Link
                        href={`/week-${week.num}/${s.slug}`}
                        className="group flex items-baseline gap-2 text-sm text-slate-700 hover:text-indigo-700"
                      >
                        <span className="font-mono text-xs text-slate-400 group-hover:text-indigo-500">
                          S{s.num}
                        </span>
                        <span className="underline decoration-slate-300 group-hover:decoration-indigo-500 underline-offset-2">
                          {s.title}
                        </span>
                      </Link>
                    ) : (
                      <span className="flex items-baseline gap-2 text-sm text-slate-400">
                        <span className="font-mono text-xs">S{s.num}</span>
                        <span>{s.title}</span>
                        <span className="text-xs">(เร็วๆ นี้)</span>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
