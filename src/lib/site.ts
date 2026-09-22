// All site copy lives here. House style for anything you add:
// - Short sentences (aim for 20 words or fewer), active voice, plain words.
// - British spelling, to match the CV (catalogue, optimisation, containerised).
// - No em dashes, no middle-dot chains. Use commas, full stops or "to" for ranges.

export type SocialIconName = "linkedin" | "github" | "x" | "instagram";

export type SocialLinkItem = {
  id: string;
  label: string;
  href: string;
  icon: SocialIconName;
  ariaLabel: string;
  showLabel: boolean;
};

const contactPhone = "";
const contactWhatsApp = "";

export const person = {
  name: "Muhammad Sufyan",
  firstName: "Muhammad",
  lastName: "Sufyan",
  title: "Full-Stack SaaS AI Engineer | React · Node · Next.js | AI Automation, LLM, RAG",
  location: "Chichawatni, Punjab, Pakistan",
  timezone: "PKT (UTC+5)",
  email: "sufyan.devs@gmail.com",
  phone: "",
  phoneHref: "",
  whatsapp: "",
  whatsappHref: "",
  linkedin: "https://linkedin.com/in/muhammad-sufyan-devs",
  github: "https://github.com/sufyan-stacks",
  headline:
    "I build AI assistants, workflow automation, and production SaaS products that turn business operations into reliable digital systems.",
  description:
    "Muhammad Sufyan is an AI SaaS engineer and full-stack product builder helping startups and teams ship intelligent workflows, LLM integrations, and scalable web products with Next.js, Node.js, Python, and cloud-ready architecture.",
} as const;

export const socials: SocialLinkItem[] = [
  { id: "linkedin", label: "LinkedIn", href: person.linkedin, icon: "linkedin", ariaLabel: "LinkedIn", showLabel: false },
  { id: "github", label: "GitHub", href: person.github, icon: "github", ariaLabel: "GitHub", showLabel: false },
  { id: "x", label: "X", href: "https://x.com/sufyan_devs", icon: "x", ariaLabel: "X", showLabel: false },
  { id: "instagram", label: "Instagram", href: "https://instagram.com/sufyan.devs", icon: "instagram", ariaLabel: "Instagram", showLabel: false },
];

