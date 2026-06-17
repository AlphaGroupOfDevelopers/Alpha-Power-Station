# Alpha Power Station

**Integrated Engineering & Technology Hub for West Africa**

This repository contains the full-stack web application for Alpha Power Station, showcasing the integrated initiatives of Alpha Group of Developers (AGD) and Alpha Group of Electronics & Electricals (AGEE).

## 🎯 Project Vision

Alpha Power Station aims to become a premier integrated engineering and technology hub in West Africa, focusing on:
- **Africa-Proof Engineering**: Rugged, repairable, climate-resilient systems
- **Student Talent Development**: Inspiring and recruiting top engineering students
- **Innovation Showcase**: Cutting-edge projects in power systems and embedded engineering
- **Partnership Engagement**: Building credibility with institutions and industry partners

## 🏗️ Architecture

This project uses a **decoupled frontend/backend architecture**:

```
alpha-power-station/
├── frontend/          # Next.js (React + TypeScript + Tailwind CSS)
├── backend/           # Node.js + Express + Prisma + PostgreSQL
└── docs/             # Project documentation
```

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Hosting**: Vercel

### Backend
- **Runtime**: Node.js
- **Framework**: Express
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Hosting**: Render / Fly.io

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

2. **Install frontend dependencies**
```bash
cd frontend
npm install
```

3. **Install backend dependencies**
```bash
cd backend
npm install
```

4. **Set up environment variables**

Frontend:
```bash
cd frontend
copy .env.local.example .env.local
# Edit .env.local if needed
```

Backend:
```bash
cd backend
copy .env.example .env
# Edit .env with your PostgreSQL credentials
```

5. **Initialize the database**
```bash
cd backend
npm run prisma:generate
npm run prisma:migrate
```

6. **Run the development servers**

Open two terminal windows:

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
├── routes/           # API route handlers
│   ├── projects.ts
│   ├── students.ts
│   └── contact.ts
└── middleware/       # Authentication, validation

prisma/
└── schema.prisma    # Database schema
```

## 🔌 API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create project (admin)

### Student Applications
- `POST /api/students/apply` - Submit application
- `GET /api/students/applications` - Get applications (admin)

### Contact
- `POST /api/contact` - Submit inquiry
- `GET /api/contact` - Get inquiries (admin)

## 🎨 Key Features

- **Dynamic Project Showcase**: Categorized by phase and division (AGD/AGEE)
- **Student Application Portal**: Multi-step application with document upload
- **Responsive Design**: Mobile-first, optimized for all devices
- **Admin Dashboard**: Manage applications and content (coming soon)
- **SEO Optimized**: Server-side rendering for better discoverability

## 📚 Documentation

- [Website Requirements Document](./Alpha_Power_Station_WRD.md)
- [Technical Stack Recommendations](./Alpha_Power_Station_Structure_Stack_Recommendations.md)
- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)

## 🤝 Contributing

This project is developed and maintained by the Alpha Group team. For collaboration inquiries, please visit our partnerships page.

## 📄 License

MIT License - see LICENSE file for details

---

**Built with ❤️ by Alpha Group for West Africa** Website

A comprehensive digital platform for Alpha Group of Developers (AGD) and Alpha Group of Electronics & Electricals (AGEE), showcasing integrated engineering solutions and facilitating student recruitment in West Africa.

## Project Structure

```
alpha-power-station/
├── frontend/          # Next.js (React) application
├── backend/           # Node.js API with Prisma ORM
└── docs/             # Project documentation
```

## Technology Stack

### Frontend
- **Framework**: Next.js 14+ (React)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Deployment**: Vercel

### Backend
- **Runtime**: Node.js
- **Framework**: Express
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Deployment**: Render/Fly.io

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- PostgreSQL 14+
- Git

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

## Core Features

- Dynamic homepage with project showcases
- Student application portal
- Project portfolio with technical details
- Partnership and collaboration pages
- News and insights blog
- Responsive, mobile-first design

## Philosophy

Built on the principles of **Africa-Proof Engineering**: rugged, repairable, serviceable systems tolerant of unstable power, heat, dust, and supply-chain constraints.

## License

Copyright © 2026 Alpha Group of Developers & Alpha Group of Electronics & Electricals
