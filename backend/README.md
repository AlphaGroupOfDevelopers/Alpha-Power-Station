# Alpha Power Station - Backend API

This is the Node.js backend API for the Alpha Power Station website.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Language**: TypeScript

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
copy .env.example .env
```

3. Update the `.env` file with your PostgreSQL credentials.

4. Generate Prisma Client:
```bash
npm run prisma:generate
```

5. Run database migrations:
```bash
npm run prisma:migrate
```

6. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:4000`

## Project Structure

```
src/
├── index.ts          # Main application entry point
├── routes/           # API route handlers
│   ├── projects.ts   # Project endpoints
│   ├── students.ts   # Student application endpoints
│   └── contact.ts    # Contact inquiry endpoints
├── middleware/       # Custom middleware (auth, validation)
└── utils/           # Utility functions

prisma/
└── schema.prisma    # Database schema definition
```

## API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (admin)

### Students
- `POST /api/students/apply` - Submit application
- `GET /api/students/applications` - Get all applications (admin)

### Contact
- `POST /api/contact` - Submit contact inquiry
- `GET /api/contact` - Get all inquiries (admin)

## Database Management

- `npm run prisma:studio` - Open Prisma Studio (GUI for database)
- `npm run prisma:migrate` - Create and apply migrations
- `npm run prisma:generate` - Regenerate Prisma Client

## Deployment

1. Build the project:
```bash
npm run build
```

2. Start production server:
```bash
npm start
```
