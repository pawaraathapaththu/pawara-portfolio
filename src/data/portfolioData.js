/**
 * Portfolio Data Configuration
 * -------------------------------------------------------------------
 * Update this single file to customize personal info, links, projects,
 * skills, education, and certificates across the entire portfolio.
 */

export const personalInfo = {
  brandMark: "PA",
  firstName: "Pawara",
  lastName: "Athapaththu",
  fullName: "Pawara Athapaththu",
  title: "Aspiring Software Engineer | Full-Stack Developer",
  animatedRoles: [
    "Aspiring Software Engineer",
    "Full-Stack Web Developer",
    "BIT Undergraduate @ UoM",
  ],
  location: "Sri Lanka",
  availability: {
    active: true,
    label: "Available for Software Engineering Internships",
  },
  profileImage: "/profile.png",
  heroSummary:
    "Final-year Bachelor of Information Technology (BIT) candidate at the University of Moratuwa, passionate about building clean, scalable full-stack web applications and real-time user experiences.",
  // TODO: Place your CV PDF in /public/cv.pdf and set cvUrl: "/cv.pdf"
  cvUrl: null,
  cvFileName: "Pawara_Athapaththu_CV.pdf",
  social: {
    github: "https://github.com/pawaraathapaththu",
    // TODO: Add your LinkedIn profile URL (e.g., "https://www.linkedin.com/in/your-handle")
    linkedin: null,
    // TODO: Add your email address (e.g., "pawara@example.com")
    email: null,
  },
  // TODO: Optional free form endpoint (e.g., Formspree / Web3Forms URL) for live contact form delivery
  contactFormEndpoint: null,
};

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
];

export const aboutData = {
  eyebrow: "About Me",
  heading: "Building practical software with curiosity and discipline",
  paragraphs: [
    "I am a Bachelor of Information Technology (BIT) undergraduate at the University of Moratuwa, having recently completed my final-year examinations and currently awaiting results. My academic journey has given me a solid foundation in software engineering principles, database design, and web application architecture.",
    "Through hands-on academic and personal projects, I have gained practical experience developing full-stack applications—from responsive React interfaces and RESTful APIs to relational MySQL databases and real-time communication with Node.js and Socket.IO.",
    "As an aspiring Software Engineer seeking an internship opportunity, I am eager to contribute to a collaborative engineering team, learn industry best practices, write maintainable code, and grow by solving meaningful real-world problems.",
  ],
  highlights: [
    {
      label: "Degree",
      value: "BIT, University of Moratuwa",
    },
    {
      label: "Academic Status",
      value: "Final Year Exams Completed",
    },
    {
      label: "Location",
      value: "Sri Lanka",
    },
    {
      label: "Focus",
      value: "Full-Stack Web Development",
    },
  ],
};

export const educationData = [
  {
    id: "uom-bit",
    institution: "University of Moratuwa",
    degree: "Bachelor of Information Technology (BIT)",
    period: "May 2023 – Present",
    status: "Final Year Examinations Completed – Awaiting Results",
    location: "Sri Lanka",
    description:
      "Comprehensive undergraduate degree program focused on software engineering, web technologies, database management systems, data structures, and system design.",
    focusAreas: [
      "Full-Stack Web Development",
      "Database Design & SQL",
      "Software Engineering Principles",
      "RESTful API Architecture",
    ],
  },
];

export const skillCategories = [
  {
    id: "frontend",
    title: "Frontend Development",
    description: "Building responsive, accessible, and interactive user interfaces.",
    skills: [
      { name: "React.js", iconKey: "react" },
      { name: "JavaScript", iconKey: "javascript" },
      { name: "HTML", iconKey: "html" },
      { name: "CSS", iconKey: "css" },
    ],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    description: "Designing server-side logic, authentication, and real-time data flows.",
    skills: [
      { name: "Node.js", iconKey: "nodejs" },
      { name: "PHP", iconKey: "php" },
      { name: "REST APIs", iconKey: "api" },
    ],
  },
  {
    id: "database-tools",
    title: "Database & Version Control",
    description: "Managing structured relational data and collaborative code workflows.",
    skills: [
      { name: "MySQL", iconKey: "mysql" },
      { name: "Git", iconKey: "git" },
      { name: "GitHub", iconKey: "github" },
    ],
  },
];

/**
 * Projects Array
 * To add a new project, append a new object following the structure below.
 * Optional fields: `image` (path in /public/projects/...), `liveUrl`, `highlights`.
 */
export const projectsData = [
  {
    id: "aqua-glow-solutions",
    title: "Aqua Glow Solutions",
    category: "Full-Stack Web Application",
    featured: true,
    summary:
      "A full-stack e-commerce and real-time auction web application designed to support both standard product purchasing and live interactive bidding workflows.",
    highlights: [
      "Combines e-commerce storefront browsing and order workflows with live auction bidding.",
      "Real-time bid updates and event synchronization powered by Node.js and Socket.IO.",
      "Structured relational data storage with MySQL and server-side integration using PHP.",
    ],
    technologies: ["React.js", "PHP", "MySQL", "Node.js", "Socket.IO"],
    githubUrl: "https://github.com/pawaraathapaththu/aqua-glow-solutions",
    liveUrl: null,
    // TODO: Add screenshot at /public/projects/aqua-glow.png and set image: "/projects/aqua-glow.png"
    image: null,
  },
];

/**
 * Certificates Array
 * Add verified certificates here when ready. Example structure:
 * {
 *   id: "cert-1",
 *   title: "Certificate Name",
 *   issuer: "Issuing Organization",
 *   date: "Month Year",
 *   credentialId: "Optional ID",
 *   verifyUrl: "https://...",
 *   image: "/certificates/cert-1.png", // Optional image in /public/certificates/
 * }
 */
export const certificatesData = [];
