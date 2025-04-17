
import { X, Save, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ProfileFormButtonsProps {
  isSubmitting: boolean;
}

export default function ProfileFormButtons({ isSubmitting }: ProfileFormButtonsProps) {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-between">
      <Button
        type="button"
        variant="outline"
        onClick={() => navigate(-1)}
      >
        <X className="mr-2 h-4 w-4" />
        Cancelar
      </Button>
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="bg-neki-gradient hover:opacity-90 transition-opacity"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-1">
            <Clock className="animate-spin h-4 w-4 mr-1" />
            Salvando...
          </span>
        ) : (
          <span className="flex items-center gap-1">
            <Save className="h-4 w-4 mr-1" />
            Salvar Perfil
          </span>
        )}
      </Button>
    </div>
  );
}
