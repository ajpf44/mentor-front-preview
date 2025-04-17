
import { Calendar, Plus, Save } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Control } from "react-hook-form";
import { ProfileFormValues } from "@/pages/MentorProfile";
import { Button } from "@/components/ui/button";
import ProfileCalendarIntegration from "./ProfileCalendarIntegration";
import { useState } from "react";
import AvailabilityCalendar from "./AvailabilityCalendar";
import TimeSlotSelector from "./TimeSlotSelector";

interface ProfileAvailabilityProps {
  control: Control<ProfileFormValues>;
  daysOfWeek: { id: string; label: string }[];
  timeSlots: string[];
}

interface TimeSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
}

export default function ProfileAvailability({ control, timeSlots }: ProfileAvailabilityProps) {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [recurringTimeSlots, setRecurringTimeSlots] = useState<TimeSlot[]>([
    { id: "1", day: "Segunda", startTime: "09:00", endTime: "10:00" }
  ]);

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    setSelectedDates(prev => {
      const dateExists = prev.some(d => 
        d.getDate() === date.getDate() && 
        d.getMonth() === date.getMonth() && 
        d.getFullYear() === date.getFullYear()
      );
      
      if (dateExists) {
        return prev.filter(d => 
          d.getDate() !== date.getDate() || 
          d.getMonth() !== date.getMonth() || 
          d.getFullYear() !== date.getFullYear()
        );
      } else {
        return [...prev, date];
      }
    });
  };

  // Handle adding a new time slot
  const handleAddTimeSlot = () => {
    const newId = String(Date.now());
    setRecurringTimeSlots(prev => [
      ...prev, 
      { id: newId, day: "Segunda", startTime: "09:00", endTime: "10:00" }
    ]);
  };

  // Handle removing a time slot
  const handleRemoveTimeSlot = (id: string) => {
    setRecurringTimeSlots(prev => prev.filter(slot => slot.id !== id));
  };

  // Handle time slot changes
  const handleStartTimeChange = (id: string, time: string) => {
    setRecurringTimeSlots(prev => 
      prev.map(slot => slot.id === id ? { ...slot, startTime: time } : slot)
    );
  };

  const handleEndTimeChange = (id: string, time: string) => {
    setRecurringTimeSlots(prev => 
      prev.map(slot => slot.id === id ? { ...slot, endTime: time } : slot)
    );
  };

  // Handle saving availability
  const handleSaveAvailability = () => {
    // In a real app, this would save to the backend
    console.log("Selected dates:", selectedDates);
    console.log("Recurring time slots:", recurringTimeSlots);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Calendar className="h-5 w-5 text-neki-teal" />
          Disponibilidade
        </h3>
        <ProfileCalendarIntegration />
      </div>
      
      <div className="p-4 border rounded-lg bg-muted/30">
        <p className="text-sm text-muted-foreground mb-4">
          Configure sua disponibilidade manualmente ou conecte seu Google Calendar para sincronização automática.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-semibold mb-4">Selecione os dias disponíveis</h4>
          <AvailabilityCalendar 
            selectedDates={selectedDates}
            onDateSelect={handleDateSelect}
          />
          
          <FormField
            control={control}
            name="availableDays"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormControl>
                  <input {...field} type="hidden" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div>
          <h4 className="text-sm font-semibold mb-4">Configure horários recorrentes</h4>
          <div className="space-y-3">
            {recurringTimeSlots.map((slot) => (
              <TimeSlotSelector
                key={slot.id}
                day={slot.day}
                startTime={slot.startTime}
                endTime={slot.endTime}
                timeSlots={timeSlots}
                onStartTimeChange={(time) => handleStartTimeChange(slot.id, time)}
                onEndTimeChange={(time) => handleEndTimeChange(slot.id, time)}
                onDelete={() => handleRemoveTimeSlot(slot.id)}
                isRemovable={recurringTimeSlots.length > 1}
              />
            ))}
            
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2 border-dashed"
              onClick={handleAddTimeSlot}
            >
              <Plus className="h-4 w-4" />
              Adicionar Horário
            </Button>
            
            <Button
              className="w-full bg-neki-teal hover:bg-neki-teal/90 mt-4"
              onClick={handleSaveAvailability}
            >
              <Save className="h-4 w-4 mr-2" />
              Salvar disponibilidade
            </Button>
          </div>
          
          <FormField
            control={control}
            name="availableTimeStart"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormControl>
                  <input {...field} type="hidden" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="availableTimeEnd"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormControl>
                  <input {...field} type="hidden" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
