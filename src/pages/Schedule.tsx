
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { CalendarDays, ChevronLeft, ChevronRight, Clock, Video } from "lucide-react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import ScheduleCalendar from "@/components/ScheduleCalendar";
import MeetingTime from "@/components/MeetingTime";

// Sample mentor data
const mentors = [
  { id: "1", name: "Ana Silveira", role: "Líder de Desenvolvimento" },
  { id: "2", name: "Carlos Oliveira", role: "Tech Lead" },
  { id: "3", name: "Juliana Martins", role: "UX/UI Designer" },
  { id: "4", name: "Ricardo Santos", role: "Arquiteto de Software" },
  { id: "5", name: "Patricia Lima", role: "Agile Coach" },
  { id: "6", name: "Marcos Fernandes", role: "Especialista em Dados" },
];

// Sample time slots
const timeSlots = [
  "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"
];

// Sample form schema
interface ScheduleFormValues {
  mentorId: string;
  date: Date | undefined;
  time: string;
  topic: string;
  notes: string;
}

const Schedule = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const preselectedMentorId = searchParams.get("mentor");

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form
  const form = useForm<ScheduleFormValues>({
    defaultValues: {
      mentorId: preselectedMentorId || "",
      date: undefined,
      time: "",
      topic: "",
      notes: "",
    },
  });

  // Update form values when selections change
  useEffect(() => {
    form.setValue("date", selectedDate);
    form.setValue("time", selectedTime);
  }, [selectedDate, selectedTime, form]);

  // Reset time when date changes
  useEffect(() => {
    setSelectedTime("");
  }, [selectedDate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const onSubmit = (values: ScheduleFormValues) => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", values);
      setIsSubmitting(false);

      toast.success("Mentoria agendada com sucesso!", {
        description: `Sua sessão com ${
          mentors.find((m) => m.id === values.mentorId)?.name
        } está confirmada.`,
      });

      // Navigate to dashboard after successful scheduling
      navigate("/dashboard");
    }, 1500);
  };

  // Simulate available times (all times available except random ones)
  const getAvailableTimes = () => {
    if (!selectedDate) return timeSlots;

    // Use date to seed a pseudo-random generator
    const dateValue = selectedDate.getDate() + selectedDate.getMonth();
    
    // Make some times unavailable based on the date
    return timeSlots.filter((_, index) => {
      return (index + dateValue) % 4 !== 0;
    });
  };

  const availableTimes = getAvailableTimes();

  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <CardHeader>
              <CardTitle>Escolha o Mentor</CardTitle>
              <CardDescription>
                Selecione um mentor para sua sessão de mentoria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="mentorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mentor</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um mentor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mentors.map((mentor) => (
                          <SelectItem key={mentor.id} value={mentor.id}>
                            {mentor.name} - {mentor.role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Escolha o mentor que melhor se adequa às suas necessidades de desenvolvimento.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                onClick={() => setCurrentStep(2)}
                disabled={!form.getValues().mentorId}
                className="bg-neki-gradient hover:opacity-90 transition-opacity"
              >
                Próximo
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </>
        );

      case 2:
        return (
          <>
            <CardHeader>
              <CardTitle>Escolha a Data e Horário</CardTitle>
              <CardDescription>
                Selecione quando você deseja agendar sua mentoria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <FormLabel className="mb-2 block">Data</FormLabel>
                  <div className="border rounded-md p-1">
                    <ScheduleCalendar
                      selectedDate={selectedDate}
                      onDateChange={setSelectedDate}
                      disabledDates={[]} // Add disabled dates here
                    />
                  </div>
                </div>

                <div>
                  <FormLabel className="mb-2 block">Horário</FormLabel>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((time) => (
                      <MeetingTime
                        key={time}
                        time={time}
                        selected={selectedTime === time}
                        available={availableTimes.includes(time)}
                        onSelect={() => setSelectedTime(time)}
                      />
                    ))}
                  </div>
                  {selectedDate && selectedTime && (
                    <div className="mt-4 p-3 bg-muted rounded-md flex items-center text-sm">
                      <div className="mr-2 p-1.5 rounded-full bg-neki-teal/10">
                        <CalendarDays className="h-4 w-4 text-neki-teal" />
                      </div>
                      <div>
                        {format(selectedDate, "EEEE, dd 'de' MMMM 'de' yyyy", {
                          locale: ptBR,
                        })}{" "}
                        às {selectedTime}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(1)}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Anterior
              </Button>
              <Button
                onClick={() => setCurrentStep(3)}
                disabled={!selectedDate || !selectedTime}
                className="bg-neki-gradient hover:opacity-90 transition-opacity"
              >
                Próximo
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </>
        );

      case 3:
        return (
          <>
            <CardHeader>
              <CardTitle>Defina o Tópico da Mentoria</CardTitle>
              <CardDescription>
                Forneça detalhes sobre o que você gostaria de discutir
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tópico principal</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um tópico principal" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="desenvolvimento-carreira">
                              Desenvolvimento de Carreira
                            </SelectItem>
                            <SelectItem value="habilidades-tecnicas">
                              Habilidades Técnicas
                            </SelectItem>
                            <SelectItem value="lideranca">
                              Liderança e Gestão
                            </SelectItem>
                            <SelectItem value="feedback">
                              Feedback e Avaliação
                            </SelectItem>
                            <SelectItem value="outros">
                              Outros Tópicos
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Detalhes adicionais</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Descreva o que você gostaria de discutir na mentoria..."
                          className="resize-none min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Forneça detalhes específicos para ajudar o mentor a se preparar para a sessão.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg space-y-3">
                <h4 className="font-medium">Resumo do agendamento</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-full bg-neki-teal/10">
                      <Clock className="h-4 w-4 text-neki-teal" />
                    </div>
                    <div>
                      <div className="font-medium">Data e Hora</div>
                      <div className="text-muted-foreground">
                        {selectedDate
                          ? `${format(selectedDate, "dd/MM/yyyy")} às ${selectedTime}`
                          : "Não selecionado"}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-full bg-neki-teal/10">
                      <Video className="h-4 w-4 text-neki-teal" />
                    </div>
                    <div>
                      <div className="font-medium">Mentor</div>
                      <div className="text-muted-foreground">
                        {form.getValues().mentorId
                          ? mentors.find(
                              (m) => m.id === form.getValues().mentorId
                            )?.name
                          : "Não selecionado"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(2)}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Anterior
              </Button>
              <Button
                onClick={form.handleSubmit(onSubmit)}
                disabled={
                  isSubmitting ||
                  !form.getValues().topic ||
                  !form.getValues().notes
                }
                className="bg-neki-gradient hover:opacity-90 transition-opacity"
              >
                {isSubmitting ? "Agendando..." : "Confirmar Agendamento"}
              </Button>
            </CardFooter>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-mesh-gradient">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <div className="text-center mb-8 animate-fade-in-up">
          <h1 className="text-3xl font-bold mb-2">Agendar Mentoria</h1>
          <p className="text-muted-foreground">
            Escolha um mentor, selecione a data e horário e defina os tópicos da sua sessão.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                  currentStep >= 2
                    ? "bg-neki-blue text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                1
              </div>
              <div
                className={`ml-2 h-0.5 w-8 ${
                  currentStep >= 2 ? "bg-neki-blue" : "bg-muted"
                }`}
              ></div>
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                  currentStep >= 2
                    ? "bg-neki-blue text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                2
              </div>
              <div
                className={`ml-2 h-0.5 w-8 ${
                  currentStep >= 3 ? "bg-neki-teal" : "bg-muted"
                }`}
              ></div>
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                  currentStep >= 3
                    ? "bg-neki-teal text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                3
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Passo {currentStep} de 3
            </div>
          </div>
        </div>

        <Card className="animate-fade-in shadow-md">
          <Form {...form}>{getStepContent()}</Form>
        </Card>
      </div>
    </div>
  );
};

export default Schedule;
