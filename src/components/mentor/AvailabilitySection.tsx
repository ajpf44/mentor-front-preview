
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import { toast } from "sonner";

export interface DayAvailability {
  day: string;
  label: string;
  enabled: boolean;
  timeStart: string;
  timeEnd: string;
}

interface AvailabilitySectionProps {
  availability: DayAvailability[];
  onSave: (availability: DayAvailability[]) => void;
}

export default function AvailabilitySection({
  availability,
  onSave,
}: AvailabilitySectionProps) {
  const [availabilityState, setAvailabilityState] = useState<DayAvailability[]>(availability);

  const handleToggleDay = (day: string) => {
    setAvailabilityState(prev => 
      prev.map(item => 
        item.day === day 
          ? { ...item, enabled: !item.enabled } 
          : item
      )
    );
  };

  const handleTimeChange = (day: string, field: 'timeStart' | 'timeEnd', value: string) => {
    setAvailabilityState(prev => 
      prev.map(item => 
        item.day === day 
          ? { ...item, [field]: value } 
          : item
      )
    );
  };

  const handleSave = () => {
    onSave(availabilityState);
    toast.success("Disponibilidade salva com sucesso!");
  };

  const timeOptions = [
    "08:00", "09:00", "10:00", "11:00", "12:00", 
    "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Configure sua disponibilidade</h2>
      <div className="border rounded-lg p-4 space-y-4">
        <div className="flex items-center space-x-2 text-neki-teal mb-4">
          <Calendar className="h-5 w-5" />
          <h3 className="text-lg font-medium">Disponibilidade semanal</h3>
        </div>
        
        <div className="grid gap-4">
          {availabilityState.map((day) => (
            <div 
              key={day.day} 
              className={`border p-4 rounded-lg ${
                day.enabled 
                  ? "border-neki-teal bg-neki-teal/5" 
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`day-${day.day}`}
                    checked={day.enabled}
                    onChange={() => handleToggleDay(day.day)}
                    className="h-4 w-4 rounded border-gray-300 text-neki-teal focus:ring-neki-teal"
                  />
                  <label 
                    htmlFor={`day-${day.day}`}
                    className="font-medium cursor-pointer"
                  >
                    {day.label}
                  </label>
                </div>

                {day.enabled && (
                  <div className="flex items-center gap-2 ml-6 sm:ml-0">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <div className="flex items-center gap-2">
                      <select 
                        value={day.timeStart}
                        onChange={(e) => handleTimeChange(day.day, 'timeStart', e.target.value)}
                        className="border rounded p-1 text-sm"
                        disabled={!day.enabled}
                      >
                        {timeOptions.map(time => (
                          <option key={`start-${time}`} value={time}>{time}</option>
                        ))}
                      </select>
                      <span>até</span>
                      <select 
                        value={day.timeEnd}
                        onChange={(e) => handleTimeChange(day.day, 'timeEnd', e.target.value)}
                        className="border rounded p-1 text-sm"
                        disabled={!day.enabled}
                      >
                        {timeOptions.map(time => (
                          <option key={`end-${time}`} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-4">
          <Button 
            onClick={handleSave}
            className="bg-neki-blue hover:bg-neki-teal/90"
          >
            Salvar Disponibilidade
          </Button>
        </div>
      </div>
    </div>
  );
}
