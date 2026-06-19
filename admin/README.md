# Alpha Power Station Admin Panel

A modern, custom-built admin panel for managing the Alpha Power Station website content.

## Features

- 🔐 **Secure Authentication** - JWT-based login system
- 📊 **Dashboard Overview** - Quick stats and metrics at a glance
- 📝 **Content Management**
  - Projects (CRUD operations)
  - News & Articles
  - Team Members
  - Partners
- 📧 **Application Management** - Review student applications
- 💬 **Inquiry Management** - Handle contact form submissions
- 🖼️ **Media Library** - Upload and manage images
- 🎨 **Modern UI** - Built with Tailwind CSS and Lucide icons
- ⚡ **Fast & Responsive** - Optimized performance with React Query

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: TanStack React Query (React Query)
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Axios
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ (works with Node 24)
- Backend API running on `http://localhost:4000`

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_APP_NAME=Alpha Power Station Admin
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Default Login

The admin credentials are created via the backend. Use the credentials you set up when running:
```bash
cd ../backend
npm run create-admin
```

## Project Structure

```
admin/
├── app/
│   ├── dashboard/          # Protected dashboard routes
│   │   ├── page.tsx        # Dashboard home
│   │   ├── projects/       # Project management
│   │   ├── news/           # News management
│   │   ├── team/           # Team management
│   │   ├── applications/   # Student applications
│   │   ├── inquiries/      # Contact inquiries
│   │   ├── partners/       # Partner management
│   │   └── media/          # Media library
│   ├── login/
│   │   └── page.tsx        # Login page
│   ├── layout.tsx          # Root layout
│   ├── providers.tsx       # React Query provider
│   └── globals.css         # Global styles
├── components/
│   └── dashboard-nav.tsx   # Navigation sidebar
├── lib/
│   ├── api.ts              # Axios instance
│   ├── auth.ts             # Auth service
│   └── utils.ts            # Utility functions
├── store/
│   └── auth.store.ts       # Auth state management
└── middleware.ts           # Route protection

```

## Features Roadmap

### Phase 1 (Current) ✅
- [x] Authentication system
- [x] Dashboard layout
- [x] Navigation
- [x] Basic dashboard stats

### Phase 2 (Next)
- [ ] Projects CRUD
- [ ] News CRUD
- [ ] Team Members CRUD
- [ ] Applications view
- [ ] Inquiries management

### Phase 3
- [ ] Media library with upload
- [ ] Partner management
- [ ] User management
- [ ] Analytics & reporting

### Phase 4
- [ ] Advanced search & filters
- [ ] Bulk operations
- [ ] Export functionality
- [ ] Activity logs

## API Integration

The admin panel connects to the Alpha Power Station backend API:

### Endpoints Used
- `POST /api/admin/auth/login` - Authentication
- `GET /api/admin/projects` - List projects
- `POST /api/admin/projects` - Create project
- `PUT /api/admin/projects/:id` - Update project
- `DELETE /api/admin/projects/:id` - Delete project
- Similar patterns for news, team, applications, etc.

## Development

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:4000/api` |
| `NEXT_PUBLIC_APP_NAME` | Application name | `Alpha Power Station Admin` |

## Security

- JWT tokens stored in localStorage
- HTTP-only cookies for sensitive operations
- Automatic token refresh
- Protected routes via middleware
- Role-based access control (RBAC) ready

## Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit for review

## License

Proprietary - Alpha Power Station

## Support

For issues or questions, contact the development team.
