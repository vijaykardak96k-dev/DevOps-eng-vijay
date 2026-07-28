export interface Profile {
  name: string;
  titles: string[];
  tagline: string;
  location: string;
  email: string;
  github: string;
  githubUrl: string;
  linkedin: string;
  linkedinUrl: string;
  whatsapp: string;
  whatsappUrl: string;
  instagram: string;
  instagramUrl: string;
  about: {
    story: string[];
    whyDevOps: string;
    learningMindset: string;
    goals: string[];
  };
  stats: { label: string; value: number; suffix: string }[];
  currentlyLearning: string[];
  resumeFile: string;
}

export type SkillStatus = "completed" | "learning" | "planned";

export interface Skill {
  name: string;
  level: number;
  status: SkillStatus;
  icon: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  skills: Skill[];
}

export interface SkillsData {
  categories: SkillCategory[];
}

export interface ProjectDetails {
  overview: string;
  architecture: string;
  features: string[];
  folderStructure: string[];
  screenshots: string[];
  lessonsLearned: string[];
  challenges: string[];
  futureImprovements: string[];
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  featured: boolean;
  status: "completed" | "learning";
  techStack: string[];
  githubUrl: string;
  demoUrl: string;
  details: ProjectDetails;
}

export interface TimelineItem {
  id: string;
  title: string;
  date: string;
  status: "completed" | "learning" | "planned";
  description: string;
  lessons: string[];
}
