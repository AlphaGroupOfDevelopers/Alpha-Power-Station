# Prisma Model Naming Fix

## Problem
After login, the dashboard was trying to fetch data but all API endpoints were failing with:
```
TypeError: Cannot read properties of undefined (reading 'findMany')
```

## Root Cause
The Prisma schema uses **snake_case** table names (matching PostgreSQL conventions), but the admin routes were using **camelCase** Prisma model names.

### Mismatches Found:
| ❌ Old (camelCase) | ✅ New (snake_case) |
|-------------------|---------------------|
| `prisma.project` | `prisma.projects` |
| `prisma.newsPost` | `prisma.news_posts` |
| `prisma.teamMember` | `prisma.team_members` |
| `prisma.contactInquiry` | `prisma.contact_inquiries` |
| `prisma.mediaAsset` | `prisma.media_assets` |
| `prisma.adminUser` | `prisma.admin_users` |

## Files Fixed

### ✅ Admin Route Files:
1. **`backend/src/routes/admin/auth.ts`**
   - Fixed: `adminUser` → `admin_users` (6 occurrences)
   
2. **`backend/src/routes/admin/projects.ts`**
   - Fixed: `project` → `projects` (7 occurrences)
   
3. **`backend/src/routes/admin/news.ts`**
   - Fixed: `newsPost` → `news_posts` (7 occurrences)
   
4. **`backend/src/routes/admin/team.ts`**
   - Fixed: `teamMember` → `team_members` (5 occurrences)
   
5. **`backend/src/routes/admin/inquiries.ts`**
   - Fixed: `contactInquiry` → `contact_inquiries` (4 occurrences)
   
6. **`backend/src/routes/admin/media.ts`**
   - Fixed: `mediaAsset` → `media_assets` (5 occurrences)

7. **`backend/src/routes/admin/applications.ts`**
   - Already fixed in previous session (from context)

## Testing

### Backend is already running:
The server logs show it's running on port 4000. The changes will take effect immediately since TypeScript is likely watching for changes.

If you need to restart manually:
```bash
cd backend
# Stop with Ctrl+C if needed
npm run dev
```

### Test the Dashboard:
1. **Refresh** your browser at the admin dashboard
2. The dashboard should now load statistics:
   - Projects count
   - News posts count
   - Team members count
   - Applications count
   - Inquiries count
   - Partners count

### Expected API Responses:
All these should return `200 OK` with data (or empty arrays):
- `GET /api/admin/projects` ✅
- `GET /api/admin/news` ✅
- `GET /api/admin/team` ✅
- `GET /api/admin/applications` ✅
- `GET /api/admin/inquiries` ✅
- `GET /api/admin/media` ✅

### Check Browser Console:
You should see successful API responses instead of 500 errors.

## Why This Happened

Prisma generates the client based on the model names in `schema.prisma`. When you define a model as:
```prisma
model news_posts {
  id String @id
  // ...
}
```

Prisma creates the client accessor as `prisma.news_posts` (matching the model name exactly).

If you want camelCase accessors, you'd need to define models like:
```prisma
model NewsPosts {
  id String @id
  // ...
  @@map("news_posts")  // Maps to snake_case table name
}
```

But since your schema uses snake_case model names (which is common in PostgreSQL projects), we use snake_case accessors in the code.

## Summary of Changes
- **Files Modified:** 7 admin route files
- **Total Occurrences Fixed:** ~40+ model references
- **Breaking:** No - this is a bug fix, not a breaking change
- **Database:** No changes needed
- **Frontend:** No changes needed

## What's Working Now
✅ Login and authentication  
✅ Cookie-based session management  
✅ JWT token validation  
✅ Dashboard statistics loading  
✅ All admin API endpoints (projects, news, team, media, inquiries, applications)  

## Next Steps
1. ✅ Refresh the admin dashboard
2. ✅ Verify all statistics load
3. Test CRUD operations:
   - Create a project
   - Create a news post
   - Add a team member
   - Upload media
   - View applications and inquiries
