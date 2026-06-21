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
import siteContentRoutes from './routes/site-content';
import testimonialsRoutes from './routes/testimonials';

// Admin routes
import adminAuthRoutes from './routes/admin/auth-verbose';
import adminProjectRoutes from './routes/admin/projects';
import adminNewsRoutes from './routes/admin/news';
import adminTeamRoutes from './routes/admin/team';
import adminMediaRoutes from './routes/admin/media';
import adminApplicationRoutes from './routes/admin/applications';
import adminInquiryRoutes from './routes/admin/inquiries';
import adminPartnerRoutes from './routes/admin/partners';
import adminSiteContentRoutes from './routes/admin/site-content';
import adminTestimonialsRoutes from './routes/admin/testimonials';

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
  max: 50, // Increased from 5 to 50 for development
  message: 'Too many login attempts, please try again later.'
});
app.use('/api/admin/auth/login', authLimiter);

// CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'];
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log(`CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['set-cookie']
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
app.use('/api/site-content', siteContentRoutes);
app.use('/api/testimonials', testimonialsRoutes);

// Admin API routes
app.use('/api/admin/auth', adminAuthRoutes);
app.use('/api/admin/projects', adminProjectRoutes);
app.use('/api/admin/news', adminNewsRoutes);
app.use('/api/admin/team', adminTeamRoutes);
app.use('/api/admin/media', adminMediaRoutes);
app.use('/api/admin/applications', adminApplicationRoutes);
app.use('/api/admin/inquiries', adminInquiryRoutes);
app.use('/api/admin/partners', adminPartnerRoutes);
app.use('/api/admin/site-content', adminSiteContentRoutes);
app.use('/api/admin/testimonials', adminTestimonialsRoutes);

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
  console.log('\n' + '='.repeat(60));
  console.log(`🚀 Alpha Power Station API running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔐 CMS Admin: http://localhost:${PORT}/api/admin`);
  console.log(`🗄️  Database: ${process.env.DATABASE_URL ? 'PostgreSQL (Prisma Cloud)' : 'SQLite'}`);
  console.log(`🌐 CORS Origins: ${process.env.ALLOWED_ORIGINS || 'http://localhost:3000'}`);
  console.log('='.repeat(60));
  console.log('\n✓ Server ready - Verbose logging enabled\n');
});
