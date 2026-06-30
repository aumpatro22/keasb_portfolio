import type { NavItem, ContactInfo } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Certifications", href: "#certifications" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export const CONTACT_INFO: ContactInfo = {
  email: "kesabnayak4@gmail.com",
  phone: "+49 1788070473",
  location: "Osnabrück, Germany",
  linkedin: "https://www.linkedin.com/in/kesab-nayak-371858a1",
  github: "https://github.com/Kesab2018",
};

export const CANDIDATE = {
  name: "Kesab Kumar Nayak",
  title: "DevOps & Cloud Infrastructure Engineer",
  tagline: "Building reliable cloud infrastructure at enterprise scale.",
  summary:
    "Cloud and DevOps Engineer with over 6 years of experience designing, automating, and optimizing cloud infrastructures on AWS. CKA-certified Kubernetes Administrator and AWS Certified Solutions Architect – Associate, with strong expertise in Terraform, Kubernetes, and CI/CD pipelines.",
  location: "Osnabrück, Germany",
  residency: "German Permanent Resident",
  languages: [
    { language: "English", level: "Fluent" },
    { language: "German", level: "B2" },
  ],
  yearsOfExperience: "6+",
};

export const SITE_URL = "https://kesab-nayak.dev";

export const CLOUD_HIGHLIGHTS = [
  {
    icon: "Shield",
    title: "99.9% Uptime SLA",
    description:
      "Led real-time incident response for enterprise clients, ensuring application availability under strict SLA commitments at Volkswagen Group.",
  },
  {
    icon: "Zap",
    title: "40% Faster Deployments",
    description:
      "Automated AWS infrastructure provisioning using Terraform at Alter Solutions, cutting deployment times by 40% across production environments.",
  },
  {
    icon: "TrendingDown",
    title: "~20% Cost Reduction",
    description:
      "Optimized AWS resource utilization through CloudWatch monitoring and rightsizing, achieving significant cost savings for enterprise workloads.",
  },
  {
    icon: "Lock",
    title: "Enterprise Security",
    description:
      "Implemented IAM role management, security hardening, and patching strategies aligned with corporate security standards.",
  },
  {
    icon: "Server",
    title: "Kubernetes Operations",
    description:
      "Hands-on experience delivering multiple Kubernetes projects including cluster setup, Helm deployments, and autoscaling workflows. CKA certified.",
  },
  {
    icon: "RefreshCw",
    title: "Disaster Recovery",
    description:
      "Managed enterprise-scale DR events, Data Refresh, Data Synchronization, and Data Warehouse maintenance at Morgan Stanley.",
  },
];
