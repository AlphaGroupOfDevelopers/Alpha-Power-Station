# Alpha Power Station CMS Documentation

## 🎯 Overview

A comprehensive Content Management System (CMS) built for Alpha Power Station that allows team members to manage content without developer intervention.

### Features
- ✅ **User Authentication** - JWT-based secure authentication
- ✅ **Role-Based Access Control** - Admin, Editor, and Viewer roles
- ✅ **Content Management** - Projects, News, Team Members, Partners
- ✅ **Media Library** - Upload and manage images and documents
- ✅ **Application Management** - Review student applications
- ✅ **Inquiry Management** - Handle contact form submissions
- ✅ **Rate Limiting** - Protection against abuse
- ✅ **File Upload** - Image compression and thumbnail generation
- ✅ **Security** - Helmet, CORS, input validation

---

## 🚀 Setup Instructions

### 1. Run Database Migration

The new CMS requires additional database tables. Run:

```bash
cd backend
npx prisma migrate dev --name add_cms_features
```

This creates tables for:
- `admin_users` - CMS user accounts
- `news_posts` - Blog/news articles
- `partners` - Partner organizations
- `media_assets` - Uploaded files

### 2. Create First Admin User

Run the admin creation script:

```bash
npm run create-admin
```

Enter your details when prompted:
- Email
- Name  
- Password (minimum 8 characters)

### 3. Start the Backend Server

```bash
npm run dev
```

Server will start on `http://localhost:4000`

---

## 🔐 Authentication

### Login

**Endpoint:** `POST /api/admin/auth/login`

**Request:**
```json
{
  "email": "admin@alphapowerstation.org",
  "password": "yourpassword"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "admin@alphapowerstation.org",
    "name": "Admin User",
    "role": "admin"
  }
}
```

**Cookie:** Sets `token` cookie (httpOnly, 7-day expiry)

### Using the Token

Include the token in requests via:
1. **Cookie** (automatic after login)
2. **Authorization header:** `Authorization: Bearer <token>`

---

## 👥 User Roles

### Admin
- Full access to all features
- Can create/edit/delete all content
- Can manage other users
- Can delete resources

### Editor
- Can create and edit content
- Can manage media
- Can update application/inquiry statuses
- Cannot delete resources
- Cannot manage users

### Viewer
- Read-only access
- Can view all content
- Cannot modify anything

---

## 📝 Content Management Endpoints

### Projects

| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| GET | `/api/admin/projects` | All | Get all projects |
| GET | `/api/admin/projects/:id` | All | Get single project |
| POST | `/api/admin/projects` | Admin/Editor | Create project |
| PUT | `/api/admin/projects/:id` | Admin/Editor | Update project |
| DELETE | `/api/admin/projects/:id` | Admin | Delete project |
| PATCH | `/api/admin/projects/:id/publish` | Admin/Editor | Publish/unpublish |

**Create Project Example:**
```json
{
  "slug": "solar-monitoring-system",
  "title": "Solar Power Monitoring System",
  "description": "Real-time monitoring of solar installations",
  "category": "infrastructure",
  "division": "integrated",
  "imageUrl": "/uploads/solar-image.jpg",
  "technicalDetails": "Built with IoT sensors...",
  "methodology": "## Design Phase\n...",
  "results": "Reduced downtime by 40%",
  "challenges": "Integration with legacy systems",
  "gallery": [
    "/uploads/solar-1.jpg",
    "/uploads/solar-2.jpg"
  ],
  "status": "active",
  "featured": true
}
```

### News Posts

| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| GET | `/api/admin/news` | All | Get all news posts |
| GET | `/api/admin/news/:id` | All | Get single post |
| POST | `/api/admin/news` | Admin/Editor | Create post |
| PUT | `/api/admin/news/:id` | Admin/Editor | Update post |
| DELETE | `/api/admin/news/:id` | Admin | Delete post |
| PATCH | `/api/admin/news/:id/publish` | Admin/Editor | Publish/unpublish |

**Create News Post Example:**
```json
{
  "slug": "agd-wins-hackathon",
  "title": "AGD Team Wins National Hackathon",
  "excerpt": "Our developers took first place...",
  "content": "# Victory at TechFest 2026\n\nFull story...",
  "coverImage": "/uploads/hackathon.jpg",
  "category": "news",
  "author": "John Doe",
  "tags": ["hackathon", "AGD", "achievement"],
  "featured": true
}
```

### Team Members

| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| GET | `/api/admin/team` | All | Get all team members |
| GET | `/api/admin/team/:id` | All | Get single member |
| POST | `/api/admin/team` | Admin/Editor | Create member |
| PUT | `/api/admin/team/:id` | Admin/Editor | Update member |
| DELETE | `/api/admin/team/:id` | Admin | Delete member |

**Create Team Member Example:**
```json
{
  "name": "Jane Smith",
  "role": "Lead Hardware Engineer",
  "division": "AGEE",
  "bio": "Jane specializes in power electronics...",
  "imageUrl": "/uploads/jane-smith.jpg",
  "email": "jane@alphapowerstation.org",
  "linkedin": "https://linkedin.com/in/janesmith",
  "github": "https://github.com/janesmith",
  "order": 1,
  "featured": true
}
```

### Media Library

| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| GET | `/api/admin/media` | All | Get all media assets |
| POST | `/api/admin/media/upload` | Admin/Editor | Upload single file |
| POST | `/api/admin/media/upload-multiple` | Admin/Editor | Upload multiple files |
| DELETE | `/api/admin/media/:id` | Admin/Editor | Delete asset |

**Upload File:**
```bash
curl -X POST http://localhost:4000/api/admin/media/upload \
  -H "Authorization: Bearer <token>" \
  -F "file=@image.jpg" \
  -F "folder=projects"
```

**Response:**
```json
{
  "message": "File uploaded successfully",
  "asset": {
    "id": "uuid",
    "filename": "image-12345.jpg",
    "originalName": "image.jpg",
    "mimeType": "image/jpeg",
    "size": 245678,
    "url": "/uploads/image-12345.jpg",
    "thumbnail": "/uploads/thumb-image-12345.jpg",
    "folder": "projects",
    "uploadedBy": "admin@alphapowerstation.org",
    "createdAt": "2026-06-17T..."
  }
}
```

**Supported File Types:**
- Images: JPEG, PNG, GIF, WebP
- Documents: PDF, DOC, DOCX

**Limits:**
- Max file size: 10 MB
- Max files per upload: 10 (for multiple upload)

---

## 📋 Application Management

| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| GET | `/api/admin/applications` | All | Get all applications |
| GET | `/api/admin/applications/:id` | All | Get single application |
| PATCH | `/api/admin/applications/:id/status` | Admin/Editor | Update status |
| DELETE | `/api/admin/applications/:id` | Admin | Delete application |

**Update Application Status:**
```json
{
  "status": "reviewed",
  "reviewNotes": "Strong candidate, invite for interview"
}
```

**Status Options:**
- `pending` - New application
- `reviewed` - Application reviewed
- `accepted` - Offer extended
- `rejected` - Application declined

### Contact Inquiries

| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| GET | `/api/admin/applications/contact/inquiries` | All | Get all inquiries |
| PATCH | `/api/admin/applications/contact/:id/status` | Admin/Editor | Update status |

**Update Inquiry Status:**
```json
{
  "status": "responded",
  "response": "Thank you for your inquiry. We have..."
}
```

---

## 🔒 Security Features

### Rate Limiting
- **General API**: 100 requests per 15 minutes per IP
- **Login endpoint**: 5 attempts per 15 minutes per IP
- **Response**: `429 Too Many Requests` when limit exceeded

### Input Validation
- All endpoints use `express-validator`
- Required fields validated
- Email format validation
- Enum validation for categories/statuses

### Password Security
- Minimum 8 characters
- Hashed with bcrypt (10 rounds)
- Never returned in API responses

### HTTP Security
- Helmet.js for security headers
- CORS configured for frontend origin
- HttpOnly cookies for tokens
- Secure cookies in production

---

## 🎨 Image Processing

### Automatic Thumbnails
- Generated for all uploaded images
- Resized to 300x300px (cover fit)
- Saved with `thumb-` prefix
- Uses Sharp library for optimization

### Optimization
- Images compressed during upload
- WebP format supported for better compression
- Original files preserved

---

## 📊 Database Schema

