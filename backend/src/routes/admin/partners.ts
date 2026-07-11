import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { body, validationResult } from 'express-validator';
import { authenticateToken, requireRole } from '../../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

router.use(authenticateToken);

// Get all partners
router.get('/', async (req, res) => {
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
    console.error('Get partners error:', error);
    res.status(500).json({ error: 'Failed to fetch partners' });
  }
});

// Get single partner
router.get('/:id', async (req, res) => {
  try {
    const partner = await prisma.partners.findUnique({
      where: { id: req.params.id },
    });

    if (!partner) {
      return res.status(404).json({ error: 'Partner not found' });
    }

    res.json(partner);
  } catch (error) {
    console.error('Get partner error:', error);
    res.status(500).json({ error: 'Failed to fetch partner' });
  }
});

// Create partner
router.post(
  '/',
  requireRole('admin', 'editor'),
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('category').trim().notEmpty().withMessage('Category is required'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const partner = await prisma.partners.create({
        data: req.body,
      });

      res.status(201).json({
        message: 'Partner created successfully',
        partner,
      });
    } catch (error) {
      console.error('Create partner error:', error);
      res.status(500).json({ error: 'Failed to create partner' });
    }
  }
);

// Update partner
router.put(
  '/:id',
  requireRole('admin', 'editor'),
  async (req, res) => {
    try {
      const partner = await prisma.partners.update({
        where: { id: req.params.id },
        data: req.body,
      });

      res.json({
        message: 'Partner updated successfully',
        partner,
      });
    } catch (error) {
      console.error('Update partner error:', error);
      res.status(500).json({ error: 'Failed to update partner' });
    }
  }
);

// Delete partner
router.delete(
  '/:id',
  requireRole('admin'),
  async (req, res) => {
    try {
      await prisma.partners.delete({
        where: { id: req.params.id },
      });

      res.json({ message: 'Partner deleted successfully' });
    } catch (error) {
      console.error('Delete partner error:', error);
      res.status(500).json({ error: 'Failed to delete partner' });
    }
  }
);

export default router;
