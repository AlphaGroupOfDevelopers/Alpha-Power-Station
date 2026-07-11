# Alpha Power Station - Navigation Map

Complete list of all pages and their URLs for easy testing and navigation.

---

## 🏠 Main Navigation (8 Pages)

| # | Page | URL | Status | File |
|---|------|-----|--------|------|
| 1 | **Home** | `/` | ✅ | `src/app/page.tsx` |
| 2 | **About Us** | `/about` | ✅ | `src/app/about/page.tsx` |
| 3 | **Our Team** | `/team` | ✅ | `src/app/team/page.tsx` |
| 4 | **Projects** | `/projects` | ✅ | `src/app/projects/page.tsx` |
| 5 | **Student Programs** | `/student-programs` | ✅ | `src/app/student-programs/page.tsx` |
| 6 | **Partnerships** | `/partnerships` | ✅ | `src/app/partnerships/page.tsx` |
| 7 | **News & Insights** | `/news` | ✅ | `src/app/news/page.tsx` |
| 8 | **Contact** | `/contact` | ✅ | `src/app/contact/page.tsx` |

---

## 📄 Sub-Pages (5 Additional Pages)

| # | Page | URL Pattern | Example URL | Status | File |
|---|------|-------------|-------------|--------|------|
| 9 | **Project Detail** | `/projects/[slug]` | `/projects/smart-prepaid-meter` | ✅ | `src/app/projects/[slug]/page.tsx` |
| 10 | **Innovation Roadmap** | `/projects/roadmap` | `/projects/roadmap` | ✅ | `src/app/projects/roadmap/page.tsx` |
| 11 | **Application Portal** | `/student-programs/apply` | `/student-programs/apply` | ✅ | `src/app/student-programs/apply/page.tsx` |
| 12 | **Student FAQ** | `/student-programs/faq` | `/student-programs/faq` | ✅ | `src/app/student-programs/faq/page.tsx` |
| 13 | **Blog Post Detail** | `/news/[slug]` | `/news/smart-meter-deployment-milestone` | ✅ | `src/app/news/[slug]/page.tsx` |

---

## 🧪 Test URLs

Copy and paste these URLs into your browser (assuming server is running on `http://localhost:3000`):

### Main Pages
```
http://localhost:3000/
http://localhost:3000/about
http://localhost:3000/team
http://localhost:3000/projects
http://localhost:3000/student-programs
http://localhost:3000/partnerships
http://localhost:3000/news
http://localhost:3000/contact
```

### Sub-Pages
```
http://localhost:3000/projects/smart-prepaid-meter
http://localhost:3000/projects/roadmap
http://localhost:3000/student-programs/apply
http://localhost:3000/student-programs/faq
http://localhost:3000/news/smart-meter-deployment-milestone
```

---

## 🎯 Primary Call-to-Actions

### "Apply Now" Button Destinations
- Header: → `/student-programs/apply`
- Home hero: → `/student-programs/apply`
- Multiple CTAs throughout pages: → `/student-programs/apply`

### "Partner with Us" Button Destinations
- Home hero: → `/partnerships`
- Various pages: → `/partnerships`

### "Contact Us" Destinations
- Header navigation: → `/contact`
- Footer: → `/contact`

---

## 🔗 Internal Link Flow

### From Home Page (`/`)
- Hero CTAs → `/student-programs/apply`, `/partnerships`
- Project cards → `/projects`
- Team testimonials → Implicit `/student-programs`
- Bottom CTA → `/student-programs/apply`, `/about`

### From About Page (`/about`)
- Bottom CTA → `/student-programs/apply`

### From Team Page (`/team`)
- Bottom CTA → `/student-programs/apply`

### From Projects Page (`/projects`)
- Individual project cards → `/projects/[slug]`
- Roadmap link → `/projects/roadmap`
- Bottom CTA → `/student-programs/apply`

### From Student Programs Page (`/student-programs`)
- "Apply Now" CTA → `/student-programs/apply`
- "Read FAQ" link → `/student-programs/faq`

### From News Page (`/news`)
- Article cards → `/news/[slug]`
- Events CTA → `/contact`

### From Contact Page (`/contact`)
- Quick links → `/student-programs/apply`, `/student-programs/faq`, `/partnerships`

---

## 📱 Mobile Considerations

All pages are responsive and should work on:
- Desktop (1920px+)
- Laptop (1024px - 1920px)
- Tablet (768px - 1024px)
- Mobile (320px - 768px)

**Note**: Mobile menu functionality in header needs implementation (button exists, menu logic needed).

---

## 🧭 Sitemap Structure

```
Alpha Power Station
│
├── Home (/)
│
├── About Us (/about)
│
├── Our Team (/team)
│
├── Projects (/projects)
│   ├── Individual Project (/projects/[slug])
│   └── Innovation Roadmap (/projects/roadmap)
│
├── Student Programs (/student-programs)
│   ├── Application Portal (/student-programs/apply)
│   └── FAQ (/student-programs/faq)
│
├── Partnerships (/partnerships)
│
├── News & Insights (/news)
│   └── Blog Post (/news/[slug])
│
└── Contact (/contact)
```

---

## ✅ Testing Checklist

When testing the website, verify:

- [ ] All 8 main navigation links work
- [ ] Header navigation is sticky on scroll
- [ ] "Apply Now" button appears and works on all pages
- [ ] Footer links work correctly
- [ ] Project portfolio filters work (phase and division)
- [ ] Student application multi-step form progresses correctly
- [ ] FAQ accordion expands/collapses
- [ ] News article listing displays correctly
- [ ] Contact form validates inputs
- [ ] All CTAs lead to correct destinations
- [ ] Mobile responsiveness on all pages
- [ ] No 404 errors on any main or sub-pages

---

## 🚀 Quick Start Testing

1. **Start the frontend server:**
   ```powershell
   cd frontend
   npm run dev
   ```

2. **Open browser to:**
   ```
   http://localhost:3000
   ```

3. **Test navigation:**
   - Click through all 8 header links
   - Try "Apply Now" button from different pages
   - Navigate to sub-pages (projects detail, news articles)
   - Test forms (student application, contact form)

---

**All 13 pages are complete and ready for testing!** ✅
