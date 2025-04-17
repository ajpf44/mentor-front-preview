
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Filter } from "lucide-react";

// Mock data for mentoring topics
const topicsData = [
  { name: "React", interestCount: 32, category: "Desenvolvimento" },
  { name: "Node.js", interestCount: 28, category: "Desenvolvimento" },
  { name: "UI/UX", interestCount: 25, category: "Design" },
  { name: "Liderança", interestCount: 22, category: "Gestão" },
  { name: "Python", interestCount: 20, category: "Desenvolvimento" },
  { name: "Figma", interestCount: 18, category: "Design" },
  { name: "AWS", interestCount: 15, category: "DevOps" },
  { name: "Machine Learning", interestCount: 14, category: "Dados" },
  { name: "React Native", interestCount: 12, category: "Mobile" },
  { name: "Product Management", interestCount: 10, category: "Gestão" },
];

// Mock data for mentoring interest areas
const interestAreasData = [
  { name: "Desenvolvimento", value: 45 },
  { name: "Design", value: 30 },
  { name: "Gestão", value: 25 },
  { name: "DevOps", value: 18 },
  { name: "Dados", value: 22 },
  { name: "Mobile", value: 15 },
];

const InterestsTab: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Interesses por Tópico</CardTitle>
            <CardDescription>
              Listagem detalhada dos tópicos de interesse
            </CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filtrar
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tópico</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead className="text-right">Interessados</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topicsData.map((topic, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{topic.name}</TableCell>
                  <TableCell>{topic.category}</TableCell>
                  <TableCell className="text-right">{topic.interestCount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Distribuição de Interesses por Área</CardTitle>
            <CardDescription>
              Visualização comparativa entre as diferentes áreas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={interestAreasData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#00C49F" name="Quantidade de Interessados" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InterestsTab;
