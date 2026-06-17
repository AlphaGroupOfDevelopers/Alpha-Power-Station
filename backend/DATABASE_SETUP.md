# Database Setup Guide

## Option 1: Local PostgreSQL (Recommended for Development)

### Install PostgreSQL on Windows

1. **Download PostgreSQL**
   - Visit: https://www.postgresql.org/download/windows/
   - Download the installer for Windows
   - Or use the EDB installer: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads

2. **Install PostgreSQL**
   - Run the installer
   - Remember the password you set for the `postgres` user
   - Keep the default port: 5432
   - Install pgAdmin (GUI tool) when prompted

3. **Create Database**

   **Option A: Using pgAdmin (GUI)**
   - Open pgAdmin
   - Right-click on "Databases"
   - Select "Create" → "Database"
   - Name: `alpha_power_station`
   - Click "Save"

   **Option B: Using psql (Command Line)**
   ```bash
   # Open Command Prompt or PowerShell
   psql -U postgres
   
   # Enter password when prompted
   # Then create database:
   CREATE DATABASE alpha_power_station;
   
   # Exit psql:
   \q
   ```

4. **Update .env File**
   
   Edit `backend/.env`:
   ```env
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/alpha_power_station?schema=public"
   ```
   Replace `YOUR_PASSWORD` with your PostgreSQL password.

## Option 2: Cloud PostgreSQL (Alternative)

### Using Supabase (Free Tier)

1. **Sign up at**: https://supabase.com
2. **Create a new project**
3. **Get connection string**:
   - Go to Project Settings → Database
   - Copy the "Connection string" under "Connection pooling"
   - Mode: Session
4. **Update .env**:
   ```env
   DATABASE_URL="your-supabase-connection-string"
   ```

### Using Railway (Free Trial)

1. **Sign up at**: https://railway.app
2. **Create new project** → "Provision PostgreSQL"
3. **Get connection string**:
   - Click on PostgreSQL service
   - Go to "Connect" tab
   - Copy "Postgres Connection URL"
4. **Update .env**:
   ```env
   DATABASE_URL="your-railway-connection-string"
   ```

### Using Neon (Free Tier)

1. **Sign up at**: https://neon.tech
2. **Create a new project**
3. **Copy the connection string**
4. **Update .env**:
   ```env
   DATABASE_URL="your-neon-connection-string"
   ```

## Option 3: Docker PostgreSQL

If you have Docker installed:

```bash
docker run --name alpha-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=alpha_power_station -p 5432:5432 -d postgres:15
```

Then use:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/alpha_power_station?schema=public"
```

## Verify Connection

Once your database is set up, test the connection:

```bash
cd backend
npx prisma db pull
```

If successful, you'll see: "Introspecting based on datasource..."

## Next Steps

After database is configured:

1. **Generate Prisma Client**:
   ```bash
   npm run prisma:generate
   ```

2. **Run Migrations** (creates tables):
   ```bash
   npm run prisma:migrate
   ```

3. **View Database** (optional):
   ```bash
   npm run prisma:studio
   ```
   Opens at http://localhost:5555

## Troubleshooting

### "Connection refused"
- PostgreSQL service not running
- Windows: Check Services (Win + R → `services.msc`)
- Look for "postgresql" service and start it

### "Authentication failed"
- Wrong password in DATABASE_URL
- Check postgres user password

### Port 5432 already in use
- Another PostgreSQL instance running
- Change port in DATABASE_URL: `localhost:5433`

### "database does not exist"
- Database not created
- Create using pgAdmin or psql (see above)

## Need Help?

Check the main SETUP.md or contact the development team.
