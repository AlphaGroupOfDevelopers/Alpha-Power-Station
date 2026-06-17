# Alpha Power Station - Database Setup Script for Windows
# This script helps automate the database setup process

Write-Host "================================" -ForegroundColor Cyan
Write-Host "Alpha Power Station" -ForegroundColor Cyan
Write-Host "Database Setup Assistant" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env exists
if (-Not (Test-Path ".env")) {
    Write-Host "❌ .env file not found!" -ForegroundColor Red
    Write-Host "Creating .env from .env.example..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "✅ .env file created. Please update it with your database credentials." -ForegroundColor Green
    Write-Host ""
}

Write-Host "Choose your database setup method:" -ForegroundColor Yellow
Write-Host "1. I have PostgreSQL installed locally"
Write-Host "2. I want to use cloud database (Supabase/Railway/Neon)"
Write-Host "3. Skip and configure manually"
Write-Host ""

$choice = Read-Host "Enter choice (1-3)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "Local PostgreSQL Setup" -ForegroundColor Cyan
        Write-Host "======================" -ForegroundColor Cyan
        Write-Host ""
        
        # Check if psql is available
        $psqlAvailable = Get-Command psql -ErrorAction SilentlyContinue
        
        if ($psqlAvailable) {
            Write-Host "✅ PostgreSQL found!" -ForegroundColor Green
            Write-Host ""
            
            $dbUser = Read-Host "PostgreSQL username (default: postgres)"
            if ([string]::IsNullOrWhiteSpace($dbUser)) { $dbUser = "postgres" }
            
            $dbPassword = Read-Host "PostgreSQL password" -AsSecureString
            $dbPasswordPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
                [Runtime.InteropServices.Marshal]::SecureStringToBSTR($dbPassword)
            )
            
            $dbName = Read-Host "Database name (default: alpha_power_station)"
            if ([string]::IsNullOrWhiteSpace($dbName)) { $dbName = "alpha_power_station" }
            
            # Create database
            Write-Host ""
            Write-Host "Creating database..." -ForegroundColor Yellow
            
            $env:PGPASSWORD = $dbPasswordPlain
            psql -U $dbUser -c "CREATE DATABASE $dbName;" 2>$null
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✅ Database created successfully!" -ForegroundColor Green
            } else {
                Write-Host "⚠️  Database might already exist or there was an error" -ForegroundColor Yellow
            }
            
            # Update .env
            $connectionString = "DATABASE_URL=`"postgresql://${dbUser}:${dbPasswordPlain}@localhost:5432/${dbName}?schema=public`""
            (Get-Content ".env") -replace "DATABASE_URL=.*", $connectionString | Set-Content ".env"
            
            Write-Host "✅ .env file updated!" -ForegroundColor Green
            
        } else {
            Write-Host "❌ PostgreSQL not found in PATH" -ForegroundColor Red
            Write-Host ""
            Write-Host "Please install PostgreSQL:" -ForegroundColor Yellow
            Write-Host "https://www.postgresql.org/download/windows/" -ForegroundColor Blue
            Write-Host ""
            Write-Host "Or use a cloud database (option 2)" -ForegroundColor Yellow
            exit
        }
    }
    
    "2" {
        Write-Host ""
        Write-Host "Cloud Database Setup" -ForegroundColor Cyan
        Write-Host "====================" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Recommended: Supabase (free tier, no credit card)" -ForegroundColor Green
        Write-Host ""
        Write-Host "Steps:" -ForegroundColor Yellow
        Write-Host "1. Go to https://supabase.com and sign up"
        Write-Host "2. Create a new project (takes ~2 minutes)"
        Write-Host "3. Go to Project Settings → Database"
        Write-Host "4. Copy the 'Connection string' (Session mode)"
        Write-Host ""
        
        $connectionString = Read-Host "Paste your connection string here"
        
        if (-Not [string]::IsNullOrWhiteSpace($connectionString)) {
            (Get-Content ".env") -replace "DATABASE_URL=.*", "DATABASE_URL=`"$connectionString`"" | Set-Content ".env"
            Write-Host "✅ .env file updated!" -ForegroundColor Green
        } else {
            Write-Host "❌ No connection string provided" -ForegroundColor Red
            exit
        }
    }
    
    "3" {
        Write-Host ""
        Write-Host "Manual Configuration" -ForegroundColor Cyan
        Write-Host "Please edit the .env file manually with your database credentials" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "See DATABASE_SETUP.md for detailed instructions" -ForegroundColor Blue
        exit
    }
    
    default {
        Write-Host "Invalid choice" -ForegroundColor Red
        exit
    }
}

# Run Prisma commands
Write-Host ""
Write-Host "Running Prisma setup..." -ForegroundColor Cyan
Write-Host ""

Write-Host "📦 Generating Prisma Client..." -ForegroundColor Yellow
npm run prisma:generate

Write-Host ""
Write-Host "🔨 Creating database tables..." -ForegroundColor Yellow
npm run prisma:migrate

Write-Host ""
$seedChoice = Read-Host "Would you like to add sample data? (y/n)"

if ($seedChoice -eq "y" -or $seedChoice -eq "Y") {
    Write-Host ""
    Write-Host "🌱 Seeding database..." -ForegroundColor Yellow
    npm run prisma:seed
}

Write-Host ""
Write-Host "================================" -ForegroundColor Green
Write-Host "✅ Backend Setup Complete!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Run: npm run dev" -ForegroundColor White
Write-Host "2. Test: http://localhost:4000/health" -ForegroundColor White
Write-Host "3. View DB: npm run prisma:studio" -ForegroundColor White
Write-Host ""
