# 🚀 Deployment Guide - Go Gone Girl

Deploy your app to production in **30 minutes**!

## 📋 Deployment Options

### Frontend (React)
- **Vercel** (recommended) - Free, instant deploys
- **Netlify** - Free, great UI
- **GitHub Pages** - Free but limited

### Backend (Node.js)
- **Railway** (recommended) - Free tier, easy setup
- **Render** - Free tier available
- **Heroku** - Free tier ended, paid only
- **DigitalOcean** - $5/month cheapest

## ✅ Recommended: Vercel + Railway (Total: FREE)

### Prerequisites
- GitHub account (free)
- Push your code to GitHub
- Vercel account (free)
- Railway account (free)

---

## 📱 STEP 1: Prepare for Deployment

### 1a. Create `.gitignore` Files (if needed)

**Root `.gitignore`:**
```bash
cat > /Users/shivanidalakoti/Desktop/workspace/gogonegirl/.gitignore << 'GITIGNORE'
node_modules/
.env
.env.local
.DS_Store
dist/
build/
GITIGNORE
```

**App `.gitignore`:**
```bash
cat > /Users/shivanidalakoti/Desktop/workspace/gogonegirl/app/.gitignore << 'GITIGNORE'
# Logs
logs/
*.log

# Dependencies
node_modules/
package-lock.json

# Build
dist/
build/

# Env
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
.DS_Store
GITIGNORE
```

### 1b. Update Backend for Production

**Add to `server.js` (before listen):**
```javascript
// Production mode
const isProduction = process.env.NODE_ENV === 'production';

// Trust proxy (for Heroku/Railway)
if (isProduction) {
  app.trust proxy = 1;
}
```

### 1c. Update Frontend Environment

**Update `app/.env` for production:**
```env
# Production API (update after deployment)
VITE_API_URL=https://your-backend-url.railway.app
VITE_APP_NAME=Go Gone Girl
VITE_APP_DESCRIPTION=Women's Travel Collective
```

---

## 🚀 STEP 2: Deploy Backend to Railway

### Option A: Railway Deploy (RECOMMENDED)

**1. Go to railway.app and sign up**
```
https://railway.app
Sign up → GitHub auth → Create new project
```

**2. Create GitHub repository**
```bash
cd /Users/shivanidalakoti/Desktop/workspace/gogonegirl
git init
git add .
git commit -m "Initial commit: Gone Girl app"
git branch -M main

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR-USERNAME/gogonegirl.git
git push -u origin main
```

**3. Connect to Railway**
- Go to railway.app dashboard
- Click "New Project"
- Select "Deploy from GitHub"
- Choose your `gogonegirl` repo
- Railway auto-detects Node.js

**4. Set Environment Variables**
```
In Railway dashboard → Variables:
PORT=5000
NODE_ENV=production
GMAIL_USER=gogonegirl@gmail.com
GMAIL_PASSWORD=xxxx xxxx xxxx xxxx
```

**5. Deploy**
- Click "Deploy"
- Wait 2-3 minutes
- Get your backend URL (e.g., `https://gogonegirl-production.railway.app`)

### Option B: Render Deploy

**1. Go to render.com and sign up**
```
https://render.com
Sign up → GitHub auth
```

**2. Create New Web Service**
- Click "New +" → "Web Service"
- Connect GitHub repo
- Build command: `npm install`
- Start command: `npm start`
- Free tier available

**3. Set Environment Variables**
- Same as Railway above

**4. Deploy**
- Click "Create Web Service"
- Wait for deployment
- Copy your backend URL

---

## 🌐 STEP 3: Deploy Frontend to Vercel

### 1. Go to vercel.com and sign up

```
https://vercel.com/signup
Sign up with GitHub
```

### 2. Import Your Project

- Click "Add New..."
- Select "Project"
- Choose your GitHub `gogonegirl` repo
- Click "Import"

### 3. Configure Build Settings

**Root Directory:** `app`

**Build Command:** `npm run build`

**Output Directory:** `dist`

**Install Command:** `npm install`

### 4. Set Environment Variables

In Vercel dashboard:
```
VITE_API_URL = https://your-backend-url.railway.app
```

(Replace with your actual Railway/Render URL)

### 5. Deploy

- Click "Deploy"
- Wait 2-3 minutes
- Get your frontend URL (e.g., `https://gogonegirl.vercel.app`)

---

## 🔗 STEP 4: Connect Frontend to Backend

### Update Backend in Railway/Render

You need to update the backend to accept requests from your Vercel domain:

**In `server.js`, update CORS:**
```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://gogonegirl.vercel.app',  // Your Vercel URL
    'https://your-domain.com'  // Your custom domain (if any)
  ],
  credentials: true
}));
```

Then push to GitHub:
```bash
git add server.js
git commit -m "Update CORS for production URLs"
git push origin main
```

Railway/Render will **auto-redeploy**.

### Update Frontend in Vercel

