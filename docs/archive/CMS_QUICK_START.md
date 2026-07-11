# 🚀 CMS Quick Start Guide

## ✅ What We've Built

A complete Content Management System with:
- ✅ User authentication (JWT + bcrypt)
- ✅ Role-based access control (Admin, Editor, Viewer)
- ✅ Media upload with image compression
- ✅ Project management
- ✅ News/blog management
- ✅ Team member management
- ✅ Application review system
- ✅ Contact inquiry management
- ✅ Rate limiting & security

---

## 🎯 Getting Started (3 Steps)

### Step 1: Create Your First Admin User

```bash
cd backend
npm run create-admin
```

**You'll be prompted for:**
- Email (e.g., `admin@alphapowerstation.org`)
- Name (e.g., `Admin User`)
- Password (minimum 8 characters)
- Confirm Password

**Example:**
```
🔐 Create Admin User
===================================

Email: admin@alphapowerstation.org
Name: John Doe
Password (min 8 characters): ********
Confirm Password: ********

✅ Admin user created successfully!
```

### Step 2: Start the Backend Server

```bash
npm run dev
```

**You should see:**
```
🚀 Alpha Power Station API running on port 4000
📍 Environment: development
🔐 CMS Admin: http://localhost:4000/api/admin
```

### Step 3: Test the CMS API

**Test login (PowerShell):**
```powershell
$body = @{
    email = "admin@alphapowerstation.org"
    password = "yourpassword"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:4000/api/admin/auth/login" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body

$response
```

**You'll get a token:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "admin@alphapowerstation.org",
    "name": "John Doe",
    "role": "admin"
  }
}
```

**Save the token:**
```powershell
$token = $response.token
```

---

## 📋 CMS API Endpoints

### Authentication
```
POST   /api/admin/auth/login              - Login
POST   /api/admin/auth/logout             - Logout
GET    /api/admin/auth/me                 - Get current user
POST   /api/admin/auth/register           - Create new user (admin only)
POST   /api/admin/auth/change-password    - Change password
```

### Projects
```
GET    /api/admin/projects                - List projects
GET    /api/admin/projects/:id            - Get project
POST   /api/admin/projects                - Create project
PUT    /api/admin/projects/:id            - Update project
DELETE /api/admin/projects/:id            - Delete project
PATCH  /api/admin/projects/:id/publish    - Publish/unpublish
```

### News/Blog
```
GET    /api/admin/news                    - List news posts
GET    /api/admin/news/:id                - Get news post
POST   /api/admin/news                    - Create news post
PUT    /api/admin/news/:id                - Update news post
DELETE /api/admin/news/:id                - Delete news post
PATCH  /api/admin/news/:id/publish        - Publish/unpublish
```

### Team Members
```
GET    /api/admin/team                    - List team members
GET    /api/admin/team/:id                - Get team member
POST   /api/admin/team                    - Create team member
PUT    /api/admin/team/:id                - Update team member
DELETE /api/admin/team/:id                - Delete team member
```

### Media Library
```
GET    /api/admin/media                   - List media files
POST   /api/admin/media/upload            - Upload single file
POST   /api/admin/media/upload-multiple   - Upload multiple files
DELETE /api/admin/media/:id               - Delete media file
```

### Applications & Inquiries
```
GET    /api/admin/applications            - List student applications
GET    /api/admin/applications/:id        - Get application
PATCH  /api/admin/applications/:id/status - Update application status
DELETE /api/admin/applications/:id        - Delete application

GET    /api/admin/applications/contact/inquiries    - List contact inquiries
PATCH  /api/admin/applications/contact/:id/status   - Update inquiry status
```

---

## 🧪 Testing Examples

### 1. Create a Project

```powershell
$projectData = @{
    slug = "smart-irrigation-system"
    title = "Smart Irrigation System"
    description = "IoT-based irrigation control system for agricultural efficiency"
    category = "infrastructure"
    division = "integrated"
    imageUrl = "/uploads/irrigation.jpg"
    technicalDetails = "ESP32 microcontroller with soil moisture sensors"
    methodology = "## Phase 1: Research\n## Phase 2: Design\n## Phase 3: Implementation"
    results = "30% water savings, 50% labor reduction"
    challenges = "Remote connectivity in rural areas"
    status = "active"
    featured = $true
} | ConvertTo-Json

$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}

$project = Invoke-RestMethod -Uri "http://localhost:4000/api/admin/projects" `
    -Method POST `
    -Headers $headers `
    -Body $projectData

$project
```

### 2. Upload an Image

```powershell
$imagePath = "C:\path\to\image.jpg"

$headers = @{
    "Authorization" = "Bearer $token"
}

$form = @{
    file = Get-Item -Path $imagePath
    folder = "projects"
}

$upload = Invoke-RestMethod -Uri "http://localhost:4000/api/admin/media/upload" `
    -Method POST `
    -Headers $headers `
    -Form $form

$upload
```

### 3. Create a News Post

```powershell
$newsData = @{
    slug = "agd-hackathon-win"
    title = "AGD Team Wins National Hackathon 2026"
    excerpt = "Our developers secured first place at Ghana's premier tech competition"
    content = "# Victory at TechFest 2026\n\nThe Alpha Group of Developers team..."
    coverImage = "/uploads/hackathon.jpg"
    category = "news"
    author = "John Doe"
    tags = @("hackathon", "AGD", "achievement")
    featured = $true
} | ConvertTo-Json

