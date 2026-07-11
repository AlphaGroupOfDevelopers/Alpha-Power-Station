# Alpha Power Station - CORRECT Site Structure (Per WRD)

## 🎯 8 Main Navigation Tabs (From WRD Section 4)

### 1. **Home** (Section 4.1) ✅
**URL:** `/`
**Type:** Single page
**Content:**
- Hero section with tagline and CTAs
- Introduction to Alpha Power Station
- Key value propositions (3 cards)
- Project highlights (2-3 projects)
- Student testimonials
- Call to action sections

**Status:** ✅ Complete

---

### 2. **About Us** (Section 4.2) ✅
**URL:** `/about`
**Type:** Single comprehensive page (ALL content on ONE page)
**Content:**
- Vision & Mission
- Africa-Proof Engineering Philosophy (6 principles)
- Organizational Structure (AGD & AGEE)
- Our Story/History
- Values (6 values)

**Status:** ✅ Complete

---

### 3. **Our Team** (Section 4.3) ⏳
**URL:** `/team`
**Type:** Single page
**Content:**
- Executive Leadership profiles
- Team Structure overview
- Student Spotlights

**Status:** To build

---

### 4. **Projects** (Section 4.4) ⏳
**URL:** `/projects`
**Type:** Main page + individual project pages
**Pages:**
- `/projects` - Portfolio listing (by category)
- `/projects/[slug]` - Individual project pages
- `/projects/roadmap` - Innovation Pipeline

**Content (Portfolio):**
- Categorized project listing (Foundational, Commercial, Infrastructure)
- Filter by division (AGD, AGEE, Integrated)

**Content (Individual Projects):**
- Overview
- Technical Details (progressive disclosure)
- Methodology (4-stage workflow)
- Results & Impact
- Visuals

**Status:** To build

---

### 5. **Student Programs & Careers** (Section 4.5) ⏳
**URL:** `/student-programs`
**Type:** Main page + application portal sub-pages
**Pages:**
- `/student-programs` - Main landing page
- `/student-programs/apply` - Multi-step application form
- `/student-programs/faq` - FAQ page

**Content (Main):**
- Why Join Alpha Power Station?
- Programs/Tracks description
- Application Process overview
- Testimonials

**Content (Application Portal - Section 5):**
Multi-step form:
1. Account Creation
2. Profile & Academics
3. Division Selection (AGD/AGEE)
4. Document Upload
5. Review & Submit
- Application tracking
- Automated emails

**Status:** To build

---

### 6. **Partnerships & Collaborations** (Section 4.6) ⏳
**URL:** `/partnerships`
**Type:** Single page
**Content:**
- Partner with Us invitation
- Areas of Collaboration
- Regulatory & Standards Compliance
- Incubation & Technology Transfer

**Status:** To build

---

### 7. **News & Insights** (Section 4.7) ⏳
**URL:** `/news`
**Type:** Main page + individual blog post pages
**Pages:**
- `/news` - Blog listing & events calendar
- `/news/[slug]` - Individual blog posts

**Content:**
- Blog/News articles
- Events information
- Thought leadership

**Status:** To build

---

### 8. **Contact Us** (Section 4.8) ⏳
**URL:** `/contact`
**Type:** Single page
**Content:**
- General Inquiries form
- Media Inquiries contact
- Business Development contact
- Location (with map if applicable)

**Status:** To build

---

## 📁 File Structure

```
frontend/src/app/
├── page.tsx                           ✅ Homepage
├── layout.tsx                         ✅ Root layout
│
├── about/
│   └── page.tsx                       ✅ About Us (single comprehensive page)
│
├── team/
│   └── page.tsx                       ⏳ Our Team
│
├── projects/
│   ├── page.tsx                       ⏳ Project portfolio
│   ├── [slug]/
│   │   └── page.tsx                   ⏳ Individual projects
│   └── roadmap/
│       └── page.tsx                   ⏳ Innovation pipeline
│
├── student-programs/
│   ├── page.tsx                       ⏳ Student programs landing
│   ├── apply/
│   │   └── page.tsx                   ⏳ Application portal (multi-step)
│   └── faq/
│       └── page.tsx                   ⏳ FAQ
│
├── partnerships/
│   └── page.tsx                       ⏳ Partnerships
│
├── news/
│   ├── page.tsx                       ⏳ News listing
│   └── [slug]/
│       └── page.tsx                   ⏳ Individual blog posts
│
└── contact/
    └── page.tsx                       ⏳ Contact Us
```

---

## 🎨 Navigation Structure

### Header (Top Navigation)
```
Home | About Us | Our Team | Projects | Student Programs | Partnerships | News & Insights | Contact | [Apply Now Button]
```

### Footer
- Quick Links to all 8 main pages
- Resources (FAQ, etc.)
- Contact information
- Copyright & branding

---

## ✅ Current Status

| Page | Status | Notes |
|------|--------|-------|
| Home | ✅ Complete | All sections per WRD |
| About Us | ✅ Complete | Single comprehensive page |
| Our Team | ⏳ To Build | Executive + Team + Students |
| Projects | ⏳ To Build | Portfolio + Individual pages |
| Student Programs | ⏳ To Build | Landing + Application portal |
| Partnerships | ⏳ To Build | Single page |
| News & Insights | ⏳ To Build | Listing + Blog posts |
| Contact | ⏳ To Build | Contact forms |

---

## 🔄 Next Priority

According to WRD emphasis on **student recruitment**, build in this order:

1. **Student Programs** (critical for recruitment)
2. **Projects** (shows students what they'll work on)
3. **Our Team** (shows students their mentors)
4. **Partnerships** (credibility)
5. **Contact** (essential utility)
6. **News & Insights** (content marketing)

---

**This structure matches the WRD exactly!** ✅
