# Alpha Power Station - Project Architecture

## 📁 Simple, Clean Structure

```
Alpha Power Station/
│
├── frontend/                 # Next.js Frontend (Port 3000)
│   ├── src/
│   ├── package.json         # Frontend dependencies
│   └── ...
│
├── backend/                  # Node.js Backend (Port 4000)
│   ├── src/
│   ├── prisma/
│   ├── package.json         # Backend dependencies
│   └── ...
│
└── docs/                     # Documentation
    ├── Alpha_Power_Station_WRD.md
    └── ...
```

## 🎯 Two Independent Projects

### Frontend (Next.js)
- **Tech**: React, Next.js, TypeScript, Tailwind CSS
- **Port**: 3000
- **Purpose**: User interface and website pages

### Backend (Node.js)
- **Tech**: Express, Prisma, PostgreSQL, TypeScript
- **Port**: 4000
- **Purpose**: REST API and database operations

## 🚀 How to Run

### Start Frontend
```bash
cd frontend
npm install          # First time only
npm run dev          # Starts on http://localhost:3000
```

### Start Backend
```bash
cd backend
npm install          # First time only
npm run dev          # Starts on http://localhost:4000
```

### Run Both (Use 2 Terminals)

**Terminal 1:**
```bash
cd frontend
npm run dev
```

**Terminal 2:**
```bash
cd backend
npm run dev
```

## 📦 No Monorepo - Why?

We're **NOT using a monorepo** approach because:

✅ **Simpler** - Each project is independent
✅ **Clearer** - No confusion about which package.json to use
✅ **Standard** - Most developers are familiar with this structure
✅ **Deployment** - Frontend and backend deploy to different services
   - Frontend → Vercel
   - Backend → Render/Fly.io

## 🔄 Communication Between Projects

**Frontend** calls **Backend** via API:

```typescript
// Frontend makes HTTP requests to Backend
const response = await fetch('http://localhost:4000/api/projects');
```

**Environment Variables:**
- Frontend: `.env.local` → `NEXT_PUBLIC_API_URL=http://localhost:4000/api`
- Backend: `.env` → `DATABASE_URL=postgresql://...`

## 📊 Dependencies

### Frontend Dependencies
```json
{
  "next": "^14.2.0",
  "react": "^18.3.0",
  "tailwindcss": "^3.4.0"
}
```

### Backend Dependencies
```json
{
  "express": "^4.18.2",
  "@prisma/client": "^5.0.0",
  "typescript": "^5.1.6"
}
```

**No shared dependencies** - each project manages its own.

## 🛠️ Development Workflow

1. **Start Backend First** (so API is available)
   ```bash
   cd backend
   npm run dev
   ```

2. **Then Start Frontend** (in another terminal)
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access**:
   - Website: http://localhost:3000
   - API: http://localhost:4000
   - Database GUI: `npm run prisma:studio` (from backend)

## 🚢 Deployment Strategy

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy to Vercel
```

### Backend (Render/Fly.io)
```bash
cd backend
npm run build
# Deploy to Render or Fly.io
```

**Separate deployments** = Independent scaling and updates

## ✅ Current Status

- ✅ Two clean, independent projects
- ✅ No monorepo complexity
- ✅ Each project has its own package.json
- ✅ Clear separation of concerns
- ✅ Standard industry structure

---

**This is the recommended structure for most web applications!** 🎉
