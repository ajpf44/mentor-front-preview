
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAdminLoggedIn, logoutUser } from "@/utils/auth";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  LayoutDashboard,
  LogOut,
  Users,
  BookOpen,
  LineChartIcon,
} from "lucide-react";

// Import refactored components
import DashboardOverview from "@/components/admin/DashboardOverview";
import InterestsTab from "@/components/admin/InterestsTab";
import TrendsTab from "@/components/admin/TrendsTab";
import MenteesTab from "@/components/admin/MenteesTab";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [totalMentors, setTotalMentors] = useState(42);
  const [totalMentees, setTotalMentees] = useState(156);
  const [totalSessions, setTotalSessions] = useState(87);
  const [completionRate, setCompletionRate] = useState(78);

  // Authentication check
  const handleLogout = () => {
    logoutUser();
    toast.success("Logout realizado com sucesso");
    navigate("/login");
  };

  return (
    <div className="pt-20 pb-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 animate-fade-in-up">
          <div>
            <h1 className="text-3xl font-bold mb-2">Painel Administrativo</h1>
            <p className="text-muted-foreground">
              Análise de interesses e atividades de mentoria
            </p>
          </div>
          <Button
            variant="outline"
            className="mt-4 md:mt-0"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>

        {/* Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            <TabsTrigger value="overview">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Visão Geral
            </TabsTrigger>
            <TabsTrigger value="interests">
              <BookOpen className="mr-2 h-4 w-4" />
              Interesses
            </TabsTrigger>
            <TabsTrigger value="trends">
              <LineChartIcon className="mr-2 h-4 w-4" />
              Tendências
            </TabsTrigger>
            <TabsTrigger value="mentees">
              <Users className="mr-2 h-4 w-4" />
              Mentorados
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab Content */}
          <TabsContent value="overview">
            <DashboardOverview 
              totalMentors={totalMentors}
              totalMentees={totalMentees}
              totalSessions={totalSessions}
              completionRate={completionRate}
            />
          </TabsContent>

          {/* Interests Tab Content */}
          <TabsContent value="interests">
            <InterestsTab />
          </TabsContent>

          {/* Trends Tab Content */}
          <TabsContent value="trends">
            <TrendsTab />
          </TabsContent>

          {/* Mentees Tab Content */}
          <TabsContent value="mentees">
            <MenteesTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
