# Wrap unfamiliar jargon in click-to-reveal `<Jargon>` tooltips

**Rule.** When a Lesson uses a technical term that a true beginner wouldn't know (especially if the term is dropped *in passing* rather than being the main concept), wrap it in `<Jargon term="...">` with a 1–2 sentence plain-Thai explanation. Don't expand inline in the body, and don't leave it undefined.

**Why.** Feedback Issue #2 (week-1/session-1) — the "ปัญหาของ backend แบบเดิม" ConceptBox name-dropped *connection pool, scaling, security* in a single bullet. The terms weren't load-bearing for Session 1's main idea (Convex hides this complexity), but a beginner reader stalls on unfamiliar words and loses the thread of the next paragraph. Inline expansions would have ballooned the bullet and undermined the "this is the messy thing Convex saves you from" framing.

**How to apply.**
- Threshold: would a someone whose only prior code experience is the static Next.js they built in the previous course recognise the term? If unsure, wrap it.
- Keep the tooltip body to 1–2 short sentences. Lead with a one-line plain-Thai definition, then optionally one sentence of *why it matters / a concrete example*. Do not link out.
- Don't `<Jargon>` the central concept of the section — define those properly in body text or a `<ConceptBox>`. `<Jargon>` is for side-mentions only.
- Don't repeat a tooltip definition twice in the same Lesson. Wrap on first occurrence; subsequent mentions can be plain text.
- Examples of when to wrap: *connection pool, migration, ORM, JWT, CORS, race condition, eventual consistency*. Examples of when **not** to wrap: terms that are the Lesson's main concept (`query`, `mutation`, `schema` in Week 1).
