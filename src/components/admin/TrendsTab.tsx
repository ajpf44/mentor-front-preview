
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
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Download } from "lucide-react";

// Mock data for monthly interests over time
const monthlyData = [
  { month: "Jan", interests: 65 },
  { month: "Fev", interests: 75 },
  { month: "Mar", interests: 82 },
  { month: "Abr", interests: 78 },
  { month: "Mai", interests: 90 },
  { month: "Jun", interests: 105 },
  { month: "Jul", interests: 120 },
  { month: "Ago", interests: 118 },
  { month: "Set", interests: 130 },
  { month: "Out", interests: 142 },
  { month: "Nov", interests: 155 },
  { month: "Dez", interests: 165 },
];

const TrendsTab: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-6">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Tendências de Interesses</CardTitle>
              <CardDescription>
                Evolução dos interesses ao longo do tempo
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="interests"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                  name="Total de Interesses"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Análise de Crescimento</CardTitle>
            <CardDescription>
              Taxa de crescimento mensal de interesses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Este Mês</div>
                <div className="text-sm text-green-600 font-medium">+6.2%</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Trimestre Atual</div>
                <div className="text-sm text-green-600 font-medium">+12.5%</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Anual</div>
                <div className="text-sm text-green-600 font-medium">+32.8%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tópicos em Ascensão</CardTitle>
            <CardDescription>
              Tópicos com maior crescimento recente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm font-medium">Cloud Computing</span>
                </div>
                <span className="text-sm text-green-600 font-medium">+45%</span>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm font-medium">Next.js</span>
                </div>
                <span className="text-sm text-green-600 font-medium">+38%</span>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm font-medium">Inteligência Artificial</span>
                </div>
                <span className="text-sm text-green-600 font-medium">+32%</span>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm font-medium">Gestão Ágil</span>
                </div>
                <span className="text-sm text-green-600 font-medium">+28%</span>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm font-medium">Cibersegurança</span>
                </div>
                <span className="text-sm text-green-600 font-medium">+25%</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrendsTab;
