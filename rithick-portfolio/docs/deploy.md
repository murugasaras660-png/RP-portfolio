# Vercel Deployment Instructions

The project uses Vercel for static hosting with SPA routing via `vercel.json`.

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <github-repo-url>
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to Vercel Dashboard -> Add New Project.
   - Import the GitHub repository.
   - **Framework Preset**: Vite
   - **Build Command**: `pnpm run build`
   - **Output Directory**: `dist`
   - Click **Deploy**.

`vercel.json` already handles the rewrite required for React Router's SPA functionality on Vercel.
