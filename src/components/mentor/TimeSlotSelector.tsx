
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface TimeSlotSelectorProps {
  day: string;
  startTime: string;
  endTime: string;
  onStartTimeChange: (time: string) => void;
  onEndTimeChange: (time: string) => void;
  onDelete?: () => void;
  timeSlots: string[];
  isRemovable?: boolean;
}

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  day,
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
  onDelete,
  timeSlots,
  isRemovable = false,
}) => {
  return (
    <div className="flex items-center gap-2 p-2 rounded-md bg-muted/30">
      <div className="min-w-24">
        <span className="text-sm font-medium">{day}</span>
      </div>
      <select
        value={startTime}
        onChange={(e) => onStartTimeChange(e.target.value)}
        className="flex h-9 w-24 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {timeSlots.map((time) => (
          <option key={`start-${time}`} value={time}>
            {time}
          </option>
        ))}
      </select>
      <span className="text-sm">Até</span>
      <select
        value={endTime}
        onChange={(e) => onEndTimeChange(e.target.value)}
        className="flex h-9 w-24 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {timeSlots.map((time) => (
          <option key={`end-${time}`} value={time}>
            {time}
          </option>
        ))}
      </select>
      
      {isRemovable && onDelete && (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onDelete}
          className="ml-auto h-8 w-8 text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Remover horário</span>
        </Button>
      )}
    </div>
  );
};

export default TimeSlotSelector;
