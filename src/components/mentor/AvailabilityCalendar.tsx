
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";

interface AvailabilityCalendarProps {
  selectedDates: Date[];
  onDateSelect: (date: Date) => void;
}

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({
  selectedDates,
  onDateSelect,
}) => {
  const [month, setMonth] = useState<Date>(new Date());

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      onDateSelect(date);
    }
  };

  return (
    <Calendar
      mode="multiple"
      selected={selectedDates}
      onSelect={(day) => handleDateSelect(day as Date)}
      month={month}
      onMonthChange={setMonth}
      className="border rounded-md shadow-sm pointer-events-auto"
      locale={ptBR}
      weekStartsOn={1} // Week starts on Monday
      formatters={{
        formatCaption: (date) => format(date, "MMMM yyyy", { locale: ptBR }),
      }}
    />
  );
};

export default AvailabilityCalendar;
