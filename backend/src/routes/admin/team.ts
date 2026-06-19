import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { body, validationResult } from 'express-validator';
import { authenticateToken, requireRole } from '../../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

router.use(authenticateToken);

// Get all team members
router.get('/', async (req, res) => {
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
    console.error('Get team members error:', error);
    res.status(500).json({ error: 'Failed to fetch team members' });
  }
});

// Get single team member
router.get('/:id', async (req, res) => {
  try {
    const member = await prisma.team_members.findUnique({
      where: { id: req.params.id },
    });

    if (!member) {
      return res.status(404).json({ error: 'Team member not found' });
    }

    res.json(member);
  } catch (error) {
    console.error('Get team member error:', error);
    res.status(500).json({ error: 'Failed to fetch team member' });
  }
});

// Create team member
router.post(
  '/',
  requireRole('admin', 'editor'),
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('role').trim().notEmpty().withMessage('Role is required'),
    body('division').isIn(['AGD', 'AGEE']).withMessage('Invalid division'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const member = await prisma.team_members.create({
        data: req.body,
      });

      res.status(201).json({
        message: 'Team member created successfully',
        member,
      });
    } catch (error) {
      console.error('Create team member error:', error);
      res.status(500).json({ error: 'Failed to create team member' });
    }
  }
);

// Update team member
router.put(
  '/:id',
  requireRole('admin', 'editor'),
  async (req, res) => {
    try {
      const member = await prisma.team_members.update({
        where: { id: req.params.id },
        data: req.body,
      });

      res.json({
        message: 'Team member updated successfully',
        member,
      });
    } catch (error) {
      console.error('Update team member error:', error);
      res.status(500).json({ error: 'Failed to update team member' });
    }
  }
);

// Delete team member
router.delete(
  '/:id',
  requireRole('admin'),
  async (req, res) => {
    try {
      await prisma.team_members.delete({
        where: { id: req.params.id },
      });

      res.json({ message: 'Team member deleted successfully' });
    } catch (error) {
      console.error('Delete team member error:', error);
      res.status(500).json({ error: 'Failed to delete team member' });
    }
  }
);

export default router;
