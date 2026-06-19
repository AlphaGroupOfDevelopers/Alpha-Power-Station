# Admin Panel Setup Guide

## Quick Start

### 1. Backend Setup (if not already running)

```bash
cd ../backend
npm install
npm run dev
```

The backend should be running on `http://localhost:4000`

### 2. Create Admin User

If you haven't created an admin user yet:

```bash
cd ../backend
npm run create-admin
```

Follow the prompts to create your admin credentials.

### 3. Admin Panel Setup

```bash
cd ../admin
npm install
npm run dev
```

The admin panel will open at `http://localhost:3000`

### 4. Login

1. Navigate to `http://localhost:3000`
2. You'll be redirected to the login page
3. Enter the credentials you created in step 2
4. Click "Sign In"

## Troubleshooting

### "Cannot connect to API"

**Problem**: The admin panel can't reach the backend.

**Solution**:
1. Make sure the backend is running: `cd ../backend && npm run dev`
2. Check that the backend is on port 4000
3. Verify `.env.local` has correct API URL:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:4000/api
   ```

### "Invalid credentials"

**Problem**: Login fails even with correct credentials.

**Solution**:
1. Verify your admin user exists in the database
2. Try creating a new admin user: `cd ../backend && npm run create-admin`
3. Check backend logs for authentication errors

### Port Already in Use

**Problem**: Port 3000 is already in use.

**Solution**:
```bash
# Run on a different port
PORT=3001 npm run dev
```

### CORS Errors

**Problem**: Browser blocks API requests.

**Solution**:
1. Check backend CORS configuration in `backend/.env`
2. Add admin URL to `ALLOWED_ORIGINS`:
   ```
   ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
   ```
3. Restart the backend

## Production Deployment

### Build the Admin Panel

```bash
npm run build
```

### Run in Production Mode

```bash
npm start
```

### Environment Variables for Production

Create `.env.production`:

```
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
NEXT_PUBLIC_APP_NAME=Alpha Power Station Admin
```

## What's Next?

Now that the admin panel is running, the next steps are to implement:

1. **Projects Management** - Full CRUD for projects
2. **News Management** - Create and publish articles
3. **Team Management** - Add/edit team members
4. **Applications View** - Review student applications
5. **Media Library** - Upload and manage images

Each of these will be implemented as we go!

## Current Status

✅ Admin panel structure created
✅ Authentication system implemented
✅ Dashboard layout and navigation
✅ Login page with validation
✅ Protected routes middleware
✅ API integration setup
⏳ Content management pages (next phase)

## Architecture Overview

```
User Browser
    ↓
Admin Panel (Next.js on :3000)
    ↓
Backend API (Express on :4000)
    ↓
PostgreSQL Database
```

## Default Ports

- **Admin Panel**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **Frontend Site**: http://localhost:3001 (if running)
- **PostgreSQL**: localhost:5432

## Support

For help or questions, refer to:
- `README.md` - Full documentation
- Backend documentation in `../backend/README.md`
- Frontend documentation in `../frontend/README.md`
