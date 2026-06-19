# 🧪 Complete Testing Guide - Alpha Power Station

## ✅ What's Been Pushed to GitHub

**Repository:** https://github.com/AlphaGroupOfDevelopers/Alpha-Power-Station.git

### Latest Commits:
1. **Complete admin CMS implementation** - 85 files, 17,381 insertions
2. **Fix TypeScript error** - Type safety improvements

---

## 🚀 Quick Start Testing

### Step 1: Start Backend
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

### Step 2: Start Admin Panel
**New terminal:**
```bash
cd "c:\Dev\Alpha Power Station\admin"
npm run dev
```

**Expected Output:**
```
  ▲ Next.js 16.2.9
  - Local:        http://localhost:3000 (or 3001)
  - Environments: .env.local

 ✓ Starting...
 ✓ Ready in 2.5s
```

### Step 3: Start Frontend (Optional)
**New terminal:**
```bash
cd "c:\Dev\Alpha Power Station\frontend"
npm run dev
```

---

## 🧪 Testing Checklist

### 1. Backend API Testing ✅

#### Health Check:
```bash
# In browser or curl:
http://localhost:4000/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-06-19T...",
  "cms": "enabled"
}
```

#### Test Admin Login:
```bash
POST http://localhost:4000/api/admin/auth/login
Content-Type: application/json

{
  "email": "admin@alphapower.com",
  "password": "admin123"
}
```

**Expected Response:**
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

#### Test Protected Routes:
```bash
GET http://localhost:4000/api/admin/projects
Cookie: token=YOUR_TOKEN_HERE
```

---

### 2. Admin Panel Testing ✅

#### A. Login Test
1. Open: `http://localhost:3000/login` (or 3001)
2. Enter credentials:
   - Email: `admin@alphapower.com`
   - Password: `admin123`
3. Click "Sign In"

**✅ Success Indicators:**
- No errors in console
- Redirects to `/dashboard` immediately
- Dashboard loads with statistics
- Sidebar navigation visible

**❌ Failure Signs:**
- Stuck on login page → Check cookie name in middleware
- "Invalid credentials" → Check backend is running
- CORS errors → Check ALLOWED_ORIGINS in backend .env

#### B. Dashboard Overview Test
**Expected on Dashboard:**
- Statistics cards showing counts
- Navigation sidebar with 8 sections
- Clean, professional UI
- No console errors

#### C. Projects CRUD Test (Full Flow)

**CREATE:**
1. Click "Projects" in sidebar
2. Click "New Project" button
3. Fill form:
   - Title: "Test Project"
   - Slug: "test-project"
   - Description: "Testing CRUD operations"
   - Category: "Foundational"
   - Division: "AGD"
4. Click "Create Project"

**✅ Expected:**
- Success toast appears (green)
- Redirects to projects list
- New project appears in table

**EDIT:**
1. Click edit icon on "Test Project"
2. Change title to "Updated Test Project"
3. Click "Save Changes"

**✅ Expected:**
- Success toast appears
- Redirects to projects list
- Title updated in table

**DELETE:**
1. Click delete icon on "Updated Test Project"
2. Confirm dialog appears
3. Click "Delete"

**✅ Expected:**
- Success toast appears
- Project removed from table
- Confirm dialog closes

#### D. News CRUD Test

**CREATE:**
1. Click "News" in sidebar
2. Click "New Article"
3. Fill form:
   - Title: "Test Article"
   - Slug: "test-article"
   - Excerpt: "Testing news functionality"
   - Content: "Full article content here..."
   - Category: "News"
   - Author: "Test Author"
   - Tags: "test, article, demo"
4. Check "Featured Post"
5. Click "Create Post"

**✅ Expected:**
- Success toast
- Redirects to news list
- Article appears with "Featured" badge

**EDIT & DELETE:**
- Same flow as Projects

#### E. Team CRUD Test

**CREATE:**
1. Click "Team" in sidebar
2. Click "Add Member"
3. Fill form:
   - Name: "John Doe"
   - Role: "Senior Engineer"
   - Division: "AGD"
   - Email: "john@example.com"
   - GitHub: "https://github.com/johndoe"
   - LinkedIn: "https://linkedin.com/in/johndoe"
