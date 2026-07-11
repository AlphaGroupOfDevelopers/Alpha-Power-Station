import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET all partners
router.get('/', async (req: Request, res: Response) => {
  try {
    const { category, featured } = req.query;

    const partners = await prisma.partners.findMany({
      where: {
        ...(category && { category: category as string }),
        ...(featured && { featured: featured === 'true' }),
      },
      orderBy: { order: 'asc' },
    });

    res.json(partners);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch partners' });
  }
});

export default router;
