# ADR-0001 — Feedback architecture: Convex action → GitHub Issues → local Claude Code loop

**Status:** Accepted — 2026-05-24

## Context

The course site (`course/`) needs a Feedback button on every Lesson page. Feedback feeds an AI-assisted Improvement Loop that fixes Lessons *and* extracts pedagogical patterns into a durable knowledge artifact (the Lesson Generation Guide at `docs/lesson-generation/`).

The site was originally Next.js 16 static-exported to Firebase Hosting with no backend. The Improvement Loop runs as a Claude Code session on the teacher's laptop, triggered manually, not 24/7.

Three forces are in tension:

1. **Submit-success UX.** The teacher wants a confirmation snackbar with a link to the created issue. This needs a real round-trip — a fire-and-forget tab-open to GitHub's compose page can't provide it.
2. **Identity / authorship.** In v2, student-authored feedback must be distinguishable from teacher-authored feedback so the teacher can gate fixes. A single shared bot account loses that distinction.
3. **Architectural minimalism.** Avoid standing up a backend just for one feature.

## Options considered

1. **Static-only, prefilled GitHub Issue URL.** Anchor `<a href="https://github.com/.../issues/new?title=&body=">` opens GH compose in a new tab; student/teacher submits there. *Rejected* because (a) no submit-success snackbar is possible and (b) every user needs a GitHub account.
2. **Cloud Function with a GH token.** Tiny serverless endpoint creates issues server-side. *Rejected* because it introduces a separate backend just for this feature, with no path to grow into other Course site needs.
3. **Per-student GH Personal Access Token in `localStorage`.** Each student creates a PAT, app POSTs to GH API directly. *Rejected* because of setup friction and token-in-`localStorage` exposure, and because option 4 emerged as strictly better.
4. **Convex action with GH token in env (chosen).** Add a Convex deployment to `course/`. A Convex action receives the form payload, POSTs to the GH REST API using a token stored in Convex env vars, returns the created issue URL to the client.

## Decision

**Adopt option 4.** Set up Convex inside `course/`. The Feedback button calls a Convex action (`api.feedback.create`) that creates a GitHub Issue and returns its URL. v1 is fire-and-forget — no Convex DB tables; GitHub Issues are the single source of truth for the Improvement Loop. Feedback is anonymous in v1.

Environment-based routing for the v2 `need-review` mechanism: the Convex action inspects its deployment (dev vs prod) and conditionally applies the `need-review` label. v1 hides the Feedback button when the client detects a prod Convex deployment, so this label code is dormant until v2.

## Consequences

**Positive**
- Real submit-success UX (snackbar with issue link) is achievable.
- The course site now dogfoods the technology being taught — by Week 4 / Session 12 (Convex Actions), the site itself is a live, in-production example students can read.
- Single GH token, server-side, with bounded scope (`public_repo` on the course repo only). No tokens on student machines.
- Future expansion paths stay open: storing feedback in a Convex table for a "Recent Feedback" dashboard, swapping anonymous identity for Convex Auth, etc. — none of which v1 needs.
- The Improvement Loop's data contract is a stable, public surface (GitHub Issues), unaffected by what the client uses to submit.

**Negative**
- `course/` is no longer purely static. The system now spans Firebase Hosting + Convex Cloud. Two services to keep deployed, two failure modes.
- A Convex deployment must exist for `course/` before any of this works — a new prerequisite (alongside the GH repo and remote).
- Convex env vars (`GITHUB_TOKEN`, `GITHUB_REPO`) must be set in both dev and prod deployments. Secret hygiene becomes a setup step.

**Reversibility**
- Migrating *away* from Convex later would mean rewriting the action as a Cloud Function or returning to a prefilled-URL flow (and losing the snackbar). The client API surface (`useAction(api.feedback.create)`) is the only coupling — changing it touches one component.

## Related decisions (in scope, not in this ADR)

- Feedback Type taxonomy (Confusion / Bug / Suggestion): glossary-level, see `CONTEXT.md`.
- Click-to-select uses `data-cy`: glossary-level, see `CONTEXT.md`.
- Button placement is FAB bottom-right; dialog is dialog-first with optional component attach: UX, captured in `/tmp/handoff-feedback-button.md`.
- Loop merges direct to `main` (not via PR): workflow choice, motivated by the loop running manually on the teacher's machine so the teacher can verify on localhost immediately. Not load-bearing enough for its own ADR.