4. Check "Featured Member"
5. Set Order: 1
6. Click "Add Member"

**✅ Expected:**
- Success toast
- Redirects to team list
- Member appears with social icons

#### F. Partners CRUD Test

**CREATE:**
1. Click "Partners" in sidebar
2. Click "Add Partner"
3. Fill form:
   - Name: "Test Partner Co."
   - Category: "Technology"
   - Description: "A technology partner"
   - Website: "https://partner.com"
4. Click "Add Partner"

**✅ Expected:**
- Success toast
- Redirects to partners list
- Partner appears in table

---

### 3. Media Testing ⚠️

**Current Status:** Display only (upload UI pending)

**Test Media List:**
1. Click "Media" in sidebar
2. Should show grid view
3. If no files: Shows empty state

**To Add Upload:**
- Follow `PHASE2_COMPLETE_GUIDE.md` section 6

---

### 4. Applications & Inquiries Testing

**These are READ-ONLY** (no create forms, just viewing):

#### Applications:
1. Click "Applications"
2. Should show table or empty state
3. Stats cards show counts

#### Inquiries:
1. Click "Inquiries"
2. Should show table or empty state
3. Stats cards show counts
4. "Reply via Email" button opens email client

---

### 5. Frontend Website Testing (Optional)

If frontend is running on http://localhost:3001 or 3002:

1. Home page loads
2. Navigation works
3. About page loads
4. Projects page (if implemented)
5. Contact form (if implemented)

---

## 🐛 Common Issues & Solutions

### Issue 1: Backend won't start
**Error:** `Port 4000 already in use`

**Solution:**
```bash
# Find process using port 4000
netstat -ano | findstr :4000

# Kill the process (use PID from above)
taskkill /PID <PID> /F

# Or change port in backend/.env
PORT=4001
```

### Issue 2: Admin panel stuck on login
**Symptoms:** Login succeeds but stays on login page

**Solutions:**
1. Check browser console for errors
2. Check DevTools → Application → Cookies
3. Should see `token` cookie (not `admin_token`)
4. Clear cookies and localStorage, try again

### Issue 3: CORS errors
**Error:** `CORS policy: No 'Access-Control-Allow-Origin' header`

**Solution:**
Check `backend/.env`:
```env
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,http://localhost:3002
```

Add your admin panel port if different.

### Issue 4: "Cannot read properties of undefined"
**Error:** Prisma model errors

**Solution:**
All models use **snake_case**:
- ✅ `prisma.projects`
- ✅ `prisma.news_posts`
- ✅ `prisma.team_members`
- ❌ NOT `prisma.project`, `prisma.newsPost`

### Issue 5: 401 Unauthorized on API calls
**Symptoms:** API returns 401 for protected routes

**Solutions:**
1. Check token exists in localStorage: `admin_token`
2. Check cookie exists: `token`
3. Check JWT_SECRET matches between requests
4. Try logging out and back in

### Issue 6: Database connection failed
**Error:** `Can't reach database server`

**Solution:**
Check `backend/.env`:
```env
DATABASE_URL="postgres://..."
```
Ensure Prisma Cloud database is accessible.

---

## 📊 Testing Matrix

| Feature | Backend | Admin UI | Status |
|---------|---------|----------|--------|
| **Authentication** | ✅ | ✅ | Working |
| **Projects CRUD** | ✅ | ✅ | Working |
| **News CRUD** | ✅ | ✅ | Working |
| **Team CRUD** | ✅ | ✅ | Working |
| **Partners CRUD** | ✅ | ✅ | Working |
| **Media List** | ✅ | ✅ | Working |
| **Media Upload** | ✅ | ⚠️ | Backend ready, UI pending |
| **Applications** | ✅ | ✅ | Read-only |
| **Inquiries** | ✅ | ✅ | Read-only |
| **Delete Confirm** | ✅ | ✅ | Projects, News |
| **Toast Notifications** | N/A | ✅ | Working |
| **Form Validation** | ✅ | ✅ | Working |
| **Loading States** | N/A | ✅ | Working |
| **Error Handling** | ✅ | ✅ | Working |

