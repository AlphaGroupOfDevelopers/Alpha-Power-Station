import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { body, validationResult } from 'express-validator';

const router = Router();
const prisma = new PrismaClient();

// POST submit contact inquiry
router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('subject').trim().notEmpty().withMessage('Subject is required'),
    body('message').trim().notEmpty().withMessage('Message is required'),
    body('type').optional().isIn(['general', 'partnership', 'media']),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const inquiry = await prisma.contactInquiry.create({
        data: req.body,
      });

      res.status(201).json({
        message: 'Your message has been sent successfully',
        inquiryId: inquiry.id,
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to submit inquiry' });
    }
  }
);

// GET all inquiries (admin only - add auth middleware later)
router.get('/', async (req, res) => {
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
    res.status(500).json({ error: 'Failed to fetch inquiries' });
  }
});

export default router;
