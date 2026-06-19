# Quick Restart Instructions

## The Fix
✅ Fixed the login redirect issue by correcting the cookie name in middleware from `admin_token` to `token`.

## Restart Admin Panel
To apply the fix, restart the admin frontend:

```bash
# Navigate to admin folder
cd "c:\Dev\Alpha Power Station\admin"

# Stop the current server (Ctrl+C if running)

# Start the dev server
npm run dev
```

The admin panel will start on `http://localhost:3000` (or the next available port like 3001/3002).

## Test Login
1. Open the admin panel URL shown in terminal
2. Login with:
   - **Email:** `admin@alphapower.com`
   - **Password:** `admin123`
3. You should now be redirected to the dashboard ✅

## What Changed?
- **Before:** Login succeeded but stayed on login page (cookie name mismatch)
- **After:** Login succeeds and redirects to dashboard properly

See `LOGIN_FIX.md` for complete details.
