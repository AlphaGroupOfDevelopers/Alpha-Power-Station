# Team Member Page Enhancements

## Overview
Enhanced the Add/Edit Team Member page in the admin dashboard with additional social media links and improved UI.

## New Features Added

### 1. Additional Social Media Fields
Added support for the following platforms:
- **Gmail** - Direct Gmail address
- **YouTube** - YouTube channel URL
- **TikTok** - TikTok profile URL  
- **Telegram** - Telegram username or profile URL

### 2. Enhanced Form UI
- Added platform-specific icons for each social media field
- Color-coded icons matching brand colors:
  - Gmail (red)
  - YouTube (red)
  - TikTok (black)
  - Telegram (blue)
  - GitHub (black)
  - LinkedIn (blue)
  - Twitter/X (black)
  - Instagram (pink gradient)
  - Facebook (blue)
  - WhatsApp (green)
  - Website (gray)

### 3. Image Upload (Already Existing)
The image upload functionality was already implemented with:
- Drag and drop support
- File type validation (images only)
- File size limit (5MB)
- Image preview
- Circular avatar display
- Upload to media library

## Database Changes

### Schema Updates
Added four new optional fields to `team_members` table:
```prisma
gmail     String?
youtube   String?
tiktok    String?
telegram  String?
```

### Migration
Created migration: `20260620181602_add_social_links`
- Adds gmail, youtube, tiktok, and telegram columns
- All fields are nullable (optional)

## Files Modified

### Backend
1. **`backend/prisma/schema.prisma`**
   - Added 4 new fields to `team_members` model

2. **`backend/prisma/migrations/20260620181602_add_social_links/migration.sql`**
   - SQL migration to add new columns

3. **`backend/prisma/migrations/migration_lock.toml`**
   - Updated provider from sqlite to postgresql

### Frontend (Admin Panel)
1. **`admin/app/dashboard/team/[id]/page.tsx`**
   - Added form fields for Gmail, YouTube, TikTok, and Telegram
   - Added platform-specific icons and colors
   - Enhanced form layout with better visual hierarchy
   - Added descriptive text for better UX
   - Updated TypeScript interface

2. **`admin/app/dashboard/team/page.tsx`**
   - Updated TeamMember interface to include new fields

## Backend API
The existing team routes already support dynamic fields, so no changes were needed:
- `POST /api/admin/team` - Create team member
- `PUT /api/admin/team/:id` - Update team member
- `GET /api/admin/team` - List team members
- `GET /api/admin/team/:id` - Get single team member
- `DELETE /api/admin/team/:id` - Delete team member

## Usage

### Adding a Team Member with Social Links

1. Navigate to **Dashboard → Team Members**
2. Click **"Add Member"** button
3. Fill in required fields:
   - Name
   - Role  
   - Division (AGD or AGEE)
4. Upload profile photo (optional but recommended):
   - Click the upload area or drag & drop
   - Select an image (PNG, JPG, GIF up to 5MB)
   - Square images work best (minimum 400x400px)
5. Add social media links (all optional):
   - Gmail: Enter email address
   - YouTube: Full channel URL
   - TikTok: Full profile URL
   - Telegram: Username (@username) or t.me link
   - GitHub, LinkedIn, Twitter, Instagram, Facebook: Full URLs
   - WhatsApp: Phone number with country code
   - Website: Personal website URL
6. Set display options:
   - Featured member checkbox
   - Display order (lower = appears first)
7. Click **"Add Member"** to save

### Editing Existing Members
1. Click the **Edit** icon next to any team member
2. Update fields as needed
3. Change or upload new profile photo if desired
4. Click **"Save Changes"**

## Deployment Notes

### Database Migration
When deploying to production (Render):
1. The migration will run automatically via Prisma
2. Existing team members will have NULL values for new fields
3. No data loss - all existing fields remain unchanged

### Rollback Plan
If needed, rollback migration:
```sql
ALTER TABLE "team_members" DROP COLUMN "gmail";
ALTER TABLE "team_members" DROP COLUMN "youtube";
ALTER TABLE "team_members" DROP COLUMN "tiktok";
ALTER TABLE "team_members" DROP COLUMN "telegram";
```

## Testing Checklist

- [x] Database schema updated
- [x] Migration created
- [x] Frontend form updated
- [x] TypeScript interfaces updated
- [x] Icons added for all platforms
- [ ] Test creating new team member
- [ ] Test editing existing team member
- [ ] Test image upload
- [ ] Test with all social links filled
- [ ] Test with some social links empty
- [ ] Test validation (email format, URL format)
- [ ] Test on mobile/tablet responsiveness

## Future Enhancements

Potential improvements for future iterations:
1. Link validation (ensure URLs are properly formatted)
2. Social media profile preview/verification
3. Bulk import team members from CSV
4. Team member search and filtering by division
5. Public team member profile pages
6. QR code generation for contact cards
7. Integration with social media APIs to auto-verify profiles
8. Support for more platforms (Discord, Twitch, Reddit, etc.)

## Support

For issues or questions:
- Check browser console for errors
- Verify backend is running and accessible
- Ensure database migration completed successfully
- Check network tab for API errors
