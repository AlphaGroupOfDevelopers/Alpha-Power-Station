# Admin Panel - Quick Start

## 🎉 Admin Panel is Ready!

Your custom admin panel has been successfully created and is ready to use.

## Start the Admin Panel

### Option 1: Using Terminal
```bash
cd admin
npm run dev
```

### Option 2: Using PowerShell
```powershell
cd admin
npm run dev
```

The admin panel will start at: **http://localhost:3000**

## First Time Setup

### Step 1: Start Backend (if not running)
```bash
cd backend
npm run dev
```
Backend runs at: **http://localhost:4000**

### Step 2: Create Admin User (if not done)
```bash
cd backend
npm run create-admin
```

### Step 3: Start Admin Panel
```bash
cd admin
npm run dev
```

### Step 4: Login
1. Open browser to http://localhost:3000
2. You'll be redirected to `/login`
3. Enter your admin credentials
4. Click "Sign In"
5. You'll be redirected to `/dashboard`

## What You'll See

### Login Page
- Clean, modern design
- Email and password fields
- Form validation
- Error handling

### Dashboard
- Overview statistics
- Quick action buttons
- Navigation sidebar
- User profile display

### Content Management
- **Projects** - Fully functional list view
- **News** - Ready for implementation
- **Team** - Ready for implementation
- **Applications** - Ready for implementation
- **Inquiries** - Ready for implementation
- **Partners** - Ready for implementation
- **Media** - Ready for implementation

## Architecture

```
Browser (localhost:3000)
    ↓
Admin Panel (Next.js)
    ↓
Backend API (localhost:4000)
    ↓
PostgreSQL Database
```

## Default Ports

| Service | Port | URL |
|---------|------|-----|
| Admin Panel | 3000 | http://localhost:3000 |
| Backend API | 4000 | http://localhost:4000 |
| Frontend Site | 3001 | http://localhost:3001 |

## Features

### ✅ Working Now
- Login/Logout
- Dashboard with stats
- Projects list view
- Responsive navigation
- Protected routes
- JWT authentication

### 🔄 Coming Next
- Project CRUD operations
- News management
- Team management
- Application reviews
- Media uploads

## Troubleshooting

### Can't Connect to Backend
**Problem**: "Cannot connect to API"

**Solution**:
1. Start backend: `cd backend && npm run dev`
2. Check backend is on port 4000
3. Verify `.env.local` has: `NEXT_PUBLIC_API_URL=http://localhost:4000/api`

### Login Fails
**Problem**: "Invalid credentials"

**Solution**:
1. Create admin user: `cd backend && npm run create-admin`
2. Use exact email/password from creation
3. Check backend console for errors

### Port 3000 In Use
**Problem**: "Port 3000 is already in use"

**Solution**:
```bash
PORT=3001 npm run dev
```

### CORS Errors
**Problem**: Browser blocks API requests

**Solution**:
1. Edit `backend/.env`
2. Add: `ALLOWED_ORIGINS=http://localhost:3000`
3. Restart backend

## Next Steps

1. **Test Login** - Make sure you can log in
2. **View Dashboard** - Check the stats display
3. **Browse Projects** - See the projects list
4. **Plan Features** - Decide what to build next

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Query** - Data fetching
- **Zustand** - State management
- **Axios** - HTTP client
- **Lucide** - Icons

## Files Created

```
admin/
├── app/                    # Next.js app directory
├── components/             # React components
├── lib/                    # Utilities and services
├── store/                  # State management
├── .env.local              # Environment variables
├── package.json            # Dependencies
├── README.md               # Full documentation
├── SETUP.md                # Setup guide
└── QUICK_START.md          # This file
```

## Commands Cheat Sheet

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## Environment Variables

Create `.env.local`:
```bash
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_APP_NAME=Alpha Power Station Admin
```

## Success Checklist

- [ ] Dependencies installed (`npm install` completed)
- [ ] Backend is running (port 4000)
- [ ] Admin user created
- [ ] Environment variables configured
- [ ] Admin panel starts (port 3000)
- [ ] Can access login page
- [ ] Can log in successfully
- [ ] Dashboard displays correctly

## Support

Need help?
1. Check `SETUP.md` for detailed setup
2. Review `README.md` for full docs
3. Check backend documentation
4. Verify all services are running

---

**Ready to go! Run `npm run dev` to start.**
