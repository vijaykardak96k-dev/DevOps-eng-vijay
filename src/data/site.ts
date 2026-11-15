export const SITE_URL = "https://devops-eng-vijay.onrender.com";

export const profile = {
  name: "Vijay Kardak",
  role: "Entry-Level DevOps Engineer",
  positioning: "AWS · Kubernetes · CI/CD · Infrastructure Automation",
  location: "India",
  email: "vijaykardak96k@gmail.com",
  github: "https://github.com/vijaykardak96k-dev",
  linkedin: "https://www.linkedin.com/in/vijay-kardak-9b3817393",
  whatsapp: "https://wa.me/918010906561",
  resume: "/resume.pdf",
  education: {
    degree: "Bachelor of Computer Applications (BCA), final year",
    college: "Vinayakrao Patil Mahavidyalaya, Vaijapur",
    university: "Dr. Babasaheb Ambedkar Marathwada University (BAMU)",
  },
} as const;

export type SkillLevel = "used" | "hands-on" | "familiar" | "learning";
export const levelLabel: Record<SkillLevel, string> = {
  used: "Used in projects",
  "hands-on": "Hands-on practice",
  familiar: "Familiar",
  learning: "Currently learning",
};

export interface SkillGroup {
  id: string;
  title: string;
  items: { name: string; level: SkillLevel }[];
  projects: string[];
}

export const skillGroups: SkillGroup[] = [
  { id: "os", title: "Operating systems", projects: ["dockerized-three-tier-app"],
    items: [{ name: "Linux", level: "hands-on" }, { name: "Shell scripting", level: "hands-on" }] },
  { id: "vcs", title: "Version control", projects: [],
    items: [{ name: "Git", level: "hands-on" }, { name: "GitHub", level: "hands-on" }] },
  { id: "containers", title: "Containers", projects: ["dockerized-three-tier-app", "retail-store-microservices"],
    items: [{ name: "Docker", level: "used" }, { name: "Docker Compose", level: "used" }, { name: "Container registries", level: "familiar" }] },
  { id: "orchestration", title: "Orchestration", projects: ["retail-store-microservices", "kubernetes-ingress-networking", "aws-ebs-csi-storage", "kops-kubernetes-aws"],
    items: [
      { name: "Kubernetes", level: "used" }, { name: "Deployments", level: "used" }, { name: "Services", level: "used" },
      { name: "Ingress", level: "used" }, { name: "ConfigMaps", level: "used" }, { name: "Secrets", level: "used" },
      { name: "Persistent Volumes", level: "used" }, { name: "Helm", level: "learning" }, { name: "StatefulSets", level: "hands-on" },
      { name: "RBAC", level: "hands-on" }, { name: "HPA", level: "familiar" },
    ] },
  { id: "cicd", title: "CI/CD", projects: ["jenkins-cicd-pipeline"],
    items: [{ name: "Jenkins", level: "used" }, { name: "Maven", level: "used" }, { name: "AWS CodePipeline", level: "familiar" }, { name: "AWS CodeBuild", level: "familiar" }, { name: "AWS CodeDeploy", level: "familiar" }] },
  { id: "cloud", title: "Cloud (AWS)", projects: ["kops-kubernetes-aws", "aws-ebs-csi-storage", "dockerized-three-tier-app"],
    items: [
      { name: "EC2", level: "used" }, { name: "S3", level: "used" }, { name: "IAM", level: "used" }, { name: "Route 53", level: "used" },
      { name: "VPC", level: "hands-on" }, { name: "ELB/ALB", level: "hands-on" }, { name: "ECR", level: "familiar" }, { name: "ECS", level: "familiar" },
      { name: "EKS", level: "familiar" }, { name: "Lambda", level: "familiar" }, { name: "Auto Scaling", level: "familiar" },
      { name: "CloudWatch", level: "familiar" }, { name: "SNS", level: "familiar" },
    ] },
  { id: "iac", title: "Infrastructure automation", projects: ["kops-kubernetes-aws"],
    items: [{ name: "kops", level: "used" }, { name: "Ansible", level: "hands-on" }, { name: "Terraform", level: "hands-on" }] },
  { id: "security", title: "Security and quality", projects: ["jenkins-cicd-pipeline"],
    items: [{ name: "SonarQube", level: "used" }, { name: "Trivy", level: "used" }, { name: "OWASP scanning", level: "familiar" }] },
  { id: "artifacts", title: "Artifact management", projects: ["jenkins-cicd-pipeline"],
    items: [{ name: "Nexus", level: "used" }] },
  { id: "apps", title: "Applications and supporting tech", projects: ["retail-store-microservices", "dockerized-three-tier-app"],
    items: [{ name: "NGINX", level: "used" }, { name: "MongoDB", level: "used" }, { name: "MariaDB", level: "used" }, { name: "Flask", level: "used" }, { name: "Java", level: "familiar" }, { name: "Node.js", level: "familiar" }, { name: "Tomcat", level: "familiar" }] },
  { id: "learning", title: "Currently learning", projects: [],
    items: [{ name: "ArgoCD (GitOps)", level: "learning" }, { name: "Prometheus", level: "learning" }, { name: "Grafana", level: "learning" }] },
];

/** Order follows the learning sequence recorded in the original site. No calendar dates were
 *  available, so none are shown. Fill `when` with real dates if you want them displayed. */
export const journey: { stage: string; topics: string; mode: "Learned and practised" | "Built a project" | "Learning now"; when?: string }[] = [
  { stage: "Foundations", topics: "Linux, shell scripting, Git, GitHub", mode: "Learned and practised" },
  { stage: "Containers", topics: "Docker, Docker Compose", mode: "Built a project" },
  { stage: "CI/CD", topics: "Jenkins, Maven, SonarQube, Trivy, Nexus", mode: "Built a project" },
  { stage: "Cloud", topics: "AWS: EC2, S3, IAM, VPC, Route 53", mode: "Built a project" },
  { stage: "Kubernetes", topics: "Workloads, Services, Ingress, storage, RBAC, kops", mode: "Built a project" },
  { stage: "Infrastructure automation", topics: "Terraform, Ansible", mode: "Learned and practised" },
  { stage: "Next", topics: "Helm, ArgoCD, Prometheus, Grafana", mode: "Learning now" },
];
