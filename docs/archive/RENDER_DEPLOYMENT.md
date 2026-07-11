# 🚀 Render Deployment Guide

## Prerequisites
- GitHub repository: https://github.com/AlphaGroupOfDevelopers/Alpha-Power-Station.git
- Render account (free): https://render.com
- Prisma Cloud database (already set up)

---

## Step 1: Prepare Repository ✅

The repository is already configured with:
- ✅ `backend/render.yaml` - Render configuration
- ✅ Build scripts in `package.json`
- ✅ TypeScript compilation
- ✅ Prisma schema

---

## Step 2: Create Render Service

### A. Sign Up / Login to Render
1. Go to https://render.com
2. Sign up with GitHub or email
3. Connect your GitHub account

### B. Create New Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect to repository: `AlphaGroupOfDevelopers/Alpha-Power-Station`
3. Configure service:

**Basic Settings:**
- **Name:** `alpha-power-station-backend`
- **Region:** Oregon (US West) - Free tier
- **Branch:** `main`
- **Root Directory:** `backend`
- **Runtime:** Node
- **Build Command:** `npm install && npx prisma generate && npm run build`
- **Start Command:** `npm start`

**Environment:**
- **Node Version:** 18 or higher (auto-detected)

---

## Step 3: Configure Environment Variables

Add these in Render Dashboard → Environment:

### Required Variables:

```env
NODE_ENV=production

DATABASE_URL=postgres://YOUR_PRISMA_CLOUD_URL
# Copy from: backend/.env

JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
# Generate a strong random string

PORT=4000

ALLOWED_ORIGINS=https://your-admin-panel.vercel.app,https://your-frontend.vercel.app
# Update with actual frontend URLs after deployment
```

### How to Add:
1. In Render service dashboard
2. Click **"Environment"** tab
3. Click **"Add Environment Variable"**
4. Add each variable above
5. Click **"Save Changes"**

---

## Step 4: Deploy

### Auto Deploy (Recommended):
1. Push code to GitHub main branch
2. Render automatically detects and deploys
3. Watch build logs in Render dashboard

### Manual Deploy:
1. In Render dashboard
2. Click **"Manual Deploy"** → **"Deploy latest commit"**

---

## Step 5: Verify Deployment

### Check Health Endpoint:
```
https://alpha-power-station-backend.onrender.com/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-06-19T...",
  "cms": "enabled"
}
```

### Test API:
```bash
curl https://alpha-power-station-backend.onrender.com/api/admin/auth/login \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@alphapower.com","password":"admin123"}'
```

---

## Step 6: Update Frontend Configuration

### Admin Panel (.env.local):
```env
NEXT_PUBLIC_API_URL=https://alpha-power-station-backend.onrender.com/api
```

### Frontend (.env.local):
```env
NEXT_PUBLIC_API_URL=https://alpha-power-station-backend.onrender.com/api
```

---

## 🔧 Render Configuration Explained

### render.yaml:
```yaml
services:
  - type: web
    name: alpha-power-station-backend
    env: node
    region: oregon            # Free tier region
    plan: free                # Free tier
    branch: main              # Deploy from main branch
    rootDir: backend          # Backend folder
    buildCommand: npm install && npx prisma generate && npm run build
    startCommand: npm start
    healthCheckPath: /health  # Health check endpoint
```

### Build Process:
1. `npm install` - Install dependencies
2. `npx prisma generate` - Generate Prisma client
3. `npm run build` - Compile TypeScript to JavaScript
4. `npm start` - Run compiled code from dist/

---

## 🌐 CORS Configuration

After deploying frontend/admin, update backend environment:

```env
ALLOWED_ORIGINS=https://admin.yourapp.com,https://yourapp.com,http://localhost:3000,http://localhost:3001
```

Then redeploy backend.

---

## 📊 Free Tier Limits

Render Free Tier:
- ✅ 750 hours/month (enough for 1 service)
- ✅ Automatic SSL
- ✅ Custom domains
- ⚠️ Spins down after 15 min inactivity
- ⚠️ Cold start ~30 seconds

**Note:** First request after inactivity will be slow due to spin-up time.

---

## 🐛 Troubleshooting

### Build Fails:
**Check:**
1. `package.json` scripts are correct
2. `tsconfig.json` exists
3. No TypeScript errors
4. Prisma schema is valid

**Solution:**
```bash
# Test build locally first
cd backend
npm install
npm run build
npm start
```

### Database Connection Fails:
**Check:**
1. `DATABASE_URL` is correct in Render environment
2. Prisma Cloud database is accessible
3. Connection string includes `?sslmode=require`

### CORS Errors:
**Check:**
1. `ALLOWED_ORIGINS` includes your frontend URLs
2. Both HTTP and HTTPS protocols if needed
3. No trailing slashes in URLs

### 401 Errors:
**Check:**
1. `JWT_SECRET` is set
2. Admin user exists in database
3. Password is correct

---

## 🔄 Continuous Deployment

### Auto Deploy on Git Push:
```bash
# Make changes
git add .
git commit -m "Update backend"
git push origin main

# Render automatically:
# 1. Detects push
# 2. Pulls latest code
# 3. Runs build
# 4. Deploys
# 5. Health check
```

### Monitor Deployment:
- Render Dashboard → Service → Logs
- Watch build progress
- Check for errors

---

## 📝 Post-Deployment Checklist

After successful deployment:

- [ ] Health endpoint responds
- [ ] Login API works
- [ ] Protected routes require auth
- [ ] CORS allows frontend requests
- [ ] Database queries work
- [ ] File uploads work (if using)
- [ ] Admin user can login
- [ ] No errors in Render logs

---

## 🎯 Next Steps

1. ✅ Deploy backend to Render
2. Deploy admin panel to Vercel
3. Deploy frontend to Vercel
4. Update CORS origins
5. Test full flow
6. Set up custom domain (optional)

---

## 🔗 Useful Links

- **Render Dashboard:** https://dashboard.render.com
- **Render Docs:** https://render.com/docs
- **Service Logs:** https://dashboard.render.com/web/[service-id]/logs
- **Environment Vars:** https://dashboard.render.com/web/[service-id]/env

---

## 💡 Pro Tips

1. **Keep .env.example updated** - Others can deploy easily
2. **Use environment variables** - Never commit secrets
3. **Monitor logs** - Watch for errors after deployment
4. **Test locally first** - Ensure build works before deploying
5. **Health checks** - Render uses `/health` to verify service

---

## 🎉 Success!

When you see:
```
==> Build successful 🎉
==> Deploying...
==> Your service is live 🎉
```

Your backend is deployed and accessible at:
```
https://alpha-power-station-backend.onrender.com
```

---

**Status:** Ready for Deployment ✅  
**Estimated Time:** 10-15 minutes  
**Next:** Create Render service and add environment variables
