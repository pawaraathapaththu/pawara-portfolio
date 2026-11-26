# Pawara Athapaththu — Developer Portfolio

Personal software engineering portfolio website for **Pawara Athapaththu**, an Aspiring Software Engineer & Full-Stack Developer pursuing a Bachelor of Information Technology (BIT) at the University of Moratuwa.

## Features

- **Cinematic Preloader (V3)**: Theme-aware intro animation on page load with `<PA/>` monogram, concentric orbital rings, scanning light, developer terminal status, and synchronized progress counter.
- **Floating Glassmorphism Navbar**: Custom `PA` SVG monogram, active section scroll spy, scroll progress bar, dark/light theme toggle, and responsive mobile drawer.
- **Hero Section**: Animated gradient typography, typing role animation, availability badge, circular framed profile portrait with floating tech icons, and quick actions.
- **About (Bento Grid)**: Structured developer overview, academic status, and engineering focus pillars.
- **Education Timeline**: University of Moratuwa – BIT timeline and focus areas.
- **Technical Skills**: Categorized skill cards (`React.js`, `JavaScript`, `HTML`, `CSS`, `Node.js`, `PHP`, `REST APIs`, `MySQL`, `Git`, `GitHub`).
- **Featured Projects**: Spotlight showcase for **Aqua Glow Solutions** (e-commerce & real-time auction web application) with scalable data-driven architecture.
- **Certificates Gallery**: Filterable and searchable gallery of verified certificates from the University of Moratuwa (CODL) and HackerRank with `.webp` previews, full-screen modal viewer, PDF downloads, and verification links.
- **Contact & Footer**: Validated contact form, social links, and back-to-top navigation.
- **Accessibility & Performance**: Semantic landmarks, keyboard focus styles, `Escape`-key modal/menu support, `localStorage` theme persistence, and `prefers-reduced-motion` support.

## Tech Stack

- **Frontend**: React 19, Vite 6.4.6
- **Animations**: Framer Motion
- **Icons**: Lucide React, React Icons
- **Styling**: Modular component-colocated CSS with CSS Variables (Dark & Light themes)
- **Linting**: ESLint

## Project Structure

```text
src/
├── components/         # Self-contained component folders (JSX + CSS)
│   ├── About/
│   ├── BackgroundEffects/
│   ├── BrandLogo/
│   ├── Certificates/
│   ├── Contact/
│   ├── Education/
│   ├── Footer/
│   ├── Hero/
│   ├── Navbar/
│   ├── Preloader/
│   ├── Projects/
│   └── Skills/
├── data/
│   ├── certificatesData.js
│   └── portfolioData.js
├── App.css
├── App.jsx
├── index.css
└── main.jsx
```

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

- Update personal info, social links, skills, education, and projects in [`src/data/portfolioData.js`](src/data/portfolioData.js).
- Add or update certificates in [`src/data/certificatesData.js`](src/data/certificatesData.js) with preview images in `public/certificates/previews/` and PDFs in `public/certificates/pdfs/`.
