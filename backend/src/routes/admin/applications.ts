import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { body, validationResult } from 'express-validator';
import { authenticateToken, requireRole } from '../../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

router.use(authenticateToken);

// Get all applications with filters
router.get('/', async (req, res) => {
  try {
    const { status, division } = req.query;

    const applications = await prisma.student_applications.findMany({
      where: {
        ...(status && { status: status as string }),
        ...(division && { division: division as string }),
      },
      orderBy: { createdAt: 'desc' },
    });

    // Get stats
    const stats = await prisma.student_applications.groupBy({
      by: ['status'],
      _count: true,
    });

    res.json({
      applications,
      stats,
    });
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// Get single application
router.get('/:id', async (req, res) => {
  try {
    const application = await prisma.student_applications.findUnique({
      where: { id: req.params.id },
    });

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json(application);
  } catch (error) {
    console.error('Get application error:', error);
    res.status(500).json({ error: 'Failed to fetch application' });
  }
});

// Update application status
router.patch(
  '/:id/status',
  requireRole('admin', 'editor'),
  [
    body('status')
      .isIn(['pending', 'reviewed', 'accepted', 'rejected'])
      .withMessage('Invalid status'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { status, reviewNotes } = req.body;

      const application = await prisma.student_applications.update({
        where: { id: req.params.id },
        data: {
          status,
          ...(reviewNotes && { reviewNotes }),
          ...(status !== 'pending' && { reviewedAt: new Date() }),
        },
      });

      res.json({
        message: 'Application status updated successfully',
        application,
      });
    } catch (error) {
      console.error('Update application status error:', error);
      res.status(500).json({ error: 'Failed to update application status' });
    }
  }
);

// Delete application
router.delete(
  '/:id',
  requireRole('admin'),
  async (req, res) => {
    try {
      await prisma.student_applications.delete({
        where: { id: req.params.id },
      });

      res.json({ message: 'Application deleted successfully' });
    } catch (error) {
      console.error('Delete application error:', error);
      res.status(500).json({ error: 'Failed to delete application' });
    }
  }
);

export default router;
