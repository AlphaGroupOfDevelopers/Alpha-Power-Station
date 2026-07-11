import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET all team members
router.get('/', async (req: Request, res: Response) => {
  try {
    const { division, featured } = req.query;

    const members = await prisma.team_members.findMany({
      where: {
        ...(division && { division: division as string }),
        ...(featured && { featured: featured === 'true' }),
      },
      orderBy: { order: 'asc' },
    });

    res.json(members);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team members' });
  }
});

// GET single team member
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const member = await prisma.team_members.findUnique({
      where: { id: req.params.id },
    });

    if (!member) {
      return res.status(404).json({ error: 'Team member not found' });
    }

    res.json(member);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team member' });
  }
});

export default router;