export const nav = [
  { href: "#work", label: "Work" },
  { href: "#approach", label: "How I work" },
  { href: "#experience", label: "Experience" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
] as const;

export const metrics = [
  { value: "4+", label: "years building SaaS and e-commerce" },
  { value: "1k+", label: "requests per minute in production" },
  { value: "<150 ms", label: "p95 API latency" },
  { value: "99.95%", label: "uptime as traffic grew" },
] as const;

export const stack = [
  "Next.js",
  "Node.js",
  "Python",
  "TypeScript",
  "PostgreSQL",
  "RAG",
  "LangChain",
  "AI Automation",
  "AI Assistants",
  "LLM Integration",
  "Workflow Automation",
  "Redis",
  "Docker",
  "AWS",
] as const;

export const work = [
  {
    id: "what-next",
    name: "What Next",
    period: "Feb 2026 to Aug 2026",
    role: "Full-stack developer",
    client: "Financial firm in Serbia",
    tagline: "Risk and compliance in one system.",
    // TEMPORARY: this is an AI-generated mockup. Replace with a real screenshot
    // (see README, "Project images") and update imageAlt to describe it.
    image: "/work/whatnext.png",
    imageWidth: 1536,
    imageHeight: 1152,
    imageAlt: "Mockup of the What Next dashboard with a risk heatmap and a map of connected assets.",
    challenge:
      "The firm tracked assets, suppliers, contracts, risks and evidence in separate spreadsheets. Managers could not see what needed a decision.",
    contribution:
      "The platform maps how apps, servers and suppliers depend on each other and scores risks on a heatmap. New regulations (ISO 27001, DORA, GDPR) become tracked requirements with a review and approval step. BullMQ jobs run recurring checks, reminders and reports. Outlook and Google Calendar sync both ways, and the system creates a task when a deadline slips or a control fails.",
    outcomes: [
      "Multi-tenant, with a full audit history of every change",
      "A scheduler that fits work into each person's free time and flags anyone overloaded",
      "A register builder, so admins can add new registers without a developer",
    ],
    tech: ["Next.js", "Node.js", "PostgreSQL", "BullMQ", "Socket.io"],
  },
  {
    id: "dairydrop",
    name: "DairyDrop",
    period: "Dec 2025 to Jan 2026",
    role: "Full-stack developer and AI integration",
    client: "E-commerce store",
    tagline: "A shop assistant that answers from the real catalogue.",
    // TEMPORARY: AI-generated mockup, see the note above.
    image: "/work/dairydrop.png",
    imageWidth: 1536,
    imageHeight: 864,
    imageAlt: "Mockup of the DairyDrop storefront next to the Droplet assistant answering a question about low-fat dairy.",
    challenge:
      "A generic chatbot can make up prices and stock levels. This store needed answers that shoppers could trust.",
    contribution:
      "I built the storefront, the order flow and an admin dashboard that the owner runs the whole store from. Then I added Droplet, an assistant that searches the live catalogue before it replies. Shoppers can type or speak. Guardrails keep it away from customer accounts.",
    outcomes: [
      "Answers catalogue, delivery and refund questions in seconds",
      "Every price and stock figure comes from the real product data",
      "Voice and text input use the same search",
    ],
    tech: ["Next.js", "Node.js", "Python", "RabbitMQ", "LangChain", "RAG"],
  },
  {
    id: "cdlc-manager",
    name: "CDLC Manager",
    period: "2026",
    role: "Full-stack SaaS developer",
    client: "Logistics compliance and HR platform",
    tagline: "Compliance, training, and employee engagement in one dashboard.",
    image: "/work/cdlc.png",
    imageWidth: 1536,
    imageHeight: 1024,
    imageAlt: "CDLC Manager dashboard showing MCS-150 compliance, employees, training plans, and happiness surveys.",
    challenge:
      "A logistics business needed one place to track FMCSA filings, employee training, peer recognition, and team wellbeing.",
    contribution:
      "I built a SaaS platform that combines MCS-150 and DOT filing tracking with employee records, a drag-and-drop training builder, peer recognition, and anonymous happiness surveys.",
    outcomes: [
      "Compliance deadlines and documents in one workspace",
      "Training plans built from reusable modules",
      "Employee engagement measured without exposing individual responses",
    ],
    tech: ["React", "Node.js", "Python", "Socket.io", "Redis", "OpenAI API", "Webhooks"],
  },
  {
    id: "damndeal",
    name: "DamnDeal",
    period: "2026",
    role: "Full-stack developer",
    client: "Local commerce brand",
    tagline: "Shopping, 10-minute delivery and QR coupons in one platform.",
    image: "/work/damndeal.png",
    imageWidth: 1448,
    imageHeight: 1086,
    imageAlt:
      "DamnDeal on a laptop, tablet and phone, showing the storefront, the coupon flow and 10-minute delivery from nearby stores.",
    challenge:
      "DamnDeal wanted online shopping, 10-minute local delivery and local coupons under one brand.",
    contribution:
      "I built it as one platform with four portals: customer, vendor, admin and business associate. Customers claim a coupon and get a unique QR code. The business verifies it once at the counter, or from its own website through an API.",
    outcomes: [
      "Each QR code verifies once, so a coupon cannot be reused or faked",
      "Associates bring in new businesses with referral codes",
      "Live in production at damndeal.com",
    ],
    tech: ["Next.js", "Node.js", "TypeScript", "MongoDB", "Redis"],
  },
] as const;

export const principles = [
  {
    title: "Answer from real data",
    body: "My assistants look up the live catalogue or register first, then reply. Guardrails keep them away from account actions.",
  },
  {
    title: "One place for the data",
    body: "Spreadsheets and inboxes become a single system with an audit trail. A manager can open one screen and see what needs a decision.",
  },
  {
    title: "Speed is part of the product",
    body: "At DEVFUM I used Redis caching, query rewrites and queues. Server latency fell by 35% and uptime held at 99.95%.",
  },
] as const;

export const experience = [
  {
    role: "Full-Stack AI SaaS Engineer",
    org: "Independent / Contract",
    place: "Remote",
    dates: "Jan 2026 to present",
    points: [
      "Built What Next for a financial firm in Serbia: assets, suppliers, contracts, risks and evidence in one multi-tenant platform.",
      "Automated recurring checks, reminders and reports with BullMQ, plus two-way Outlook and Google Calendar sync.",
      "Shipped DairyDrop, a store with an AI assistant that retrieves from the live catalogue before it answers.",
    ],
  },
  {
    role: "Full-Stack Software Engineer",
    org: "DEVFUM",
    place: "Lahore, Pakistan",
    dates: "Nov 2024 to Feb 2026",
    points: [
      "Designed REST endpoints that served 1k+ requests per minute at p95 under 150 ms for 1,000+ concurrent users.",
      "Added Redis caching and rewrote core queries. Server latency dropped 35% and uptime held at 99.95%.",
      "Containerised services with Docker and set up CI/CD with GitHub Actions, which cut deployment failures by half. Ran production on AWS behind Nginx.",
    ],
  },
  {
    role: "MERN Stack Developer",
    org: "ADRIGHTLY",
    place: "Faisalabad, Pakistan",
    dates: "Aug 2022 to Feb 2024",
    points: [
      "Joined as a React intern and became a senior MERN developer within two years.",
      "Built e-commerce platforms with Shopify, Stripe and PayPal. Checkout improvements cut cart abandonment by 22%.",
      "Mentored three junior developers and cut their onboarding time by 40%. Owned projects from design to production.",
    ],
  },
] as const;

export const skillGroups = [
  {
    name: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Redux Toolkit"],
  },
  {
    name: "Backend",
    items: ["Node.js", "NestJS", "Express", "Python", "REST", "GraphQL", "microservices"],
  },
  {
    name: "AI",
    items: ["RAG", "LangChain", "OpenAI API", "embeddings", "vector search", "guardrails"],
  },
  {
    name: "Data",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "schema design", "query optimisation"],
  },
  {
    name: "Messaging and realtime",
    items: ["RabbitMQ", "Kafka", "BullMQ", "Socket.io", "webhooks"],
  },
  {
    name: "Cloud and delivery",
    items: ["Docker", "AWS (EC2, S3, RDS, Lambda)", "Nginx", "GitHub Actions", "Linux"],
  },
] as const;

