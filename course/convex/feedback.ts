"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";

const FEEDBACK_TYPES = ["confusion", "bug", "suggestion"] as const;
type FeedbackType = (typeof FEEDBACK_TYPES)[number];

type FeedbackArgs = {
  type: FeedbackType;
  lessonPath: string;
  componentDataCy?: string;
  body: string;
  expected?: string;
};

export const create = action({
  args: {
    type: v.union(
      v.literal("confusion"),
      v.literal("bug"),
      v.literal("suggestion"),
    ),
    lessonPath: v.string(),
    componentDataCy: v.optional(v.string()),
    body: v.string(),
    expected: v.optional(v.string()),
  },
  handler: async (_ctx, args): Promise<{ url: string; number: number }> => {
    const token = process.env.GITHUB_TOKEN;
    const repo = process.env.GITHUB_REPO;
    if (!token || !repo) {
      throw new Error(
        "Missing GITHUB_TOKEN or GITHUB_REPO in Convex environment.",
      );
    }

    const labels = buildLabels(args, isProdDeployment());
    const title = buildTitle(args);
    const body = buildBody(args);

    const res = await fetch(`https://api.github.com/repos/${repo}/issues`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      body: JSON.stringify({ title, body, labels }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`GitHub API error ${res.status}: ${text}`);
    }

    const issue = (await res.json()) as { html_url: string; number: number };
    return { url: issue.html_url, number: issue.number };
  },
});

function isProdDeployment(): boolean {
  return process.env.CONVEX_ENV === "prod";
}

export function sessionFromPath(lessonPath: string): string {
  const trimmed = lessonPath.replace(/^\/+|\/+$/g, "");
  return trimmed || "unknown";
}

export function buildLabels(
  args: Pick<FeedbackArgs, "type" | "lessonPath">,
  isProd: boolean,
): string[] {
  return [
    "feedback",
    `type:${args.type}`,
    `session:${sessionFromPath(args.lessonPath)}`,
    ...(isProd ? ["need-review"] : []),
  ];
}

export function buildTitle(
  args: Pick<FeedbackArgs, "type" | "lessonPath" | "body">,
): string {
  const typeLabel = args.type[0].toUpperCase() + args.type.slice(1);
  const snippet = args.body.replace(/\s+/g, " ").trim().slice(0, 60);
  const ellipsis = args.body.length > 60 ? "…" : "";
  return `[${typeLabel}] ${sessionFromPath(args.lessonPath)}: ${snippet}${ellipsis}`;
}

export function buildBody(args: FeedbackArgs): string {
  const lines = [
    `**Lesson:** ${args.lessonPath}`,
    `**Type:** ${args.type}`,
  ];
  if (args.componentDataCy) {
    lines.push(`**Component:** ${args.componentDataCy}`);
  }
  lines.push("", "### What's the issue?", args.body);
  if (args.expected && args.expected.trim().length > 0) {
    lines.push("", "### What did you expect?", args.expected);
  }
  return lines.join("\n");
}
