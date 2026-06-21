import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { body, validationResult } from 'express-validator';
import { authenticateToken, requireRole } from '../../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

router.use(authenticateToken);

// Get all testimonials
router.get('/', async (req, res) => {
  try {
    const { division, isActive } = req.query;

    const testimonials = await prisma.testimonials.findMany({
      where: {
        ...(division && { division: division as string }),
        ...(isActive !== undefined && { isActive: isActive === 'true' }),
      },
      orderBy: { order: 'asc' },
    });

    res.json(testimonials);
  } catch (error) {
    console.error('Get testimonials error:', error);
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

// Get single testimonial
router.get('/:id', async (req, res) => {
  try {
    const testimonial = await prisma.testimonials.findUnique({
      where: { id: req.params.id },
    });

    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }

    res.json(testimonial);
  } catch (error) {
    console.error('Get testimonial error:', error);
    res.status(500).json({ error: 'Failed to fetch testimonial' });
  }
});

// Create testimonial
router.post(
  '/',
  requireRole('admin', 'editor'),
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('role').trim().notEmpty().withMessage('Role is required'),
    body('division').isIn(['AGD', 'AGEE']).withMessage('Invalid division'),
    body('content').trim().notEmpty().withMessage('Content is required'),
  ],
  async (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const testimonial = await prisma.testimonials.create({
        data: req.body,
      });

      res.status(201).json({
        message: 'Testimonial created successfully',
        testimonial,
      });
    } catch (error) {
      console.error('Create testimonial error:', error);
      res.status(500).json({ error: 'Failed to create testimonial' });
    }
  }
);

// Update testimonial
router.put(
  '/:id',
  requireRole('admin', 'editor'),
  async (req, res) => {
    try {
      const testimonial = await prisma.testimonials.update({
        where: { id: req.params.id },
        data: req.body,
      });

      res.json({
        message: 'Testimonial updated successfully',
        testimonial,
      });
    } catch (error) {
      console.error('Update testimonial error:', error);
      res.status(500).json({ error: 'Failed to update testimonial' });
    }
  }
);

// Delete testimonial
router.delete(
  '/:id',
  requireRole('admin'),
  async (req, res) => {
    try {
      await prisma.testimonials.delete({
        where: { id: req.params.id },
      });

      res.json({ message: 'Testimonial deleted successfully' });
    } catch (error) {
      console.error('Delete testimonial error:', error);
      res.status(500).json({ error: 'Failed to delete testimonial' });
    }
  }
);

export default router;
