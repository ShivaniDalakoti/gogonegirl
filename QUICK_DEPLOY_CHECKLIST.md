# ✅ Quick Deploy Checklist (5 Steps)

**Time:** ~30 minutes | **Cost:** FREE

## Step 1: Push to GitHub (5 min)
```bash
cd /Users/shivanidalakoti/Desktop/workspace/gogonegirl
git init
git add .
git commit -m "Initial commit: Gone Girl app"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/gogonegirl.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username.

## Step 2: Deploy Backend to Railway (5 min)

1. Go to **https://railway.app** → Sign up with GitHub
2. Click "New Project" → "Deploy from GitHub"
3. Select your `gogonegirl` repo
4. Go to Variables tab and add:
   ```
   PORT=5000
   NODE_ENV=production
   GMAIL_USER=gogonegirl@gmail.com
   GMAIL_PASSWORD=xxxx xxxx xxxx xxxx
   ```
5. Click "Deploy"
6. Wait 2-3 min, copy your URL: `https://gogonegirl-production.railway.app`

## Step 3: Deploy Frontend to Vercel (5 min)

1. Go to **https://vercel.com** → Sign up with GitHub
2. Click "Add New" → "Project"
3. Select your `gogonegirl` repo
4. Set Root Directory: `app`
5. Click "Deploy"
6. Go to Settings → Environment Variables
7. Add: `VITE_API_URL=https://YOUR-RAILWAY-URL.railway.app`
8. Redeploy from Deployments tab
9. Copy your URL: `https://gogonegirl.vercel.app`

## Step 4: Update Backend CORS (2 min)

Edit `server.js` line 14:
```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://gogonegirl.vercel.app',  // Add your Vercel URL
  ],
  credentials: true
}));
```

Then push:
```bash
git add server.js
git commit -m "Update CORS for production"
git push origin main
```

Railway auto-redeploys.

## Step 5: Verify (5 min)

### Test Backend
```bash
curl https://gogonegirl-production.railway.app/api/trips
```
Should return trips JSON.

### Test Frontend
Open: https://gogonegirl.vercel.app

Should load and work!

---

## 🎯 Your Live URLs

```
Frontend: https://gogonegirl.vercel.app
Backend:  https://gogonegirl-production.railway.app
GitHub:   https://github.com/YOUR-USERNAME/gogonegirl
```

---

## ✨ After Deployment

Every time you push to GitHub:
```bash
git add .
git commit -m "Your change description"
git push origin main
```

Both Vercel and Railway auto-deploy in 2-3 minutes! ✅

---

## 🚨 If Something Goes Wrong

1. **Vercel build fails?** Check build logs in Dashboard
2. **Railway won't start?** Check logs in Railway dashboard
3. **API not connecting?** Check CORS settings in server.js
4. **Env variables not set?** Add them in dashboard, redeploy

---

## 📚 Full Guide

See `DEPLOYMENT_GUIDE.md` for detailed instructions.

---

🚀 **You're about to go live!**
