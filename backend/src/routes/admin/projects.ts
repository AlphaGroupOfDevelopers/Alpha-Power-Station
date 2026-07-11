import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { body, validationResult } from 'express-validator';
import { authenticateToken, requireRole } from '../../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// All routes require authentication
router.use(authenticateToken);

// Get all projects (with filters)
router.get('/', async (req, res) => {
  try {
    const { status, category, division, featured } = req.query;

    const projects = await prisma.projects.findMany({
      where: {
        ...(status && { status: status as string }),
        ...(category && { category: category as string }),
        ...(division && { division: division as string }),
        ...(featured && { featured: featured === 'true' }),
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(projects);
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Get single project
router.get('/:id', async (req, res) => {
  try {
    const project = await prisma.projects.findUnique({
      where: { id: req.params.id },
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// Create project (admin/editor only)
router.post(
  '/',
  requireRole('admin', 'editor'),
  [
    body('slug').trim().notEmpty().withMessage('Slug is required'),
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('category').isIn(['foundational', 'commercial', 'infrastructure']).withMessage('Invalid category'),
    body('division').isIn(['AGD', 'AGEE', 'integrated']).withMessage('Invalid division'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if slug exists
      const existing = await prisma.projects.findUnique({
        where: { slug: req.body.slug },
      });

      if (existing) {
        return res.status(409).json({ error: 'Project with this slug already exists' });
      }

      const project = await prisma.projects.create({
        data: req.body,
      });

      res.status(201).json({
        message: 'Project created successfully',
        project,
      });
    } catch (error) {
      console.error('Create project error:', error);
      res.status(500).json({ error: 'Failed to create project' });
    }
  }
);

// Update project (admin/editor only)
router.put(
  '/:id',
  requireRole('admin', 'editor'),
  async (req, res) => {
    try {
      const project = await prisma.projects.update({
        where: { id: req.params.id },
        data: req.body,
      });

      res.json({
        message: 'Project updated successfully',
        project,
      });
    } catch (error) {
      console.error('Update project error:', error);
      res.status(500).json({ error: 'Failed to update project' });
    }
  }
);

// Delete project (admin only)
router.delete(
  '/:id',
  requireRole('admin'),
  async (req, res) => {
    try {
      await prisma.projects.delete({
        where: { id: req.params.id },
      });

      res.json({ message: 'Project deleted successfully' });
    } catch (error) {
      console.error('Delete project error:', error);
      res.status(500).json({ error: 'Failed to delete project' });
    }
  }
);

// Publish/unpublish project
router.patch(
  '/:id/publish',
  requireRole('admin', 'editor'),
  async (req, res) => {
    try {
      const { publish } = req.body;

      const project = await prisma.projects.update({
        where: { id: req.params.id },
        data: {
          publishedAt: publish ? new Date() : null,
        },
      });

      res.json({
        message: `Project ${publish ? 'published' : 'unpublished'} successfully`,
        project,
      });
    } catch (error) {
      console.error('Publish project error:', error);
      res.status(500).json({ error: 'Failed to update project' });
    }
  }
);

export default router;
