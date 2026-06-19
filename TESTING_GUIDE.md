# 🧪 Complete Testing Guide

## Overview
This guide will help you test the entire Alpha Power Station system including:
- Backend API
- Admin Dashboard
- Frontend Website

---

## ⚙️ Prerequisites

### Services to Run:
1. **Backend API** - Port 4000
2. **Admin Dashboard** - Port 3000/3001
3. **Frontend Website** - Port 3000/3002

---

## 🚀 Step 1: Start All Services

### Terminal 1 - Backend API
```bash
cd "c:\Dev\Alpha Power Station\backend"
npm run dev
```

**Expected Output:**
```
============================================================
🚀 Alpha Power Station API running on port 4000
📍 Environment: development
🔐 CMS Admin: http://localhost:4000/api/admin
🗄️  Database: PostgreSQL (Prisma Cloud)
🌐 CORS Origins: http://localhost:3000,http://localhost:3001,...
============================================================

✓ Server ready - Verbose logging enabled
```

**Verify:**
- Server starts without errors
- Database connection successful
- Port 4000 is listening

### Terminal 2 - Admin Dashboard
```bash
cd "c:\Dev\Alpha Power Station\admin"
npm run dev
```

**Expected Output:**
```
▲ Next.js 16.2.9
- Local:        http://localhost:3000
- Ready in 2.5s
```

**Verify:**
- Builds without TypeScript errors
- Server starts on port 3000 (or 3001 if 3000 is busy)
- No console errors

### Terminal 3 - Frontend Website
```bash
cd "c:\Dev\Alpha Power Station\frontend"
npm run dev
```

**Expected Output:**
```
▲ Next.js (version)
- Local:        http://localhost:3001 (or 3002)
- Ready in X.Xs
```

**Verify:**
- Builds successfully
- Server starts on available port
- No console errors

---

## 🧪 Step 2: Test Backend API

### 2.1 Health Check
Open browser or use curl:
```bash
curl http://localhost:4000/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-06-19T...",
  "cms": "enabled"
}
```

### 2.2 Test Login Endpoint
```bash
curl -X POST http://localhost:4000/api/admin/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@alphapower.com\",\"password\":\"admin123\"}"
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOi...",
  "user": {
    "id": "...",
    "email": "admin@alphapower.com",
    "name": "Admin User",
    "role": "admin"
  }
}
```

### 2.3 Test Protected Routes
```bash
# Should return 401 Unauthorized
curl http://localhost:4000/api/admin/projects
```

**Expected Response:**
```json
{
  "error": "No token provided"
}
```

---

## 🎨 Step 3: Test Admin Dashboard

### 3.1 Test Login Page
1. **Open:** `http://localhost:3000/login` (or your admin port)
2. **Enter Credentials:**
   - Email: `admin@alphapower.com`
   - Password: `admin123`
3. **Click:** "Sign In"

**Expected Behavior:**
- ✅ Login button shows loading spinner
- ✅ Success toast appears: "Login successful!"
- ✅ Redirects to `/dashboard`
- ✅ No console errors

**Check DevTools:**
- **Application → Cookies:** Should see `token` cookie
- **Application → LocalStorage:** Should see `admin_token` and `admin_user`
- **Console:** Should see login success logs
- **Network:** `/api/admin/auth/login` should return 200

### 3.2 Test Dashboard Home
**URL:** `http://localhost:3000/dashboard`

**Expected:**
- ✅ Dashboard loads with statistics cards
- ✅ Shows counts for: Projects, News, Team, Applications, Inquiries, Partners
- ✅ Navigation sidebar visible
- ✅ Quick action buttons present
- ✅ No console errors

**Check:**
- All stat cards display (even if 0)
- Click each sidebar link to verify navigation
- Hover effects work on cards
- Responsive layout

### 3.3 Test Projects Management

#### List Projects
**URL:** `http://localhost:3000/dashboard/projects`

**Expected:**
- ✅ Page loads without errors
- ✅ "New Project" button visible
- ✅ Empty state shows if no projects (or table if projects exist)
- ✅ All projects display in table

#### Create Project
1. Click "New Project"
2. Fill out form:
   - Title: "Test Project"
   - Slug: "test-project"
   - Description: "This is a test project"
   - Category: "foundational"
   - Division: "AGD"
   - Status: "active"
3. Click "Create Project"

**Expected:**
- ✅ Loading spinner appears
- ✅ Success toast: "Project created successfully!"
- ✅ Redirects to projects list
- ✅ New project appears in table

**Check Backend Console:**
- Should see POST request logged
- Should see database insert

#### Edit Project
1. Click edit icon on a project
2. Modify any field
3. Click "Save Changes"

