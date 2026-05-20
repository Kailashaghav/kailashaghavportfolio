# Kailash Aghav — 3D Portfolio

A production-grade 3D portfolio built with:

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** — page & scroll animations
- **GSAP + ScrollTrigger** — staggered reveal animations, timeline, skill bars
- **React Scroll Parallax** — parallax depth effects on all sections
- **Three.js / React Three Fiber / Drei** — 3D hero icosahedron, ring orbits, particle field, about shapes, contact grid plane
- **Lenis** — buttery smooth scrolling

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
http://localhost:3000
```

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
kailash-portfolio/
├── app/
│   ├── globals.css          # Design system, fonts, animations
│   ├── layout.tsx           # Root layout + metadata
│   └── page.tsx             # Entry — composes all sections
├── components/
│   ├── 3d/
│   │   ├── HeroCanvas.tsx   # R3F — icosahedron + ring orbits + particles
│   │   └── AboutCanvas.tsx  # R3F — floating geometric shapes
│   ├── sections/
│   │   ├── HeroSection.tsx       # GSAP text scramble + parallax
│   │   ├── AboutSection.tsx      # GSAP slide-in + facts grid
│   │   ├── SkillsSection.tsx     # Animated skill bars + tag cloud
│   │   ├── ProjectsSection.tsx   # 3D tilt cards + project details
│   │   ├── ExperienceSection.tsx # Timeline + education
│   │   └── ContactSection.tsx    # Form + 3D grid plane BG
│   └── ui/
│       ├── Navbar.tsx            # Framer Motion entrance + mobile menu
│       ├── CustomCursor.tsx      # Magnetic spring cursor
│       ├── MarqueeBanner.tsx     # Infinite scroll skill strip
│       ├── SmoothScroll.tsx      # Lenis smooth scroll provider
│       ├── ParallaxProvider.tsx  # react-scroll-parallax wrapper
│       └── Footer.tsx
├── lib/utils.ts             # cn, lerp, clamp helpers
├── types/index.ts           # TypeScript interfaces
├── tailwind.config.ts       # Custom colors, fonts, animations
└── next.config.js
```

## Customisation

All personal data lives inside the section components:
- **Hero** → `components/sections/HeroSection.tsx`
- **About facts** → `components/sections/AboutSection.tsx`  `FACTS` array
- **Skills** → `components/sections/SkillsSection.tsx`  `TECH_STACKS` + `TOOL_TAGS`
- **Projects** → `components/sections/ProjectsSection.tsx`  `PROJECTS` array
- **Experience** → `components/sections/ExperienceSection.tsx`  `EXPERIENCES` + `EDUCATION`
- **Contact socials** → `components/sections/ContactSection.tsx`  `SOCIALS` array