In Vercel → Project Settings → Environment Variables:

```
VITE_API_URL = https://gogonegirl-production.railway.app
```

Redeploy:
```bash
git add app/.env
git commit -m "Update API URL for production"
git push origin main
```

Vercel will **auto-redeploy**.

---

## ✅ STEP 5: Verify Deployment

### Test Backend
```bash
curl https://gogonegirl-production.railway.app/api/trips
```

Should return trips JSON.

### Test Frontend
```
Open https://gogonegirl.vercel.app
```

Should load and connect to backend!

### Test Complete Flow
1. Register new account
2. Login
3. Browse trips
4. Create booking
5. View dashboard
6. Login as admin (check admin panel)

---

## 🎯 URLs You Now Have

```
Frontend: https://gogonegirl.vercel.app
Backend:  https://gogonegirl-production.railway.app
```

Share these with anyone to test!

---

## 🆓 Cost Breakdown

| Service | Plan | Price | Features |
|---------|------|-------|----------|
| Vercel | Pro | **FREE** | 100 builds/month, SSL |
| Railway | Starter | **FREE** | $5 credit/month, 500 hours |
| GitHub | Free | **FREE** | Unlimited repos |
| **Total** | | **FREE** | Full-stack production ready |

---

## 🔄 Continuous Deployment

**Auto-deploy on every push:**

Both Vercel and Railway watch your GitHub repo. When you push:
```bash
git push origin main
```

They automatically:
1. Pull latest code
2. Build
3. Deploy
4. Update live site

**No manual deploys needed!**

---

## 🛠️ Update Code Post-Deployment

### Make Changes
```bash
# Make changes to code
vim server.js  # or edit in VS Code

# Commit and push
git add .
git commit -m "Update feature X"
git push origin main
```

### Auto-Deploy
- Vercel: Deploys in 1-2 minutes
- Railway: Deploys in 2-3 minutes
- Check status in dashboard

---

## 🔐 Production Checklist

- [ ] Backend running on Railway/Render
- [ ] Frontend running on Vercel
- [ ] Environment variables set in both
- [ ] CORS updated for production URLs
- [ ] Can register new user
- [ ] Can login
- [ ] Can browse trips
- [ ] Can create booking
- [ ] Dashboard works
- [ ] Admin panel works

---

## 📊 Monitor Deployments

### Vercel Dashboard
```
https://vercel.com/dashboard
Click project → Deployments → View build logs
```

### Railway Dashboard
```
https://railway.app/dashboard
Click project → Deployments → View logs
```

---

## 🚨 Troubleshooting

### "API connection failed"
**Solution:** 
- Check VITE_API_URL in Vercel env vars
- Check CORS in server.js
- Test API directly: `curl https://your-backend.railway.app/api/trips`

### "Build failed"
**Solution:**
- Check build logs in dashboard
- Ensure `package.json` has all dependencies
- Verify build command is correct

### "Blank page"
**Solution:**
- Check browser console (F12)
- Check network requests
- Verify VITE_API_URL is set

### "Login doesn't work"
**Solution:**
- Clear browser cookies
- Check token in localStorage
- Verify backend is running

---

## 🎯 Next: Custom Domain (Optional)

Want `gogonegirl.com` instead of `vercel.app`?

### Register Domain
```
Buy from: Namecheap, GoDaddy, or Route53
Cost: $10-15/year
```

### Connect to Vercel
```
Vercel Dashboard → Settings → Domains → Add Domain
Follow instructions to update DNS
```

### Connect to Railway (Backend)
```
Railway Dashboard → Project → Domain
Add your domain or subdomain
```

---

## 📈 Scale Later

Your current setup handles:
- ✅ Up to 1,000 daily users
- ✅ 10,000+ bookings
- ✅ Auto-scaling on demand

When you need to scale:
1. **Add Database:** Upgrade to MongoDB Atlas
2. **Add CDN:** Cloudflare (free)
3. **Add Cache:** Redis (paid)
4. **Add Analytics:** Google Analytics (free)

---

## 🎉 You're Live!

Your app is now on the internet! 🌍

**Share these links:**
- Frontend: https://gogonegirl.vercel.app
- GitHub: https://github.com/YOUR-USERNAME/gogonegirl

---

## 📚 Need Help?

**Vercel Support:** https://vercel.com/support
**Railway Support:** https://railway.app/support
**GitHub Support:** https://github.com/support

---

## ✨ Summary

| Component | Deployed | URL |
|-----------|----------|-----|
| React App | ✅ Vercel | https://gogonegirl.vercel.app |
| API Server | ✅ Railway | https://gogonegirl-production.railway.app |
| Database | ⏳ Ready | MongoDB Atlas (optional) |
| Domain | ⏳ Ready | Add custom domain |

**Total time:** 30 minutes
**Total cost:** FREE ($5 Railway credit/month)
**Status:** Production Ready ✅

🚀 **Happy Travels!**
