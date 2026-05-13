# Survive Uni - Maintenance Guide

This guide explains how to update and scale the content of the Survive Uni platform. All core data is centralized in the `lib/` directory to make updates as easy as possible without touching UI code.

---

## 📝 1. Updating Blogs & Guides
Blogs are managed using Markdown files with YAML front-matter.
- **Directory**: `content/guides/`
- **How to update**:
  1. Create a new `.md` file in the directory (e.g., `nust-entry-test-guide.md`).
  2. Add the following metadata at the top:
     ```yaml
     ---
     title: "Your Title Here"
     description: "A short snippet for SEO."
     date: "2026-05-08"
     image: "/images/blog/your-image.png"
     category: "Admission"
     tags: ["NUST", "NET", "Guide"]
     ---
     ```
  3. Write your content in standard Markdown below the second `---`.
  4. Place any images in `public/images/blog/`.

---

## 📅 2. Updating Admission Deadlines
Deadlines for the 2026-2027 cycle are centralized for easy editing.
- **File**: `lib/deadlines.ts`
- **How to update**:
  1. Open `lib/deadlines.ts`.
  2. Modify the dates, status (`"OPEN"`, `"UPCOMING"`, `"CLOSED"`), or merit information in the `DEADLINES` array.
  3. The website UI will update automatically.

---

## 🎓 3. Updating Scholarships
Financial aid opportunities are also centralized.
- **File**: `lib/scholarships.ts`
- **How to update**:
  1. Open `lib/scholarships.ts`.
  2. Add or edit items in the `SCHOLARSHIPS` array.
  3. Categories available: `"Need-based"`, `"Government"`, `"University"`, `"Provincial"`, `"International"`.

---

## 🏛️ 4. Managing Universities
Basic university metadata (names, locations, and unique colors) is stored here.
- **File**: `lib/unis.ts`
- **How to update**:
  1. Open `lib/unis.ts`.
  2. Update the `UNIVERSITIES` array to change colors or add new institutions.

---

## 🚀 5. Production Checklist
Before pushing new content:
1. **Check Images**: Ensure all referenced images exist in `public/images/`.
2. **Internal Links**: If you add a new page, remember to update `app/sitemap.ts` for SEO.
3. **Build Test**: Run `npm run build` to ensure no TypeScript errors were introduced.
