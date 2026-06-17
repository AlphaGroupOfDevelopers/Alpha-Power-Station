import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET all projects
router.get('/', async (req, res) => {
  try {
    const { category, division, status } = req.query;
    
    const projects = await prisma.project.findMany({
      where: {
        ...(category && { category: category as string }),
        ...(division && { division: division as string }),
        ...(status && { status: status as string }),
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// GET single project
router.get('/:id', async (req, res) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: req.params.id },
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// POST create project (admin only - add auth middleware later)
router.post('/', async (req, res) => {
  try {
    const project = await prisma.project.create({
      data: req.body,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project' });
  }
});

export default router;
