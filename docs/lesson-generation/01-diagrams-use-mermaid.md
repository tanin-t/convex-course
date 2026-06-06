# Always use Mermaid for diagrams — never ASCII art

**Rule.** Any diagram in a Lesson MUST be rendered via the `<MermaidDiagram>` component. Do not paste ASCII/box-drawing/arrow art inside a `<CodeExample language="text">`. If a diagram won't reasonably express in Mermaid (rare), reach for a real image asset — still not ASCII.

**Why.** First reported in Feedback Issue #1 (week-1/session-1, `code-example-backend-diagram`). Hand-drawn arrows like `Browser → ??? → Database` looked OK on the author's screen but were unreadable on different font widths and gave away that the page was thrown together. Mermaid renders consistently, is themeable, and signals professional craft.

**How to apply.**
- When sketching a Lesson, anywhere you'd reach for a text-art box-and-arrow, write a Mermaid `flowchart` / `sequenceDiagram` / `stateDiagram` instead.
- Use the component as: `<MermaidDiagram dataCy="..." chart={`flowchart LR ...`} caption="..." />`. The component is a client component because Mermaid renders in the browser — that's fine under static export.
- Keep one logical concept per diagram. If you're nesting `subgraph`s more than two levels deep, split it.
- Use semantic shapes: `[(Database)]` for stores, plain rectangles for processes, dotted edges (`-.->` / `-. text .-`) for annotations.
- ASCII art is reserved for things that genuinely *are* text: directory trees, file contents, terminal output. Those stay in `<CodeExample language="text">`.
