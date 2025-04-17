
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

interface MeetingTimeProps {
  time: string;
  selected: boolean;
  available: boolean;
  onSelect: () => void;
}

const MeetingTime = ({
  time,
  selected,
  available,
  onSelect,
}: MeetingTimeProps) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onSelect}
      disabled={!available}
      className={cn(
        "flex items-center gap-2 h-10 transition-all duration-300 border border-muted",
        selected
          ? "bg-neki-gradient border-none text-white"
          : "hover:border-neki-blue",
        !available && "opacity-50 cursor-not-allowed"
      )}
    >
      <Clock size={14} />
      <span>{time}</span>
    </Button>
  );
};

export default MeetingTime;
