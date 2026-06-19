# Login Page Redirect Fix

## Problem Identified
User was successfully logging in (token and user stored in localStorage), but was stuck on the login page instead of being redirected to the dashboard.

## Root Cause
**Cookie name mismatch between backend and frontend middleware:**

- **Backend** (`backend/src/routes/admin/auth.ts`): Sets cookie as `token`
  ```typescript
  res.cookie('token', token, { ... });
  ```

- **Frontend Middleware** (`admin/middleware.ts`): Was looking for `admin_token`
  ```typescript
  const token = request.cookies.get('admin_token')?.value; // ❌ WRONG
  ```

Since the middleware couldn't find the `admin_token` cookie, it blocked access to `/dashboard` routes and redirected back to `/login`, creating a redirect loop.

## Fix Applied
Changed the middleware to look for the correct cookie name:

**File:** `admin/middleware.ts`
```typescript
// BEFORE
const token = request.cookies.get('admin_token')?.value;

// AFTER
const token = request.cookies.get('token')?.value;
```

## How It Works Now

### Login Flow:
1. User submits credentials on `/login`
2. Frontend calls `POST /api/admin/auth/login`
3. Backend validates credentials and returns:
   - JWT token in response body (stored in localStorage)
   - JWT token in HTTP-only cookie named `token`
4. Login page redirects to `/dashboard`
5. Middleware checks for `token` cookie → ✅ Found → Allows access
6. User sees the dashboard

### Protected Routes:
The middleware protects all `/dashboard/*` routes by checking for the `token` cookie. If not found, it redirects to `/login`.

### Logout Flow:
When user logs out:
- Cookie is cleared on backend: `res.clearCookie('token')`
- localStorage is cleared on frontend
- User is redirected to `/login`

## Configuration Verified

✅ **CORS Configuration** (`backend/src/index.ts`):
- Credentials enabled: `credentials: true`
- Allowed origins include: `http://localhost:3000,http://localhost:3001,http://localhost:3002`

✅ **API Client** (`admin/lib/api.ts`):
- Credentials enabled: `withCredentials: true`
- Sends cookies with every request

✅ **Backend Auth** (`backend/src/routes/admin/auth.ts`):
- Sets HTTP-only cookie on login
- Cookie settings:
  - `httpOnly: true` (prevents XSS attacks)
  - `secure: false` (for development, true in production)
  - `sameSite: 'strict'`
  - `maxAge: 7 days`

## Testing Instructions

### 1. Restart the Admin Frontend
The middleware change requires a restart:
```bash
cd admin
npm run dev
```

### 2. Clear Browser Data
To ensure clean state:
- Open DevTools → Application → Storage
- Clear all cookies for `localhost:3001` (or your admin port)
- Clear localStorage

### 3. Test Login
1. Go to `http://localhost:3001/login` (or your admin port)
2. Enter credentials:
   - Email: `admin@alphapower.com`
   - Password: `admin123`
3. Click "Sign In"

### 4. Expected Behavior
✅ **Success indicators:**
- Login button shows loading state
- No error message appears
- **Page redirects to `/dashboard`** (this was broken before)
- Dashboard loads with statistics
- Navigation sidebar shows all sections

✅ **DevTools Console:**
```
🔐 [Admin] Attempting login...
Email: admin@alphapower.com
API URL: http://localhost:4000/api
Sending POST request to /admin/auth/login
✓ Response received: {status: 200, hasToken: true, hasUser: true, success: true}
✓ Storing token and user in localStorage
✓ Login successful!
```

✅ **DevTools Application Tab:**
- **Cookies:** Should see `token` cookie set
- **LocalStorage:** Should see `admin_token` and `admin_user`

### 5. Test Protected Routes
Try accessing dashboard routes directly:
- `http://localhost:3001/dashboard/projects`
- `http://localhost:3001/dashboard/news`
- `http://localhost:3001/dashboard/team`

All should load without redirecting to login.

### 6. Test Logout
1. Click logout button (if available in UI)
2. Should redirect to `/login`
3. Cookie should be cleared
4. Accessing `/dashboard` should redirect back to `/login`

### 7. Test Middleware Protection
Open incognito/private window:
1. Try to access `http://localhost:3001/dashboard`
2. Should immediately redirect to `/login` (no token cookie)
3. After login, should redirect back to `/dashboard`

## Troubleshooting

### Still stuck on login page?
Check DevTools → Network tab:
- Is the login request succeeding (200 status)?
- Is the `Set-Cookie` header present in the response?
- Is the cookie being stored in Application → Cookies?

### Cookie not being set?
- Verify backend is running on `http://localhost:4000`
- Check backend console for CORS errors
- Ensure `withCredentials: true` in API client
- Verify CORS `credentials: true` in backend

### Redirect loop?
- Clear all cookies and localStorage
- Check browser console for errors
- Verify middleware is checking for correct cookie name: `token`

## Security Notes

### Development vs Production
Currently configured for development:
```typescript
secure: process.env.NODE_ENV === 'production'
```

In production, ensure:
- `NODE_ENV=production` in backend .env
- Use HTTPS (required for `secure: true` cookies)
- Update `ALLOWED_ORIGINS` to production domains
- Change `JWT_SECRET` to a strong random value

### Cookie Security
- ✅ `httpOnly: true` - JavaScript cannot access (prevents XSS)
- ✅ `sameSite: 'strict'` - Prevents CSRF attacks
- ✅ 7-day expiration
- ⚠️ `secure: false` in dev (set to `true` in production)

## Files Modified
- `admin/middleware.ts` - Fixed cookie name from `admin_token` to `token`

## Related Files (No changes needed)
- `backend/src/routes/admin/auth.ts` - Backend auth routes
- `admin/lib/auth.ts` - Frontend auth service
- `admin/lib/api.ts` - API client configuration
- `admin/app/login/page.tsx` - Login page component
- `backend/src/index.ts` - Backend CORS configuration
- `backend/.env` - Backend environment variables
- `admin/.env.local` - Admin environment variables

## Next Steps
After verifying the login works:
1. Test all dashboard sections (projects, news, team, media, etc.)
2. Test CRUD operations (create, read, update, delete)
3. Test file uploads in media section
4. Test form submissions in inquiries and applications
5. Verify data persistence in the database
