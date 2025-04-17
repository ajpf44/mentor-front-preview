
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  Calendar,
  CalendarCheck,
  CalendarClock,
  CalendarX2,
  ChevronRight,
  Clock,
  ExternalLink,
  MoreHorizontal,
  Pencil,
  User,
  Video,
  XCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format, isAfter, isBefore, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";

// Sample mentoring session data
interface MentoringSession {
  id: string;
  mentorId: string;
  mentorName: string;
  mentorRole: string;
  date: Date;
  time: string;
  topic: string;
  notes: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  meetingLink?: string;
}

// Generate sample data
const generateSampleSessions = (): MentoringSession[] => {
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const nextWeek = new Date(now);
  nextWeek.setDate(nextWeek.getDate() + 7);

  return [
    {
      id: "1",
      mentorId: "1",
      mentorName: "Ana Silveira",
      mentorRole: "Líder de Desenvolvimento",
      date: yesterday,
      time: "15:00",
      topic: "Desenvolvimento de Carreira",
      notes: "Discussão sobre próximos passos na carreira de desenvolvimento.",
      status: "completed",
      meetingLink: "https://meet.google.com/abc-defg-hij",
    },
    {
      id: "2",
      mentorId: "2",
      mentorName: "Carlos Oliveira",
      mentorRole: "Tech Lead",
      date: tomorrow,
      time: "10:00",
      topic: "Habilidades Técnicas",
      notes: "Revisão de arquitetura de microserviços e melhores práticas.",
      status: "confirmed",
      meetingLink: "https://meet.google.com/klm-nopq-rst",
    },
    {
      id: "3",
      mentorId: "3",
      mentorName: "Juliana Martins",
      mentorRole: "UX/UI Designer",
      date: nextWeek,
      time: "14:00",
      topic: "Feedback e Avaliação",
      notes: "Feedback sobre recentes designs de interface e próximas melhorias.",
      status: "pending",
    },
    {
      id: "4",
      mentorId: "4",
      mentorName: "Ricardo Santos",
      mentorRole: "Arquiteto de Software",
      date: tomorrow,
      time: "16:00",
      topic: "Habilidades Técnicas",
      notes: "Discussão sobre padrões de design e escalabilidade.",
      status: "confirmed",
      meetingLink: "https://meet.google.com/uvw-xyza-bcd",
    },
  ];
};

