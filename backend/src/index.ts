import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import path from 'path';

// Public routes
import projectRoutes from './routes/projects';
import studentRoutes from './routes/students';
import contactRoutes from './routes/contact';

// Admin routes
import adminAuthRoutes from './routes/admin/auth';
import adminProjectRoutes from './routes/admin/projects';
import adminNewsRoutes from './routes/admin/news';
import adminTeamRoutes from './routes/admin/team';
import adminMediaRoutes from './routes/admin/media';
import adminApplicationRoutes from './routes/admin/applications';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Stricter rate limit for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many login attempts, please try again later.'
});
app.use('/api/admin/auth/login', authLimiter);

// CORS
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:3000',
  credentials: true
}));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve uploaded files
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Public API routes
app.use('/api/projects', projectRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/contact', contactRoutes);

// Admin API routes
app.use('/api/admin/auth', adminAuthRoutes);
app.use('/api/admin/projects', adminProjectRoutes);
app.use('/api/admin/news', adminNewsRoutes);
app.use('/api/admin/team', adminTeamRoutes);
app.use('/api/admin/media', adminMediaRoutes);
app.use('/api/admin/applications', adminApplicationRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    cms: 'enabled'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Alpha Power Station API running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔐 CMS Admin: http://localhost:${PORT}/api/admin`);
});
