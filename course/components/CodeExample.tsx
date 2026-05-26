import { codeToHtml, type BundledLanguage } from "shiki";

type CodeExampleProps = {
  dataCy: string;
  filename?: string;
  language: BundledLanguage | "text";
  code: string;
};

export async function CodeExample({
  dataCy,
  filename,
  language,
  code,
}: CodeExampleProps) {
  const html = await codeToHtml(code.trimEnd(), {
    lang: language,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  });

  return (
    <figure
      data-cy={dataCy}
      className="my-6 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
    >
      {filename ? (
        <figcaption className="flex items-center gap-2 border-b border-slate-200 bg-slate-100 px-4 py-2 font-mono text-xs text-slate-600">
          <span aria-hidden>👀</span>
          <span>{filename}</span>
        </figcaption>
      ) : null}
      <div
        className="overflow-x-auto px-4 py-3 text-sm leading-relaxed [&_pre]:bg-transparent! [&_pre]:p-0!"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </figure>
  );
}
