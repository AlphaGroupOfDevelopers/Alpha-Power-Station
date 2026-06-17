# Testing Your Backend Server

## ✅ Backend is Running!

If you see this message:
```
🚀 Alpha Power Station API running on port 4000
📍 Environment: development
```

Your backend is working! 🎉

## 🧪 How to Test

### Option 1: Use Your Browser

Open these URLs in your browser:

1. **Health Check:**
   ```
   http://localhost:4000/health
   ```
   Should show: `{"status":"ok","timestamp":"2026-06-17T..."}`

2. **Get Projects:**
   ```
   http://localhost:4000/api/projects
   ```
   Should show: `[]` (empty array, no projects yet)

### Option 2: Use PowerShell

```powershell
# Health check
Invoke-RestMethod -Uri http://localhost:4000/health

# Get projects
Invoke-RestMethod -Uri http://localhost:4000/api/projects

# Submit a test contact inquiry
$body = @{
    name = "Test User"
    email = "test@example.com"
    subject = "Testing"
    message = "Hello from the API!"
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:4000/api/contact -Method Post -Body $body -ContentType "application/json"
```

### Option 3: Use Postman or Thunder Client

**Postman:** https://www.postman.com/downloads/
**Thunder Client:** VS Code extension

Import these endpoints:
- GET `http://localhost:4000/health`
- GET `http://localhost:4000/api/projects`
- POST `http://localhost:4000/api/contact`

### Option 4: Test from Frontend

Once your frontend is running, it will automatically call the backend API!

## 📊 Database Status

**Important:** Your backend is running, but you still need to:

1. **Setup Database** (if not done yet)
   ```bash
   # See QUICK_START.md for database setup
   npm run prisma:generate
   npm run prisma:migrate
   ```

2. **Add Sample Data** (optional)
   ```bash
   npm run prisma:seed
   ```

## 🔍 Check Server Logs

The terminal where you ran `npm run dev` will show:
- ✅ Successful requests
- ❌ Errors (like database connection issues)
- 📝 All API calls made

## ⚠️ Common Issues

### "Connection refused"
- Backend not running
- Wrong port (should be 4000)

### "Database error"
- Database not configured
- See DATABASE_SETUP.md

### CORS errors (from frontend)
- Normal! CORS is configured for localhost:3000
- Make sure frontend runs on port 3000

## 🎯 Next Steps

1. ✅ Backend is running (port 4000)
2. ⏳ Setup database (if needed)
3. ⏳ Start frontend (port 3000)
4. ⏳ Test full integration

---

**Your backend is alive and ready! 🚀**

Test URL: http://localhost:4000/health
