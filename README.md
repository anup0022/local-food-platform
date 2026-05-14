# LocalBite - Discover Local Food Benefits

A social media platform for educating people about the benefits of local, traditional, and indigenous foods. Think Instagram meets a food science journal — anyone can publish posts (articles, videos, lab reports, recipes, PDFs), but only admins approve and publish them. The platform combines community-driven content with scientific data, interactive maps, and rich media experiences.

**Live Site:** [https://local-food-platform-green.vercel.app](https://local-food-platform-green.vercel.app)

---

## Why This Project?

India has thousands of indigenous superfoods — kokum, ragi, moringa, amla, horse gram — that are being forgotten as processed and imported alternatives take over grocery shelves. Most people don't know that:

- **Ragi** has 7x more calcium than quinoa, at 1/10th the cost
- **Kokum** contains Garcinol, a unique antioxidant 3x stronger than Vitamin E
- **Local organic honey** has 4x more antioxidants than commercial brands

There is no dedicated platform where food researchers, organic farmers, nutritionists, and everyday consumers can come together to share lab-verified data, traditional recipes, and sourcing information for local foods.

**LocalBite fills this gap** by combining:
- Social media engagement (likes, comments, shares, stories)
- Scientific credibility (lab reports with visual comparison data)
- Practical utility (recipes, store locator with live maps, seasonal availability)
- Admin-moderated quality (every post and comment is reviewed before publishing)

---

## Live Demo

| Page | URL |
|------|-----|
| Home / Feed | [/](https://local-food-platform-green.vercel.app/) |
| Kokum Mega-Post (showcase) | [/post/post-kokum](https://local-food-platform-green.vercel.app/post/post-kokum) |
| Explore | [/explore](https://local-food-platform-green.vercel.app/explore) |
| Create Post | [/create](https://local-food-platform-green.vercel.app/create) |
| User Profile | [/profile/user-1](https://local-food-platform-green.vercel.app/profile/user-1) |
| Admin Comment Moderation | [/admin-comments](https://local-food-platform-green.vercel.app/admin-comments) |
| Messages | [/messages](https://local-food-platform-green.vercel.app/messages) |
| Trending | [/trending](https://local-food-platform-green.vercel.app/trending) |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **Language** | TypeScript 5 |
| **UI Components** | [shadcn/ui v4](https://ui.shadcn.com/) (built on `@base-ui/react`, NOT Radix) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Authentication** | [NextAuth.js v5](https://authjs.dev/) (Email + Google + GitHub OAuth) |
| **Database** | [PostgreSQL](https://www.postgresql.org/) + [Prisma ORM v6](https://www.prisma.io/) |
| **Rich Text Editor** | [Tiptap](https://tiptap.dev/) (with Image & Link extensions) |
| **Maps** | [Google Maps Embed API](https://developers.google.com/maps) |
| **File Upload** | [UploadThing](https://uploadthing.com/) |
| **Date Formatting** | [date-fns](https://date-fns.org/) |
| **Form Validation** | [Zod v4](https://zod.dev/) + [React Hook Form](https://react-hook-form.com/) |
| **Deployment** | [Vercel](https://vercel.com/) (Free Hobby tier) |
| **Runtime** | Node.js >= 22 |

---

## Features

### Social Media Experience
- **Instagram/Twitter-style feed** with stories bar, infinite scroll, and rich post cards
- **3-column layout**: left nav sidebar, center feed, right sidebar (trending tags, suggested users, community stats)
- **Stories bar** at top of feed with user avatars and thumbnails
- **Like, comment, share, bookmark** interactions on every post
- **Template badges** on post cards (Health Benefit, Lab Report, Recipe, etc.)

### Immersive Post Detail Pages
Post detail pages feel like full interactive websites, not stacked blog sections:
- **Full-bleed hero banner** with gradient overlays and parallax-style imagery
- **Sticky quick-nav bar** with IntersectionObserver-based active section tracking
- **2-column intro** with drop-cap article text and quick fact cards
- **Masonry photo gallery** with full-screen lightbox (keyboard navigation)
- **Health benefits** in 2-column cards with numbered badges
- **Nutrition breakdown** with animated horizontal bar charts on dark gradient background
- **Lab report section** with visual comparison bars (local vs commercial), lab image slider, downloadable PDF
- **Recipe section** with embedded YouTube video, 4-column meta cards, ingredient checklist, step-by-step instructions with per-step images and pro tips
- **Testimonials** horizontal card slider with embedded video playback
- **Where to Buy** with embedded Google Maps, 3-column store cards with distance, rating, stock status, call/directions buttons
- **Slide-up comments panel** (hidden by default) with admin approval badges

### Content Templates
Seven built-in post templates, each with specialized fields:
1. **Food Benefit Card** — benefits list, nutrition facts, scientific source
2. **Lab Report** — lab name, test date, findings comparison table, verdict, PDF download
3. **Recipe** — ingredients, step-by-step with images/tips, prep/cook time, servings, difficulty, video embed
4. **Where to Find** — map location, price, availability, season, nearby store cards
5. **Comparison** — side-by-side item comparison with verdict
6. **Video Story** — video post with description
7. **Custom / Freestyle** — freeform layout

### Admin Moderation
- **Post approval workflow**: all posts go through admin review before publishing (PENDING -> APPROVED / REJECTED)
- **Comment moderation**: comments are hidden until admin approves them; approved comments get a green "Verified" badge
- **Admin dashboard** with posts, users, food items, and lab reports management
- **Dedicated comment moderation page** (`/admin-comments`) with search, filter by status, bulk approve

### User Profiles
- **Instagram-style profile** with cover gradient, large avatar with role badge, follow/message buttons
- **Bio, meta info** (joined date, location, website)
- **Stats row** (posts, followers, following)
- **4 tabs**: Posts, Lab Reports, Recipes, Saved — each showing a filtered post grid

### Other Pages
- `/explore` — search and discover posts by tag/category
- `/messages` — chat interface
- `/notifications` — activity feed
- `/bookmarks` — saved posts
- `/trending` — trending tags and popular content
- `/map` — food source map
- `/create` — 3-step post creation with template selection

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/              # Login & register pages
│   ├── (main)/              # Main app layout (3-column social)
│   │   ├── feed/            # Home feed with stories + post cards
│   │   ├── post/[id]/       # Immersive post detail page
│   │   ├── profile/[id]/    # User profile (Instagram-style)
│   │   ├── admin-comments/  # Comment moderation queue
│   │   ├── create/          # Post creation with templates
│   │   ├── explore/         # Search & discover
│   │   ├── messages/        # Chat
│   │   ├── notifications/   # Activity feed
│   │   ├── bookmarks/       # Saved posts
│   │   ├── trending/        # Trending content
│   │   └── map/             # Food source map
│   ├── admin/               # Admin dashboard
│   └── api/                 # API routes (posts, auth, upload, etc.)
├── components/
│   ├── layout/              # Social sidebar, right sidebar, header, footer
│   ├── posts/               # SocialPostCard, StoriesBar, RichTextEditor
│   ├── admin/               # Admin list components
│   ├── providers/           # Session provider
│   └── ui/                  # shadcn/ui components (Button, Card, Avatar, etc.)
├── lib/
│   ├── mock-data/           # Mock data layer (posts, users, comments, stores)
│   ├── auth.ts              # NextAuth configuration
│   ├── db.ts                # Prisma client singleton
│   └── utils.ts             # Utility functions (cn)
├── middleware.ts             # URL rewrite: / -> /feed
└── types/                   # TypeScript type extensions
```

---

## Getting Started

### Prerequisites
- Node.js >= 22 (see `.nvmrc`)
- npm

### Installation

```bash
git clone https://github.com/anup0022/local-food-platform.git
cd local-food-platform
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> The app runs entirely on **mock data** out of the box — no database setup needed for the demo.

### (Optional) Database Setup

If you want to connect a real PostgreSQL database:

```bash
# Copy the example env and fill in your DATABASE_URL
cp .env.example .env

# Push schema to database
npm run db:push

# Seed with sample data
npm run db:seed

# Open Prisma Studio to browse data
npm run db:studio
```

### Build for Production

```bash
npm run build
npm start
```

---

## Database Schema

The Prisma schema (`prisma/schema.prisma`) includes:

- **User** — name, email, password, role (USER/ADMIN), OAuth accounts
- **Post** — title, content, type, template, status (PENDING/APPROVED/REJECTED), media, tags
- **Comment** — text, approval status, nested replies
- **Like / Bookmark** — user-post relations
- **FoodItem** — name, scientific name, region, season, benefits, nutrition facts
- **LabReport** — lab name, test date, findings, PDF, verification status
- **LocationSource** — name, coordinates, price, availability, season

---

## Image Strategy

All images use **real, accurate photos** from [Wikimedia Commons](https://commons.wikimedia.org/) — no generic stock photos. Every image URL is verified to return HTTP 200 with correct content.

- **Kokum gallery**: 8 real photos (fruit, dried rinds, Sol Kadhi, tree, fresh-cut, leaves, butter, drying)
- **Recipe steps**: actual kokum preparation photos
- **Lab report**: NCL Pune building
- **Other posts**: turmeric (Golden Milk), honeycomb, ragi field, moringa leaves, amla fruit, millets

All below-the-fold images use `loading="lazy"` and `decoding="async"` for performance.

---

## Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| Social media layout over blog | Users engage more with Instagram/Twitter-style feeds than traditional blog listings |
| Immersive post detail pages | Each post should feel like a standalone website, not a text article |
| Admin-moderated comments | Prevents spam and misinformation in health/nutrition content |
| Mock data layer | Enables full demo without database dependency; swap to Prisma when ready |
| Template system | Structured data per post type enables rich, specialized rendering |
| Wikimedia Commons images | Real, accurate, freely licensed photos instead of generic stock |
| `middleware.ts` rewrite | `/` shows feed content while keeping the URL clean (no `/feed` in address bar) |
| shadcn/ui v4 | Uses `@base-ui/react` (not Radix) — no `asChild` prop, uses `render` prop instead |

---

## Deployment

The app is deployed on **Vercel** (free Hobby tier) with automatic deployments from the `main` branch.

- **Live URL**: [https://local-food-platform-green.vercel.app](https://local-food-platform-green.vercel.app)
- **GitHub**: [https://github.com/anup0022/local-food-platform](https://github.com/anup0022/local-food-platform)

To deploy your own:

```bash
npm i -g vercel
vercel --prod
```

---

## Roadmap

- [ ] Connect mock data to real PostgreSQL database via Prisma
- [ ] Video autoplay on scroll in feed cards
- [ ] Real-time chat with WebSockets
- [ ] Push notifications
- [ ] User-submitted lab reports with admin verification workflow
- [ ] Food item database with crowd-sourced nutritional data
- [ ] PWA support for mobile
- [ ] Multi-language support (Hindi, Marathi, Kannada, Malayalam)
- [ ] AI-powered food identification from photos
- [ ] Integration with local farmer co-ops for direct ordering

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

Built with purpose — to bring India's forgotten superfoods back to the mainstream.
