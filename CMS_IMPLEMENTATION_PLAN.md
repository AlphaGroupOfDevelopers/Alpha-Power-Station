# Alpha Power Station CMS Implementation Plan

## 🎯 Strategy: Integrated Admin Dashboard

Instead of a separate CMS like Strapi, we'll build an **admin dashboard** within the Next.js app that provides content management capabilities. This approach is:

- ✅ Simpler to maintain (one codebase)
- ✅ Uses existing backend APIs
- ✅ Integrated authentication
- ✅ Easier deployment
- ✅ No additional server costs

---

## 📋 CMS Features to Implement

### Phase 1: Admin Dashboard Foundation
1. **Admin Login System**
   - Create `/admin` route with authentication
   - JWT-based auth with refresh tokens
   - Protected admin routes middleware

2. **Dashboard Layout**
   - Sidebar navigation
   - Overview/stats page
   - Responsive admin UI

### Phase 2: Content Management Modules

#### A. Projects Management
**Route:** `/admin/projects`
**Features:**
- View all projects (table/grid)
- Create new project
- Edit existing project
- Delete project
- Upload project images
- Set project status (active, completed, planning)
- Assign to division (AGD, AGEE, Integrated)
- Set category (foundational, commercial, infrastructure)

#### B. Team Members Management
**Route:** `/admin/team`
**Features:**
- View all team members
- Add new member
- Edit member details
- Delete member
- Upload member photos
- Assign to division (AGD, AGEE)

#### C. News & Blog Management
**Route:** `/admin/news`
**Features:**
- View all blog posts/news
- Create new article
- Rich text editor for content
- Image uploads
- Publish/draft status
- Schedule publishing
- Categories/tags

#### D. Student Applications Review
**Route:** `/admin/applications`
**Features:**
- View all applications
- Filter by status (pending, reviewed, accepted, rejected)
- Filter by division (AGD, AGEE)
- Update application status
- View full application details
- Send email responses
- Export to CSV

#### E. Contact Inquiries Management
**Route:** `/admin/inquiries`
**Features:**
- View all inquiries
- Filter by type (general, media, business, student)
- Filter by status (new, responded, closed)
- Mark as responded/closed
- Send email responses
- Export to CSV

#### F. Site Content Management
**Route:** `/admin/content`
**Features:**
- Edit homepage hero text
- Edit about page content
- Edit FAQ content
- Manage testimonials
- Update partnership information

---

## 🛠️ Technology Stack for Admin Panel

### Frontend (Admin UI)
- **Next.js App Router** - `/admin/*` routes
- **React Hook Form** - Form management
- **TanStack Table (React Table)** - Data tables
- **React Query** - Data fetching & caching
- **Shadcn/ui** or **Tailwind UI** - Pre-built components
- **React Quill** or **TipTap** - Rich text editor
- **React Dropzone** - File uploads

### Backend (API Extensions)
- **Express middleware** - Admin auth middleware
- **jsonwebtoken** - JWT authentication
- **bcrypt** - Password hashing
- **multer** - File uploads
- **sharp** - Image processing
- **nodemailer** - Email notifications

### Database
- Existing Prisma schema + new tables:
  - `admin_users` - Admin accounts
  - `blog_posts` - News articles
  - `site_content` - Editable site content
  - `testimonials` - Student testimonials

---

## 📁 Folder Structure

```
frontend/src/app/admin/
├── layout.tsx                    # Admin layout with sidebar
├── page.tsx                      # Dashboard overview
├── login/
│   └── page.tsx                  # Admin login
├── projects/
│   ├── page.tsx                  # Projects list
│   ├── create/
│   │   └── page.tsx              # Create project
│   └── [id]/
│       └── edit/
│           └── page.tsx          # Edit project
├── team/
│   ├── page.tsx                  # Team members list
│   └── [id]/
│       └── edit/
│           └── page.tsx          # Edit member
├── news/
│   ├── page.tsx                  # News list
│   ├── create/
│   │   └── page.tsx              # Create article
│   └── [id]/
│       └── edit/
│           └── page.tsx          # Edit article
├── applications/
│   ├── page.tsx                  # Applications list
│   └── [id]/
│       └── page.tsx              # Application detail
├── inquiries/
│   └── page.tsx                  # Inquiries list
└── content/
    └── page.tsx                  # Site content editor
```

```
frontend/src/components/admin/
├── AdminSidebar.tsx              # Navigation sidebar
├── AdminHeader.tsx               # Top bar with user menu
├── DataTable.tsx                 # Reusable data table
├── RichTextEditor.tsx            # Rich text editor
├── ImageUploader.tsx             # Image upload component
├── StatusBadge.tsx               # Status indicators
└── ProtectedRoute.tsx            # Auth guard HOC
```

```
backend/src/routes/admin/
├── auth.ts                       # Admin authentication
├── projects.ts                   # Projects CRUD (admin)
├── team.ts                       # Team CRUD (admin)
├── news.ts                       # News CRUD (admin)
├── applications.ts               # Applications management
├── inquiries.ts                  # Inquiries management
├── content.ts                    # Site content management
└── uploads.ts                    # File upload handler
```

---

## 🔐 Authentication Flow

### Admin User Creation
1. Create initial admin via seed script or CLI
2. Admin can invite other admins via dashboard

### Login Process
```
1. User visits /admin/login
2. Enters email + password
3. Backend validates credentials
4. Returns JWT access token + refresh token
5. Frontend stores tokens in httpOnly cookies
6. Redirects to /admin dashboard
```

### Protected Routes
```typescript
// Middleware checks:
- Valid JWT token
- Token not expired
- User has admin role
- If fails → redirect to /admin/login
```

---

## 📊 Database Schema Extensions

### Add to `backend/prisma/schema.prisma`