**Expected:**
- ✅ Form pre-fills with existing data
- ✅ Loading spinner on save
- ✅ Success toast: "Project updated successfully!"
- ✅ Redirects to list
- ✅ Changes visible in table

#### Delete Project
1. Click delete icon (trash)
2. Confirm dialog appears
3. Click "Delete"

**Expected:**
- ✅ Confirmation dialog shows
- ✅ Dialog has proper title and message
- ✅ Success toast after deletion
- ✅ Project removed from table
- ✅ Table updates automatically

### 3.4 Test News Management

**URL:** `http://localhost:3000/dashboard/news`

**Test Same Flow:**
1. ✅ Create article with all fields
2. ✅ Edit article
3. ✅ Delete article with confirmation
4. ✅ Check tags (comma-separated)
5. ✅ Verify featured badge

**Sample Data:**
- Title: "Latest Engineering News"
- Slug: "latest-engineering-news"
- Excerpt: "Brief summary..."
- Content: "Full article content..."
- Category: "news"
- Author: "John Doe"
- Tags: "engineering, technology, innovation"

### 3.5 Test Team Management

**URL:** `http://localhost:3000/dashboard/team`

**Test:**
1. ✅ Create team member
2. ✅ Add social links (GitHub, LinkedIn)
3. ✅ Edit member
4. ✅ Verify display order
5. ✅ Check featured badge
6. ✅ Delete member

**Sample Data:**
- Name: "Jane Smith"
- Role: "Senior Engineer"
- Division: "AGD"
- Email: "jane@example.com"
- Bio: "Brief bio..."
- GitHub: "https://github.com/username"
- LinkedIn: "https://linkedin.com/in/username"

### 3.6 Test Partners Management

**URL:** `http://localhost:3000/dashboard/partners`

**Test:**
1. ✅ Create partner
2. ✅ Add logo URL
3. ✅ Add website link
4. ✅ Edit partner
5. ✅ Verify display order
6. ✅ Delete partner

**Sample Data:**
- Name: "Tech Corp"
- Category: "Technology"
- Description: "Leading tech partner"
- Website: "https://techcorp.com"
- Logo URL: "https://example.com/logo.png"

### 3.7 Test Other Pages

**Applications:**
- URL: `http://localhost:3000/dashboard/applications`
- ✅ List loads (empty or with data)
- ✅ Stats summary displays
- ✅ View button works
- ✅ Download resume (if available)

**Inquiries:**
- URL: `http://localhost:3000/dashboard/inquiries`
- ✅ List loads (empty or with data)
- ✅ Stats summary displays
- ✅ Reply email button opens email client
- ✅ New inquiries highlighted

**Media:**
- URL: `http://localhost:3000/dashboard/media`
- ✅ Grid view loads
- ✅ Empty state or media displays
- ✅ Upload button present
- ✅ Stats show correctly

---

## 🌐 Step 4: Test Frontend Website

### 4.1 Home Page
**URL:** `http://localhost:3001` (or your frontend port)

**Check:**
- ✅ Page loads without errors
- ✅ All sections render
- ✅ Navigation works
- ✅ Responsive design
- ✅ No console errors

### 4.2 Test Navigation
Click through all pages:
- ✅ Home
- ✅ About
- ✅ Projects
- ✅ News/Blog
- ✅ Team
- ✅ Contact

**Expected:**
- All pages load
- Navigation highlighting works
- Smooth transitions
- No 404 errors

### 4.3 Test API Integration

**Projects Page:**
- Should fetch from `/api/projects`
- Display projects from database
- Filter by category/division (if implemented)

**News Page:**
- Should fetch from `/api/news`
- Display news posts
- Show excerpts and authors

**Team Page:**
- Should fetch from `/api/team`
- Display team members
- Show photos and social links

---

## ✅ Testing Checklist

### Backend API
- [ ] Server starts without errors
- [ ] Database connects successfully
- [ ] Health check returns 200
- [ ] Login endpoint works
- [ ] Protected routes require auth
- [ ] All 8 admin routes accessible
- [ ] CORS allows frontend origins
- [ ] Validation works on all endpoints

### Admin Dashboard
- [ ] Login page loads
- [ ] Login works with correct credentials
- [ ] Login fails with wrong credentials
- [ ] Redirects to dashboard after login
- [ ] Dashboard shows statistics
- [ ] All 7 pages load
- [ ] Navigation works
- [ ] Projects CRUD works
- [ ] News CRUD works
- [ ] Team CRUD works
- [ ] Partners CRUD works
- [ ] Delete confirmations appear
- [ ] Toast notifications show
- [ ] Form validation works
- [ ] Loading states display
- [ ] Error handling works
- [ ] Logout works

