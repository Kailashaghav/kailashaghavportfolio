export interface Project {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  tags: string[];
  year: string;
  color: string;
  description: string;
  link: string;
  github: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  type: string;
  highlights: string[];
  color: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillStack {
  category: string;
  icon: string;
  color: string;
  skills: Skill[];
}
