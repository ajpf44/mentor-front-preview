
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircle, User, Lock } from "lucide-react";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

// Create a schema for form validation
const formSchema = z.object({
  username: z.string().min(3, {
    message: "Nome de usuário deve ter pelo menos 3 caracteres",
  }),
  password: z.string().min(6, {
    message: "Senha deve ter pelo menos 6 caracteres",
  }),
  rememberMe: z.boolean().optional(),
});

export default function AdminLogin() {
  const navigate = useNavigate();

  // Initialize form with react-hook-form and zod validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Handle admin login logic here
    console.log("Form values:", values);
    
    // For a simple demo, we'll just check if the username includes "admin"
    // In a real application, this would involve proper authentication
    if (values.username.toLowerCase().includes("admin")) {
      // Set admin session in localStorage (in a real app, use proper auth)
      localStorage.setItem("admin_session", "true");
      
      // Redirect to admin dashboard after login
      toast.success("Bem-vindo, Administrador!");
      navigate("/admin-dashboard");
    } else {
      toast.error("Credenciais inválidas. Acesso apenas para administradores.");
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-mesh-gradient">
      <div className="max-w-md mx-auto px-4 md:px-6">
        <div className="text-center mb-8 animate-fade-in-up">
          <h1 className="text-3xl font-bold mb-2">Área do Administrador</h1>
          <p className="text-muted-foreground">
            Entre com suas credenciais para acessar o painel administrativo
          </p>
        </div>

        <Card className="animate-fade-in shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <UserCircle className="h-6 w-6 text-neki-teal" />
              Login Administrativo
            </CardTitle>
            <CardDescription className="text-center">
              Acesse o painel de controle administrativo
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome de usuário</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            {...field}
                            placeholder="Digite seu nome de usuário"
                            className="pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            {...field}
                            type="password"
                            placeholder="Digite sua senha"
                            className="pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Lembrar-me
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full bg-neki-gradient hover:opacity-90">
                  Entrar
                </Button>
              </form>
            </Form>
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <Button variant="link" onClick={() => navigate("/login")}>
              Voltar para página inicial
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
