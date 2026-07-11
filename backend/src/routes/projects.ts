import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET all projects
router.get('/', async (req: Request, res: Response) => {
  try {
    const { category, division, status, featured } = req.query;

    const projects = await prisma.projects.findMany({
      where: {
        ...(category && { category: category as string }),
        ...(division && { division: division as string }),
        ...(status && { status: status as string }),
        ...(featured && { featured: featured === 'true' }),
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// GET single project by slug
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const project = await prisma.projects.findUnique({
      where: { slug: req.params.slug },
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

export default router;
