import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import { authenticateToken, generateToken } from '../../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

console.log('\n🔧 Auth Routes Loaded');
console.log('Available Prisma models:', Object.keys(prisma));

// Login with verbose logging
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    console.log('\n=== LOGIN ATTEMPT ===');
    console.log('Timestamp:', new Date().toISOString());
    console.log('Request Body:', { email: req.body.email, password: '[REDACTED]' });
    console.log('Request Headers:', {
      origin: req.headers.origin,
      contentType: req.headers['content-type'],
      userAgent: req.headers['user-agent']?.substring(0, 50) + '...'
    });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('❌ Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      console.log('✓ Validation passed');
      console.log('Looking up user:', email);

      // Find user
      const user = await prisma.admin_users.findUnique({
        where: { email },
      });

      console.log('Database query result:', user ? 'User found' : 'User not found');

      if (!user) {
        console.log('❌ User not found in database');
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      if (!user.isActive) {
        console.log('❌ User is inactive');
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      console.log('User found:', {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        isActive: user.isActive
      });

      // Verify password
      console.log('Verifying password...');
      const isValidPassword = await bcrypt.compare(password, user.password);
      console.log('Password valid:', isValidPassword);

      if (!isValidPassword) {
        console.log('❌ Invalid password');
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Update last login
      console.log('Updating last login timestamp...');
      await prisma.admin_users.update({
        where: { id: user.id },
        data: { lastLogin: new Date() },
      });
      console.log('✓ Last login updated');

      // Generate token
      console.log('Generating JWT token...');
      const token = generateToken({
        userId: user.id,
        email: user.email,
        role: user.role,
      });
      console.log('✓ Token generated');

      // Set cookie
      console.log('Setting cookie...');
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
      console.log('✓ Cookie set');

      const response = {
        success: true,
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      };

      console.log('✅ Login successful! Sending response...');
      console.log('Response:', { ...response, token: `[${token.substring(0, 20)}...]` });
      console.log('=== LOGIN COMPLETE ===\n');

      res.json(response);
    } catch (error: any) {
      console.error('\n❌ LOGIN ERROR:');
      console.error('Error type:', error.constructor.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      console.log('=== LOGIN FAILED ===\n');
      res.status(500).json({ error: 'Login failed', details: error.message });
    }
  }
);

// Logout
router.post('/logout', (req, res) => {
  console.log('🚪 Logout request');
  res.clearCookie('token');
  res.json({ message: 'Logout successful' });
});

// Get current user
router.get('/me', authenticateToken, async (req, res) => {
  console.log('👤 Get current user request');
  try {
    const user = await prisma.admin_users.findUnique({
      where: { id: req.user?.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        lastLogin: true,
        createdAt: true,
      },
    });

    if (!user) {
      console.log('❌ User not found');
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('✓ User found:', user.email);
    res.json(user);
  } catch (error) {
    console.error('❌ Get user error:', error);
    res.status(500).json({ error: 'Failed to get user' });
  }
});

export default router;
