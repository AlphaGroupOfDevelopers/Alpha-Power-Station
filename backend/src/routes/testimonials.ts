import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Public route - Get active testimonials only
router.get('/', async (req, res) => {
  try {
    const { division } = req.query;

    const testimonials = await prisma.testimonials.findMany({
      where: {
        isActive: true,
        ...(division && { division: division as string }),
      },
      orderBy: { order: 'asc' },
    });

    res.json(testimonials);
  } catch (error) {
    console.error('Get testimonials error:', error);
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

export default router;
