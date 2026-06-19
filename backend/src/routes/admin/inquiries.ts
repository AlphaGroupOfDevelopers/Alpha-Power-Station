import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// All routes require authentication
router.use(authenticateToken);

// Get all inquiries
router.get('/', async (req, res) => {
  try {
    const inquiries = await prisma.contact_inquiries.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(inquiries);
  } catch (error) {
    console.error('Get inquiries error:', error);
    res.status(500).json({ error: 'Failed to fetch inquiries' });
  }
});

// Get single inquiry
router.get('/:id', async (req, res) => {
  try {
    const inquiry = await prisma.contact_inquiries.findUnique({
      where: { id: req.params.id },
    });

    if (!inquiry) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }

    res.json(inquiry);
  } catch (error) {
    console.error('Get inquiry error:', error);
    res.status(500).json({ error: 'Failed to fetch inquiry' });
  }
});

// Update inquiry status
router.patch('/:id', async (req, res) => {
  try {
    const { status, response } = req.body;

    const inquiry = await prisma.contact_inquiries.update({
      where: { id: req.params.id },
      data: {
        status,
        response,
        respondedAt: status === 'responded' ? new Date() : undefined,
      },
    });

    res.json(inquiry);
  } catch (error) {
    console.error('Update inquiry error:', error);
    res.status(500).json({ error: 'Failed to update inquiry' });
  }
});

// Delete inquiry
router.delete('/:id', async (req, res) => {
  try {
    await prisma.contact_inquiries.delete({
      where: { id: req.params.id },
    });

    res.json({ message: 'Inquiry deleted successfully' });
  } catch (error) {
    console.error('Delete inquiry error:', error);
    res.status(500).json({ error: 'Failed to delete inquiry' });
  }
});

export default router;
