export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  fullDescription: string;
  category: 'Full-Stack' | 'Next.js & AI' | 'UI/UX & Design' | 'APIs & Backend' | 'Next.js & Full-Stack' | 'UI/UX & E-Commerce' | 'AI & Platforms' | string;
  tags: string[];
  metrics: string[];
  stars: number;
  forks: number;
  featured: boolean;
  demoUrl?: string;
  githubUrl?: string;
  codeSnippet?: {
    language: string;
    filename: string;
    code: string;
  };
  architecture?: string[];
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: {
    name: string;
    level: number; // 0 to 100
    experience: string;
    icon?: string;
    highlight?: boolean;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Lead';
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  avatar?: string;
  quote: string;
  rating: number; // e.g. 4.0, 4.5, 5.0
  verified: boolean;
  linkedIn?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  badgeColor: string;
  skills: string[];
  verified: boolean;
}

export interface ServicePackage {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  period: string;
  popular?: boolean;
  features: string[];
  timeline: string;
  ctaText: string;
}

export interface TerminalCommand {
  command: string;
  description: string;
  output: string | string[];
}
