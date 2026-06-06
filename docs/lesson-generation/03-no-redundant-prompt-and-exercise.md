# Don't ship a "try the prompt" section AND a "do it yourself" section that cover the same ground

**Rule.** A Lesson must not have a `<CursorPrompt>` section and an `<Exercise>` section that each ask the student to *do the same task*. Pick one container per hands-on activity. If both exist on the page, they must do clearly different things (e.g., the prompt section teaches *prompt craft* on a small toy task, and the exercise section is the real project work).

**Why.** Feedback Issue #3 (week-1/session-1, type: confusion). The page had a "ลอง Prompt กับ Cursor" section asking students to paste a setup prompt, and then a "ทดลองเอง" section asking them to set the project up again from CLI commands. Students didn't know whether they were supposed to do both, or which one was the "real" answer. Two affordances for the same goal feels like a navigation puzzle, not a tutorial.

**How to apply.**
- During Lesson generation, after drafting `<CursorPrompt>` and `<Exercise>` sections, ask: *"if a student does only one of these, have they completed the lesson's hands-on goal?"* If yes for both — they overlap; collapse them.
- Preferred collapse direction in this course: keep the `<Exercise>` (it's the source of truth for what to do), and if Cursor should be involved, put a *single* `<CursorPrompt>` **inside / above** the `<Exercise>` that scopes Cursor's role (see Pattern 04: Cursor-as-teacher).
- Keep `<CursorPrompt>` as a standalone section only when it's teaching prompt craft itself (e.g., good-prompt vs bad-prompt examples) — and label it explicitly so it doesn't read as a task.
- A useful rubric: each Lesson should have *one* canonical "do this now" block. Everything else is read-only context.
