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
