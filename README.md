# Alpha Power Station

**Integrated Engineering & Technology Hub for West Africa**

This repository contains the full-stack web application for Alpha Power Station, showcasing the integrated initiatives of Alpha Group of Developers (AGD) and Alpha Group of Electronics & Electricals (AGEE). It is a comprehensive digital platform for both organizations, facilitating student recruitment and engineering solution showcases in West Africa.

## 🎯 Project Vision

Alpha Power Station aims to become a premier integrated engineering and technology hub in West Africa, focusing on:
- **Africa-Proof Engineering**: Rugged, repairable, climate-resilient systems
- **Student Talent Development**: Inspiring and recruiting top engineering students
- **Innovation Showcase**: Cutting-edge projects in power systems and embedded engineering
- **Partnership Engagement**: Building credibility with institutions and industry partners

## 🏗️ Architecture

This project uses a **decoupled frontend/backend architecture** with a separate admin dashboard:

```
alpha-power-station/
├── frontend/          # Next.js (React + TypeScript + Tailwind CSS) — public site
├── backend/           # Node.js + Express + Prisma + PostgreSQL — REST API
├── admin/             # Next.js admin/CMS dashboard
└── docs/              # Project documentation and archived status reports
```

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Hosting**: Vercel

### Backend
- **Runtime**: Node.js
- **Framework**: Express
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Hosting**: Render / Fly.io

### Admin
- **Framework**: Next.js (App Router)
- **State/Data**: React Query, Zustand
- **Forms**: react-hook-form + zod
- **Hosting**: Vercel

## 📦 Quick Start

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL 14+
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd "Alpha Power Station"
```

2. **Install dependencies for each app**
```bash
cd frontend && npm install && cd ..
cd backend && npm install && cd ..
cd admin && npm install && cd ..
```

3. **Set up environment variables**

Frontend:
```bash
cd frontend
cp .env.local.example .env.local
# Edit .env.local if needed
```

Backend:
```bash
cd backend
cp .env.example .env
# Edit .env with your PostgreSQL credentials
```

4. **Initialize the database**
```bash
cd backend
npm run prisma:generate
npm run prisma:migrate
```

5. **Run the development servers**

Open three terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev           # Starts on http://localhost:4000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev           # Starts on http://localhost:3000
```

**Terminal 3 - Admin:**
```bash
cd admin
npm run dev           # Starts on http://localhost:3001
```

## 📁 Project Structure

### Frontend (`/frontend`)
```
src/
├── app/              # Next.js App Router pages
│   ├── about/        # About Us pages
│   ├── projects/     # Project showcase
│   ├── student-hub/  # Student application portal
│   └── ...
├── components/       # Reusable React components
├── lib/             # Utility functions
└── types/           # TypeScript definitions
```

### Backend (`/backend`)
```
src/
├── index.ts          # Main application entry
├── routes/           # Public API route handlers
│   ├── projects.ts
│   ├── students.ts
│   └── contact.ts
├── routes/admin/     # Protected admin CRUD route handlers
└── middleware/       # Authentication, validation

prisma/
└── schema.prisma    # Database schema
```

### Admin (`/admin`)
```
app/
├── dashboard/        # CRUD pages: team, news, projects, partners,
│                     # testimonials, media, applications, inquiries, content
└── ...
```

## 🔌 API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/admin/projects` - Create project (admin)

### Student Applications
- `POST /api/students/apply` - Submit application
- `GET /api/admin/applications` - Get applications (admin)

### Contact
- `POST /api/contact` - Submit inquiry
- `GET /api/admin/inquiries` - Get inquiries (admin)

## 🎨 Key Features

- **Dynamic Project Showcase**: Categorized by phase and division (AGD/AGEE)
- **Student Application Portal**: Multi-step application with document upload
- **Responsive Design**: Mobile-first, optimized for all devices
- **Admin Dashboard**: Manage team, news, projects, partners, testimonials, media, applications, and inquiries
- **SEO Optimized**: Server-side rendering for better discoverability

## Philosophy

Built on the principles of **Africa-Proof Engineering**: rugged, repairable, serviceable systems tolerant of unstable power, heat, dust, and supply-chain constraints.

## 📚 Documentation

- [Website Requirements Document](./Alpha_Power_Station_WRD.md)
- [Technical Stack Recommendations](./Alpha_Power_Station_Structure_Stack_Recommendations.md)
- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)
- [Admin README](./admin/README.md)
- [Archived status reports](./docs/archive/)

## 🤝 Contributing

This project is developed and maintained by the Alpha Group team. For collaboration inquiries, please visit our partnerships page.

## 📄 License

Copyright © 2026 Alpha Group of Developers & Alpha Group of Electronics & Electricals.

---

**Built with ❤️ by Alpha Group for West Africa**
