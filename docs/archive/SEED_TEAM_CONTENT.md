# Team Content Seeding Guide

## Overview
This guide explains how to populate the admin system with all the team page content so it can be managed through the CMS.

## What Gets Seeded

The seed script adds **93 content items** to the `site_content` table, organized into these sections:

### Team Hero
- Page title and subtitle

### Executive Leadership (5 leaders)
- Chief Engineer
- Power Systems Lead
- Embedded Systems Lead
- R&D Lead
- Operations Lead

Each leader includes:
- Title
- Role description
- Full bio

### Team Structure - AGD (4 teams)
- Embedded Systems Team
- IoT & Connectivity Team
- Web & Mobile Team
- Protocol Implementation Team

### Team Structure - AGEE (4 teams)
- Power Electronics Team
- PCB Design Team
- Renewable Energy Team
- Testing & Certification Team

### Student Spotlights (3 students)
- Kofi Mensah (Software Engineering Intern)
- Amina Nkrumah (Hardware Engineering Intern)
- Emmanuel Osei (Full-Stack Engineering Intern)

Each student includes:
- Name, role, division
- Description
- Learning focus areas

### Call-to-Action
- CTA title and description

---

## How to Run the Seed Script

### Option 1: Run Locally (Recommended for Testing)

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Run the seed script:**
   ```bash
   npm run seed:team
   ```

3. **Expected output:**
   ```
   🌱 Seeding team page content...
   
   📝 Creating 93 content items...
   
   ✅ Created "team_hero_title"
   ✅ Created "team_hero_subtitle"
   ✅ Created "team_leadership_title"
   ...
   
   ✨ Seeding complete!
      Created: 93
      Skipped: 0
      Total: 93
   ```

### Option 2: Run on Render (Production)

1. **Go to Render Dashboard**
2. **Find your backend service**
3. **Go to "Shell" tab**
4. **Run:**
   ```bash
   npm run seed:team
   ```

---

## Verifying the Content

### Via Admin Panel
1. Log into admin panel: https://alpha-power-admin.vercel.app
2. Go to **"Site Content"** in navigation
3. You should see all team content organized by sections:
   - `team_hero`
   - `team_leadership`
   - `team_structure`
   - `team_structure_agd`
   - `team_structure_agee`
   - `team_students`
   - `team_cta`

### Via API
```bash
# Get all team content
curl https://alpha-power-station-api.onrender.com/api/site-content?section=team_hero

# Get specific content
curl https://alpha-power-station-api.onrender.com/api/site-content/key/team_hero_title
```

---

## Managing Content After Seeding

Once seeded, you can:

1. **Edit any content** through the admin panel
2. **Add new content items** for additional team members
3. **Delete content** if no longer needed
4. **Change sections** to reorganize content

### Example: Adding a New Team Member

1. Go to **"Team"** section in admin
2. Click **"Add Member"**
3. Fill in details (or use Site Content for leadership roles)

### Example: Editing Leadership Bio

1. Go to **"Site Content"**
2. Find section: `team_leadership`
3. Click edit on `leader_1_description`
4. Update the text
5. Save

---

## Content Key Reference

### Leadership Keys Pattern
```
leader_[1-5]_title       - e.g., "Chief Engineer"
leader_[1-5]_role        - e.g., "President & Chief Engineer"
leader_[1-5]_description - Full bio text
```

### Team Keys Pattern
```
agd_team_[1-4]_name        - Team name
agd_team_[1-4]_description - Team description

agee_team_[1-4]_name        - Team name
agee_team_[1-4]_description - Team description
```

### Student Keys Pattern
```
student_[1-3]_name        - Student name
student_[1-3]_role        - Student role
student_[1-3]_division    - AGD/AGEE
student_[1-3]_description - What they're working on
student_[1-3]_learning    - Learning focus
```

---

## Troubleshooting

### "Already Exists" Messages
If you see skipped messages, it means content was already seeded. This is safe and expected on subsequent runs.

### Database Connection Errors
Make sure your `DATABASE_URL` is set correctly in `.env`:
```env
DATABASE_URL="postgresql://..."
```

### Permission Errors
The script creates content in the `site_content` table. Make sure your database user has INSERT permissions.

---

## Next Steps After Seeding

1. **Verify** content appears in admin panel
2. **Update frontend** team page to fetch from API instead of hardcoded values
3. **Test** that changes in admin panel reflect on website
4. **Train admins** on managing team content

---

## Script Safety

✅ **Safe to run multiple times** - Skips existing content  
✅ **No data deletion** - Only creates, never deletes  
✅ **Transaction safe** - Each insert is independent  
✅ **Rollback friendly** - Can delete by section if needed  

To remove all seeded content:
```sql
DELETE FROM site_content WHERE section LIKE 'team_%';
```

---

## File Locations

- **Seed Script:** `backend/src/scripts/seed-team-content.ts`
- **npm Command:** `npm run seed:team`
- **This Guide:** `SEED_TEAM_CONTENT.md`