$news = Invoke-RestMethod -Uri "http://localhost:4000/api/admin/news" `
    -Method POST `
    -Headers $headers `
    -Body $newsData

$news
```

### 4. Add a Team Member

```powershell
$teamData = @{
    name = "Jane Smith"
    role = "Lead Hardware Engineer"
    division = "AGEE"
    bio = "Jane specializes in power electronics and renewable energy systems..."
    imageUrl = "/uploads/jane.jpg"
    email = "jane@alphapowerstation.org"
    linkedin = "https://linkedin.com/in/janesmith"
    github = "https://github.com/janesmith"
    order = 1
    featured = $true
} | ConvertTo-Json

$member = Invoke-RestMethod -Uri "http://localhost:4000/api/admin/team" `
    -Method POST `
    -Headers $headers `
    -Body $teamData

$member
```

### 5. Review a Student Application

```powershell
# Get all pending applications
$applications = Invoke-RestMethod -Uri "http://localhost:4000/api/admin/applications?status=pending" `
    -Method GET `
    -Headers $headers

# Update application status
$statusUpdate = @{
    status = "reviewed"
    reviewNotes = "Strong candidate with excellent portfolio. Schedule interview."
} | ConvertTo-Json

$updated = Invoke-RestMethod -Uri "http://localhost:4000/api/admin/applications/$($applications.applications[0].id)/status" `
    -Method PATCH `
    -Headers $headers `
    -Body $statusUpdate

$updated
```

---

## 🔐 Security Features

### Rate Limiting
- **General API**: 100 requests per 15 minutes
- **Login endpoint**: 5 attempts per 15 minutes
- Prevents brute force attacks

### Password Security
- Minimum 8 characters
- Bcrypt hashing with 10 rounds
- Never exposed in responses

### Token Security
- JWT tokens with 7-day expiry
- HttpOnly cookies (XSS protection)
- Secure flag in production

### Input Validation
- All inputs validated with express-validator
- SQL injection prevention via Prisma
- File upload restrictions (type & size)

---

## 📁 File Structure

```
backend/
├── src/
│   ├── middleware/
│   │   ├── auth.ts              # JWT authentication
│   │   └── upload.ts            # File upload config
│   ├── routes/
│   │   ├── admin/
│   │   │   ├── auth.ts          # Admin authentication
│   │   │   ├── projects.ts      # Project management
│   │   │   ├── news.ts          # News management
│   │   │   ├── team.ts          # Team management
│   │   │   ├── media.ts         # Media library
│   │   │   └── applications.ts  # Application review
│   │   ├── projects.ts          # Public project API
│   │   ├── students.ts          # Public student API
│   │   └── contact.ts           # Public contact API
│   ├── scripts/
│   │   └── create-admin.ts      # Admin creation script
│   └── index.ts                 # Main server file
├── prisma/
│   ├── schema.prisma            # Database schema
│   └── migrations/              # Database migrations
└── uploads/                     # Uploaded files
```

---

## 🎯 Next Steps

### Immediate
1. ✅ Create admin user
2. ✅ Test login
3. ✅ Upload some test images
4. ✅ Create sample projects

### Short-term
- Build admin dashboard frontend (React/Next.js)
- Add rich text editor for content
- Implement email notifications
- Add more media management features

### Long-term
- Content scheduling
- Audit logs
- Advanced analytics
- Multi-language support
- Workflow approvals

---

## 🐛 Troubleshooting

### "Authentication required" error
```powershell
# Check if token is valid
$headers = @{
    "Authorization" = "Bearer $token"
}

$me = Invoke-RestMethod -Uri "http://localhost:4000/api/admin/auth/me" `
    -Method GET `
    -Headers $headers

$me
```

### "Too many requests" error
- Wait 15 minutes for rate limit to reset
- Or restart the server (dev only)

### File upload fails
- Check file size (<10MB)
- Verify file type (images/documents only)
- Ensure uploads/ directory exists

### Cannot create admin user
- Check database connection
- Verify migrations ran successfully
- Try with different email

---

## 📊 Database Tables

**New CMS Tables:**
- `admin_users` - CMS user accounts
- `news_posts` - Blog/news articles  
- `media_assets` - Uploaded files
- `partners` - Partner organizations
- `site_content` - Dynamic site content
- `testimonials` - Student testimonials

**Enhanced Tables:**
- `projects` - Added slug, methodology, results, gallery, featured, publishedAt
- `team_members` - Added email, linkedin, github, order, featured
- `student_applications` - Added more fields, reviewNotes, reviewedAt
- `contact_inquiries` - Added response, respondedAt

---

## 🎉 You're Ready!

Your CMS is fully functional and ready to use. Start by:

1. Creating your admin account: `npm run create-admin`
2. Starting the server: `npm run dev`
3. Testing the endpoints with the examples above

For detailed API documentation, see **CMS_DOCUMENTATION.md**

**Happy content managing! 🚀**
