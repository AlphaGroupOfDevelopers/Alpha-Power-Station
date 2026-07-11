# Complete CMS Content Audit

## Current Status: Content NOT in Admin System

This document lists ALL hardcoded content that needs to be manageable from the admin panel.

---

## ✅ ALREADY MANAGEABLE IN ADMIN

1. **Projects** - Full CRUD
2. **News/Blog Posts** - Full CRUD
3. **Team Members** - Full CRUD (but missing actual member data)
4. **Partners** - Full CRUD
5. **Student Applications** - View/Manage
6. **Contact Inquiries** - View/Manage
7. **Media Library** - Upload/Manage

---

## ❌ MISSING FROM ADMIN - NEEDS TO BE ADDED

### HOMEPAGE (`frontend/src/app/page.tsx`)

#### Hero Section
- [ ] Hero carousel images (5 images)
- [ ] Main headline: "Building the Future of Africa-Proof Engineering"
- [ ] Subheadline text
- [ ] CTA button text ("Apply Now", "Partner with Us")

#### Introduction Section
- [ ] Section heading: "Integrated Engineering Excellence"
- [ ] Introduction paragraph (about AGD & AGEE)

#### "What Makes Us Different" Section (3 cards)
- [ ] Card 1: Africa-Proof Engineering
  - Icon, title, description
- [ ] Card 2: E-Waste Upcycling
  - Icon, title, description
- [ ] Card 3: Integrated Solutions
  - Icon, title, description

#### Featured Projects Section (3 project cards)
- [ ] Section heading
- [ ] Project 1: Smart Prepaid Meter
  - Badge, title, description
- [ ] Project 2: E-Waste Upcycling
  - Badge, title, description
- [ ] Project 3: Hybrid Solar Microgrid
  - Badge, title, description

#### Student Testimonials (2 testimonials)
- [ ] Testimonial 1: Kofi Mensah
  - Name, role, division, quote, avatar
- [ ] Testimonial 2: Amina Nkrumah
  - Name, role, division, quote, avatar

#### CTA Section
- [ ] Heading
- [ ] Description
- [ ] Button texts

---

### ABOUT PAGE (`frontend/src/app/about/page.tsx`)

#### Hero
- [ ] Video background file
- [ ] Hero title
- [ ] Hero subtitle

#### Vision & Mission
- [ ] Vision statement (full text)
- [ ] Mission statement (full text)

#### Africa-Proof Engineering Philosophy (6 principles)
- [ ] Principle 1: Rugged Design - icon, title, description
- [ ] Principle 2: Repairable - icon, title, description
- [ ] Principle 3: Power-Resilient - icon, title, description
- [ ] Principle 4: Serviceable - icon, title, description
- [ ] Principle 5: Supply-Chain Adapted - icon, title, description
- [ ] Principle 6: Commercially Viable - icon, title, description

#### Organizational Structure
- [ ] Section intro text
- [ ] AGD Division description
  - Focus areas (5 bullet points)
- [ ] AGEE Division description
  - Focus areas (5 bullet points)
- [ ] Integration explanation
- [ ] 4-stage workflow description

#### Our Story
- [ ] Full story text (4 paragraphs)
- [ ] Key milestones

#### Our Values (6 values)
- [ ] Value 1: Excellence in Engineering - icon, title, description
- [ ] Value 2: Sustainability First - icon, title, description
- [ ] Value 3: Collaboration & Integration - icon, title, description
- [ ] Value 4: Continuous Learning - icon, title, description
- [ ] Value 5: African Context - icon, title, description
- [ ] Value 6: Innovation with Impact - icon, title, description

---

### TEAM PAGE (`frontend/src/app/team/page.tsx`)

#### Hero
- [ ] Hero title
- [ ] Hero subtitle

#### Executive Leadership (5 positions)
- [ ] Chief Engineer
  - Title, role, description, avatar
- [ ] Power Systems Lead
  - Title, role, description, avatar
