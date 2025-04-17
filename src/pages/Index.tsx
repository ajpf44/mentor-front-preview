
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  CalendarCheck,
  CalendarDays,
  Users,
  VideoIcon,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MentorCard, { MentorProps } from "@/components/MentorCard";

// Sample mentors data
const featureMentors: MentorProps[] = [
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
    imageUrl: "https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?q=80&w=2940&auto=format&fit=crop",
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
];

const features = [
  {
    title: "Agenda Integrada",
    description:
      "Sincronização com Google Calendar para manter todas as suas reuniões em um só lugar.",
    icon: <CalendarDays className="h-10 w-10 text-neki-teal mb-4" />,
  },
  {
    title: "Perfil de Mentores",
    description:
      "Conheça em detalhes a experiência e especialidades de cada mentor disponível.",
    icon: <Users className="h-10 w-10 text-neki-teal mb-4" />,
  },
  {
    title: "Reuniões Virtuais",
    description:
      "Integração com Google Meet para facilitar a realização de mentorias remotas.",
    icon: <VideoIcon className="h-10 w-10 text-neki-teal mb-4" />,
  },
  {
    title: "Agendamento Flexível",
    description:
      "Escolha horários que se adequem à sua rotina e às disponibilidades dos mentores.",
    icon: <CalendarCheck className="h-10 w-10 text-neki-teal mb-4" />,
  },
];

const benefits = [
  "Desenvolvimento profissional acelerado",
  "Orientação de profissionais experientes",
  "Networking com mentores e outros mentorados",
  "Acompanhamento de carreira personalizado",
  "Insights sobre as melhores práticas do mercado",
  "Crescimento técnico e comportamental",
];

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-mesh-gradient">
        <div className="max-w-7xl mx-auto px-4 md:px-6 pt-16 pb-24 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-8 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              <span className="text-neki-blue">Mentoria</span> que transforma sua{" "}
              <span className="text-neki-teal">carreira</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              Conecte-se aos melhores mentores da Neki, agende sessões
              personalizadas e acelere seu desenvolvimento profissional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-neki-gradient hover:opacity-90 transition-opacity"
                asChild
              >
                <Link to="/mentores">
                  Encontrar Mentor
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-neki-teal text-neki-teal hover:bg-neki-teal/10"
                asChild
              >
                <Link to="/agendar">Agendar Sessão</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 relative animate-fade-in">
            <div className="relative h-[350px] md:h-[450px] w-full max-w-md mx-auto">
              <div className="absolute top-0 left-0 w-full h-full bg-neki-gradient opacity-10 rounded-tl-3xl rounded-br-3xl"></div>
              <img
                src="/lovable-uploads/ad559b11-82a1-4aa3-9a74-27b95bb9c42d.png"
                alt="Mentoria em ação"
                className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] object-cover rounded-tl-3xl rounded-br-3xl shadow-lg"
              />
              <div className="absolute -bottom-4 -right-4 glass-card p-4 rounded-xl shadow-lg animate-float">
                <div className="flex items-center gap-3">
                  <div className="bg-neki-teal/10 p-2 rounded-full">
                    <CalendarCheck className="h-6 w-6 text-neki-teal" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Nova mentoria</div>
                    <div className="text-xs text-muted-foreground">
                      Quarta, 15:30 - 16:30
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Featured Mentors */}
      <section className="py-16 px-4 md:px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Mentores em Destaque</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Conheça alguns dos nossos mentores. Profissionais experientes prontos
              para compartilhar conhecimento e impulsionar sua carreira.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureMentors.map((mentor) => (
              <div
                key={mentor.id}
                className="animate-fade-in-up"
                style={{
                  animationDelay: `${
                    parseInt(mentor.id) * 100
                  }ms`,
                }}
              >
                <MentorCard {...mentor} />
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button
              variant="outline"
              className="border-neki-teal text-neki-teal hover:bg-neki-teal/10"
              asChild
            >
              <Link to="/mentores">
                Ver todos os mentores
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 md:px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Recursos da Plataforma</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nossa plataforma oferece todas as ferramentas necessárias para uma
              experiência de mentoria eficiente e produtiva.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <Card
                key={feature.title}
                className="bg-white dark:bg-gray-800 border-none shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <CardHeader className="pb-2">
                  {feature.icon}
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 md:px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="animate-fade-in-up">
              <h2 className="text-3xl font-bold mb-6">
                Benefícios da Mentoria
              </h2>
              <p className="text-muted-foreground mb-8">
                Participar do programa de mentoria da Neki traz diversos
                benefícios para sua carreira e desenvolvimento pessoal.
              </p>

              <ul className="space-y-4">
                {benefits.map((benefit, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 animate-fade-in-up"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <CheckCircle2 className="h-5 w-5 text-neki-teal shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="mt-8 bg-neki-gradient hover:opacity-90 transition-opacity"
                asChild
              >
                <Link to="/agendar">
                  Agendar Primeira Mentoria
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="relative h-[400px] animate-fade-in">
              <div className="absolute top-0 right-0 w-64 h-64 md:w-80 md:h-80 bg-neki-gradient opacity-10 rounded-tr-3xl rounded-bl-3xl"></div>
              <img
                src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2940&auto=format&fit=crop"
                alt="Colaboração em equipe"
                className="absolute left-4 top-4 w-64 h-64 md:w-80 md:h-80 object-cover rounded-tr-3xl rounded-bl-3xl shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2940&auto=format&fit=crop"
                alt="Mentoria individual"
                className="absolute right-0 bottom-0 w-64 h-64 md:w-80 md:h-80 object-cover rounded-tr-3xl rounded-bl-3xl shadow-lg border-4 border-white dark:border-gray-900"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 md:px-6 bg-neki-gradient text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para acelerar seu desenvolvimento profissional?
          </h2>
          <p className="text-white/80 mb-8 text-lg max-w-2xl mx-auto">
            Junte-se ao Neki Mentor Nexus e conecte-se com mentores experientes
            que podem ajudar a impulsionar sua carreira.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-neki-blue-dark hover:bg-white/90"
            asChild
          >
            <Link to="/agendar">Agendar Mentoria Agora</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
