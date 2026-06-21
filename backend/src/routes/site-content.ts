import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Public route - Get all site content
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

// Public route - Get content by key
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

export default router;
