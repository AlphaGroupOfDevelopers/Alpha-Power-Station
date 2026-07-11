import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET all published news posts
router.get('/', async (req: Request, res: Response) => {
  try {
    const { category, featured } = req.query;

    const posts = await prisma.news_posts.findMany({
      where: {
        publishedAt: { lte: new Date() },
        ...(category && { category: category as string }),
        ...(featured && { featured: featured === 'true' }),
      },
      orderBy: { publishedAt: 'desc' },
    });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news posts' });
  }
});

// GET single published news post by slug
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const post = await prisma.news_posts.findUnique({
      where: { slug: req.params.slug },
    });

    if (!post || !post.publishedAt || post.publishedAt > new Date()) {
      return res.status(404).json({ error: 'News post not found' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news post' });
  }
});

export default router;
