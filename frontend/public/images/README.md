# Hero Background Images

## How to Add Your Images

1. **Place your images in this folder** (`frontend/public/images/`)

2. **Rename your images** to match the carousel configuration:
   - `hero1.jpg` - First slide image
   - `hero2.jpg` - Second slide image
   - `hero3.jpg` - Third slide image
   - Add more as needed

3. **Supported formats**: 
   - JPG/JPEG (recommended for photos)
   - PNG (for images with transparency)
   - WebP (for optimized web images)

4. **Recommended image specifications**:
   - **Dimensions**: 1920x1080 px or larger (16:9 ratio)
   - **File size**: Under 500KB per image (optimize for web)
   - **Subject**: Engineering, technology, infrastructure themes
   - **Brightness**: Slightly darker images work better (overlay is applied)

## Example File Structure

```
frontend/public/images/
├── hero1.jpg    (Main hero image)
├── hero2.jpg    (Secondary image)
├── hero3.jpg    (Tertiary image)
└── README.md    (This file)
```

## Customizing the Carousel

To modify the carousel behavior, edit `frontend/src/app/page.tsx`:

```typescript
const heroImages = [
  '/images/hero1.jpg',
  '/images/hero2.jpg',
  '/images/hero3.jpg',
  '/images/hero4.jpg',  // Add more images
];
```

### Change slide interval (default: 5000ms = 5 seconds):

```typescript
<HeroCarousel images={heroImages} interval={7000}>
```

## Image Optimization Tips

1. **Compress images** before uploading:
   - Use tools like TinyPNG, ImageOptim, or Squoosh
   - Target: 200-500KB per image

2. **Use appropriate dimensions**:
   - Don't upload 4K images if not needed
   - 1920x1080 is usually sufficient

3. **Consider WebP format**:
   - Smaller file size
   - Better quality at same size
   - Modern browser support

## Troubleshooting

### Images not showing?
1. Check file names match exactly (case-sensitive on some systems)
2. Verify images are in `public/images/` folder
3. Clear browser cache and reload
4. Check browser console for errors

### Carousel not sliding?
1. Make sure you have at least 2 images
2. Check that all image paths are correct
3. Verify the component is rendered (check React DevTools)

---

**Current Status**: 
- ✅ Carousel component created
- ✅ Home page updated
- ⏳ Waiting for your images

**Add your images to this folder to activate the carousel!**
