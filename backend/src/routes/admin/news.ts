import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { body, validationResult } from 'express-validator';
import { authenticateToken, requireRole } from '../../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

router.use(authenticateToken);

// Get all news posts
router.get('/', async (req, res) => {
  try {
    const { category, featured } = req.query;

    const posts = await prisma.news_posts.findMany({
      where: {
        ...(category && { category: category as string }),
        ...(featured && { featured: featured === 'true' }),
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(posts);
  } catch (error) {
    console.error('Get news error:', error);
    res.status(500).json({ error: 'Failed to fetch news posts' });
  }
});

// Get single news post
router.get('/:id', async (req, res) => {
  try {
    const post = await prisma.news_posts.findUnique({
      where: { id: req.params.id },
    });

    if (!post) {
      return res.status(404).json({ error: 'News post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error('Get news post error:', error);
    res.status(500).json({ error: 'Failed to fetch news post' });
  }
});

// Create news post
router.post(
  '/',
  requireRole('admin', 'editor'),
  [
    body('slug').trim().notEmpty().withMessage('Slug is required'),
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('excerpt').trim().notEmpty().withMessage('Excerpt is required'),
    body('content').trim().notEmpty().withMessage('Content is required'),
    body('category').isIn(['news', 'insight', 'event']).withMessage('Invalid category'),
    body('author').trim().notEmpty().withMessage('Author is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const existing = await prisma.news_posts.findUnique({
        where: { slug: req.body.slug },
      });

      if (existing) {
        return res.status(409).json({ error: 'News post with this slug already exists' });
      }

      const post = await prisma.news_posts.create({
        data: req.body,
      });

      res.status(201).json({
        message: 'News post created successfully',
        post,
      });
    } catch (error) {
      console.error('Create news post error:', error);
      res.status(500).json({ error: 'Failed to create news post' });
    }
  }
);

// Update news post
router.put(
  '/:id',
  requireRole('admin', 'editor'),
  async (req, res) => {
    try {
      const post = await prisma.news_posts.update({
        where: { id: req.params.id },
        data: req.body,
      });

      res.json({
        message: 'News post updated successfully',
        post,
      });
    } catch (error) {
      console.error('Update news post error:', error);
      res.status(500).json({ error: 'Failed to update news post' });
    }
  }
);

// Delete news post
router.delete(
  '/:id',
  requireRole('admin'),
  async (req, res) => {
    try {
      await prisma.news_posts.delete({
        where: { id: req.params.id },
      });

      res.json({ message: 'News post deleted successfully' });
    } catch (error) {
      console.error('Delete news post error:', error);
      res.status(500).json({ error: 'Failed to delete news post' });
    }
  }
);

// Publish/unpublish news post
router.patch(
  '/:id/publish',
  requireRole('admin', 'editor'),
  async (req, res) => {
    try {
      const { publish } = req.body;

      const post = await prisma.news_posts.update({
        where: { id: req.params.id },
        data: {
          publishedAt: publish ? new Date() : null,
        },
      });

      res.json({
        message: `News post ${publish ? 'published' : 'unpublished'} successfully`,
        post,
      });
    } catch (error) {
      console.error('Publish news post error:', error);
      res.status(500).json({ error: 'Failed to update news post' });
    }
  }
);

export default router;
