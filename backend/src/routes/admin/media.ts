import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, requireRole } from '../../middleware/auth';
import { uploadSingle, uploadMultiple } from '../../middleware/upload';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { absoluteUploadUrl } from '../../utils/url';

const router = Router();
const prisma = new PrismaClient();

router.use(authenticateToken);

// Get all media assets
router.get('/', async (req, res) => {
  try {
    const { folder } = req.query;

    const assets = await prisma.media_assets.findMany({
      where: {
        ...(folder && { folder: folder as string }),
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(assets);
  } catch (error) {
    console.error('Get media assets error:', error);
    res.status(500).json({ error: 'Failed to fetch media assets' });
  }
});

// Upload single file
router.post(
  '/upload',
  requireRole('admin', 'editor'),
  uploadSingle,
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const file = req.file;
      const folder = req.body.folder || 'general';
      
      // Generate absolute URL so it resolves correctly from other origins (e.g. admin dashboard)
      const url = absoluteUploadUrl(req, file.filename);

      // Create thumbnail for images
      let thumbnail = null;
      if (file.mimetype.startsWith('image/')) {
        const thumbnailFilename = `thumb-${file.filename}`;
        const thumbnailPath = path.join(process.cwd(), 'uploads', thumbnailFilename);

        await sharp(file.path)
          .resize(300, 300, { fit: 'cover' })
          .toFile(thumbnailPath);

        thumbnail = absoluteUploadUrl(req, thumbnailFilename);
      }

      // Save to database
      const asset = await prisma.media_assets.create({
        data: {
          filename: file.filename,
          originalName: file.originalname,
          mimeType: file.mimetype,
          size: file.size,
          url,
          thumbnail: thumbnail || undefined,
          folder,
          uploadedBy: req.user?.email || undefined,
        },
      });

      res.status(201).json({
        message: 'File uploaded successfully',
        asset,
      });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: 'Failed to upload file' });
    }
  }
);

// Upload multiple files
router.post(
  '/upload-multiple',
  requireRole('admin', 'editor'),
  uploadMultiple,
  async (req, res) => {
    try {
      if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
        return res.status(400).json({ error: 'No files uploaded' });
      }

      const folder = req.body.folder || 'general';
      const assets = [];

      for (const file of req.files) {
        const url = absoluteUploadUrl(req, file.filename);

        // Create thumbnail for images
        let thumbnail = null;
        if (file.mimetype.startsWith('image/')) {
          const thumbnailFilename = `thumb-${file.filename}`;
          const thumbnailPath = path.join(process.cwd(), 'uploads', thumbnailFilename);

          await sharp(file.path)
            .resize(300, 300, { fit: 'cover' })
            .toFile(thumbnailPath);

          thumbnail = absoluteUploadUrl(req, thumbnailFilename);
        }

        const asset = await prisma.media_assets.create({
          data: {
            filename: file.filename,
            originalName: file.originalname,
            mimeType: file.mimetype,
            size: file.size,
            url,
            thumbnail: thumbnail || undefined,
            folder,
            uploadedBy: req.user?.email || undefined,
          },
        });

        assets.push(asset);
      }

      res.status(201).json({
        message: `${assets.length} files uploaded successfully`,
        assets,
      });
    } catch (error) {
      console.error('Upload multiple error:', error);
      res.status(500).json({ error: 'Failed to upload files' });
    }
  }
);

// Delete media asset
router.delete(
  '/:id',
  requireRole('admin', 'editor'),
  async (req, res) => {
    try {
      const asset = await prisma.media_assets.findUnique({
        where: { id: req.params.id },
      });

      if (!asset) {
        return res.status(404).json({ error: 'Asset not found' });
      }

      // Delete physical files
      const filePath = path.join(process.cwd(), 'uploads', asset.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      if (asset.thumbnail) {
        const thumbPath = path.join(process.cwd(), 'uploads', path.basename(asset.thumbnail));
        if (fs.existsSync(thumbPath)) {
          fs.unlinkSync(thumbPath);
        }
      }

      // Delete from database
      await prisma.media_assets.delete({
        where: { id: req.params.id },
      });

      res.json({ message: 'Asset deleted successfully' });
    } catch (error) {
      console.error('Delete asset error:', error);
      res.status(500).json({ error: 'Failed to delete asset' });
    }
  }
);

export default router;
