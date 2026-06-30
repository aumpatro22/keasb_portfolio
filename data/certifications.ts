import type { Certification } from "@/types";

export const certifications: Certification[] = [
  {
    id: "cka",
    name: "Certified Kubernetes Administrator",
    issuer: "Cloud Native Computing Foundation (CNCF)",
    date: "January 2026",
    credlyUrl:
      "https://www.credly.com/badges/4a6e07f4-a565-45f7-98c6-839ebab3fabf/linked_in_profile",
    badgeColor: "#326CE5",
    description:
      "Validates expertise in Kubernetes cluster administration, including setup, configuration, networking, storage, security, and troubleshooting in production environments.",
  },
  {
    id: "aws-saa",
    name: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    date: "June 2024",
    credlyUrl:
      "https://www.credly.com/badges/dfb19f8f-c695-4d70-bade-1032e36df511/linked_in_profile",
    badgeColor: "#FF9900",
    description:
      "Demonstrates ability to design and deploy scalable, highly available, and fault-tolerant systems on AWS, covering compute, storage, networking, and security services.",
  },
];
