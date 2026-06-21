import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { body, validationResult } from 'express-validator';
import { authenticateToken, requireRole } from '../../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

router.use(authenticateToken);

// Get all site content
router.get('/', async (req, res) => {
  try {
    const { section } = req.query;

    const content = await prisma.site_content.findMany({
      where: section ? { section: section as string } : undefined,
      orderBy: { section: 'asc' },
    });

    res.json(content);
  } catch (error) {
    console.error('Get site content error:', error);
    res.status(500).json({ error: 'Failed to fetch site content' });
  }
});

// Get single content by ID
router.get('/:id', async (req, res) => {
  try {
    const content = await prisma.site_content.findUnique({
      where: { id: req.params.id },
    });

    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }

    res.json(content);
  } catch (error) {
    console.error('Get site content error:', error);
    res.status(500).json({ error: 'Failed to fetch site content' });
  }
});

// Get content by key
router.get('/key/:key', async (req, res) => {
  try {
    const content = await prisma.site_content.findUnique({
      where: { key: req.params.key },
    });

    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }

    res.json(content);
  } catch (error) {
    console.error('Get site content error:', error);
    res.status(500).json({ error: 'Failed to fetch site content' });
  }
});

// Create site content
router.post(
  '/',
  requireRole('admin', 'editor'),
  [
    body('key').trim().notEmpty().withMessage('Key is required'),
    body('value').notEmpty().withMessage('Value is required'),
    body('section').trim().notEmpty().withMessage('Section is required'),
    body('type').optional().isIn(['text', 'textarea', 'html', 'json', 'image']),
  ],
  async (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if key already exists
      const existing = await prisma.site_content.findUnique({
        where: { key: req.body.key },
      });

      if (existing) {
        return res.status(400).json({ error: 'Content with this key already exists' });
      }

      const content = await prisma.site_content.create({
        data: {
          key: req.body.key,
          value: req.body.value,
          type: req.body.type || 'text',
          section: req.body.section,
        },
      });

      res.status(201).json({
        message: 'Site content created successfully',
        content,
      });
    } catch (error) {
      console.error('Create site content error:', error);
      res.status(500).json({ error: 'Failed to create site content' });
    }
  }
);

// Update site content
router.put(
  '/:id',
  requireRole('admin', 'editor'),
  async (req, res) => {
    try {
      const content = await prisma.site_content.update({
        where: { id: req.params.id },
        data: {
          value: req.body.value,
          type: req.body.type,
          section: req.body.section,
        },
      });

      res.json({
        message: 'Site content updated successfully',
        content,
      });
    } catch (error) {
      console.error('Update site content error:', error);
      res.status(500).json({ error: 'Failed to update site content' });
    }
  }
);

// Delete site content
router.delete(
  '/:id',
  requireRole('admin'),
  async (req, res) => {
    try {
      await prisma.site_content.delete({
        where: { id: req.params.id },
      });

      res.json({ message: 'Site content deleted successfully' });
    } catch (error) {
      console.error('Delete site content error:', error);
      res.status(500).json({ error: 'Failed to delete site content' });
    }
  }
);

export default router;
