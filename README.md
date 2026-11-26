# Pawara Athapaththu — Developer Portfolio

Personal software engineering portfolio website for **Pawara Athapaththu**, an Aspiring Software Engineer & Full-Stack Developer pursuing a Bachelor of Information Technology (BIT) at the University of Moratuwa.

## Features

- **Cinematic Preloader (V3)**: Theme-aware intro animation with `<PA/>` monogram, concentric orbital rings, scanning light, developer terminal status, and synchronized progress counter on every full page load.
- **Floating Glassmorphism Navbar**: Custom `PA` SVG monogram, active section indicator, scroll progress bar, dark/light theme toggle, and responsive mobile drawer.
- **Hero Section**: Animated gradient typography, typing role animation, availability badge, framed profile portrait with floating tech icons, and quick actions.
- **About (Bento Grid)**: Structured developer overview, academic status, and engineering focus pillars.
- **Education Timeline**: University of Moratuwa – BIT timeline and focus areas.
- **Technical Skills**: Categorized skill cards (`React.js`, `JavaScript`, `HTML`, `CSS`, `Node.js`, `PHP`, `REST APIs`, `MySQL`, `Git`, `GitHub`).
- **Featured Projects**: Spotlight showcase for **Aqua Glow Solutions** (e-commerce & real-time auction web application) with scalable data-driven architecture.
- **Certificates & Contact**: Reusable certificate card structure, contact info cards, and validated contact form.
- **Accessibility & Performance**: Semantic landmarks, keyboard focus styles, `localStorage` theme persistence, and `prefers-reduced-motion` support.

## Tech Stack

- **Frontend**: React 19, Vite 6.4.6
- **Animations**: Framer Motion
- **Icons**: Lucide React, React Icons
- **Styling**: Custom CSS with CSS Variables (Dark & Light themes)
- **Linting**: ESLint

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
git clone https://github.com/pawaraathapaththu/pawara-portfolio.git
cd pawara-portfolio
npm install
```

### Development

```bash
npm run dev
```

### Lint & Production Build

```bash
npm run lint
npm run build
```

## Customization

All personal information, social links, skills, education, projects, and certificates are centralized in [`src/data/portfolioData.js`](src/data/portfolioData.js) for easy updates.
