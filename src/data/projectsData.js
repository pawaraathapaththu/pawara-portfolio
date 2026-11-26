/**
 * Projects Data
 * -------------------------------------------------------------------
 * Replace or extend these entries with your own projects.
 * Supported categories: "Full-Stack", "Frontend", "Backend"
 */

export const projectsData = [
  {
    id: "aqua-glow-solutions",
    title: "Aqua Glow Solutions",
    category: "Full-Stack",
    featured: true,
    summary:
      "A full-stack e-commerce and real-time auction web application combining storefront purchasing with live interactive bidding workflows.",
    highlights: [
      "Combines e-commerce storefront browsing and order workflows with live auction bidding.",
      "Real-time bid updates and event synchronization powered by Node.js and Socket.IO.",
      "Structured relational data storage with MySQL and server-side integration using PHP.",
    ],
    technologies: ["React.js", "PHP", "MySQL", "Node.js", "Socket.IO"],
    githubUrl: "https://github.com/pawaraathapaththu/aqua-glow-solutions",
    liveUrl: null,
    image: "/projects/aqua-glow.svg",
  },
  {
    id: "taskflow-workspace",
    title: "TaskFlow Workspace",
    category: "Frontend",
    featured: false,
    summary:
      "Responsive Kanban task board with modular columns, dark/light theme support, and local state persistence.",
    highlights: [
      "Modular React component architecture with keyboard-accessible task cards.",
      "Smooth layout transitions powered by Framer Motion.",
      "Theme-aware CSS variables supporting both dark and light modes.",
    ],
    technologies: ["React.js", "JavaScript", "CSS", "Framer Motion"],
    githubUrl: "https://github.com/pawaraathapaththu",
    liveUrl: null,
    image: "/projects/frontend-placeholder.svg",
  },
  {
    id: "inventory-rest-api",
    title: "Inventory REST API",
    category: "Backend",
    featured: false,
    summary:
      "Modular RESTful API service with structured MySQL queries, input validation, and role-based endpoints.",
    highlights: [
      "Clean MVC-style routing and input validation for product and order endpoints.",
      "Normalized MySQL schema with indexed foreign-key relationships.",
      "Consistent JSON error handling and status codes.",
    ],
    technologies: ["Node.js", "PHP", "MySQL", "REST APIs"],
    githubUrl: "https://github.com/pawaraathapaththu",
    liveUrl: null,
    image: "/projects/backend-placeholder.svg",
  },
];

export const projectCategories = ["All", "Full-Stack", "Frontend", "Backend"];
