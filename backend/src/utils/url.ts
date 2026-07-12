import { Request } from 'express';

// Builds an absolute URL for a file served from /uploads, so links work
// correctly from other origins (e.g. the admin dashboard on a different
// domain than this API). Relies on `app.set('trust proxy', 1)` already
// being configured so req.protocol reflects the original scheme behind
// Render's proxy.
export function absoluteUploadUrl(req: Request, filename: string): string {
  return `${req.protocol}://${req.get('host')}/uploads/${filename}`;
}
