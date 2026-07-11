# Backend Login Guide

## ✅ Backend is Running Successfully!

The backend is confirmed working at `http://localhost:4000`

## Admin Login Credentials

```
Email: admin@alphapower.com
Password: admin123
```

## Available Backend URLs

### Working Endpoints:
- ✅ `http://localhost:4000/health` - Health check
- ✅ `http://localhost:4000/api/admin/auth/login` - Login (POST request)
- ✅ `http://localhost:4000/api/admin/projects` - Projects (GET, requires auth)
- ✅ `http://localhost:4000/api/admin/news` - News (GET, requires auth)
- ✅ `http://localhost:4000/api/admin/team` - Team (GET, requires auth)
- ✅ `http://localhost:4000/api/admin/applications` - Applications (GET, requires auth)
- ✅ `http://localhost:4000/api/admin/inquiries` - Inquiries (GET, requires auth)

### Not Found (Expected):
- ❌ `http://localhost:4000/api/admin` - This will show "Route not found" (it's just a base path)
- ❌ `http://localhost:4000/api` - This will show "Route not found" (it's just a base path)

## How to Login

### Option 1: Use the Admin Panel (Recommended)
1. Go to `http://localhost:3000`
2. Enter email: `admin@alphapower.com`
3. Enter password: `admin123`
4. Click "Sign In"

### Option 2: Test with Postman/curl
```bash
curl -X POST http://localhost:4000/api/admin/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@alphapower.com\",\"password\":\"admin123\"}"
```

Expected response:
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "...",
    "email": "admin@alphapower.com",
    "name": "Admin User",
    "role": "admin"
  }
}
```

## Troubleshooting

### If you see "Route not found"

**Check which URL you're accessing:**

1. ❌ `http://localhost:4000/api/admin` → Will show error (base path only)
2. ✅ `http://localhost:3000` → Admin panel login page (correct)
3. ✅ `http://localhost:4000/health` → Backend health check (correct)

**The `/api/admin` path alone doesn't do anything - you need to access specific routes like `/api/admin/auth/login`**

### Backend Console Should Show:
```
🚀 Alpha Power Station API running on port 4000
📍 Environment: development
🔐 CMS Admin: http://localhost:4000/api/admin
```

### Admin Panel Should:
- Load at `http://localhost:3000`
- Show a login form
- When you click login, it sends request to `http://localhost:4000/api/admin/auth/login`

## Current Status

✅ **Backend Running** - Port 4000
✅ **Database** - SQLite (local file)
✅ **Admin User Created** - email: admin@alphapower.com
✅ **Routes Registered** - All admin routes available
⏳ **Admin Panel** - Make sure it's running on port 3000

## Next Step

**Go to the admin panel:**
```
http://localhost:3000
```

Don't try to access `http://localhost:4000/api/admin` directly in the browser - that's not a valid endpoint. The admin panel will make API calls to the correct endpoints automatically.

## Database Location

Your SQLite database is at:
```
C:\Dev\Alpha Power Station\backend\prisma\dev.db
```

You can view it with:
```bash
cd backend
npx prisma studio
```
