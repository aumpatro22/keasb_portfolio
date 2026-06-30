export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  client?: string;
  responsibilities: string[];
  technologies: string[];
  highlights: string[];
}

export interface Skill {
  category: string;
  icon: string;
  items: SkillItem[];
}

export interface SkillItem {
  name: string;
  featured?: boolean;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credlyUrl: string;
  badgeColor: string;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  location: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
