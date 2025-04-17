
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ScheduleCalendarProps {
  selectedDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  bookedDates?: Date[];
  disabledDates?: Date[];
}

const ScheduleCalendar = ({
  selectedDate,
  onDateChange,
  bookedDates = [],
  disabledDates = [],
}: ScheduleCalendarProps) => {
  const [month, setMonth] = useState<Date>(selectedDate || new Date());

  // Format dates to string for comparison
  const formatDateForComparison = (date: Date) => {
    return format(date, "yyyy-MM-dd");
  };

  // Check if a date has bookings
  const hasBooking = (date: Date) => {
    const dateStr = formatDateForComparison(date);
    return bookedDates.some(
      (bookedDate) => formatDateForComparison(bookedDate) === dateStr
    );
  };

  // Format the month header
  const formatCaption = ({ ...props }) => {
    return (
      <div className="flex items-center justify-center text-base font-medium">
        {format(props.displayMonth || month, "MMMM yyyy", { locale: ptBR })}
      </div>
    );
  };

  return (
    <Calendar
      mode="single"
      selected={selectedDate}
      onSelect={onDateChange}
      month={month}
      onMonthChange={setMonth}
      disabled={[
        { before: new Date() },
        ...disabledDates.map((date) => new Date(date)),
      ]}
      className="rounded-md border shadow-sm"
      classNames={{
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "hidden",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          "h-7 w-7 bg-transparent p-0 opacity-70 hover:opacity-100 transition-opacity"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-xs m-0.5",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent",
          "first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
        ),
        day: cn(
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100 transition-colors duration-200",
          "hover:bg-muted hover:text-accent-foreground rounded-full m-0.5"
        ),
        day_selected:
          "bg-neki-teal text-white hover:bg-neki-teal hover:text-white focus:bg-neki-teal focus:text-white",
        day_today: "bg-muted font-semibold",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
        Caption: formatCaption,
      }}
      modifiers={{
        booked: bookedDates.map((date) => new Date(date)),
      }}
      modifiersClassNames={{
        booked: "border border-neki-blue text-neki-blue",
      }}
    />
  );
};

export default ScheduleCalendar;
