
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { getLoggedUser, isMentorLoggedIn, logoutUser } from "@/utils/auth";
import { Edit, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import components
import MentorStats from "@/components/mentor/MentorStats";
import UpcomingMentorships, { Mentorship } from "@/components/mentor/UpcomingMentorships";
import AvailabilitySection, { DayAvailability } from "@/components/mentor/AvailabilitySection";

export default function MentorDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [mentorships, setMentorships] = useState<Mentorship[]>([
    {
      id: "1",
      mentee: "Carlos Oliveira",
      date: "20/03/2025",
      time: "14:00",
      topic: "Transição de carreira",
      status: "pending"
    },
    {
      id: "2",
      mentee: "Juliana Silva",
      date: "17/03/2025",
      time: "10:30",
      topic: "Revisão de portfólio",
      status: "confirmed"
    }
  ]);
  
  const [availability, setAvailability] = useState<DayAvailability[]>([
    { day: "monday", label: "Segunda-feira", enabled: true, timeStart: "09:00", timeEnd: "17:00" },
    { day: "tuesday", label: "Terça-feira", enabled: true, timeStart: "09:00", timeEnd: "17:00" },
    { day: "wednesday", label: "Quarta-feira", enabled: true, timeStart: "09:00", timeEnd: "17:00" },
    { day: "thursday", label: "Quinta-feira", enabled: true, timeStart: "09:00", timeEnd: "17:00" },
    { day: "friday", label: "Sexta-feira", enabled: true, timeStart: "09:00", timeEnd: "17:00" },
    { day: "saturday", label: "Sábado", enabled: false, timeStart: "09:00", timeEnd: "13:00" },
    { day: "sunday", label: "Domingo", enabled: false, timeStart: "09:00", timeEnd: "13:00" }
  ]);
  
  const user = getLoggedUser();

  // Check if user is a mentor
  useEffect(() => {
    if (!isMentorLoggedIn()) {
      toast.error("Acesso restrito. Faça login como mentor.");
      navigate("/login");
    }
  }, [navigate]);

  const handleStatusChange = (id: string, status: "confirmed" | "canceled") => {
    setMentorships(prev => 
      prev.map(mentorship => 
        mentorship.id === id 
          ? { ...mentorship, status } 
          : mentorship
      )
    );
  };

  const handleSaveAvailability = (newAvailability: DayAvailability[]) => {
    setAvailability(newAvailability);
  };

  const handleLogout = () => {
    logoutUser();
    toast.success("Logout realizado com sucesso");
    navigate("/login");
  };

  const handleEditProfile = () => {
    navigate("/mentor-profile");
  };

  return (
    <div className="pt-20 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="bg-[#ffffff] rounded-lg p-6 flex flex-col items-center h-fit">
            <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-md mb-4">
              <img 
                src={user?.profileImage || "https://via.placeholder.com/150"}
                alt={user?.name || "Mentor"} 
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-2xl font-bold text-center">{user?.name || "Mentor"}</h1>
            <p className="text-gray-500 mb-6">Mentor</p>
            
            <Button 
              variant="secondary" 
              className="w-full mb-4 border-neki-blue text-slate-50 hover:bg-neki-blue/60"
              onClick={handleEditProfile}
            >
              <Edit className="mr-2 h-4 w-4" />
              Editar perfil
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full border-red-200 text-red-600 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Meu Perfil de Mentor</h1>
              <p className="text-muted-foreground">
                Gerencie seu perfil, disponibilidade e sessões de mentoria
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 sm:grid-cols-3 gap-1">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="availability">Disponibilidade</TabsTrigger>
                <TabsTrigger value="mentorships">Mentorias</TabsTrigger>
               
              </TabsList>

              <div className="mt-6">
                <TabsContent value="dashboard">
                  <div className="space-y-8">
                    <MentorStats 
                      confirmed={5}
                      canceled={2}
                      completed={12}
                      rated={10}
                      positiveRatings={9}
                      mentorshipHours={24}
                    />
                    
                    <UpcomingMentorships 
                      mentorships={mentorships}
                      onStatusChange={handleStatusChange}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="availability">
                  <AvailabilitySection 
                    availability={availability}
                    onSave={handleSaveAvailability}
                  />
                </TabsContent>

                <TabsContent value="mentorships">
                  <div className="bg-white p-6 rounded-lg border">
                    <h2 className="text-2xl font-bold mb-4">Histórico de Mentorias</h2>
                    <p className="text-muted-foreground mb-4">
                      Visualize o histórico completo de todas as suas mentorias.
                    </p>
                    <div className="text-center py-8 text-muted-foreground">
                      Funcionalidade em desenvolvimento.
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="experiences">
                  <div className="bg-white p-6 rounded-lg border">
                    <h2 className="text-2xl font-bold mb-4">Experiências Profissionais</h2>
                    <p className="text-muted-foreground mb-4">
                      Gerencie suas experiências profissionais e competências para exibir aos mentorados.
                    </p>
                    <div className="text-center py-8 text-muted-foreground">
                      Funcionalidade em desenvolvimento.
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="settings">
                  <div className="bg-white p-6 rounded-lg border">
                    <h2 className="text-2xl font-bold mb-4">Configurações da Conta</h2>
                    <p className="text-muted-foreground mb-4">
                      Altere suas configurações de conta, notificações e privacidade.
                    </p>
                    <div className="text-center py-8 text-muted-foreground">
                      Funcionalidade em desenvolvimento.
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
