
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, UserCircle, School, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<"mentor" | "mentee" | null>(null);

  const handleContinue = () => {
    if (!selectedType) {
      toast.error("Por favor, selecione uma opção");
      return;
    }

    // Redirect to home page after selection, with appropriate toast message
    if (selectedType === "mentor") {
      toast.success("Bem-vindo, Mentor!");
      navigate("/home");
    } else {
      toast.success("Bem-vindo, Mentorado!");
      navigate("/home");
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-mesh-gradient">
      <div className="max-w-md mx-auto px-4 md:px-6">
        <div className="text-center mb-8 animate-fade-in-up">
          <h1 className="text-3xl font-bold mb-2">Bem-vindo ao Mentor Neki</h1>
          <p className="text-muted-foreground">
            Selecione seu perfil para continuar
          </p>
        </div>

        <Card className="animate-fade-in shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <UserCircle className="h-6 w-6 text-neki-teal" />
              Escolha seu perfil
            </CardTitle>
            <CardDescription className="text-center">
              Selecione se você é um mentor ou um mentorado
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className={`border rounded-md p-6 cursor-pointer transition-all hover:shadow-md ${
                  selectedType === "mentor"
                    ? "border-neki-teal bg-neki-gradient-light"
                    : "border-muted"
                }`}
                onClick={() => setSelectedType("mentor")}
              >
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="p-3 rounded-full bg-neki-gradient-light mb-2">
                    <School className="h-6 w-6 text-neki-blue" />
                  </div>
                  <h3 className="font-medium text-lg">Mentor</h3>
                  <p className="text-sm text-muted-foreground">
                    Compartilhe seu conhecimento e oriente outros profissionais
                  </p>
                </div>
              </div>

              <div
                className={`border rounded-md p-6 cursor-pointer transition-all hover:shadow-md ${
                  selectedType === "mentee"
                    ? "border-neki-teal bg-neki-gradient-light"
                    : "border-muted"
                }`}
                onClick={() => setSelectedType("mentee")}
              >
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="p-3 rounded-full bg-neki-gradient-light mb-2">
                    <BookOpen className="h-6 w-6 text-neki-blue" />
                  </div>
                  <h3 className="font-medium text-lg">Mentorado</h3>
                  <p className="text-sm text-muted-foreground">
                    Receba orientação e evolua sua carreira com mentores experientes
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button
              onClick={handleContinue}
              className="w-full bg-neki-gradient hover:opacity-90 transition-opacity"
            >
              <User className="mr-2 h-4 w-4" />
              Continuar
            </Button>
            
            <div className="w-full text-center text-sm text-muted-foreground">
              <Link to="/admin-login" className="text-neki-teal hover:underline">
                Acesso para Administradores
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
