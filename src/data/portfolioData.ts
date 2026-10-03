import { Project, SkillCategory, ExperienceItem, Testimonial, Certification, ServicePackage } from '../types';

export const PERSONAL_INFO = {
  name: "Bilal Khan Lodhi",
  title: "Senior Full-Stack & Next.js Engineer",
  shortBio: "Specializing in high-performance Next.js App Router applications, scalable microservices, interactive UI design systems, and real-time web architectures.",
  availability: "Available for High-Impact Senior Roles & Consultations",
  location: "DOHS Phase 1, Malir Cantt, Karachi, Pakistan",
  email: "bilallodhi824@gmail.com",
  phone: "03001129959",
  github: "https://github.com/bilallodhi",
  linkedin: "https://linkedin.com/in/bilallodhi",
  twitter: "https://x.com/bilallodhi",
  stats: [
    { label: "Years Experience", value: "6+" },
    { label: "Production Apps Built", value: "35+" },
    { label: "Code Commits 2025", value: "2,400+" },
    { label: "Client Satisfaction", value: "100%" }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "vectonix-portal",
    title: "Vectonix Student Registration & Management Portal",
    tagline: "Official Digital Entry Pass & Student Data Entry Portal for GDSC Malir Cantt",
    description: "Production student registration, B-Form verification, roll number validation, and digital entry pass generator with administrative review workflows.",
    fullDescription: "Vectonix is a mission-critical student data entry and digital registration system built for Govt. Degree Science & Commerce College Malir Cantt. It automates student onboarding with strict form validation (CNIC/B-Form formatting, gender/faculty roll number range enforcement), photo and marksheet upload compliance, automated digital entry pass PDF generation, and an administrative control panel.",
    category: "Next.js & Full-Stack",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PDF Generation", "Admin Dashboard", "Form Validation"],
    metrics: ["100% Digital Admission Workflow", "Instant PDF Pass Compilation", "Zero Duplication Validation"],
    stars: 184,
    forks: 36,
    featured: true,
    demoUrl: "https://www.vectonix.com",
    githubUrl: "https://github.com",
    codeSnippet: {
      language: "typescript",
      filename: "app/api/registration/validate/route.ts",
      code: `export async function POST(req: Request) {
  const { rollNo, faculty, cnic, category } = await req.json();

  // Validate CNIC format XXXXX-XXXXXXX-X
  const cnicRegex = /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/;
  if (!cnicRegex.test(cnic)) {
    return Response.json({ error: "Invalid CNIC/B-Form format." }, { status: 400 });
  }

  // Verify roll number allocation range by faculty & quota
  const isValidRange = verifyRollRange(rollNo, faculty, category);
  if (!isValidRange) {
    return Response.json({ error: "Roll number outside allocated range." }, { status: 422 });
  }

  return Response.json({ status: "VERIFIED_ELIGIBLE", rollNo });
}`
    },
    architecture: [
      "Next.js App Router with responsive Tailwind CSS layout and dark/light mode compatibility",
      "Automated digital entry card generation and PDF receipt streaming",
      "Strict multi-step validation wizard enforcing official college registration guidelines"
    ]
  },
  {
    id: "gdcmc-college-portal",
    title: "Govt. Degree Science & Commerce College Malir Cantt",
    tagline: "Official institutional web platform with headless CMS & student portals (est. 1979)",
    description: "Full-scale college portal featuring dynamic academic calendars, faculty directories, departments, societies, digital magazine, and alumni management.",
    fullDescription: "The official institutional web platform for Govt. Degree Science & Commerce College Malir Cantt Karachi (GDCMC 1979). Designed with high-performance Next.js architecture, headless Sanity CMS for live content publishing, SEO-first metadata, dynamic campus tour galleries, academic schedules, news feeds, and responsive navigation across all devices.",
    category: "Next.js & Full-Stack",
    tags: ["Next.js", "React", "Sanity CMS", "Tailwind CSS", "SEO & Schema.org", "Swiper.js", "TypeScript"],
    metrics: ["99/100 Core Web Vitals", "Instant CMS Live Publishing", "Comprehensive Academic Directory"],
    stars: 245,
    forks: 52,
    featured: true,
    demoUrl: "https://www.gdcmc1979.com",
    githubUrl: "https://github.com",
    codeSnippet: {
      language: "typescript",
      filename: "lib/sanity/fetchNews.ts",
      code: `import { client } from './client';

export async function getCollegeAnnouncements() {
  const query = \`*[_type == "announcement" && isPublished == true] | order(date desc) {
    _id,
    title,
    slug,
    category,
    publishedAt,
    "imageUrl": mainImage.asset->url,
    body
  }\`;
  
  return await client.fetch(query, {}, { next: { revalidate: 3600 } });
}`
    },
    architecture: [
      "Next.js Incremental Static Regeneration (ISR) delivering sub-second edge cached page views",
      "Sanity CMS integration allowing non-technical college faculty to update notices and events instantly",
      "Rich structured JSON-LD Schema markup ensuring top Google Knowledge Graph ranking for the institution"
    ]
  },
  {
    id: "quiznox-assessment-platform",
    title: "QuizNox — Student Assessment & Learning Platform",
    tagline: "Key-protected active recall platform with real-time anti-cheat detection & analytics",
    description: "Educational testing engine featuring access-key gated assessments, tab-switch anti-cheat monitoring, timed auto-submit, and performance tracking.",
    fullDescription: "QuizNox is a specialized metacognition and active recall self-assessment platform. Features secure access-code gating issued by instructors, browser visibility tracking (anti-cheat tab switch and blur detection triggering automatic submission), chapter-wise knowledge evaluation, student mastery analytics, and verifiable certificate issuance.",
    category: "AI & Platforms",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Anti-Cheat Engine", "Student Analytics", "Vercel"],
    metrics: ["Sub-50ms Response Time", "Automated Anti-Cheat Submission", "Chapter Mastery Tracking"],
    stars: 210,
    forks: 48,
    featured: true,
    demoUrl: "https://quiznox.vercel.app",
    githubUrl: "https://github.com",
    codeSnippet: {
      language: "typescript",
      filename: "hooks/useAntiCheatGuard.ts",
      code: `export function useAntiCheatGuard(onViolation: () => void) {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        onViolation(); // Auto-submits quiz if student switches tab
      }
    };

    const handleWindowBlur = () => {
      onViolation();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [onViolation]);
}`
    },
    architecture: [
      "Custom anti-cheat event subsystem tracking window blur, tab switching, and inspection shortcuts",
      "Optimized question delivery pipeline with client-side state caching and instant answer validation",
      "Cryptographic certificate verification endpoint matching credential hashes to test results"
    ]
  },
  {
    id: "watchify-luxury-store",
    title: "Watchify — Luxury Timepiece E-Commerce & Customizer",
    tagline: "Bespoke Swiss watch showroom featuring live configurator, wrist simulator & cart",
    description: "Crafted luxury watch eCommerce platform with dynamic collections, interactive wrist visualizer, live product customizer, wishlist, and cart drawer.",
    fullDescription: "Watchify delivers a bespoke luxury shopping experience for Swiss timepieces. Engineered with semantic HTML5, fluid CSS3 animations, and vanilla JavaScript ES6. Includes a custom watch configurator (customizing dials, cases, and straps in real time), interactive wrist simulator, search/filter engine, persistent cart drawer, and gold glassmorphic design system.",
    category: "UI/UX & E-Commerce",
    tags: ["HTML5", "CSS3", "JavaScript ES6", "eCommerce", "3D Wrist Simulator", "Glassmorphism", "Micro-Animations"],
    metrics: ["100% Vanilla JS (Zero Runtime Overhead)", "60 FPS Smooth Canvas Animations", "Live Watch Customizer"],
    stars: 165,
    forks: 34,
    featured: true,
    demoUrl: "/projects/watchify/index.html",
    githubUrl: "https://github.com",
    codeSnippet: {
      language: "javascript",
      filename: "watchify/app.js",
      code: `// Live Watch Configurator State Manager
const WatchConfigurator = {
  selectedCase: 'rose-gold',
  selectedDial: 'midnight-blue',
  selectedStrap: 'alligator-leather',
  basePrice: 12500,

  updatePreview() {
    const watchImg = document.getElementById('configWatchImage');
    const priceDisplay = document.getElementById('configTotalPrice');
    const calculatedPrice = this.calculatePrice();

    watchImg.src = \`images/custom/\${this.selectedCase}_\${this.selectedDial}.png\`;
    priceDisplay.textContent = \`$\${calculatedPrice.toLocaleString()}\`;
  }
};`
    },
    architecture: [
      "Modular vanilla JavaScript ES6 architecture with event-driven state and localStorage persistence",
      "Pure CSS custom property design system featuring gold metallic gradients and dark luxury glassmorphism",
      "Responsive interactive wrist view simulator and instant cart drawer checkout pipeline"
    ]
  },
  {
    id: "clothies-fashion-store",
    title: "Clothies — Contemporary Apparel Boutique",
    tagline: "Modern fashion eCommerce storefront with responsive catalog, filtering & cart",
    description: "E-commerce platform designed for fashion brands featuring curated trend lookbooks, category filtering, interactive shopping cart, and quick-view modals.",
    fullDescription: "Clothies delivers an intuitive online shopping experience for contemporary apparel and fashion collections. Built with modern HTML5, CSS Grid/Flexbox, and vanilla JavaScript. Features instant collection filters, size and color selectors, quantity management, interactive cart drawer, and mobile-first responsive styling.",
    category: "UI/UX & E-Commerce",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "eCommerce UI", "Modern Layouts", "Cart Drawer"],
    metrics: ["Instant Zero-Bundle Load", "Mobile-First UX", "Seamless Cart Drawer"],
    stars: 142,
    forks: 28,
    featured: false,
    demoUrl: "/projects/clothies/index.html",
    githubUrl: "https://github.com",
    codeSnippet: {
      language: "javascript",
      filename: "clothies/js/main.js",
      code: `// Cart State Management
class ShoppingCart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('clothies_cart')) || [];
    this.updateCartBadge();
  }

  addItem(product, size, color) {
    const existing = this.items.find(i => i.id === product.id && i.size === size);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({ ...product, size, color, quantity: 1 });
    }
    this.save();
    this.renderCartDrawer();
  }
}`
    },
    architecture: [
      "Lightweight, dependency-free vanilla JS frontend with localStorage synchronization",
      "Fluid CSS grid catalog layout optimized for high-resolution product imagery and lookbooks",
      "Accessible modal dialogs and slide-out side drawers for smooth mobile checkout flows"
    ]
  },
  {
    id: "nexus-cloud-dashboard",
    title: "NexusCloud AI Analytics Engine",
    tagline: "Real-time AI telemetry & infrastructure monitoring built on Next.js 15 App Router",
    description: "Enterprise SaaS monitoring console with serverless stream processing, dynamic charting, and automated incident triage.",
    fullDescription: "NexusCloud provides real-time latency monitoring, custom AI anomaly detection, and instant alerting across distributed serverless clusters. Built with Next.js App Router, Server Actions, Tailwind CSS, and WebSockets.",
    category: "AI & Platforms",
    tags: ["HTML5", "CSS3", "JavaScript", "Canvas API", "AI Telemetry", "WebSockets", "Serverless"],
    metrics: ["Sub-20ms P99 Latency", "140k+ Events/Sec Ingestion", "Real-Time AI Anomaly Triage"],
    stars: 342,
    forks: 58,
    featured: true,
    demoUrl: "/projects/nexuscloud/index.html",
    githubUrl: "https://github.com",
    codeSnippet: {
      language: "javascript",
      filename: "nexuscloud/app.js",
      code: `// Real-Time Distributed Telemetry Stream Processor
function updateDataCycle() {
  if (!state.isStreaming) return;

  const jitter = state.isAnomalyActive ? 60 : 15;
  const baseHttp = state.isAnomalyActive ? 180 : 130;
  const baseAi = state.isAnomalyActive ? 120 : 65;

  state.chartData.http.shift();
  state.chartData.http.push(baseHttp + (Math.random() - 0.5) * jitter);

  state.chartData.ai.shift();
  state.chartData.ai.push(baseAi + (Math.random() - 0.5) * jitter);

  drawMainChart();
}`
    },
    architecture: [
      "Custom 60 FPS Canvas visualizer streaming live HTTP ingress, AI inference, and Redis Pub/Sub channels",
      "Dynamic regional edge matrix tracking health checks, CPU/RAM utilization, and millisecond pings",
      "Interactive automated AI incident triage engine with instant self-healing mitigation simulation"
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend & Web Technologies",
    iconName: "Code2",
    skills: [
      { name: "Next.js (App Router)", level: 98, experience: "5+ yrs", highlight: true },
      { name: "React 19 & Hooks", level: 96, experience: "6+ yrs", highlight: true },
      { name: "TypeScript", level: 95, experience: "5+ yrs", highlight: true },
      { name: "Tailwind CSS & Vanilla CSS", level: 98, experience: "5+ yrs", highlight: true },
      { name: "HTML5 & Semantic SEO", level: 99, experience: "6+ yrs" },
      { name: "State Management (Zustand/Redux)", level: 92, experience: "5+ yrs" },
      { name: "Web Workers & WebSockets", level: 88, experience: "4+ yrs" }
    ]
  },
  {
    title: "Backend & Microservices",
    iconName: "Server",
    skills: [
      { name: "Node.js & Express", level: 94, experience: "6+ yrs", highlight: true },
      { name: "RESTful & GraphQL APIs", level: 93, experience: "5+ yrs", highlight: true },
      { name: "Next.js Server Actions & Route Handlers", level: 96, experience: "3+ yrs", highlight: true },
      { name: "Authentication (NextAuth/Clerk/OAuth)", level: 92, experience: "4+ yrs" },
      { name: "Serverless & Edge Compute", level: 90, experience: "4+ yrs" }
    ]
  },
  {
    title: "Database & Cloud Infrastructure",
    iconName: "Database",
    skills: [
      { name: "PostgreSQL & Supabase", level: 91, experience: "5+ yrs", highlight: true },
      { name: "Prisma & Drizzle ORM", level: 94, experience: "4+ yrs", highlight: true },
      { name: "Redis & Caching", level: 89, experience: "4+ yrs" },
      { name: "Docker & Containerization", level: 86, experience: "3+ yrs" },
      { name: "Vercel / AWS Cloud Deployment", level: 93, experience: "5+ yrs" }
    ]
  },
  {
    title: "Quality, Tools & Architecture",
    iconName: "Cpu",
    skills: [
      { name: "Performance Optimization (Core Web Vitals)", level: 97, experience: "5+ yrs", highlight: true },
      { name: "Git / GitHub Actions CI/CD", level: 95, experience: "6+ yrs" },
      { name: "Jest / Vitest / Playwright", level: 87, experience: "4+ yrs" },
      { name: "Clean Architecture & Design Patterns", level: 95, experience: "6+ yrs" }
    ]
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "aws-solutions-architect",
    title: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    issueDate: "2024",
    credentialId: "AWS-PSA-994820",
    badgeColor: "from-amber-500 to-orange-500",
    skills: ["Cloud Architecture", "Serverless", "S3 & DynamoDB", "EC2 & ECS"],
    verified: true
  },
  {
    id: "meta-frontend-dev",
    title: "Meta Certified Senior Front-End Developer",
    issuer: "Meta / Coursera",
    issueDate: "2023",
    credentialId: "META-FED-88412",
    badgeColor: "from-blue-500 to-cyan-500",
    skills: ["Advanced React", "UX Architecture", "Jest Testing", "State Design"],
    verified: true
  },
  {
    id: "vercel-nextjs-expert",
    title: "Vercel Next.js App Router Certified Specialist",
    issuer: "Vercel",
    issueDate: "2024",
    credentialId: "VERCEL-NEXT-1049",
    badgeColor: "from-slate-700 to-slate-900",
    skills: ["Server Actions", "ISR & Edge", "Turbopack", "Middleware Security"],
    verified: true
  }
];

