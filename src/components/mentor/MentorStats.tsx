
import {
  Check,
  Clock,
  Star,
  ThumbsUp,
  X,
} from "lucide-react";
import { Card } from "@/components/ui/card";

interface MentorStatsProps {
  confirmed: number;
  canceled: number;
  completed: number;
  rated: number;
  positiveRatings: number;
  mentorshipHours: number;
}

export default function MentorStats({
  confirmed,
  canceled,
  completed,
  rated,
  positiveRatings,
  mentorshipHours,
}: MentorStatsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Resumo</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-neki-blue-light text-white flex flex-col items-center p-4 rounded-md">
          <div className="flex items-center gap-2 font-semibold mb-1">
            <Check className="h-5 w-5" />
            <span>Confirmadas</span>
          </div>
          <p className="text-xl font-bold">{confirmed}</p>
        </Card>

        <Card className="bg-neki-blue-light text-white flex flex-col items-center p-4 rounded-md">
          <div className="flex items-center gap-2 font-semibold mb-1">
            <X className="h-5 w-5" />
            <span>Canceladas</span>
          </div>
          <p className="text-xl font-bold">{canceled}</p>
        </Card>

        <Card className="bg-neki-blue-light text-white flex flex-col items-center p-4 rounded-md">
          <div className="flex items-center gap-2 font-semibold mb-1">
            <Check className="h-5 w-5 text-white" />
            <span>Finalizadas</span>
          </div>
          <p className="text-xl font-bold">{completed}</p>
        </Card>

        <Card className="bg-neki-blue-light text-white flex flex-col items-center p-4 rounded-md">
          <div className="flex items-center gap-2 font-semibold mb-1">
            <Star className="h-5 w-5" />
            <span>Avaliadas</span>
          </div>
          <p className="text-xl font-bold">{rated}</p>
        </Card>

        <Card className="bg-neki-blue-light text-white flex flex-col items-center p-4 rounded-md">
          <div className="flex items-center gap-2 font-semibold mb-1">
            <ThumbsUp className="h-5 w-5" />
            <span>Avaliações Positivas</span>
          </div>
          <p className="text-xl font-bold">{positiveRatings}</p>
        </Card>

        <Card className="bg-neki-blue-light
        text-white flex flex-col items-center p-4 rounded-md">
          <div className="flex items-center gap-2 font-semibold mb-1">
            <Clock className="h-5 w-5" />
            <span>Horas de mentorias</span>
          </div>
          <p className="text-xl font-bold">{mentorshipHours}h</p>
        </Card>
      </div>
    </div>
  );
}
