# Alpha Power Station - Project Structure

## 📁 Complete Directory Tree

```
alpha-power-station/
│
├── 📄 README.md                    # Project overview and quick start
├── 📄 SETUP.md                     # Detailed setup instructions
├── 📄 package.json                 # Root package with workspace scripts
├── 📄 .gitignore                   # Git ignore rules
│
├── 📁 frontend/                    # Next.js Frontend Application
│   ├── 📁 src/
│   │   ├── 📁 app/                # Next.js App Router
│   │   │   ├── page.tsx          # Homepage
│   │   │   ├── layout.tsx        # Root layout
│   │   │   └── globals.css       # Global styles
│   │   │
│   │   ├── 📁 components/         # Reusable React Components
│   │   │   ├── Header.tsx        # Navigation header
│   │   │   └── Footer.tsx        # Site footer
│   │   │
│   │   ├── 📁 lib/                # Utility Functions
│   │   │   └── api.ts            # API client
│   │   │
│   │   └── 📁 types/              # TypeScript Definitions
│   │       └── index.ts          # Shared types
│   │
│   ├── 📄 package.json            # Frontend dependencies
│   ├── 📄 tsconfig.json           # TypeScript config
│   ├── 📄 tailwind.config.js     # Tailwind CSS config
│   ├── 📄 next.config.js         # Next.js config
│   ├── 📄 .env.local.example     # Environment template
│   └── 📄 README.md              # Frontend docs
│
├── 📁 backend/                     # Node.js Backend API
│   ├── 📁 src/
│   │   ├── 📁 routes/             # API Route Handlers
│   │   │   ├── projects.ts       # Project endpoints
│   │   │   ├── students.ts       # Student application endpoints
│   │   │   └── contact.ts        # Contact inquiry endpoints
│   │   │
│   │   └── index.ts              # Main Express app
│   │
│   ├── 📁 prisma/                 # Database Configuration
│   │   └── schema.prisma         # Database schema
│   │
│   ├── 📄 package.json            # Backend dependencies
│   ├── 📄 tsconfig.json           # TypeScript config
│   ├── 📄 .env.example           # Environment template
│   ├── 📄 .gitignore             # Backend ignore rules
│   └── 📄 README.md              # Backend docs
│
└── 📁 docs/                        # Project Documentation
    ├── Alpha_Power_Station_WRD.md
    └── Alpha_Power_Station_Structure_Stack_Recommendations.md
```

## 🎯 Key Components

### Frontend Structure

| Component | Purpose |
|-----------|---------|
| `app/` | Next.js 14 App Router pages and layouts |
| `components/` | Reusable UI components (Header, Footer, etc.) |
| `lib/` | Utility functions and API client |
| `types/` | TypeScript type definitions |

### Backend Structure

| Component | Purpose |
|-----------|---------|
| `routes/` | API endpoint handlers |
| `prisma/` | Database schema and migrations |
| `index.ts` | Express server setup and middleware |

## 🔗 Data Flow

```
User Browser (Frontend)
       ↓
   Next.js App
       ↓
   API Client (lib/api.ts)
       ↓
   Backend API (Express)
       ↓
   Prisma ORM
       ↓
   PostgreSQL Database
```

## 📊 Database Schema

### Tables Created by Prisma

1. **projects** - Project portfolio
   - id, title, description, category, division, status, etc.

2. **team_members** - Team and leadership profiles
   - id, name, role, division, bio, imageUrl

3. **student_applications** - Student applications
   - id, firstName, lastName, email, division, status, etc.

4. **contact_inquiries** - General inquiries
   - id, name, email, subject, message, type, status

## 🚀 Development Workflow

### Starting Development

```bash
# From root directory
npm run dev              # Runs both servers concurrently
```

Or individually:

```bash
npm run dev:frontend     # Port 3000
npm run dev:backend      # Port 4000
```

### Building for Production

```bash
npm run build            # Builds both projects
```

### Database Management

```bash
cd backend
npm run prisma:studio    # Visual database editor
npm run prisma:migrate   # Apply schema changes
```

## 📋 Next Steps

### Immediate Tasks

1. ✅ Project structure scaffolded
2. ⏳ Install dependencies: `npm run install:all`
3. ⏳ Set up PostgreSQL database
4. ⏳ Configure environment variables
5. ⏳ Run database migrations
6. ⏳ Start development servers

### Feature Development Priority

1. **Phase 1**: Core pages (Home, About, Projects)
2. **Phase 2**: Student application portal
3. **Phase 3**: Admin dashboard
4. **Phase 4**: CMS integration (optional)

### Pages to Build

- [ ] Homepage with hero section
- [ ] About Us (Vision, Philosophy, Team)
- [ ] Divisions (AGD & AGEE)
- [ ] Projects showcase
- [ ] Student Hub & Application Portal
- [ ] Partnerships page
- [ ] Contact page

## 🛠️ Available Scripts

### Root Level
```bash
npm run dev              # Run both servers
npm run build            # Build both projects
npm run install:all      # Install all dependencies
npm run dev:frontend     # Run only frontend
npm run dev:backend      # Run only backend
```

### Frontend
```bash
npm run dev              # Development server
npm run build            # Production build
npm run start            # Start production server
npm run lint             # Run linter
```

### Backend
```bash
npm run dev              # Development server with hot reload
npm run build            # Compile TypeScript
npm run start            # Start compiled server
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Run migrations
npm run prisma:studio    # Open Prisma Studio
```

## 🎨 Design System

### Colors (to be defined)
- Primary: TBD
- Secondary: TBD
- Accent: TBD

### Typography
- Headings: TBD
- Body: TBD

### Components
- Header with navigation
- Footer with links
- Cards for projects
- Forms for applications
- Buttons and CTAs

## 📞 Support

For questions or issues during development:
1. Check SETUP.md for installation help
2. Review README.md for project overview
3. Consult the WRD for requirements
4. Contact the development team
