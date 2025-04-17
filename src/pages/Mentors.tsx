
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, X } from "lucide-react";
import MentorCard, { MentorProps } from "@/components/MentorCard";

// Sample mentors data
const allMentors: MentorProps[] = [
  {
    id: "1",
    name: "Ana Silveira",
    role: "Líder de Desenvolvimento",
    description:
      "Especialista em desenvolvimento web e arquitetura de aplicações. Mais de 10 anos de experiência liderando equipes de desenvolvimento.",
    imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2787&auto=format&fit=crop",
    skills: ["React", "Node.js", "Arquitetura", "Liderança"],
    availability: "Quintas e Sextas",
    contact: {
      email: "ana.silveira@neki.com",
      linkedin: "https://linkedin.com/in/anasilveira",
    },
  },
  {
    id: "2",
    name: "Carlos Oliveira",
    role: "Tech Lead",
    description:
      "Especialista em soluções escaláveis e performance. Experiência em liderar projetos de grande porte e mentorar equipes.",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2787&auto=format&fit=crop",
    skills: ["Java", "Spring", "Microserviços", "DevOps"],
    availability: "Segundas e Quartas",
    contact: {
      email: "carlos.oliveira@neki.com",
      phone: "+5521999999999",
    },
  },
  {
    id: "3",
    name: "Juliana Martins",
    role: "UX/UI Designer",
    description:
      "Especialista em design de interfaces e experiência do usuário. Ampla experiência em pesquisa de usuários e prototipação.",
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2561&auto=format&fit=crop",
    skills: ["Design Systems", "UX Research", "Figma", "Product Design"],
    availability: "Terças e Quintas",
    contact: {
      linkedin: "https://linkedin.com/in/julianamartins",
    },
  },
  {
    id: "4",
    name: "Ricardo Santos",
    role: "Arquiteto de Software",
    description:
      "Especialista em arquitetura de sistemas distribuídos e soluções cloud. Foco em escalabilidade e segurança.",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2940&auto=format&fit=crop",
    skills: ["AWS", "Microserviços", "Kubernetes", "Arquitetura"],
    availability: "Terças e Sextas",
    contact: {
      email: "ricardo.santos@neki.com",
    },
  },
  {
    id: "5",
    name: "Patricia Lima",
    role: "Agile Coach",
    description:
      "Especialista em metodologias ágeis e transformação de equipes. Experiência em coaching de times e liderança.",
    imageUrl: "https://images.unsplash.com/photo-1587614387466-0a72ca909e16?q=80&w=2787&auto=format&fit=crop",
    skills: ["Scrum", "Kanban", "OKRs", "Facilitação"],
    availability: "Segundas e Quintas",
    contact: {
      email: "patricia.lima@neki.com",
      linkedin: "https://linkedin.com/in/patricialima",
    },
  },
  {
    id: "6",
    name: "Marcos Fernandes",
    role: "Especialista em Dados",
    description:
      "Especialista em ciência de dados e machine learning. Experiência em análise de dados e implementação de modelos preditivos.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop",
    skills: ["Python", "Machine Learning", "Data Science", "Big Data"],
    availability: "Quartas e Sextas",
    contact: {
      email: "marcos.fernandes@neki.com",
    },
  },
];

// Extract all unique skills
const allSkills = Array.from(
  new Set(allMentors.flatMap((mentor) => mentor.skills))
).sort();

const Mentors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [filteredMentors, setFilteredMentors] = useState<MentorProps[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter mentors based on search term and selected skills
  useEffect(() => {
    let result = allMentors;

    // Filter by search term
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        (mentor) =>
          mentor.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          mentor.role.toLowerCase().includes(lowerCaseSearchTerm) ||
          mentor.description.toLowerCase().includes(lowerCaseSearchTerm) ||
          mentor.skills.some((skill) =>
            skill.toLowerCase().includes(lowerCaseSearchTerm)
          )
      );
    }

    // Filter by selected skills
    if (selectedSkills.length > 0) {
      result = result.filter((mentor) =>
        selectedSkills.some((skill) => mentor.skills.includes(skill))
      );
    }

    setFilteredMentors(result);
  }, [searchTerm, selectedSkills]);

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedSkills([]);
  };

  return (
    <div className="pt-20 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl font-bold mb-4">Nossos Mentores</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore nossa lista de mentores especializados e encontre o profissional
            ideal para guiar seu desenvolvimento de carreira.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-10 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar por nome, cargo ou habilidade..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              {selectedSkills.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-muted-foreground text-sm h-10"
                >
                  Limpar filtros
                  <X className="ml-1 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Skills Filter */}
          <div className="mt-4">
            <div className="text-sm font-medium mb-2">Filtrar por habilidades:</div>
            <div className="flex flex-wrap gap-2">
              {allSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant={selectedSkills.includes(skill) ? "default" : "outline"}
                  className={`cursor-pointer ${
                    selectedSkills.includes(skill)
                      ? "bg-neki-gradient"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => handleSkillToggle(skill)}
                >
                  {skill}
                  {selectedSkills.includes(skill) && (
                    <X className="ml-1 h-3 w-3" />
                  )}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Mentors Grid */}
        {filteredMentors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.map((mentor, index) => (
              <div
                key={mentor.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <MentorCard {...mentor} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
            <div className="text-muted-foreground text-lg mb-4">
              Nenhum mentor encontrado com esses critérios.
            </div>
            <Button
              variant="outline"
              onClick={clearFilters}
              className="border-neki-teal text-neki-teal hover:bg-neki-teal/10"
            >
              Limpar filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mentors;
