import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, requireRole } from '../../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

router.use(authenticateToken);

// Get all applications with filters
router.get('/', async (req, res) => {
  try {
    const { status, division } = req.query;

    const applications = await prisma.studentApplication.findMany({
      where: {
        ...(status && { status: status as string }),
        ...(division && { division: division as string }),
      },
      orderBy: { createdAt: 'desc' },
    });

    // Get stats
    const stats = await prisma.studentApplication.groupBy({
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
    const application = await prisma.studentApplication.findUnique({
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
  async (req, res) => {
    try {
      const { status, reviewNotes } = req.body;

      const application = await prisma.studentApplication.update({
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
      await prisma.studentApplication.delete({
        where: { id: req.params.id },
      });

      res.json({ message: 'Application deleted successfully' });
    } catch (error) {
      console.error('Delete application error:', error);
      res.status(500).json({ error: 'Failed to delete application' });
    }
  }
);

// Get contact inquiries
router.get('/contact/inquiries', async (req, res) => {
  try {
    const { status, type } = req.query;

    const inquiries = await prisma.contactInquiry.findMany({
      where: {
        ...(status && { status: status as string }),
        ...(type && { type: type as string }),
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(inquiries);
  } catch (error) {
    console.error('Get inquiries error:', error);
    res.status(500).json({ error: 'Failed to fetch inquiries' });
  }
});

// Update inquiry status
router.patch(
  '/contact/:id/status',
  requireRole('admin', 'editor'),
  async (req, res) => {
    try {
      const { status, response } = req.body;

      const inquiry = await prisma.contactInquiry.update({
        where: { id: req.params.id },
        data: {
          status,
          ...(response && { response }),
          ...(status === 'responded' && { respondedAt: new Date() }),
        },
      });

      res.json({
        message: 'Inquiry status updated successfully',
        inquiry,
      });
    } catch (error) {
      console.error('Update inquiry status error:', error);
      res.status(500).json({ error: 'Failed to update inquiry status' });
    }
  }
);

export default router;
