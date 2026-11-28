/**
 * Portfolio Data Configuration (Single Source of Truth)
 * -------------------------------------------------------------------
 * Update `DISPLAY_FIRST_NAME` and `DISPLAY_LAST_NAME` below to change
 * your name consistently across the entire website.
 */

import { certificatesData, certificateCategories } from "./certificatesData";
import { projectsData, projectCategories } from "./projectsData";

const DISPLAY_FIRST_NAME = "Pawara";
const DISPLAY_LAST_NAME = "Athapaththu";
export const START_YEAR = 2023;

export const personalInfo = {
  brandMark: "PA",
  firstName: DISPLAY_FIRST_NAME,
  lastName: DISPLAY_LAST_NAME,
  fullName: `${DISPLAY_FIRST_NAME} ${DISPLAY_LAST_NAME}`,
  title: "Software Engineer | Full-Stack Developer",
  animatedRoles: [
    "Software Engineer",
    "Full-Stack Developer",
    "React Developer",
    "Problem Solver",
  ],
  location: "Sri Lanka",
  showAvailabilityBadge: true,
  availability: {
    active: true,
    label: "Open to new opportunities",
  },
  profileImage: "/profile.jpg",
  heroSummary:
    "Software engineer who builds clean, scalable full-stack web applications and real-time user experiences.",
  // Place your CV file at /public/cv.pdf for the Download CV button to download directly
  cvUrl: "/cv.pdf",
  cvFileName: `${DISPLAY_FIRST_NAME}_${DISPLAY_LAST_NAME}_CV.pdf`,
  social: {
    github: "https://github.com/pawaraathapaththu",
    // Add your LinkedIn profile URL below; the LinkedIn button hides automatically when empty
    linkedin: "",
    // Add your email address below (e.g., "pawara@example.com")
    email: "",
  },
  // Optional free form endpoint (e.g., Formspree / Web3Forms URL) for live contact form delivery
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
    "I hold a Bachelor of Information Technology (BIT) from the University of Moratuwa, with a solid foundation in software engineering principles, database design, and web application architecture.",
    "Through hands-on academic and personal projects, I have gained practical experience developing full-stack applications—from responsive React interfaces and RESTful APIs to relational MySQL databases and real-time communication with Node.js and Socket.IO.",
    "As a Software Engineer, I am focused on contributing to collaborative engineering teams, applying industry best practices, writing maintainable code, and solving meaningful real-world problems.",
  ],
  highlights: [
    {
      label: "Degree",
      value: "BIT, University of Moratuwa",
    },
    {
      label: "Academic Status",
      value: "BIT, University of Moratuwa",
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
    period: "2023 – Present",
    status: "BIT, University of Moratuwa",
    location: "Sri Lanka",
    description:
      "Comprehensive degree program focused on software engineering, web technologies, database management systems, data structures, and system design.",
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
      { name: "React.js", iconKey: "react", level: "Intermediate" },
      { name: "JavaScript", iconKey: "javascript", level: "Intermediate" },
      { name: "HTML", iconKey: "html", level: "Advanced" },
      { name: "CSS", iconKey: "css", level: "Intermediate" },
    ],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    description: "Designing server-side logic, authentication, and real-time data flows.",
    skills: [
      { name: "Node.js", iconKey: "nodejs", level: "Intermediate" },
      { name: "PHP", iconKey: "php", level: "Intermediate" },
      { name: "REST APIs", iconKey: "api", level: "Intermediate" },
    ],
  },
  {
    id: "database-tools",
    title: "Database & Version Control",
    description: "Managing structured relational data and collaborative code workflows.",
    skills: [
      { name: "MySQL", iconKey: "mysql", level: "Intermediate" },
      { name: "Git", iconKey: "git", level: "Intermediate" },
      { name: "GitHub", iconKey: "github", level: "Intermediate" },
    ],
  },
];

export const currentlyLearning = [
  "TypeScript",
  "Tailwind CSS",
  "Express.js",
  "MongoDB",
];

export const professionalSkills = [
  { name: "Team Work", percentage: 90 },
  { name: "Creativity", percentage: 85 },
  { name: "Project Management", percentage: 80 },
  { name: "Communication", percentage: 83 },
];

export { certificatesData, certificateCategories, projectsData, projectCategories };
