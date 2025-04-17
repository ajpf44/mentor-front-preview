
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

export interface Mentorship {
  id: string;
  mentee: string;
  date: string;
  time: string;
  topic: string;
  status: "pending" | "confirmed" | "canceled" | "completed";
}

interface UpcomingMentorshipsProps {
  mentorships: Mentorship[];
  onStatusChange: (id: string, status: "confirmed" | "canceled") => void;
}

export default function UpcomingMentorships({ 
  mentorships,
  onStatusChange,
}: UpcomingMentorshipsProps) {
  const handleAccept = (id: string) => {
    onStatusChange(id, "confirmed");
    toast.success("Mentoria confirmada com sucesso!");
  };

  const handleReject = (id: string) => {
    onStatusChange(id, "canceled");
    toast.error("Mentoria cancelada.");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Suas próximas mentorias</h2>
      
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-neki-blue-light text-white p-3 font-bold text-center text-lg">
          Próximas Mentorias
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mentorado</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Hora</TableHead>
              <TableHead>Tópico</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mentorships.map((mentorship) => (
              <TableRow key={mentorship.id}>
                <TableCell className="font-medium">{mentorship.mentee}</TableCell>
                <TableCell>{mentorship.date}</TableCell>
                <TableCell>{mentorship.time}</TableCell>
                <TableCell>{mentorship.topic}</TableCell>
                <TableCell className="text-right">
                  {mentorship.status === "pending" ? (
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                        onClick={() => handleAccept(mentorship.id)}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Aceitar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                        onClick={() => handleReject(mentorship.id)}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Recusar
                      </Button>
                    </div>
                  ) : (
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      mentorship.status === "confirmed" ? "bg-green-100 text-green-800" :
                      mentorship.status === "canceled" ? "bg-red-100 text-red-800" :
                      "bg-blue-100 text-blue-800"
                    }`}>
                      {mentorship.status === "confirmed" ? "Confirmada" :
                       mentorship.status === "canceled" ? "Cancelada" : "Concluída"}
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {mentorships.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                  Não há mentorias agendadas
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