```prisma
model AdminUser {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String   // Hashed with bcrypt
  name      String
  role      String   @default("admin") // admin, super_admin
  isActive  Boolean  @default(true)
  lastLogin DateTime?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("admin_users")
}

model BlogPost {
  id          String   @id @default(uuid())
  title       String
  slug        String   @unique
  excerpt     String?
  content     String   // Rich text HTML
  imageUrl    String?
  category    String?  // news, insight, announcement
  tags        String[] // Array of tags
  authorId    String
  status      String   @default("draft") // draft, published
  publishedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("blog_posts")
}

model SiteContent {
  id        String   @id @default(uuid())
  key       String   @unique // e.g., "homepage_hero_title"
  value     String   // Content value
  type      String   @default("text") // text, html, json
  section   String   // homepage, about, faq
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("site_content")
}

model Testimonial {
  id        String   @id @default(uuid())
  name      String
  role      String
  division  String   // AGD, AGEE
  content   String
  imageUrl  String?
  isActive  Boolean  @default(true)
  order     Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("testimonials")
}
```

---

## 🚀 Implementation Phases

### Phase 1: Foundation (Day 1-2)
- [ ] Extend Prisma schema with admin tables
- [ ] Run migration
- [ ] Create admin authentication endpoints
- [ ] Build admin login page
- [ ] Create admin layout with sidebar
- [ ] Implement protected route middleware

### Phase 2: Core Modules (Day 3-5)
- [ ] Projects management (CRUD)
- [ ] Team members management (CRUD)
- [ ] File upload system
- [ ] Image processing/optimization

### Phase 3: Content Management (Day 6-7)
- [ ] Blog/News management
- [ ] Rich text editor integration
- [ ] Site content editor
- [ ] Testimonials management

### Phase 4: Operations (Day 8-9)
- [ ] Student applications review
- [ ] Contact inquiries management
- [ ] Email notification system
- [ ] Export to CSV functionality

### Phase 5: Polish (Day 10)
- [ ] Dashboard analytics/stats
- [ ] Search functionality
- [ ] Bulk actions
- [ ] Activity logs

---

## 🎨 UI Design

### Admin Theme
- Dark sidebar with logo
- Light content area
- Blue primary color (matching brand)
- Tailwind CSS for consistency
- Responsive design

### Key Components
1. **Data Tables** - Sortable, filterable, paginated
2. **Forms** - Validation, error handling
3. **File Uploads** - Drag & drop with preview
4. **Rich Text Editor** - Toolbar with formatting options
5. **Status Badges** - Visual status indicators
6. **Action Buttons** - Edit, Delete, View with icons

---

## 🔒 Security Considerations

1. **Authentication**
   - Strong password requirements
   - Rate limiting on login attempts
   - Session timeout after inactivity
   - 2FA (optional for super admins)

2. **Authorization**
   - Role-based access control (RBAC)
   - Protect all admin API routes
   - Input validation & sanitization
   - CSRF protection

3. **File Uploads**
   - Validate file types
   - Limit file sizes
   - Scan for malware
   - Store in secure location (S3 or Cloudinary)

4. **Audit Trail**
   - Log all admin actions
   - Track content changes
   - Monitor suspicious activity

---

## 📦 Required Dependencies

### Frontend
```bash
npm install --save \
  @tanstack/react-query \
  @tanstack/react-table \
  react-hook-form \
  @hookform/resolvers \
  zod \
  react-dropzone \
  react-quill \
  date-fns \
  recharts
```

### Backend
```bash
npm install --save \
  jsonwebtoken \
  bcryptjs \
  multer \
  sharp \
  nodemailer \
  express-rate-limit \
  helmet \
  express-validator
```

---

## 🌐 API Endpoints to Create

### Authentication
- `POST /api/admin/login` - Admin login
- `POST /api/admin/logout` - Admin logout
- `POST /api/admin/refresh` - Refresh token
- `GET /api/admin/me` - Get current admin user

### Projects (Admin)
- `POST /api/admin/projects` - Create project
- `PUT /api/admin/projects/:id` - Update project
- `DELETE /api/admin/projects/:id` - Delete project

### Team (Admin)
- `POST /api/admin/team` - Add member
- `PUT /api/admin/team/:id` - Update member
- `DELETE /api/admin/team/:id` - Delete member

### News (Admin)
- `GET /api/admin/news` - Get all articles
- `POST /api/admin/news` - Create article
- `PUT /api/admin/news/:id` - Update article
- `DELETE /api/admin/news/:id` - Delete article

### Applications (Admin)
- `PUT /api/admin/applications/:id/status` - Update status
- `POST /api/admin/applications/:id/email` - Send email

### Inquiries (Admin)
- `PUT /api/admin/inquiries/:id/status` - Update status
- `POST /api/admin/inquiries/:id/email` - Send email

### Content (Admin)
- `GET /api/admin/content` - Get all content
- `PUT /api/admin/content/:key` - Update content

### Uploads
- `POST /api/admin/upload/image` - Upload image
- `POST /api/admin/upload/file` - Upload file

---

## 📈 Success Metrics

After implementation, the team should be able to:
- ✅ Add/edit projects without developer help
- ✅ Manage team member profiles
- ✅ Publish news articles with rich formatting
- ✅ Review and respond to student applications
- ✅ Manage contact inquiries efficiently
- ✅ Update site content on the fly
- ✅ Track application/inquiry statistics

---

## 🚀 Next Steps

1. **Review this plan** - Confirm approach and features
2. **Create admin schema** - Extend Prisma models
3. **Build authentication** - JWT-based login system
4. **Start with Projects module** - First full CRUD implementation
5. **Iterate on other modules** - Build one module at a time

Would you like me to start implementing this CMS system?