---

## 🎯 Expected User Flow

### New User Journey:
1. **Login** → Dashboard
2. **Create Project** → Success toast → See in list
3. **Edit Project** → Success toast → Changes visible
4. **Try Delete** → Confirmation appears → Confirm → Project removed
5. **Create News** → Success toast → Featured badge shows
6. **Add Team Member** → Success toast → Social icons appear
7. **Add Partner** → Success toast → In list

### Typical Admin Session:
1. Login once (cookie persists)
2. Browse different sections
3. Create/edit content as needed
4. See immediate feedback (toasts)
5. Changes persist in database
6. Logout (optional, cookie expires in 7 days)

---

## 📝 Test Data Examples

### Sample Project:
```json
{
  "title": "Solar Energy Initiative",
  "slug": "solar-energy-initiative",
  "description": "Implementing solar panels across campus buildings",
  "category": "foundational",
  "division": "AGEE",
  "status": "active",
  "featured": true
}
```

### Sample News:
```json
{
  "title": "New Research Lab Opens",
  "slug": "new-research-lab",
  "excerpt": "State-of-the-art facility for engineering research",
  "content": "Full article content...",
  "category": "news",
  "author": "Dr. Smith",
  "tags": ["research", "facilities", "innovation"],
  "featured": true
}
```

### Sample Team Member:
```json
{
  "name": "Jane Smith",
  "role": "Lead Researcher",
  "division": "AGD",
  "email": "jane@alphapower.com",
  "github": "https://github.com/janesmith",
  "linkedin": "https://linkedin.com/in/janesmith",
  "featured": true,
  "order": 1
}
```

---

## 🔍 Monitoring & Logs

### Backend Logs to Watch:
```bash
# Successful login
=== LOGIN ATTEMPT ===
✓ Validation passed
User found: admin@alphapower.com
✓ Password valid
✓ Token generated
✓ Cookie set
✅ Login successful!

# API requests
GET /api/admin/projects 200 45ms
POST /api/admin/projects 201 123ms
DELETE /api/admin/projects/:id 200 67ms
```

### Browser Console (Admin Panel):
```javascript
// Good signs:
✓ Response received: {status: 200, hasToken: true}
✓ Storing token and user in localStorage
✓ Login successful!

// Bad signs:
❌ CORS error
❌ 401 Unauthorized
❌ Network request failed
```

---

## ✅ Final Checklist

Before considering testing complete:

- [ ] Backend starts without errors
- [ ] Admin panel starts without errors
- [ ] Can login successfully
- [ ] Dashboard loads with stats
- [ ] Can create a project
- [ ] Can edit a project
- [ ] Can delete a project (with confirmation)
- [ ] Can create a news post
- [ ] Can edit a news post
- [ ] Can delete a news post (with confirmation)
- [ ] Can create a team member
- [ ] Can edit a team member
- [ ] Can create a partner
- [ ] Can edit a partner
- [ ] Toast notifications appear
- [ ] Form validation works
- [ ] Loading states show during operations
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Changes persist after refresh

---

## 🎉 Success Criteria

Your system is **fully functional** when:

1. ✅ All backend routes respond correctly
2. ✅ Login redirects to dashboard
3. ✅ All CRUD operations work for Projects and News
4. ✅ Create/Edit forms work for Team and Partners
5. ✅ Delete confirmations prevent accidents
6. ✅ Toast notifications provide feedback
7. ✅ Form validation prevents bad data
8. ✅ Data persists in database
9. ✅ No errors in console
10. ✅ UI is responsive and professional

---

## 📞 Quick Commands Reference

```bash
# Start backend
cd backend && npm run dev

# Start admin panel
cd admin && npm run dev

# Start frontend
cd frontend && npm run dev

# Check backend health
curl http://localhost:4000/health

# Regenerate Prisma client
cd backend && npx prisma generate

# View database
cd backend && npx prisma studio

# Check Git status
git status

# Push to GitHub
git add . && git commit -m "Update" && git push origin main
```

---

**Testing Status:** Ready for Full Testing ✅  
**Code Status:** Pushed to GitHub ✅  
**Next Step:** Start services and test! 🚀
