# Setup Guide for Alpha Power Station

This guide will walk you through setting up the development environment for the Alpha Power Station website.

## Prerequisites

Ensure you have the following installed:

- **Node.js** (v18 or higher): [Download here](https://nodejs.org/)
- **PostgreSQL** (v14 or higher): [Download here](https://www.postgresql.org/download/)
- **Git**: [Download here](https://git-scm.com/)
- **Code Editor**: VS Code recommended

## Step-by-Step Setup

### 1. Install Dependencies

From the project root:

```bash
npm run install:all
```

This will install dependencies for:
- Root project (concurrently for running both servers)
- Frontend (Next.js and related packages)
- Backend (Express, Prisma, and related packages)

### 2. Database Setup

#### Option A: Local PostgreSQL

1. Create a new database:
```sql
CREATE DATABASE alpha_power_station;
```

2. Update `backend/.env` with your database credentials:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/alpha_power_station?schema=public"
```

#### Option B: Cloud PostgreSQL (Railway, Supabase, etc.)

1. Create a PostgreSQL instance on your preferred platform
2. Copy the connection string
3. Update `backend/.env` with the connection string

### 3. Backend Configuration

Navigate to the backend directory:

```bash
cd backend
```

**Generate Prisma Client:**
```bash
npm run prisma:generate
```

**Run Database Migrations:**
```bash
npm run prisma:migrate
```

This creates the necessary tables (projects, team_members, student_applications, contact_inquiries).

**Open Prisma Studio (Optional):**
```bash
npm run prisma:studio
```
Access at `http://localhost:5555` to view/edit database records.

### 4. Frontend Configuration

Navigate to the frontend directory:

```bash
cd ../frontend
```

Update `.env.local` with the backend API URL:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

### 5. Start Development Servers

From the project root:

```bash
npm run dev
```

This starts both servers:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:4000

## Verification

### Test Backend API
```bash
curl http://localhost:4000/health
```
Should return: `{"status":"ok","timestamp":"..."}`

### Test Frontend
Open http://localhost:3000 in your browser.

## Common Issues

### Port Already in Use

If ports 3000 or 4000 are occupied:

**Frontend**: Update `frontend/package.json`:
```json
"scripts": {
  "dev": "next dev -p 3001"
}
```

**Backend**: Update `backend/.env`:
```env
PORT=4001
```

### Database Connection Error

Verify:
1. PostgreSQL is running
2. Database credentials in `.env` are correct
3. Database exists: `psql -l` to list databases

### Prisma Migration Fails

Reset the database:
```bash
cd backend
npx prisma migrate reset
npm run prisma:migrate
```

## Next Steps

1. **Seed Sample Data**: Add projects and team members via Prisma Studio
2. **Develop Features**: Start building pages and components
3. **Deploy**: Follow deployment guides for Vercel (frontend) and Render (backend)

## Development Workflow

1. Create a new branch for your feature
2. Make changes and test locally
3. Run linting (when configured)
4. Commit changes with clear messages
5. Push and create a pull request

## Useful Commands

### Root
```bash
npm run dev              # Run both servers
npm run build            # Build both projects
```

### Frontend
```bash
cd frontend
npm run dev              # Start dev server
npm run build            # Build for production
npm run lint             # Run ESLint
```

### Backend
```bash
cd backend
npm run dev              # Start dev server
npm run build            # Compile TypeScript
npm run prisma:studio    # Open database GUI
```

## Getting Help

- Check the [main README](./README.md) for project overview
- Review [WRD document](./Alpha_Power_Station_WRD.md) for requirements
- Contact the development team for support
