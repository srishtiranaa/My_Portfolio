# Srishti Rana — Portfolio (Vite + React + TypeScript)

Simple portfolio site built with Vite, React, and TypeScript.

## Requirements
- Node.js (18+ recommended)
- npm

## Local development
Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Environment variables
This project uses Supabase. Set the following environment variables in your environment or in Vercel:

- `VITE_SUPABASE_URL` — your Supabase project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY` — your Supabase anon/public key

## Deploying to Vercel (GUI)
1. Push the repository to GitHub/GitLab/Bitbucket.
2. In the Vercel dashboard click **New Project** → import your repo.
3. Set the build options:
	 - Build Command: `npm run build`
	 - Output Directory: `dist`
4. In Project Settings → Environment Variables add `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` (for Preview and Production).
5. Click **Deploy**.

Optionally add a `vercel.json` at the repo root to ensure SPA routing (not required):

```json
{
	"builds": [
		{ "src": "package.json", "use": "@vercel/static-build", "config": { "distDir": "dist" } }
	],
	"routes": [
		{ "src": "/(.*)", "dest": "/index.html" }
	]
}
```

## Removal of Lovable references
Per your request, all traces of the `lovable` tool were removed:

- Removed the `lovable-tagger` package from devDependencies (`npm uninstall lovable-tagger`).
- Removed the `componentTagger` import and usage from `vite.config.ts`.
- Replaced author/metadata in `index.html` (changed `Lovable` → `Srishti Rana`) and rebuilt the project so `dist/` no longer contains Lovable assets.

To verify, run a repo search for "Lovable" or check `dist/index.html` after building.

## Notes
- If you use CI or Vercel, ensure the env vars are set in the dashboard before deploying.
- If you want, I can create a `vercel.json` for you and push it to the repo.

---
If you want I can also open a PR with these changes or push `vercel.json` for you.