const sessions = generateSampleSessions();

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [upcomingSessions, setUpcomingSessions] = useState<MentoringSession[]>([]);
  const [pastSessions, setPastSessions] = useState<MentoringSession[]>([]);
  const [pendingSessions, setPendingSessions] = useState<MentoringSession[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter sessions based on status and date
  useEffect(() => {
    const now = new Date();
    
    // Upcoming sessions are confirmed and in the future
    setUpcomingSessions(
      sessions.filter(
        (session) =>
          (session.status === "confirmed") &&
          (isAfter(new Date(`${format(session.date, "yyyy-MM-dd")}T${session.time}`), now))
      )
    );
    
    // Past sessions are completed or in the past
    setPastSessions(
      sessions.filter(
        (session) =>
          session.status === "completed" ||
          (isBefore(new Date(`${format(session.date, "yyyy-MM-dd")}T${session.time}`), now) &&
            session.status !== "cancelled")
      )
    );
    
    // Pending sessions are waiting for confirmation
    setPendingSessions(
      sessions.filter((session) => session.status === "pending")
    );
  }, []);

  const handleCancelSession = (sessionId: string) => {
    toast.success("Sessão cancelada com sucesso", {
      description: "A mentoria foi removida da sua agenda.",
    });
  };

  // Function to get appropriate session card background based on status
  const getSessionCardClasses = (session: MentoringSession) => {
    switch (session.status) {
      case "pending":
        return "border-l-4 border-1-blue-900";
      case "confirmed":
        return "border-l-4 border-l-blue-900";
      case "completed":
        return "border-l-4 border-l-blue-900 bg-muted/50";
      case "cancelled":
        return "border-l-4 border-l-blue-900 bg-muted/50";
      default:
        return "";
    }
  };

  // Render session card
  const renderSessionCard = (session: MentoringSession) => {
    const isUpcoming =
      isAfter(new Date(`${format(session.date, "yyyy-MM-dd")}T${session.time}`), new Date()) &&
      (session.status === "confirmed" || session.status === "pending");

    return (
      <Card
        key={session.id}
        className={`mb-4 overflow-hidden ${getSessionCardClasses(session)}`}
      >
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">{session.topic}</CardTitle>
              <CardDescription>
                {format(session.date, "EEEE, dd 'de' MMMM 'de' yyyy", {
                  locale: ptBR,
                })}{" "}
                às {session.time}
              </CardDescription>
            </div>
            {isUpcoming && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to={`/agendar?edit=${session.id}`}>
                      <Pencil className="mr-2 h-4 w-4" />
                      <span>Editar</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-500 focus:text-red-500"
                    onClick={() => handleCancelSession(session.id)}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    <span>Cancelar</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-full bg-neki-blue/10 shrink-0">
                <User className="h-4 w-4 text-neki-blue" />
              </div>
              <div>
                <div className="font-medium">Mentor</div>
                <div className="text-muted-foreground">
                  {session.mentorName} - {session.mentorRole}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-full bg-neki-blue/10 shrink-0">
                <Clock className="h-4 w-4 text-neki-blue" />
              </div>
              <div>
                <div className="font-medium">Duração</div>
                <div className="text-muted-foreground">60 minutos</div>
              </div>
            </div>
          </div>

          <div className="text-sm text-muted-foreground mb-3">
            <div className="font-medium text-foreground mb-1">Notas:</div>
            <p>{session.notes}</p>
          </div>

          {session.status === "pending" && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 text-sm rounded-md p-2 flex items-center">
              <CalendarClock className="h-4 w-4 mr-2 shrink-0" />
              Aguardando confirmação do mentor
            </div>
          )}

          {session.status === "cancelled" && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 text-sm rounded-md p-2 flex items-center">
              <CalendarX2 className="h-4 w-4 mr-2 shrink-0" />
              Esta sessão foi cancelada
            </div>
          )}
        </CardContent>
        <CardFooter>
          {session.status === "confirmed" && !isPast(new Date(`${format(session.date, "yyyy-MM-dd")}T${session.time}`)) && (
            <Button
              variant="outline"
              className="flex-1 border-neki-blue text-neki-blue hover:bg-neki-blue/80"
              asChild
            >
              <a
                href={session.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Video className="mr-2 h-4 w-4" />
                Link da Reunião
                <ExternalLink className="ml-2 h-3 w-3" />
              </a>
            </Button>
          )}

          {session.status === "completed" && (
            <div className="flex gap-2 w-full">          
              <Button
                variant="secondary"
                size="sm"
                className="flex-1"
                asChild
              >
                <Link to={`/feedback/${session.id}`}>
                  Dar Feedback
                </Link>
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="pt-20 pb-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 animate-fade-in-up">
          <div>
            <h1 className="text-3xl font-bold mb-2">Meu Dashboard</h1>
            <p className="text-muted-foreground">
              Gerencie suas sessões de mentoria e acompanhe seu progresso
            </p>
          </div>
          <Button
            className="mt-4 md:mt-0 bg-neki-blue hover:opacity-90 transition-opacity"
            asChild
          >
            <Link to="/agendar">
              <Calendar className="mr-2 h-4 w-4" />
              Nova Mentoria
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Summary Cards */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 animate-fade-in-up">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total de Mentorias
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {sessions.length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Mentorias Pendentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {pendingSessions.length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Próximas Mentorias
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {upcomingSessions.length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Mentorias Concluídas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {pastSessions.length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sessions Tabs */}
          <div className="lg:col-span-4 animate-fade-in">
            <Tabs defaultValue="upcoming" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="upcoming">
                  Próximas ({upcomingSessions.length})
                </TabsTrigger>
                <TabsTrigger value="pending">
                  Pendentes ({pendingSessions.length})
                </TabsTrigger>
                <TabsTrigger value="past">
                  Concluídas ({pastSessions.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="mt-0">
                <div className="space-y-4">
                  {upcomingSessions.length > 0 ? (
                    upcomingSessions.map((session) => renderSessionCard(session))
                  ) : (
                    <Card className="flex flex-col items-center justify-center p-6 text-center">
                      <CalendarCheck className="h-12 w-12 text-muted-foreground mb-4" />
                      <CardTitle className="text-lg mb-2">
                        Nenhuma mentoria agendada
                      </CardTitle>
                      <CardDescription className="mb-6">
                        Você não possui mentorias confirmadas no momento.
                      </CardDescription>
                      <Button asChild>
                        <Link to="/agendar">
                          Agendar Mentoria
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </Card>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="pending" className="mt-0">
                <div className="space-y-4">
                  {pendingSessions.length > 0 ? (
                    pendingSessions.map((session) => renderSessionCard(session))
                  ) : (
                    <Card className="flex flex-col items-center justify-center p-6 text-center">
                      <CalendarClock className="h-12 w-12 text-muted-foreground mb-4" />
                      <CardTitle className="text-lg mb-2">
                        Nenhuma mentoria pendente
                      </CardTitle>
                      <CardDescription>
                        Você não possui mentorias aguardando confirmação.
                      </CardDescription>
                    </Card>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="past" className="mt-0">
                <div className="space-y-4">
                  {pastSessions.length > 0 ? (
                    pastSessions.map((session) => renderSessionCard(session))
                  ) : (
                    <Card className="flex flex-col items-center justify-center p-6 text-center">
                      <CalendarX2 className="h-12 w-12 text-muted-foreground mb-4" />
                      <CardTitle className="text-lg mb-2">
                        Nenhuma mentoria concluída
                      </CardTitle>
                      <CardDescription>
                        Você ainda não concluiu nenhuma sessão de mentoria.
                      </CardDescription>
                    </Card>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
