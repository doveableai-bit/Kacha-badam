# Backend Deployment Guide - For Ads to Show on Vercel

## Problem
Ads only work locally because the backend (Express server) is only running on Replit. Your Vercel frontend can't reach it.

## Solution
Deploy the backend to a free hosting service, then connect your Vercel frontend to it.

## Option 1: Deploy to Render (Easiest)

1. Go to https://render.com
2. Sign up with GitHub
3. Create New → Web Service
4. Connect your repository
5. Fill in deployment settings:
   - Name: `gitsync-backend` (or any name)
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `node server.ts`
6. Add Environment Variables:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `VITE_ADMIN_PASSWORD`: `548413`
   - `NODE_ENV`: `production`
7. Click Deploy

Get your Render URL (e.g., `https://gitsync-backend.onrender.com`)

## Option 2: Deploy to Railway

1. Go to https://railway.app
2. Sign up with GitHub
3. New Project → Deploy from GitHub repo
4. Configure variables same as above
5. Deploy

## Option 3: Deploy to Fly.io

1. Go to https://fly.io
2. Install flyctl: `brew install flyctl`
3. Run: `flyctl launch`
4. Configure variables same as above
5. Deploy

## Step 2: Connect Frontend to Backend on Vercel

1. Go to your Vercel dashboard
2. Select your project (gitsync-mobile)
3. Go to Settings → Environment Variables
4. Add new variable:
   - Name: `VITE_API_BASE_URL`
   - Value: `https://your-backend-url.onrender.com` (or Railway/Fly URL)
5. Click Save & Redeploy

## Step 3: Test on Vercel

1. Open https://gitsyn-mobile.vercel.app
2. Go to Admin Panel
3. Enter password: `548413`
4. Add an ad script
5. Click "Save Ad"
6. Refresh the page - ads should now appear!

## What Happens

- Admin saves ad on Vercel → Vercel calls backend → Backend stores in PostgreSQL
- Any user opens Vercel app → Frontend calls backend → Gets ads from database
- All users see SAME ads everywhere

## Troubleshooting

**Ads still not showing?**
- Check browser console for error messages
- Verify `VITE_API_BASE_URL` is set correctly on Vercel
- Check backend server is running: visit `https://your-backend-url.onrender.com/api/ads`

**Backend not working?**
- Check Render/Railway logs for errors
- Verify DATABASE_URL env variable is correct
- Make sure PostgreSQL database is still running
