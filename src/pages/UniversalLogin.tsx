
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircle, Mail, Lock, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { loginUser,logoutUser, getUserType } from "@/utils/auth";

export default function UniversalLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  type UserType = "adm" | "mentor" | "mentorado";
  interface User {
      id: string;
      name: string;
      email: string;
      role: UserType;
      profileImage?: string;
      description: string;
      job?: string;
  }

  const handleLogin = async(e: React.FormEvent) => {
    e.preventDefault();

    const saveUser:User = {
      id: "1",
      name: email,
      email: email,
      role: email as UserType,
      profileImage: "",
      description: "",
      job: ""
    }
    logoutUser();
    localStorage.setItem("user_session", JSON.stringify(saveUser));

    // Se for admin, também definir a sessão de admin para compatibilidade
    if (saveUser.role === "adm") {
        localStorage.setItem("admin_session", "true");
    }

    switch (email) {
        case "adm":
            navigate("/admin-dashboard");
        break;
        case "mentor":
            navigate("/mentor-dashboard");
        break;
        case "mentorado":
            navigate("/dashboard");
        break;
        default:
            navigate("/home");
    }
    return;



    if (!email || !password) {



        toast.error("Por favor, preencha todos os campos");
        return;
    }

    setIsLoading(true);

    // Tentar fazer login com as credenciais fornecidas
    const user = await loginUser(email, password);

    if (user.email != null) {
        toast.success(`Bem-vindo, ${user.name}!`);

        // Redirecionar com base no tipo de usuário
        const userType = getUserType();

        switch (userType) {
            case "adm":
                navigate("/admin-dashboard");
            break;
            case "mentor":
                navigate("/mentor-dashboard");
            break;
            case "mentorado":
                navigate("/dashboard");
            break;
            default:
                navigate("/home");
        }
    } else {
        toast.error("Credenciais inválidas. Tente novamente.");
        setIsLoading(false);
    }
  };

  return (
      <div className="pt-24 pb-16 min-h-screen bg-cyan-10">
      <div className="max-w-md mx-auto px-4 md:px-6">
      <div className="text-center mb-8 animate-fade-in-up">
      <h1 className="text-3xl font-bold mb-2">Bem-vindo ao Mentor Neki</h1>
      <p className="text-muted-foreground">
      Entre com suas credenciais para acessar
      </p>
      </div>

      <Card className="animate-fade-in shadow-md">
      <CardHeader>
      <CardTitle className="flex items-center justify-center gap-2">
      <UserCircle className="h-6 w-6 text-neki-blue" />
      Login
      </CardTitle>
      <CardDescription className="text-center">
      Entre com suas credenciais para acessar
      </CardDescription>
      </CardHeader>

      <form onSubmit={handleLogin}>
      <CardContent className="space-y-4 py-4">
      <div className="space-y-2">
      <label htmlFor="email" className="text-sm font-medium">E-mail</label>
      <div className="relative">
      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
      id="email"
      placeholder="Digite seu e-mail"
      className="pl-10"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      />
      </div>
      </div>

      <div className="space-y-2">
      <label htmlFor="password" className="text-sm font-medium">Senha</label>
      <div className="relative">
      <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
      id="password"
      type="password"
      placeholder="Digite sua senha"
      className="pl-10"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      />
      </div>
      </div>

      <div className="flex items-center space-x-2">
      <Checkbox
      id="remember"
      checked={rememberMe}
      onCheckedChange={(checked) => setRememberMe(checked === true)}
      />
      <label
      htmlFor="remember"
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
      Lembrar-me
      </label>
      </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-4">
      <Button
      type="submit"
      className="w-full bg-neki-blue hover:bg-neki-blue-600 text-white"
      disabled={isLoading}
      >
      {isLoading ? (
          <span className="animate-pulse">Entrando...</span>
      ) : (
      <>
      <LogIn className="mr-2 h-4 w-4" />
      Entrar
      </>
      )}
      </Button>
        <p>
            Para entrar como:
                <ul>
               <li>  adm: digite adm no email                      </li>
               <li>  mentorado: digite mentorado no email</li>
               <li>  mentor: digite mentor no email</li>
                </ul>
            E qualquer senha
        </p>
      </CardFooter>
      </form>
      </Card>
      </div>
      </div>
  );
}
