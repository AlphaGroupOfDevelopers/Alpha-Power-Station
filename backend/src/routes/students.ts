import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { body, validationResult } from 'express-validator';

const router = Router();
const prisma = new PrismaClient();

// POST submit student application
router.post(
  '/apply',
  [
    body('firstName').trim().notEmpty().withMessage('First name is required'),
    body('lastName').trim().notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').trim().notEmpty().withMessage('Phone number is required'),
    body('division').isIn(['AGD', 'AGEE']).withMessage('Invalid division'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if email already exists
      const existing = await prisma.student_applications.findUnique({
        where: { email: req.body.email },
      });

      if (existing) {
        return res.status(409).json({ error: 'Application with this email already exists' });
      }

      const application = await prisma.student_applications.create({
        data: req.body,
      });

      res.status(201).json({
        message: 'Application submitted successfully',
        applicationId: application.id,
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to submit application' });
    }
  }
);

// GET all applications (admin only - add auth middleware later)
router.get('/applications', async (req: Request, res: Response) => {
  try {
    const { status, division } = req.query;
    
    const applications = await prisma.student_applications.findMany({
      where: {
        ...(status && { status: status as string }),
        ...(division && { division: division as string }),
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

export default router;
