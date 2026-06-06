# Deployment

This repo deploys as two coupled pieces:

- **Convex** — the backend (`course/convex/`): schema, queries, mutations, actions.
- **Vercel** — the Next.js static export (`course/`): the course site itself.

The Next.js bundle needs to know which Convex deployment to talk to (`NEXT_PUBLIC_CONVEX_URL`), so the two must be deployed together. [course/vercel.json](course/vercel.json) wires this up by wrapping the Next.js build in `npx convex deploy --cmd`.

## How the build works on Vercel

The `buildCommand` in `course/vercel.json` is:

```
npx convex deploy --cmd 'npm run build'
```

On every Vercel build, this:

1. Runs `npx convex deploy` — pushes `course/convex/*` to the production Convex deployment.
2. Injects the prod `NEXT_PUBLIC_CONVEX_URL` into the env.
3. Runs `npm run build` — produces the static export in `course/out/`.

`course/next.config.ts` has `output: "export"`, so Vercel publishes `course/out/` as a static site. No server-side rendering, no API routes — all Convex calls happen from the browser.

## One-time setup

### 1. Create a production Convex deployment

```
cd course
npx convex deploy
```

The first run prompts you to create a prod deployment. After it finishes, open the [Convex dashboard](https://dashboard.convex.dev) → project → **Settings → Deploy Keys** → generate a **Production Deploy Key**. Copy it.

### 2. Link the Vercel project

```
cd course
npx vercel
```

Accept the defaults. This creates the Vercel project and writes `course/.vercel/` linking your local directory to it. The first preview build may fail because `CONVEX_DEPLOY_KEY` is not set yet — that's expected.

### 3. Add `CONVEX_DEPLOY_KEY` on Vercel

CLI:

```
cd course
npx vercel env add CONVEX_DEPLOY_KEY production
# paste the key from step 1
```

Or in the Vercel dashboard: project → Settings → Environment Variables → add `CONVEX_DEPLOY_KEY` scoped to **Production**.

You do **not** need to set `NEXT_PUBLIC_CONVEX_URL` — `convex deploy --cmd` injects it at build time.

### 4. Vercel project settings

If you ever see an error like `out/routes-manifest.json couldn't be found`, the Vercel project has an **Output Directory** override stuck at `out/`. Clear it:

1. Vercel dashboard → project → Settings → **Build & Development Settings**
2. Find **Output Directory**, toggle the **Override** switch OFF
3. Save and redeploy

The Next.js framework adapter detects `output: "export"` and uses `course/out/` automatically — do not override it.

## Day-to-day deploys

Production:

```
cd course
npx vercel --prod
```

Preview (per-branch URL, no production promotion):

```
cd course
npx vercel
```

Each run uploads source to Vercel, which executes the wrapped build (Convex deploy → Next.js build) and then publishes.

## Mental model

- **Convex** and **Vercel** are separate hosting platforms with separate CLIs and dashboards.
- They are glued together by the `convex deploy --cmd` wrapper, which makes a Vercel build atomic across both.
- Convex has its own dev (`zany-partridge-252`) and prod deployments — `npx convex dev` targets dev, the Vercel build targets prod via `CONVEX_DEPLOY_KEY`.
- `.env.local` (dev URLs) is local-only and not used by Vercel.
