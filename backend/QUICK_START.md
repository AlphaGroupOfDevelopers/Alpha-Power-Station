# Backend Quick Start Guide

## Current Status

✅ Dependencies installed (123 packages)
✅ Environment file created (.env)
⏳ Database setup needed
⏳ Prisma migrations needed

## Quick Setup (Choose One Path)

### Path A: Use Cloud Database (Fastest - No Installation)

**Recommended: Supabase Free Tier**

1. Go to https://supabase.com and sign up
2. Create a new project (takes ~2 minutes)
3. Get your connection string:
   - Project Settings → Database → Connection String
   - Copy the "Connection pooling" string (Session mode)
4. Update `backend/.env`:
   ```env
   DATABASE_URL="your-connection-string-here"
   ```
5. Run migrations:
   ```bash
   cd backend
   npm run prisma:generate
   npm run prisma:migrate
   ```
6. Start the server:
   ```bash
   npm run dev
   ```

### Path B: Install PostgreSQL Locally

1. **Download**: https://www.postgresql.org/download/windows/
2. **Install** (remember the password!)
3. **Create database** using pgAdmin or:
   ```bash
   psql -U postgres -c "CREATE DATABASE alpha_power_station;"
   ```
4. **Update** `backend/.env` with your password:
   ```env
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/alpha_power_station?schema=public"
   ```
5. **Run migrations**:
   ```bash
   cd backend
   npm run prisma:generate
   npm run prisma:migrate
   ```
6. **Start server**:
   ```bash
   npm run dev
   ```

## What Each Command Does

```bash
npm run prisma:generate    # Creates TypeScript types from schema
npm run prisma:migrate     # Creates database tables
npm run prisma:studio      # Opens visual database editor
npm run dev               # Starts backend server (port 4000)
```

## Testing the Backend

Once running, test these endpoints:

```bash
# Health check
curl http://localhost:4000/health

# Get projects (empty array initially)
curl http://localhost:4000/api/projects

# Create a test project
curl -X POST http://localhost:4000/api/projects \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Smart Prepaid Meter\",\"description\":\"IEC 62055-41 compliant prepaid meter\",\"category\":\"commercial\",\"division\":\"integrated\",\"status\":\"active\"}"
```

## My Recommendation

**Use Supabase** (Path A) for now:
- No installation needed
- Free tier (500MB storage)
- Setup in 5 minutes
- Easy to migrate later

You can always switch to local PostgreSQL later!

## Need Help?

- Database setup details: See `DATABASE_SETUP.md`
- API documentation: See `README.md`
- Full project setup: See root `SETUP.md`
