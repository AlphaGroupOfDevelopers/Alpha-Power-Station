import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { body, validationResult } from 'express-validator';
import { uploadApplicationFiles } from '../middleware/upload';
import { absoluteUploadUrl } from '../utils/url';

const router = Router();
const prisma = new PrismaClient();

// POST submit student application
router.post(
  '/apply',
  uploadApplicationFiles,
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

      const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
      const resumeFile = files?.resume?.[0];
      const coverLetterFile = files?.coverLetter?.[0];

      const {
        firstName,
        lastName,
        email,
        phone,
        university,
        program,
        yearOfStudy,
        expectedGraduation,
        division,
        primaryInterest,
        secondaryInterest,
        relevantCourses,
        projects,
        githubUrl,
        portfolioUrl,
        whyApply,
        whatContribute,
        availability,
      } = req.body;

      const application = await prisma.student_applications.create({
        data: {
          firstName,
          lastName,
          email,
          phone,
          university,
          program,
          yearOfStudy,
          expectedGraduation,
          division,
          primaryInterest,
          secondaryInterest,
          relevantCourses,
          projects,
          githubUrl,
          portfolioUrl,
          whyApply,
          whatContribute,
          availability,
          resume: resumeFile ? absoluteUploadUrl(req, resumeFile.filename) : undefined,
          coverLetter: coverLetterFile ? absoluteUploadUrl(req, coverLetterFile.filename) : undefined,
        },
      });

      res.status(201).json({
        message: 'Application submitted successfully',
        applicationId: application.id,
      });
    } catch (error) {
      console.error('Application submission error:', error);
      res.status(500).json({ error: 'Failed to submit application' });
    }
  }
);

export default router;
