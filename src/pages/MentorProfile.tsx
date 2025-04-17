
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";

// Import refactored components
import ProfileBasicInfo from "@/components/mentor/ProfileBasicInfo";
import ProfileSkills from "@/components/mentor/ProfileSkills";
import ProfileAvailability from "@/components/mentor/ProfileAvailability";
import ProfileContact from "@/components/mentor/ProfileContact";
import ProfileFormButtons from "@/components/mentor/ProfileFormButtons";

// Esquema de validação
const profileFormSchema = z.object({
  name: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
  role: z.string().min(3, { message: "Cargo deve ter pelo menos 3 caracteres" }),
  description: z
    .string()
    .min(20, { message: "Descrição deve ter pelo menos 20 caracteres" })
    .max(500, { message: "Descrição não pode exceder 500 caracteres" }),
  imageUrl: z.string().url({ message: "URL de imagem inválida" }).optional(),
  skills: z.array(z.string()).min(1, { message: "Adicione pelo menos uma habilidade" }),
  availableDays: z.array(z.string()).min(1, { message: "Selecione pelo menos um dia disponível" }),
  availableTimeStart: z.string(),
  availableTimeEnd: z.string(),
  email: z.string().email({ message: "Email inválido" }).optional(),
  phone: z.string().optional(),
  linkedin: z.string().url({ message: "URL do LinkedIn inválida" }).optional(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

const daysOfWeek = [
  { id: "segunda", label: "Segunda" },
  { id: "terca", label: "Terça" },
  { id: "quarta", label: "Quarta" },
  { id: "quinta", label: "Quinta" },
  { id: "sexta", label: "Sexta" },
  { id: "sabado", label: "Sábado" },
  { id: "domingo", label: "Domingo" },
];

const timeSlots = [
  "08:00", "09:00", "10:00", "11:00", "12:00", 
  "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"
];

export default function MentorProfile() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Valores padrão do formulário
  const defaultValues: Partial<ProfileFormValues> = {
    name: "",
    role: "",
    description: "",
    imageUrl: "",
    skills: [],
    availableDays: [],
    availableTimeStart: "09:00",
    availableTimeEnd: "17:00",
    email: "",
    phone: "",
    linkedin: "",
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    setIsSubmitting(true);

    // Simulação de envio - em uma aplicação real, esta seria uma chamada API
    setTimeout(() => {
      console.log("Dados do formulário:", data);
      setIsSubmitting(false);
      
      toast.success("Perfil salvo com sucesso!", {
        description: "Suas informações foram atualizadas e já estão disponíveis para agendamento.",
      });

      // Redirecionar para a página de mentores após salvar
      navigate("/mentores");
    }, 1500);
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-mesh-gradient">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="text-center mb-8 animate-fade-in-up">
          <h1 className="text-3xl font-bold mb-2">Perfil de Mentor</h1>
          <p className="text-muted-foreground">
            Preencha suas informações para que os mentorados possam conhecê-lo melhor.
          </p>
        </div>

        <Card className="animate-fade-in shadow-md">
          <CardHeader>
            <CardTitle>Informações Pessoais e Profissionais</CardTitle>
            <CardDescription>
              Estas informações serão exibidas no seu perfil para que mentorados possam escolher você para mentoria.
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <CardContent className="space-y-6">
                <ProfileBasicInfo control={form.control} />
                <ProfileSkills control={form.control} />
                <ProfileAvailability 
                  control={form.control}
                  daysOfWeek={daysOfWeek}
                  timeSlots={timeSlots}
                />
                <ProfileContact control={form.control} />
              </CardContent>
              <CardFooter>
                <ProfileFormButtons isSubmitting={isSubmitting} />
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