export const services = [
  {
    name: "New product",
    audience: "You have an idea, or a process that still lives in spreadsheets.",
    includes: [
      "Data model, APIs and front end in Next.js, Node.js and PostgreSQL",
      "Multi-tenant setup, roles and audit history",
      "Background jobs, calendar and email integrations",
      "Docker, CI/CD and deployment",
    ],
    cta: "Plan a build",
  },
  {
    name: "AI assistants and automation",
    audience: "You want an AI assistant, chatbot, or workflow that works from your real business data.",
    includes: [
      "RAG and LLM integration over your catalogue, documents, or knowledge base",
      "Workflow automation with function calling, webhooks, and business rules",
      "Typed and spoken input",
      "Guardrails, structured outputs, and access controls",
      "An admin dashboard to run it day to day",
    ],
    cta: "Plan an AI feature",
  },
  {
    name: "Speed and reliability",
    audience: "Your API is slow, or releases keep breaking things.",
    includes: [
      "Redis caching and database query rewrites",
      "Latency targets measured at p95",
      "Docker and GitHub Actions pipelines",
      "AWS hosting behind Nginx",
    ],
    cta: "Fix performance",
  },
] as const;

export const education = [
  {
    name: "Associate Degree in Web Design and Development",
    org: "Virtual University of Pakistan",
    dates: "Jan 2024 to Jan 2026",
  },
  {
    name: "M320: MongoDB Data Modeling",
    org: "MongoDB University",
    dates: "Certification",
  },
  {
    name: "MERN Stack Developer",
    org: "American Skills Evaluation Institute",
    dates: "Certification",
  },
] as const;

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  jobTitle: person.title,
  email: person.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chichawatni",
    addressRegion: "Punjab",
    addressCountry: "PK",
  },
  sameAs: [person.linkedin, person.github],
  knowsAbout: ["Next.js", "Node.js", "Python", "RAG", "LLM integration", "AI assistants", "AI automation", "workflow automation", "document AI", "function calling", "LangChain", "PostgreSQL", "SaaS", "E-commerce"],
};