- [ ] Embedded Systems Lead
  - Title, role, description, avatar
- [ ] R&D Lead
  - Title, role, description, avatar
- [ ] Operations Lead
  - Title, role, description, avatar

#### Team Structure - AGD Teams (4 teams)
- [ ] Embedded Systems Team - name, description
- [ ] IoT & Connectivity Team - name, description
- [ ] Web & Mobile Team - name, description
- [ ] Protocol Implementation Team - name, description

#### Team Structure - AGEE Teams (4 teams)
- [ ] Power Electronics Team - name, description
- [ ] PCB Design Team - name, description
- [ ] Renewable Energy Team - name, description
- [ ] Testing & Certification Team - name, description

#### Cross-Functional Collaboration
- [ ] Description text

#### Student Spotlights (3 students)
- [ ] Student 1: Kofi Mensah
  - Name, role, division, description, learning focus, avatar
- [ ] Student 2: Amina Nkrumah
  - Name, role, division, description, learning focus, avatar
- [ ] Student 3: Emmanuel Osei
  - Name, role, division, description, learning focus, avatar

---

### PARTNERSHIPS PAGE

- [ ] Need to audit this page

### STUDENT PROGRAMS PAGE

- [ ] Need to audit this page

### CONTACT PAGE

- [ ] Need to audit this page

### PROJECTS PAGE

- [ ] Hero/intro text
- [ ] Category descriptions
- [ ] Filter labels

### NEWS PAGE

- [ ] Hero/intro text
- [ ] Category labels

---

## DATABASE SCHEMA REQUIREMENTS

### Existing Tables (Already Good)
- ✅ projects
- ✅ news_posts
- ✅ team_members
- ✅ partners
- ✅ student_applications
- ✅ contact_inquiries
- ✅ media_assets
- ✅ site_content (exists but needs population)
- ✅ testimonials (exists but needs population)

### New Tables Needed
None - we can use `site_content` for structured content

---

## IMPLEMENTATION PLAN

### Phase 1: ✅ Admin Pages Created
- [x] Site Content Manager page
- [x] Testimonials Manager page (list only)
- [ ] Testimonials Edit/Create page (MISSING!)
- [x] Add to navigation

### Phase 2: ✅ Backend API Created
- [x] Site Content routes (`/api/admin/site-content`)
- [x] Testimonials routes (`/api/admin/testimonials`)
- [x] Register routes in backend

### Phase 3: ❌ PUBLIC API ROUTES (CRITICAL - MISSING!)
- [ ] Create `/api/site-content` (public read-only)
- [ ] Create `/api/testimonials` (public read-only)
- [ ] Update frontend to fetch from these endpoints

### Phase 4: ❌ Seed Database with Current Content
- [ ] Create migration/seed script
- [ ] Add all homepage content to site_content table
- [ ] Add all about page content
- [ ] Add all team page content
- [ ] Add testimonials

### Phase 5: ❌ Update Frontend Pages
- [ ] Update homepage to fetch dynamic content
- [ ] Update about page to fetch dynamic content
- [ ] Update team page to fetch dynamic content
- [ ] Test all pages

---

## PRIORITY ACTIONS BEFORE PUSH

### CRITICAL (Must Do Now)
1. ✅ Create testimonials edit/create page
2. ✅ Create PUBLIC API routes (not just admin routes)
3. ⚠️  Decide: Seed database OR make frontend backward compatible?

### RECOMMENDED (Do Before Launch)
4. Create seed script with all current content
5. Update frontend pages to use dynamic content
6. Test entire flow

### NICE TO HAVE (Can Do Later)
7. Rich text editor for long content
8. Image upload integration in content editor
9. Preview before publish
10. Content versioning

---

## NOTES

- The `site_content` table is perfect for this - has key/value structure
- Can store complex content as JSON in the value field
- Need to make sure frontend has fallback for missing content
- Consider creating content "templates" to guide admins
