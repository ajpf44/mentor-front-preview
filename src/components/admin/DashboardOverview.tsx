
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Users, Award, Calendar, BarChart2 } from "lucide-react";

// Mock data for mentoring interest areas
const interestAreasData = [
  { name: "Desenvolvimento", value: 45 },
  { name: "Design", value: 30 },
  { name: "Gestão", value: 25 },
  { name: "DevOps", value: 18 },
  { name: "Dados", value: 22 },
  { name: "Mobile", value: 15 },
];

// Mock data for mentoring topics
const topicsData = [
  { name: "React", interestCount: 32, category: "Desenvolvimento" },
  { name: "Node.js", interestCount: 28, category: "Desenvolvimento" },
  { name: "UI/UX", interestCount: 25, category: "Design" },
  { name: "Liderança", interestCount: 22, category: "Gestão" },
  { name: "Python", interestCount: 20, category: "Desenvolvimento" },
];

// Colors for pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

interface DashboardOverviewProps {
  totalMentors: number;
  totalMentees: number;
  totalSessions: number;
  completionRate: number;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  totalMentors,
  totalMentees,
  totalSessions,
  completionRate,
}) => {
  return (
    <div className="animate-fade-in space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Mentores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4 text-neki-teal" />
              <div className="text-2xl font-bold">{totalMentors}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Mentorados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Award className="mr-2 h-4 w-4 text-neki-teal" />
              <div className="text-2xl font-bold">{totalMentees}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Sessões Realizadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-neki-teal" />
              <div className="text-2xl font-bold">{totalSessions}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Taxa de Conclusão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BarChart2 className="mr-2 h-4 w-4 text-neki-teal" />
              <div className="text-2xl font-bold">{completionRate}%</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overview Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Áreas de Interesse</CardTitle>
            <CardDescription>
              Distribuição de interesses por área
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={interestAreasData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {interestAreasData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Tópicos Populares</CardTitle>
            <CardDescription>
              Tópicos mais procurados pelos mentorados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topicsData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="interestCount" fill="#8884d8" name="Interessados" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
