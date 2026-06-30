import type { Skill } from "@/types";

export const skills: Skill[] = [
  {
    category: "Cloud & AWS",
    icon: "Cloud",
    items: [
      { name: "AWS EC2", featured: true },
      { name: "AWS S3", featured: true },
      { name: "AWS Lambda", featured: true },
      { name: "AWS RDS" },
      { name: "AWS IAM", featured: true },
      { name: "AWS CloudWatch", featured: true },
    ],
  },
  {
    category: "Containers & Orchestration",
    icon: "Layers",
    items: [
      { name: "Kubernetes", featured: true },
      { name: "Docker", featured: true },
      { name: "Helm" },
    ],
  },
  {
    category: "Infrastructure as Code",
    icon: "Code2",
    items: [
      { name: "Terraform", featured: true },
      { name: "Infrastructure-as-Code" },
    ],
  },
  {
    category: "CI/CD & Automation",
    icon: "GitBranch",
    items: [
      { name: "Jenkins", featured: true },
      { name: "CI/CD Pipelines" },
      { name: "uDeploy" },
      { name: "IBM WebSphere" },
    ],
  },
  {
    category: "Programming & Scripting",
    icon: "Terminal",
    items: [
      { name: "Python", featured: true },
      { name: "Bash" },
      { name: "SQL" },
      { name: "PHP (Laravel)" },
      { name: "JavaScript" },
      { name: "Vue.js" },
    ],
  },
  {
    category: "Monitoring & Incident",
    icon: "Activity",
    items: [
      { name: "Splunk", featured: true },
      { name: "ServiceNow" },
      { name: "Jira" },
      { name: "Netcool" },
    ],
  },
  {
    category: "Operating Systems",
    icon: "Server",
    items: [
      { name: "Linux / Unix", featured: true },
      { name: "Red Hat Enterprise Linux" },
    ],
  },
  {
    category: "Version Control",
    icon: "GitMerge",
    items: [
      { name: "Git", featured: true },
      { name: "Bitbucket" },
    ],
  },
];