export const SERVICES: ServicePackage[] = [
  {
    id: "nextjs-audit",
    title: "Next.js Core Web Vitals & Performance Audit",
    subtitle: "Complete diagnostic & optimization for existing Next.js / React platforms.",
    price: "$750",
    period: "one-time",
    features: [
      "Lighthouse 100/100 Performance Remediation Plan",
      "Bundle size breakdown & dynamic import refactoring",
      "Core Web Vitals LCP, CLS, INP optimization report",
      "Memory leak & server rendering bottleneck triage"
    ],
    timeline: "3-5 Business Days",
    ctaText: "Book Audit"
  },
  {
    id: "fullstack-mvp",
    title: "Full-Stack Next.js 15 Web App Development",
    subtitle: "End-to-end custom web application built from scratch to production.",
    price: "$2,800",
    period: "starting package",
    popular: true,
    features: [
      "Custom Next.js App Router + TypeScript codebase",
      "PostgreSQL / Prisma Database Schema & Migrations",
      "NextAuth / OAuth2 Authentication & Stripe Payment integration",
      "Responsive Glassmorphic UI Design System (Dark/Light Mode)",
      "Zero-downtime deployment setup on Vercel / AWS"
    ],
    timeline: "2-4 Weeks",
    ctaText: "Start Project"
  },
  {
    id: "enterprise-arch",
    title: "Enterprise Architecture & Team Lead Advisory",
    subtitle: "Ongoing fractional technical lead & microservices architecture guidance.",
    price: "$1,800",
    period: "per month",
    features: [
      "Fractional Lead Next.js Architect oversight",
      "CI/CD automation & automated visual regression testing",
      "Custom API Gateway & Microservices design",
      "Weekly team code reviews & engineering mentorship"
    ],
    timeline: "Ongoing Retainer",
    ctaText: "Retain Lead"
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "lead-next-eng",
    role: "Lead Next.js & Full-Stack Architect",
    company: "Vortex Digital Systems",
    period: "2023 - Present",
    location: "Karachi, Pakistan (Hybrid)",
    type: "Lead",
    description: "Architecting high-concurrency client solutions, leading frontend engineering standards, and optimizing Next.js server component pipelines.",
    achievements: [
      "Spearheaded migration of legacy SPA to Next.js App Router, cutting page load time by 62%",
      "Engineered reusable UI component library used across 12 product teams",
      "Mentored 8 mid/senior engineers and introduced automated visual regression testing"
    ],
    technologies: ["Next.js 15", "TypeScript", "Tailwind CSS", "Prisma", "AWS", "GraphQL"]
  },
  {
    id: "senior-web-dev",
    role: "Senior Full-Stack Web Developer",
    company: "Apex Cloud Innovations",
    period: "2021 - 2023",
    location: "Remote",
    type: "Full-time",
    description: "Developed real-time financial dashboards, interactive data visualization components, and secure OAuth2 API integrations.",
    achievements: [
      "Built low-latency WebSocket charting canvas handling 50k active concurrent connections",
      "Reduced bundle size by 45% using dynamic imports and code splitting",
      "Designed zero-downtime CI/CD deployment pipelines on Vercel and AWS Docker containers"
    ],
    technologies: ["React", "Next.js", "Node.js", "TypeScript", "Redis", "Docker"]
  },
  {
    id: "frontend-engineer",
    role: "Frontend Engineer & UI Developer",
    company: "Lumina Labs",
    period: "2019 - 2021",
    location: "Karachi, Pakistan",
    type: "Full-time",
    description: "Created responsive web interfaces, complex interactive forms, and accessibility-compliant design systems.",
    achievements: [
      "Achieved 100% WCAG 2.1 AA accessibility compliance across all flagship web properties",
      "Integrated automated cross-browser testing suite using Playwright and Cypress"
    ],
    technologies: ["React", "JavaScript (ES6+)", "CSS Modules", "HTML5", "REST APIs"]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Muhammad Hamza Tariq",
    role: "CTO & Co-Founder",
    company: "DevNexus Solutions (Karachi)",
    initials: "HT",
    quote: "Bilal is an absolute wizard with Next.js and modern Web architecture. He delivered our enterprise platform weeks ahead of schedule with flawless 100 Lighthouse performance metrics.",
    rating: 4.0,
    verified: true
  },
  {
    id: "test-2",
    name: "Syed Daniyal Ali",
    role: "Head of Engineering",
    company: "CloudSys Technologies (Lahore)",
    initials: "DA",
    quote: "Working with Bilal transformed our product UX. His attention to detail, smooth animation work, and clean TypeScript codebase set a new benchmark for our entire engineering team.",
    rating: 4.5,
    verified: true
  },
  {
    id: "test-3",
    name: "Zubair Ahmed Khan",
    role: "VP of Technology",
    company: "FinTech Hub (Islamabad)",
    initials: "ZK",
    quote: "If you need a developer who understands both high-level distributed architecture and fine-grained UI pixel perfection, Bilal is the top choice. Exceptional communication and mastery.",
    rating: 5.0,
    verified: true
  }
];

