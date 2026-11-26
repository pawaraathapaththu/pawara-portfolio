/**
 * Certificates Data
 * -------------------------------------------------------------------
 * Add new certificates here. Place preview images in
 * /public/certificates/previews/ and original PDFs in
 * /public/certificates/pdfs/.
 */

export const certificatesData = [
  {
    id: "uom-frontend-web-development",
    title: "Front-End Web Development",
    issuer: "CODL, University of Moratuwa",
    category: "Web Development",
    description:
      "Online learning programme in Front-End Web Development conducted by the Department of Information Technology, Faculty of Information Technology.",
    issueDate: null,
    credentialId: "ogu4ibRDw9",
    verifyUrl: "https://open.uom.lk/verify",
    image: "/certificates/previews/uom-frontend-web-development.webp",
    pdfUrl: "/certificates/pdfs/uom-frontend-web-development.pdf",
    pdfFileName: "Pawara_UoM_Front_End_Web_Development.pdf",
  },
  {
    id: "uom-web-design-for-beginners",
    title: "Web Design for Beginners",
    issuer: "CODL, University of Moratuwa",
    category: "Web Development",
    description:
      "Online learning programme in Web Design for Beginners conducted by the Department of Information Technology, Faculty of Information Technology.",
    issueDate: null,
    credentialId: "4oggFTSgEz",
    verifyUrl: "https://open.uom.lk/verify",
    image: "/certificates/previews/uom-web-design-for-beginners.webp",
    pdfUrl: "/certificates/pdfs/uom-web-design-for-beginners.pdf",
    pdfFileName: "Pawara_UoM_Web_Design_for_Beginners.pdf",
  },
  {
    id: "uom-python-for-beginners",
    title: "Python for Beginners",
    issuer: "CODL, University of Moratuwa",
    category: "Programming",
    description:
      "Online learning programme in Python for Beginners conducted by the Department of Computer Science & Engineering, Faculty of Engineering.",
    issueDate: "March 18, 2023",
    credentialId: "7qZYehZGY3",
    verifyUrl: "https://open.uom.lk/verify",
    image: "/certificates/previews/uom-python-for-beginners.webp",
    pdfUrl: "/certificates/pdfs/uom-python-for-beginners.pdf",
    pdfFileName: "Pawara_UoM_Python_for_Beginners.pdf",
  },
  {
    id: "hackerrank-sql-intermediate",
    title: "SQL (Intermediate)",
    issuer: "HackerRank",
    category: "Database & SQL",
    description:
      "Skill assessment certification covering intermediate SQL queries, joins, aggregations, and relational database problem solving.",
    issueDate: "06 Aug, 2024",
    credentialId: "377450162487",
    verifyUrl: null,
    image: "/certificates/previews/hackerrank-sql-intermediate.webp",
    pdfUrl: "/certificates/pdfs/hackerrank-sql-intermediate.pdf",
    pdfFileName: "Pawara_HackerRank_SQL_Intermediate.pdf",
  },
  {
    id: "hackerrank-sql-basic",
    title: "SQL (Basic)",
    issuer: "HackerRank",
    category: "Database & SQL",
    description:
      "Skill assessment certification covering foundational SQL queries, filtering, sorting, and basic relational table operations.",
    issueDate: "06 Aug, 2024",
    credentialId: "513B9869D230",
    verifyUrl: null,
    image: "/certificates/previews/hackerrank-sql-basic.webp",
    pdfUrl: "/certificates/pdfs/hackerrank-sql-basic.pdf",
    pdfFileName: "Pawara_HackerRank_SQL_Basic.pdf",
  },
];

export const certificateCategories = [
  "All",
  ...Array.from(new Set(certificatesData.map((cert) => cert.category))),
];
