# Lesson Generation Guide

Durable, cross-cutting pedagogical patterns extracted from the Feedback / Improvement Loop. Each file captures one pattern with: the rule, the reason (often a real Feedback incident), and how to apply it when generating *future* Lessons.

See `CONTEXT.md` (root) for the glossary entry on this artifact and `docs/adr/0001-feedback-architecture.md` for how patterns get appended.

## Patterns

- [01-diagrams-use-mermaid.md](./01-diagrams-use-mermaid.md) — Always Mermaid, never ASCII art
- [02-beginner-jargon-tooltips.md](./02-beginner-jargon-tooltips.md) — Wrap unfamiliar technical terms in `<Jargon>` tooltips
- [03-no-redundant-prompt-and-exercise.md](./03-no-redundant-prompt-and-exercise.md) — Don't ship a "try the prompt" and a "try yourself" section that overlap
- [04-cursor-as-teacher-not-codegen.md](./04-cursor-as-teacher-not-codegen.md) — For hands-on setup, prompt Cursor to teach step-by-step against the page, not to gen code freely
