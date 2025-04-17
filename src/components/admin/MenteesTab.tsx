
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { MenteeProfile, menteeProfiles } from "@/utils/menteeData";
import {
  ChevronRight,
  UserIcon,
  Calendar,
  Clock,
  Download,
} from "lucide-react";

// Colors for pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const MenteesTab: React.FC = () => {
  const [selectedMentee, setSelectedMentee] = useState<number | null>(null);

  return (
    <div className="animate-fade-in space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mentee List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Mentorados</CardTitle>
            <CardDescription>
              Lista de mentorados ativos na plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {menteeProfiles.map((mentee) => (
                <div
                  key={mentee.id}
                  className={`flex items-center justify-between p-3 rounded-md cursor-pointer transition-colors ${
                    selectedMentee === mentee.id
                      ? "bg-primary/10"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => setSelectedMentee(mentee.id)}
                >
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback>{mentee.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{mentee.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {mentee.role}
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    className="h-5 w-5 text-muted-foreground"
                    aria-hidden="true"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mentee Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Perfil do Mentorado</CardTitle>
            <CardDescription>
              Detalhes e interesses do mentorado selecionado
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedMentee ? (
              <div className="space-y-6">
                {menteeProfiles
                  .filter((m) => m.id === selectedMentee)
                  .map((mentee) => (
                    <div key={mentee.id} className="space-y-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-16 w-16">
                            <AvatarFallback className="text-lg">
                              {mentee.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-xl font-semibold">
                              {mentee.name}
                            </h3>
                            <p className="text-muted-foreground">
                              {mentee.role} em {mentee.company}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {mentee.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-start md:items-end gap-1">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-1" />
                            Ingressou em{" "}
                            {new Date(
                              mentee.joinDate
                            ).toLocaleDateString("pt-BR")}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 mr-1" />
                            Ativo em{" "}
                            {new Date(
                              mentee.lastActive
                            ).toLocaleDateString("pt-BR")}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="bg-muted/40">
                          <CardContent className="p-4 flex flex-col items-center">
                            <p className="text-muted-foreground mb-1">
                              Sessões
                            </p>
                            <p className="text-2xl font-bold">
                              {mentee.sessionCount}
                            </p>
                          </CardContent>
                        </Card>
                        <Card className="bg-muted/40">
                          <CardContent className="p-4 flex flex-col items-center">
                            <p className="text-muted-foreground mb-1">
                              Progresso
                            </p>
                            <p className="text-2xl font-bold">
                              {mentee.progress}%
                            </p>
                          </CardContent>
                        </Card>
                        <Card className="bg-muted/40">
                          <CardContent className="p-4 flex flex-col items-center">
                            <p className="text-muted-foreground mb-1">
                              Interesses
                            </p>
                            <p className="text-2xl font-bold">
                              {mentee.interests.length}
                            </p>
                          </CardContent>
                        </Card>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold mb-3">
                          Interesses por Tópico
                        </h4>
                        <div className="space-y-3">
                          {mentee.preferredTopics.map((topic, index) => (
                            <div key={index} className="space-y-1">
                              <div className="flex justify-between">
                                <div>
                                  <span className="font-medium">
                                    {topic.topic}
                                  </span>
                                  <span className="text-sm text-muted-foreground ml-2">
                                    ({topic.category})
                                  </span>
                                </div>
                                <span className="text-sm">
                                  {topic.interestLevel}/10
                                </span>
                              </div>
                              <Progress
                                value={topic.interestLevel * 10}
                                className="h-2"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold mb-3">
                          Áreas de Interesse
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {mentee.interests.map((interest, index) => (
                            <div
                              key={index}
                              className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                            >
                              {interest}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="h-64">
                        <h4 className="text-lg font-semibold mb-3">
                          Distribuição de Interesses
                        </h4>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={mentee.preferredTopics.map((t) => ({
                                name: t.topic,
                                value: t.interestLevel,
                              }))}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) =>
                                `${name} ${(percent * 100).toFixed(0)}%`
                              }
                            >
                              {mentee.preferredTopics.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={COLORS[index % COLORS.length]}
                                />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                <UserIcon className="mb-4 h-12 w-12" />
                <h4 className="mb-2 text-lg font-medium">
                  Nenhum mentorado selecionado
                </h4>
                <p>Selecione um mentorado da lista para ver seus detalhes.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Mentees Overview */}
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Visão Geral dos Interesses</CardTitle>
              <CardDescription>
                Distribuição de interesses por área entre os mentorados
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { category: "Desenvolvimento", count: 26 },
                    { category: "Design", count: 20 },
                    { category: "Gestão", count: 17 },
                    { category: "DevOps", count: 15 },
                    { category: "Dados", count: 16 },
                    { category: "Mobile", count: 15 },
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="count"
                    name="Quantidade de Mentorados"
                    fill="#8884d8"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MenteesTab;
