
export interface MenteeProfile {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
  company: string;
  joinDate: string;
  interests: string[];
  preferredTopics: {
    topic: string;
    category: string;
    interestLevel: number;
  }[];
  progress: number;
  sessionCount: number;
  lastActive: string;
}

// Mock data for mentee profiles
export const menteeProfiles: MenteeProfile[] = [
  {
    id: 1,
    name: "Ana Silva",
    email: "ana.silva@email.com",
    avatar: "AS",
    role: "Desenvolvedora Frontend",
    company: "TechStart Brasil",
    joinDate: "2023-08-15",
    interests: ["React", "UI/UX", "JavaScript"],
    preferredTopics: [
      { topic: "React", category: "Desenvolvimento", interestLevel: 9 },
      { topic: "UI/UX", category: "Design", interestLevel: 7 },
      { topic: "JavaScript", category: "Desenvolvimento", interestLevel: 8 }
    ],
    progress: 75,
    sessionCount: 12,
    lastActive: "2023-10-22"
  },
  {
    id: 2,
    name: "Pedro Oliveira",
    email: "pedro.oliveira@email.com",
    avatar: "PO",
    role: "Analista de Dados",
    company: "Dados & CIA",
    joinDate: "2023-07-10",
    interests: ["Python", "Machine Learning", "SQL"],
    preferredTopics: [
      { topic: "Python", category: "Desenvolvimento", interestLevel: 8 },
      { topic: "Machine Learning", category: "Dados", interestLevel: 9 },
      { topic: "SQL", category: "Dados", interestLevel: 7 }
    ],
    progress: 62,
    sessionCount: 8,
    lastActive: "2023-10-18"
  },
  {
    id: 3,
    name: "Juliana Costa",
    email: "juliana.costa@email.com",
    avatar: "JC",
    role: "Product Manager",
    company: "Inovação Digital",
    joinDate: "2023-09-05",
    interests: ["Product Management", "Liderança", "UX Research"],
    preferredTopics: [
      { topic: "Product Management", category: "Gestão", interestLevel: 9 },
      { topic: "Liderança", category: "Gestão", interestLevel: 8 },
      { topic: "UX Research", category: "Design", interestLevel: 6 }
    ],
    progress: 45,
    sessionCount: 5,
    lastActive: "2023-10-20"
  },
  {
    id: 4,
    name: "Rafael Mendes",
    email: "rafael.mendes@email.com",
    avatar: "RM",
    role: "DevOps Engineer",
    company: "Cloud Systems",
    joinDate: "2023-06-20",
    interests: ["AWS", "Docker", "Kubernetes"],
    preferredTopics: [
      { topic: "AWS", category: "DevOps", interestLevel: 9 },
      { topic: "Docker", category: "DevOps", interestLevel: 8 },
      { topic: "Kubernetes", category: "DevOps", interestLevel: 7 }
    ],
    progress: 85,
    sessionCount: 15,
    lastActive: "2023-10-21"
  },
  {
    id: 5,
    name: "Fernanda Santos",
    email: "fernanda.santos@email.com",
    avatar: "FS",
    role: "Mobile Developer",
    company: "AppMakers",
    joinDate: "2023-08-01",
    interests: ["React Native", "Flutter", "UI Design"],
    preferredTopics: [
      { topic: "React Native", category: "Mobile", interestLevel: 9 },
      { topic: "Flutter", category: "Mobile", interestLevel: 6 },
      { topic: "UI Design", category: "Design", interestLevel: 7 }
    ],
    progress: 55,
    sessionCount: 7,
    lastActive: "2023-10-19"
  }
];
