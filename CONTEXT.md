# CONTEXT — Domain Glossary

The shared vocabulary for this project. Terms here are the canonical names; if you see a near-synonym in code or docs, fold it back to one of these.

This file is a glossary, not a spec. Implementation lives in code; decisions live in `docs/adr/`.

---

## Course shape

**Session** — a 1.5-hour pedagogical unit. 18 sessions across 6 weeks. The course schedule and per-session breakdown live in `COURSE_OUTLINE.md`.

**Lesson** — the content/page that delivers a Session. One Lesson = one route under `course/app/week-{N}/session-{M}/page.tsx`. "Lesson" emphasises the artifact (what students read); "Session" emphasises the slot (1.5 hours of class time). They map 1:1.

**Component** — a reusable building block rendered inside a Lesson. Six exist today in `course/components/`: `ConceptBox` (💡), `CodeExample` (👀), `CursorPrompt` (🤖), `Exercise` (🧪), `BreakIt` (💥), `SessionNav`. A Lesson typically contains several Component instances; each instance is identified by a `data-cy` attribute (see below).

**`data-cy`** — a per-instance identifier attribute on Component instances. Serves two purposes: (1) feedback selection (the Feedback dialog lets a user click a Component to attach its `data-cy` to the issue), and (2) future end-to-end test selectors (Cypress convention). Authors specify `data-cy` manually per instance — never auto-indexed — so the identifier is stable across reorders. Format: kebab-case, scoped to be unique within a Lesson, e.g. `cursor-prompt-schema-intro`.

---

## Feedback loop

**Feedback** — a single submission made via the Feedback button on a Lesson page. Captures: Feedback Type, lesson path, optional Component reference (`data-cy`), free-text body, and (optionally) free-text "what you expected." Becomes a GitHub Issue in this repo.

**Feedback Type** — required taxonomy on each Feedback, used to branch the Improvement Loop:
- **Confusion** — the most valuable type. A concept was unclear. The loop edits the Lesson *and* appends a pattern to the Lesson Generation Guide.
- **Bug** — something is broken (link 404, code example wrong, animation broken). The loop fixes code; does *not* touch the Lesson Generation Guide.
- **Suggestion** — an idea, not blocking. The loop may edit the Lesson, may update the Guide if the suggestion reveals a pattern.

**Feedback button** — a fixed-position affordance (FAB, bottom-right) rendered by the course layout on every Lesson page. Opens the Feedback dialog. In v1, hidden when running against the prod Convex deployment.

**Improvement Loop** — a Claude Code loop run *manually* on the teacher's machine. Pulls open GitHub issues, creates a git worktree per issue, applies a fix, merges direct to `main`, and (for Confusion / sometimes Suggestion) appends to the Lesson Generation Guide. Not hosted. Not 24/7. The teacher triggers it.

**Lesson Generation Guide** — the durable knowledge artifact of the Improvement Loop. Lives at `docs/lesson-generation/`. A directory of markdown files capturing cross-cutting pedagogical patterns ("when teaching X, prefer Y", "avoid Z framing", "common beginner stumble for concept W"). The most valuable output of the system — these patterns feed back into generating *future* Lessons.

**`need-review` label** — GitHub Issue label applied to Feedback originating from the prod Convex deployment (i.e., student-authored, in v2). The teacher filters by this label and triggers the Improvement Loop only after approval. Not active in v1 because the Feedback button is hidden in prod.

---

## Architecture surfaces

**`course/`** — the Next.js 16 app that delivers the tutorial Lessons. Static-exported to Firebase Hosting. As of the Feedback feature, also a client of a Convex deployment (see ADR-0001).

**`quiz-app/`** — the project students build during the course. Separate app. Not built yet. Not affected by the Feedback feature.

**Convex deployment (course)** — the Convex backend that the `course/` app calls. v1 hosts only the `feedback.create` action; no schema tables. Teacher's localhost talks to the dev deployment; deployed `course/` talks to the prod deployment.