### admin_users
```prisma
model AdminUser {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String   // bcrypt hashed
  name      String
  role      String   @default("editor") // admin, editor, viewer
  isActive  Boolean  @default(true)
  lastLogin DateTime?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### projects (enhanced)
- Added: `slug`, `methodology`, `results`, `challenges`, `gallery`, `featured`, `publishedAt`
- Changed: `technicalDetails` to TEXT type

### news_posts
```prisma
model NewsPost {
  id          String   @id @default(uuid())
  slug        String   @unique
  title       String
  excerpt     String
  content     String   @db.Text
  coverImage  String?
  category    String   // news, insight, event
  author      String
  tags        String[]
  featured    Boolean  @default(false)
  publishedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### media_assets
```prisma
model MediaAsset {
  id          String   @id @default(uuid())
  filename    String
  originalName String
  mimeType    String
  size        Int      // bytes
  url         String
  thumbnail   String?
  folder      String?  @default("general")
  uploadedBy  String?
  createdAt   DateTime @default(now())
}
```

---

## 🛠️ Development Workflow

### 1. Create Content
```bash
# Login to get token
curl -X POST http://localhost:4000/api/admin/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password"}'

# Use token for authenticated requests
```

### 2. Upload Media
```bash
# Upload image
curl -X POST http://localhost:4000/api/admin/media/upload \
  -H "Authorization: Bearer <token>" \
  -F "file=@hero.jpg" \
  -F "folder=projects"
```

### 3. Create Content with Media
```bash
# Create project with uploaded image
curl -X POST http://localhost:4000/api/admin/projects \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "my-project",
    "title": "My Project",
    "description": "...",
    "imageUrl": "/uploads/hero-12345.jpg",
    ...
  }'
```

### 4. Publish Content
```bash
# Publish project
curl -X PATCH http://localhost:4000/api/admin/projects/<id>/publish \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"publish": true}'
```

---

## 📱 Frontend Integration

### Login Component Example
```typescript
const login = async (email: string, password: string) => {
  const response = await fetch('http://localhost:4000/api/admin/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // Important for cookies
    body: JSON.stringify({ email, password })
  });
  
  const data = await response.json();
  localStorage.setItem('token', data.token);
  return data.user;
};
```

### Authenticated Request Example
```typescript
const createProject = async (projectData) => {
  const token = localStorage.getItem('token');
  
  const response = await fetch('http://localhost:4000/api/admin/projects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(projectData)
  });
  
  return response.json();
};
```

### File Upload Example
```typescript
const uploadFile = async (file: File, folder: string) => {
  const token = localStorage.getItem('token');
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);
  
  const response = await fetch('http://localhost:4000/api/admin/media/upload', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });
  
  return response.json();
};
```

---

## 🚨 Error Handling

### Common Error Responses

**401 Unauthorized:**
```json
{
  "error": "Authentication required"
}
```

**403 Forbidden:**
```json
{
  "error": "Insufficient permissions"
}
```

**404 Not Found:**
```json
{
  "error": "Resource not found"
}
```

**409 Conflict:**
```json
{
  "error": "Resource with this identifier already exists"
}
```

**429 Too Many Requests:**
```json
{
  "error": "Too many requests, please try again later"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Internal server error"
}
```

---

## ✅ Testing the CMS

### Quick Test Script
```bash
# 1. Create admin user
npm run create-admin

# 2. Start server
npm run dev

# 3. Test login
curl -X POST http://localhost:4000/api/admin/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"your@email.com","password":"yourpassword"}'

# 4. Test authenticated endpoint
curl http://localhost:4000/api/admin/projects \
  -H "Authorization: Bearer <token>"
```

---

## 🎯 Next Steps

### Phase 1: Build Admin Dashboard Frontend
- Create admin login page
- Build content management interface
- Implement file upload UI
- Add rich text editor for content

### Phase 2: Enhanced Features
- Email notifications
- Audit logs
- Bulk operations
- Content versioning
- Draft/publish workflow

### Phase 3: Advanced CMS
- Content scheduling
- SEO optimization fields
- Analytics integration
- Multi-language support
- Content templates

---

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [JWT Documentation](https://jwt.io/)
- [Multer Documentation](https://github.com/expressjs/multer)
- [Sharp Documentation](https://sharp.pixelplumbing.com/)

---

## 🔧 Troubleshooting

### "Authentication required" error
- Check if token is included in request
- Verify token hasn't expired (7-day expiry)
- Try logging in again

### File upload fails
- Check file size (<10MB)
- Verify file type is allowed
- Ensure `uploads/` directory exists

### Cannot create admin user
- Check database connection
- Verify Prisma migrations ran successfully
- Ensure email doesn't already exist

### CORS errors
- Verify `ALLOWED_ORIGINS` in `.env`
- Check frontend is making requests with `credentials: 'include'`
- Ensure backend CORS is configured correctly

---

**🎉 Your CMS is ready! Start managing content without touching code.**