### Frontend Website
- [ ] Home page loads
- [ ] All pages accessible
- [ ] Navigation works
- [ ] API data displays
- [ ] Responsive on mobile
- [ ] No console errors
- [ ] Contact form works
- [ ] Links work correctly

---

## 🐛 Common Issues & Solutions

### Issue: Backend won't start
**Symptoms:** Port already in use, database connection error
**Solutions:**
- Check if another service is using port 4000
- Verify `.env` file exists with correct DATABASE_URL
- Run `npx prisma generate` to regenerate Prisma client

### Issue: Admin login fails
**Symptoms:** 401 error, "Invalid credentials"
**Solutions:**
- Verify admin user exists: `npm run create-admin` in backend
- Check credentials: `admin@alphapower.com` / `admin123`
- Check backend console for errors
- Verify database connection

### Issue: Admin redirects to login immediately
**Symptoms:** Login succeeds but redirects back
**Solutions:**
- Check cookie is set in DevTools
- Verify middleware is checking for `token` cookie (not `admin_token`)
- Clear browser cookies and try again
- Check CORS allows credentials

### Issue: Can't delete items
**Symptoms:** No confirmation dialog, or deletion fails
**Solutions:**
- Check confirm dialog imports
- Verify delete mutation is defined
- Check backend console for errors
- Ensure user has admin role

### Issue: Forms don't submit
**Symptoms:** Button clicks but nothing happens
**Solutions:**
- Check browser console for errors
- Verify API endpoint exists
- Check form validation errors
- Ensure all required fields filled

### Issue: TypeScript errors
**Symptoms:** Build fails, red squiggles
**Solutions:**
- Run `npm install` in admin folder
- Check imports are correct
- Verify types match
- Run `npm run build` to see all errors

---

## 📊 Performance Testing

### Load Time Goals:
- Backend API response: < 200ms
- Admin page load: < 2s
- Frontend page load: < 3s

### Test Tools:
```bash
# Backend API load test
curl -w "@curl-format.txt" -o /dev/null -s http://localhost:4000/health

# Or use browser DevTools → Network tab
```

### Check:
- Time to First Byte (TTFB)
- Total page load time
- Number of API calls
- Bundle size

---

## 🔒 Security Testing

### Test Auth:
1. ✅ Try accessing admin routes without login → Should redirect
2. ✅ Try wrong credentials → Should fail
3. ✅ Logout → Should clear session
4. ✅ Check cookie is HTTP-only
5. ✅ Verify JWT expiration works

### Test Validation:
1. ✅ Submit empty forms → Should show errors
2. ✅ Submit invalid email → Should show error
3. ✅ Submit SQL injection → Should sanitize
4. ✅ Try XSS attacks → Should escape

### Test CORS:
1. ✅ Requests from allowed origins work
2. ✅ Requests from other origins blocked
3. ✅ Credentials sent properly

---

## 📝 Test Data

### Create Sample Data:

**Projects:**
```json
[
  {
    "title": "Smart Grid System",
    "slug": "smart-grid-system",
    "category": "infrastructure",
    "division": "AGEE",
    "status": "active"
  },
  {
    "title": "Data Analytics Platform",
    "slug": "data-analytics-platform",
    "category": "commercial",
    "division": "AGD",
    "status": "completed"
  }
]
```

**News:**
```json
[
  {
    "title": "New Partnership Announced",
    "slug": "new-partnership-announced",
    "excerpt": "Exciting new collaboration...",
    "content": "Full article...",
    "category": "news",
    "author": "Admin"
  }
]
```

**Team:**
```json
[
  {
    "name": "John Doe",
    "role": "Lead Engineer",
    "division": "AGD",
    "email": "john@example.com"
  }
]
```

---

## ✨ Success Criteria

### All Green = Ready for Production ✅
- All services start without errors
- Login works smoothly
- All CRUD operations work
- Delete confirmations appear
- Toast notifications show
- Form validation works
- No console errors
- All pages load correctly
- API data displays properly
- Responsive on mobile
- Security measures active

---

## 🎯 Next Steps After Testing

1. **If all tests pass:**
   - ✅ Commit any fixes
   - ✅ Push to GitHub
   - ✅ Deploy to production
   - ✅ Set up monitoring

2. **If tests fail:**
   - 📝 Document the issue
   - 🔍 Check error messages
   - 🐛 Fix the bug
   - ♻️ Re-test

---

## 📞 Quick Commands

```bash
# Start all services (in separate terminals)
cd backend && npm run dev
cd admin && npm run dev
cd frontend && npm run dev

# Check if services are running
curl http://localhost:4000/health
curl http://localhost:3000
curl http://localhost:3001

# View logs
# Check each terminal window for errors

# Stop services
# Press Ctrl+C in each terminal
```

---

**Happy Testing! 🚀**
